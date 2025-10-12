#!/usr/bin/env node
/*
  Builds generated-news.json from all .md files inside the /ai-news/ directory.
  - It reads each markdown file.
  - It parses the frontmatter for metadata (title, link, date, etc.).
  - The body of the markdown is used as the article's 'content'.
  - It automatically fetches a cover image and description if they are not provided in the frontmatter.
  - OPTIMIZED: Only processes new or modified files (incremental update).
*/
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import axios from 'axios';
import * as cheerio from 'cheerio';

const root = process.cwd();
// UPDATED: Point to the directory instead of a single file.
const contentDir = path.join(root, 'content/ai-news'); 
const outDir = path.join(root, 'src', 'data', 'ai');
const outFile = path.join(outDir, 'generated-news.json');

// 缓存文件，记录每个文件的最后修改时间
const cacheFile = path.join(outDir, '.news-build-cache.json');

async function fetchMeta(url) {
  if (!url) return { image: null, description: '' };
  try {
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      }
    });
    const $ = cheerio.load(html);
    const image = $('meta[property="og:image"]').attr('content') || null;
    const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
    console.log(`✅ Fetched meta for: ${url}`);
    return { image, description: description.trim() };
  } catch (error) {
    console.error(`❌ Failed to fetch meta for ${url}:`, error.message);
    return { image: null, description: '' };
  }
}

async function processFile(file, filePath) {
  const rawContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(rawContent);

  // Fetch meta only if image or description is missing.
  const { image: fetchedImage, description: fetchedDescription } = 
    (!data.image || !data.description) ? await fetchMeta(data.link) : { image: null, description: '' };
    
  const slug = path.basename(file, '.md');

  return {
    id: slug,
    title: data.title,
    title_zh: data.title_zh || '',
    description: data.description || fetchedDescription || content.slice(0, 150).replace(/\s+/g, ' ').trim() + '...',
    summary_zh: data.summary_zh || '',
    author: data.author,
    date: new Date(data.date).toISOString(),
    image: data.image || fetchedImage,
    link: data.link,
    category: "ai-news",
    tags: data.tags || [],
    key_points: data.key_points || [],
    content: content,
  };
}

async function buildNews() {
  if (!fs.existsSync(contentDir)) {
    console.warn(`[news] content directory not found: ${contentDir}`);
    return;
  }

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 读取现有的 JSON 数据和缓存
  let existingNews = [];
  let cache = {};
  
  if (fs.existsSync(outFile)) {
    existingNews = JSON.parse(fs.readFileSync(outFile, 'utf8'));
    console.log(`📦 Loaded ${existingNews.length} existing news items`);
  }
  
  if (fs.existsSync(cacheFile)) {
    cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
  }

  // 读取所有 markdown 文件
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
  const currentFiles = new Set(files.map(f => path.basename(f, '.md')));
  
  // 将现有新闻转换为 Map，方便查找和更新
  const newsMap = new Map(existingNews.map(item => [item.id, item]));
  
  let updatedCount = 0;
  let newCount = 0;
  let skippedCount = 0;

  // 处理每个文件
  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const slug = path.basename(file, '.md');
    const stats = fs.statSync(filePath);
    const mtime = stats.mtimeMs;

    // 检查文件是否被修改或是新文件
    const isModified = !cache[slug] || cache[slug] !== mtime;
    const isNew = !newsMap.has(slug);

    if (isModified || isNew) {
      if (isNew) {
        console.log(`➕ Processing new file: ${file}`);
        newCount++;
      } else {
        console.log(`🔄 Processing modified file: ${file}`);
        updatedCount++;
      }
      
      const newsItem = await processFile(file, filePath);
      newsMap.set(slug, newsItem);
      cache[slug] = mtime;
    } else {
      skippedCount++;
    }
  }

  // 删除已不存在的文件对应的条目
  let deletedCount = 0;
  for (const [id] of newsMap) {
    if (!currentFiles.has(id)) {
      console.log(`🗑️  Removing deleted file: ${id}`);
      newsMap.delete(id);
      delete cache[id];
      deletedCount++;
    }
  }

  // 转换回数组并排序
  const allNews = Array.from(newsMap.values());
  allNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 保存结果
  fs.writeFileSync(outFile, JSON.stringify(allNews, null, 2), 'utf8');
  fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2), 'utf8');

  console.log('\n' + '='.repeat(60));
  console.log('📊 Build Summary:');
  console.log(`   ➕ New files: ${newCount}`);
  console.log(`   🔄 Updated files: ${updatedCount}`);
  console.log(`   ⏭️  Skipped (unchanged): ${skippedCount}`);
  console.log(`   🗑️  Deleted: ${deletedCount}`);
  console.log(`   📝 Total items: ${allNews.length}`);
  console.log('='.repeat(60));
  console.log(`✅ Generated → ${path.relative(root, outFile)}\n`);
}

buildNews();