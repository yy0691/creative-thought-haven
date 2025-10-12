#!/usr/bin/env node
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import Parser from 'rss-parser';
import axios from 'axios';
import * as cheerio from 'cheerio';

const root = process.cwd();
const configFile = path.join(root, 'config/ai-tutorial-sources.json');
const outputDir = path.join(root, 'content/ai-tutorials');

// 配置RSS解析器
const parser = new Parser({
  customFields: {
    item: ['content:encoded', 'content', 'media:content']
  },
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  timeout: 10000
});

function loadConfig() {
  if (!fs.existsSync(configFile)) {
    console.error(`❌ Config file not found: ${configFile}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(configFile, 'utf8'));
}

function generateSlug(title, date) {
  const dateStr = new Date(date).toISOString().split('T')[0];
  // 中文URL友好处理
  const slug = title
    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 80);
  return `${dateStr}-${slug}`;
}

function sanitizeContent(content) {
  if (!content) return '';
  const $ = cheerio.load(content);
  // 移除脚本和样式
  $('script, style').remove();
  return $.text().trim().substring(0, 500);
}

async function fetchImageFromUrl(url) {
  try {
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 8000
    });
    const $ = cheerio.load(html);
    
    // 尝试多种图片meta标签
    return (
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="twitter:image"]').attr('content') ||
      $('meta[itemprop="image"]').attr('content') ||
      $('.article-image img').first().attr('src') ||
      $('article img').first().attr('src') ||
      null
    );
  } catch (error) {
    console.warn(`⚠️  Could not fetch image from ${url}`);
    return null;
  }
}

function extractTags(item, category, config) {
  const tags = [];
  
  // 从RSS提取的标签
  if (item.categories && Array.isArray(item.categories)) {
    tags.push(...item.categories.slice(0, 3));
  }
  
  // 添加分类标签
  const categoryName = config.settings.categories[category];
  if (categoryName) {
    tags.push(categoryName);
  }
  
  // 添加通用标签
  tags.push('AI', '人工智能');
  
  // 根据标题内容添加智能标签
  const titleLower = item.title.toLowerCase();
  if (titleLower.includes('教程') || titleLower.includes('tutorial')) tags.push('教程');
  if (titleLower.includes('指南') || titleLower.includes('guide')) tags.push('指南');
  if (titleLower.includes('实战') || titleLower.includes('实践')) tags.push('实战');
  if (titleLower.includes('chatgpt') || titleLower.includes('gpt')) tags.push('ChatGPT');
  if (titleLower.includes('midjourney')) tags.push('Midjourney');
  if (titleLower.includes('stable diffusion')) tags.push('Stable Diffusion');
  if (titleLower.includes('llm') || titleLower.includes('大模型')) tags.push('大语言模型');
  
  return [...new Set(tags)].slice(0, 10);
}

function escapeYamlValue(value) {
  if (!value) return '""';
  
  const str = String(value);
  
  if (str.includes(':') || str.includes('"') || str.includes("'") || 
      str.includes('\n') || str.includes('#') || str.includes('[') || 
      str.includes(']') || str.includes('{') || str.includes('}') ||
      str.includes('&') || str.includes('*') || str.includes('!') ||
      str.includes('|') || str.includes('>') || str.includes('@') ||
      str.includes('`')) {
    return `"${str.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`;
  }
  
  return str;
}

async function createMarkdownFile(item, source, config) {
  const slug = generateSlug(item.title, item.pubDate || item.isoDate);
  const filePath = path.join(outputDir, `${slug}.md`);
  
  if (fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping existing: ${slug}`);
    return null;
  }
  
  const description = item.contentSnippet || item.summary || sanitizeContent(item.content) || item.title;
  let image = item.enclosure?.url || null;
  
  // 尝试从media:content获取图片
  if (!image && item['media:content'] && item['media:content'].$) {
    image = item['media:content'].$.url;
  }
  
  // 如果还没有图片，尝试从文章页面抓取
  if (!image) {
    image = await fetchImageFromUrl(item.link);
  }
  
  // 使用默认图片
  if (!image) {
    image = config.settings.defaultImage;
  }
  
  const tags = extractTags(item, source.category, config);
  const categoryName = config.settings.categories[source.category] || source.category;
  
  // 生成摘要（因为是中文内容，直接使用description）
  const summary = description.length > 150 
    ? description.substring(0, 150) + '...' 
    : description;
  
  const frontmatter = `---
title: ${escapeYamlValue(item.title)}
description: ${escapeYamlValue(summary)}
author: ${escapeYamlValue(config.settings.author)}
date: ${new Date(item.pubDate || item.isoDate).toISOString().split('T')[0]}
image: ${escapeYamlValue(image)}
link: ${escapeYamlValue(item.link)}
category: ${source.category}
category_name: ${escapeYamlValue(categoryName)}
tags: ${JSON.stringify(tags)}
featured: false
source: ${escapeYamlValue(source.name)}
language: zh
---

## ${item.title}

${summary}

### 📖 内容概览

${description}

### 🔗 相关链接

- **来源**: ${source.name}
- **原文链接**: [点击查看](${item.link})
- **发布时间**: ${new Date(item.pubDate || item.isoDate).toLocaleDateString('zh-CN')}

---

*本文转载自${source.name}*
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
    console.log(`📡 Fetching from ${source.name} (${source.url})...`);
    const feed = await parser.parseURL(source.url);
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - config.settings.daysToLookBack);
    
    const recentItems = feed.items
      .filter(item => {
        const itemDate = new Date(item.pubDate || item.isoDate);
        return itemDate >= cutoffDate;
      })
      .slice(0, config.settings.maxArticlesPerSource);
    
    console.log(`   Found ${recentItems.length} recent articles`);
    
    const created = [];
    for (const item of recentItems) {
      const slug = await createMarkdownFile(item, source, config);
      if (slug) created.push(slug);
      // 延迟避免请求过快
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    return created;
  } catch (error) {
    console.error(`❌ Error fetching from ${source.name}:`, error.message);
    if (error.message.includes('timeout')) {
      console.error('   💡 Tip: RSSHub可能需要自建或使用其他实例');
    }
    return [];
  }
}

async function main() {
  console.log('\n🤖 Starting Chinese AI tutorials fetching...\n');
  
  const config = loadConfig();
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const allCreated = [];
  for (const source of config.sources) {
    const created = await fetchFromSource(source, config);
    allCreated.push(...created);
    // 每个源之间间隔3秒
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  console.log(`\n✅ Fetching complete! Created ${allCreated.length} new tutorials.`);
  
  if (allCreated.length > 0) {
    console.log('\n📝 Note: You can run build-ai-tutorials.js to generate JSON index');
    console.log('   Or integrate tutorials into existing AI sections');
  } else {
    console.log('\nℹ️  No new tutorials found. All content is up to date.');
  }
  
  console.log('\n💡 Tip: 如果RSSHub访问失败，可以：');
  console.log('   1. 使用其他RSSHub公共实例');
  console.log('   2. 自建RSSHub服务：https://docs.rsshub.app');
  console.log('   3. 调整config/ai-tutorial-sources.json中的源');
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
