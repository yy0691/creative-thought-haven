#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import Parser from 'rss-parser';
import axios from 'axios';
import * as cheerio from 'cheerio';

const root = process.cwd();
const configFile = path.join(root, 'config/ai-news-sources.json');
const outputDir = path.join(root, 'content/ai-news');
const parser = new Parser();

function loadConfig() {
  if (!fs.existsSync(configFile)) {
    console.error(`❌ Config file not found: ${configFile}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(configFile, 'utf8'));
}

function generateSlug(title, date) {
  const dateStr = new Date(date).toISOString().split('T')[0];
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
  return `${dateStr}-${slug}`;
}

function sanitizeContent(content) {
  const $ = cheerio.load(content || '');
  return $.text().trim().substring(0, 500);
}

async function fetchImageFromUrl(url) {
  try {
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 5000
    });
    const $ = cheerio.load(html);
    return $('meta[property="og:image"]').attr('content') || null;
  } catch (error) {
    console.warn(`⚠️  Could not fetch image from ${url}`);
    return null;
  }
}

function extractTags(item, category) {
  const tags = [];
  
  if (item.categories && Array.isArray(item.categories)) {
    tags.push(...item.categories.slice(0, 3));
  }
  
  const commonTags = ['AI', '人工智能', category === 'ai-research' ? '研究' : '行业动态'];
  tags.push(...commonTags);
  
  return [...new Set(tags)].slice(0, 8);
}

async function createMarkdownFile(item, source, config) {
  const slug = generateSlug(item.title, item.pubDate || item.isoDate);
  const filePath = path.join(outputDir, `${slug}.md`);
  
  if (fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping existing: ${slug}`);
    return null;
  }
  
  const description = item.contentSnippet || item.summary || sanitizeContent(item.content) || '';
  const image = item.enclosure?.url || await fetchImageFromUrl(item.link) || config.settings.defaultImage;
  const tags = extractTags(item, source.category);
  
  const frontmatter = `---
title: ${item.title}
description: ${description.substring(0, 200)}
author: ${config.settings.author}
date: ${new Date(item.pubDate || item.isoDate).toISOString().split('T')[0]}
image: ${image}
link: ${item.link}
category: ai-news
tags: ${JSON.stringify(tags)}
featured: false
source: ${source.name}
---

## ${item.title}

${description}

### 原文链接
[查看原文](${item.link})

---
*本文由自动化系统从 ${source.name} 抓取生成*
`;

  fs.writeFileSync(filePath, frontmatter, 'utf8');
  console.log(`✅ Created: ${slug}`);
  return slug;
}

async function fetchFromSource(source, config) {
  if (!source.enabled) {
    console.log(`⏭️  Skipping disabled source: ${source.name}`);
    return [];
  }

  try {
    console.log(`📡 Fetching from ${source.name}...`);
    const feed = await parser.parseURL(source.url);
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - config.settings.daysToLookBack);
    
    const recentItems = feed.items
      .filter(item => {
        const itemDate = new Date(item.pubDate || item.isoDate);
        return itemDate >= cutoffDate;
      })
      .slice(0, config.settings.maxArticlesPerSource);
    
    const created = [];
    for (const item of recentItems) {
      const slug = await createMarkdownFile(item, source, config);
      if (slug) created.push(slug);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    return created;
  } catch (error) {
    console.error(`❌ Error fetching from ${source.name}:`, error.message);
    return [];
  }
}

async function main() {
  console.log('\n🤖 Starting automated AI news fetching...\n');
  
  const config = loadConfig();
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const allCreated = [];
  for (const source of config.sources) {
    const created = await fetchFromSource(source, config);
    allCreated.push(...created);
  }
  
  console.log(`\n✅ Automation complete! Created ${allCreated.length} new articles.`);
  
  if (allCreated.length > 0) {
    console.log('\n📝 Running build script to update JSON...');
    const { spawn } = await import('child_process');
    const build = spawn('node', ['scripts/build-ai-news.js'], { stdio: 'inherit' });
    
    build.on('close', (code) => {
      if (code === 0) {
        console.log('\n🎉 All done! Your AI news is up to date.');
      } else {
        console.error('\n❌ Build script failed');
      }
    });
  }
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
