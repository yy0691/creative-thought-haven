#!/usr/bin/env node
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import GeminiService from './ai-service.js';

const root = process.cwd();
const newsDir = path.join(root, 'content/ai-news');

// 初始化Gemini服务
let geminiService = null;
try {
  geminiService = new GeminiService();
} catch (error) {
  console.error('❌ Gemini service not available:', error.message);
  console.error('❌ Please configure GEMINI_API_KEY_1 in .env file');
  process.exit(1);
}

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  
  const frontmatter = {};
  const lines = match[1].split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();
    
    // 移除引号
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    // 处理数组
    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        // 保持原样
      }
    }
    
    frontmatter[key] = value;
  }
  
  return { frontmatter, body: match[2] };
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

function needsTranslation(frontmatter) {
  // 如果没有中文标题或中文摘要为空，需要翻译
  return !frontmatter.title_zh || !frontmatter.summary_zh || 
         frontmatter.title_zh === frontmatter.title ||
         frontmatter.summary_zh.length < 30;
}

async function retranslateFile(filePath, retryFailed = false) {
  const filename = path.basename(filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  
  const parsed = extractFrontmatter(content);
  if (!parsed) {
    console.log(`⏭️  Skipping ${filename}: Invalid format`);
    return false;
  }
  
  const { frontmatter, body } = parsed;
  
  // 检查是否需要翻译
  if (!retryFailed && !needsTranslation(frontmatter)) {
    console.log(`⏭️  Skipping ${filename}: Already translated`);
    return false;
  }
  
  console.log(`\n🤖 Retranslating: ${filename}`);
  console.log(`   Original title: ${frontmatter.title?.substring(0, 50)}...`);
  
  try {
    const translation = await geminiService.translateToChineseWithSummary(
      frontmatter.title || '',
      frontmatter.description || '',
      body.substring(0, 500),
      3,  // retries
      true  // isNews = true
    );
    
    // 更新frontmatter
    frontmatter.title_zh = translation.title_zh;
    frontmatter.summary_zh = translation.summary_zh;
    frontmatter.key_points = translation.key_points;
    
    // 重建frontmatter
    const newFrontmatter = `---
title: ${escapeYamlValue(frontmatter.title)}
title_zh: ${escapeYamlValue(frontmatter.title_zh)}
description: ${escapeYamlValue(frontmatter.description)}
summary_zh: ${escapeYamlValue(frontmatter.summary_zh)}
author: ${escapeYamlValue(frontmatter.author)}
date: ${frontmatter.date}
image: ${escapeYamlValue(frontmatter.image)}
link: ${escapeYamlValue(frontmatter.link)}
category: ${frontmatter.category}
tags: ${JSON.stringify(frontmatter.tags)}
key_points: ${JSON.stringify(frontmatter.key_points)}
featured: ${frontmatter.featured || false}
source: ${escapeYamlValue(frontmatter.source)}
---

## ${frontmatter.title_zh}

${frontmatter.summary_zh}

${frontmatter.key_points && frontmatter.key_points.length > 0 
  ? `### 🔑 关键要点\n${frontmatter.key_points.map((point, i) => `${i + 1}. ${point}`).join('\n')}\n` 
  : ''}

### 📰 原文信息
- **标题**: ${frontmatter.title}
- **来源**: ${frontmatter.source}
- **链接**: [查看原文](${frontmatter.link})

---
*本文由AI自动翻译和摘要生成*
`;
    
    // 写回文件
    fs.writeFileSync(filePath, newFrontmatter, 'utf8');
    
    console.log(`✅ Translated: ${translation.title_zh.substring(0, 50)}...`);
    console.log(`   Summary length: ${translation.summary_zh.length} chars`);
    console.log(`   Key points: ${translation.key_points.length}`);
    
    return true;
    
  } catch (error) {
    console.error(`❌ Translation failed: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('\n🔄 Starting news retranslation...\n');
  
  // 只处理 2025-10 月份的文章
  const targetMonth = '2025-10';
  
  const allFiles = fs.readdirSync(newsDir)
    .filter(f => f.endsWith('.md'));
  
  const files = allFiles
    .filter(f => f.startsWith(targetMonth))
    .map(f => path.join(newsDir, f));
  
  console.log(`📁 Found ${allFiles.length} total news files`);
  console.log(`🎯 Filtering for ${targetMonth}: ${files.length} files to process\n`);
  
  let translated = 0;
  let skipped = 0;
  let failed = 0;
  
  for (const file of files) {
    try {
      const result = await retranslateFile(file);
      if (result) {
        translated++;
        // 每次翻译后等待3秒，避免触及API频率限制
        await new Promise(resolve => setTimeout(resolve, 3000));
      } else {
        skipped++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${path.basename(file)}:`, error.message);
      failed++;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 Retranslation Summary:');
  console.log(`   ✅ Translated: ${translated}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📝 Total: ${files.length}`);
  console.log('='.repeat(50) + '\n');
  
  if (translated > 0) {
    console.log('🔨 Rebuilding JSON index...');
    const { spawn } = await import('child_process');
    const build = spawn('node', ['scripts/build-ai-news.js'], { stdio: 'inherit' });
    
    build.on('close', (code) => {
      if (code === 0) {
        console.log('\n🎉 All done! Your news translations are updated.');
      } else {
        console.error('\n❌ Build script failed');
      }
    });
  } else {
    console.log('ℹ️  No files were translated. All news already have translations.');
  }
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
