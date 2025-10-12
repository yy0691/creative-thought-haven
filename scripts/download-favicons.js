#!/usr/bin/env node
/**
 * 批量下载常用网站的 favicon 到本地
 * 解决国内网络环境下 favicon 加载失败的问题
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = process.cwd();
const faviconDir = path.join(root, 'public', 'favicons');

// 确保目录存在
if (!fs.existsSync(faviconDir)) {
  fs.mkdirSync(faviconDir, { recursive: true });
}

// 常用网站列表（从生成的JSON中提取）
const commonSites = [
  // 对话 & 写作
  { domain: 'chat.openai.com', name: 'chatgpt' },
  { domain: 'gemini.google.com', name: 'gemini' },
  { domain: 'claude.ai', name: 'claude' },
  { domain: 'poe.com', name: 'poe' },
  { domain: 'kimi.moonshot.cn', name: 'kimi' },
  { domain: 'yiyan.baidu.com', name: 'yiyan' },
  { domain: 'www.doubao.com', name: 'doubao' },
  { domain: 'tongyi.aliyun.com', name: 'tongyi' },
  
  // 图像生成
  { domain: 'www.midjourney.com', name: 'midjourney' },
  { domain: 'stability.ai', name: 'stable-diffusion' },
  { domain: 'leonardo.ai', name: 'leonardo' },
  { domain: 'ideogram.ai', name: 'ideogram' },
  
  // 开发工具
  { domain: 'github.com', name: 'github' },
  { domain: 'cursor.sh', name: 'cursor' },
  { domain: 'codeium.com', name: 'codeium' },
  { domain: 'replit.com', name: 'replit' },
  
  // 学习资源
  { domain: 'www.deeplearning.ai', name: 'deeplearning-ai' },
  { domain: 'www.coursera.org', name: 'coursera' },
  { domain: 'www.fast.ai', name: 'fast-ai' },
  { domain: 'huggingface.co', name: 'huggingface' },
  { domain: 'd2l.ai', name: 'd2l' },
  { domain: 'www.kaggle.com', name: 'kaggle' },
  
  // 中文资讯
  { domain: 'www.jiqizhixin.com', name: 'jiqizhixin' },
  { domain: 'www.qbitai.com', name: 'qbitai' },
  { domain: 'aibydoing.com', name: 'aibydoing' },
];

// 尝试多个可能的 favicon URL
function getFaviconUrls(domain) {
  return [
    `https://${domain}/favicon.ico`,
    `https://${domain}/favicon.png`,
    `https://${domain}/static/favicon.ico`,
    `https://${domain}/assets/favicon.ico`,
    `https://icon.horse/icon/${domain}`,
  ];
}

// 下载文件
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    
    protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (response) => {
      // 跟随重定向
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        fs.unlinkSync(dest);
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlinkSync(dest);
      reject(err);
    });
  });
}

// 下载单个站点的 favicon
async function downloadFavicon(site) {
  const urls = getFaviconUrls(site.domain);
  
  for (const url of urls) {
    try {
      const ext = url.endsWith('.png') ? '.png' : '.ico';
      const destPath = path.join(faviconDir, `${site.name}${ext}`);
      
      // 如果已存在则跳过
      if (fs.existsSync(destPath)) {
        console.log(`✓ ${site.name} already exists`);
        return true;
      }
      
      console.log(`Trying ${url}...`);
      await downloadFile(url, destPath);
      console.log(`✓ Downloaded ${site.name} from ${url}`);
      return true;
    } catch (err) {
      // 继续尝试下一个 URL
    }
  }
  
  console.log(`✗ Failed to download favicon for ${site.name}`);
  return false;
}

// 批量下载
async function downloadAll() {
  console.log(`📥 Downloading favicons to ${faviconDir}...\n`);
  
  let success = 0;
  let failed = 0;
  
  for (const site of commonSites) {
    const result = await downloadFavicon(site);
    if (result) {
      success++;
    } else {
      failed++;
    }
  }
  
  console.log(`\n============================================`);
  console.log(`✅ Successfully downloaded: ${success}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📁 Saved to: ${path.relative(root, faviconDir)}`);
  console.log(`============================================`);
}

downloadAll().catch(console.error);
