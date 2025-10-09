#!/usr/bin/env node
/*
  Builds generated-news.json from all .md files inside the /ai-news/ directory.
  - It reads each markdown file.
  - It parses the frontmatter for metadata (title, link, date, etc.).
  - The body of the markdown is used as the article's 'content'.
  - It automatically fetches a cover image and description if they are not provided in the frontmatter.
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

async function buildNews() {
  if (!fs.existsSync(contentDir)) {
    console.warn(`[news] content directory not found: ${contentDir}`);
    return;
  }

  // UPDATED: Read all files from the directory.
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
  let allNews = [];

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const rawContent = fs.readFileSync(filePath, 'utf8');
    // UPDATED: Parse frontmatter (data) and the article body (content).
    const { data, content } = matter(rawContent);

    // Fetch meta only if image or description is missing.
    const { image: fetchedImage, description: fetchedDescription } = 
      (!data.image || !data.description) ? await fetchMeta(data.link) : { image: null, description: '' };
      
    const slug = path.basename(file, '.md');

    allNews.push({
      id: slug,
      title: data.title,
      title_zh: data.title_zh || '',
      // Use description from frontmatter, or the fetched one, or generate a snippet from content.
      description: data.description || fetchedDescription || content.slice(0, 150).replace(/\s+/g, ' ').trim() + '...',
      summary_zh: data.summary_zh || '',
      author: data.author,
      date: new Date(data.date).toISOString(),
      // Use image from frontmatter or the one we fetched.
      image: data.image || fetchedImage,
      link: data.link,
      category: "ai-news",
      tags: data.tags || [],
      key_points: data.key_points || [],
      // UPDATED: The body of the MD file is now the main content.
      content: content,
    });
  }

  // Sort news by date, newest first.
  allNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(outFile, JSON.stringify(allNews, null, 2), 'utf8');
  console.log(`✅ Generated ${allNews.length} news items from /content/ai-news/ directory → ${path.relative(root, outFile)}`);
}

buildNews();