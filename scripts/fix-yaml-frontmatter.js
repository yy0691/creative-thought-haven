#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const contentDir = path.join(root, 'content/ai-news');

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

function fixMarkdownFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    const { data, content: body } = matter(content);
    
    const fixedFrontmatter = `---
title: ${escapeYamlValue(data.title)}
description: ${escapeYamlValue(data.description)}
author: ${escapeYamlValue(data.author)}
date: ${data.date}
image: ${escapeYamlValue(data.image)}
link: ${escapeYamlValue(data.link)}
category: ${data.category}
tags: ${JSON.stringify(data.tags || [])}
featured: ${data.featured || false}
source: ${escapeYamlValue(data.source)}
---

${body}`;
    
    fs.writeFileSync(filePath, fixedFrontmatter, 'utf8');
    console.log(`✅ Fixed: ${path.basename(filePath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Error fixing ${path.basename(filePath)}:`, error.message);
    return false;
  }
}

function main() {
  console.log('\n🔧 Fixing YAML frontmatter in AI news files...\n');
  
  if (!fs.existsSync(contentDir)) {
    console.error(`❌ Directory not found: ${contentDir}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
  
  let fixed = 0;
  let failed = 0;
  
  for (const file of files) {
    const filePath = path.join(contentDir, file);
    if (fixMarkdownFile(filePath)) {
      fixed++;
    } else {
      failed++;
    }
  }
  
  console.log(`\n✅ Fixed ${fixed} files`);
  if (failed > 0) {
    console.log(`❌ Failed to fix ${failed} files`);
  }
}

main();
