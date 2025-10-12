#!/usr/bin/env node
/*
  Build AI sections from content/ai/*.md into src/data/ai/generated-ai-sections.json
  - Each markdown contains Front Matter (title, description).
  - Body can contain H2 headings (##) to group link lists.
  - Link format: "- [Title](url) - optional description"
*/
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const contentDir = path.join(root, 'content', 'ai');
const outDir = path.join(root, 'src', 'data', 'ai');
const outFile = path.join(outDir, 'generated-ai-sections.json');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function slugify(filename) {
  // 去掉文件扩展名
  let name = filename.replace(/\.mdx?$/i, '');
  // 去掉开头的数字和下划线（如 "1_", "2_"）
  name = name.replace(/^\d+_/, '');
  // 替换非字母数字字符为横线
  return name.replace(/[^a-zA-Z0-9-_]/g, '-');
}

// REFACTORED: This function now understands H2 headings (##) as group titles.
function parseContent(markdown) {
  const lines = markdown.split(/\r?\n/);
  const items = [];
  let currentGroup = 'General'; // Default group if no H2 is found

  for (const line of lines) {
    // Match H2 headings, e.g., "## My Group"
    const groupMatch = line.match(/^\s*##\s+(.+?)\s*$/);
    if (groupMatch) {
      currentGroup = groupMatch[1].trim();
      continue; // Move to the next line
    }

    // Match link items
    const linkMatch = line.match(/^\s*-\s*\[(.+?)\]\((https?:[^\)]+)\)\s*(?:-\s*(.+))?\s*$/);
    if (linkMatch) {
      const title = linkMatch[1].trim();
      const url = linkMatch[2].trim();
      const description = linkMatch[3]?.trim() || '';
      
      // 检测是否有中文标题和描述（使用特殊标记或直接检测中文字符）
      // 如果标题包含中文，将其视为title_zh
      const hasChinese = /[\u4e00-\u9fa5]/.test(title);
      
      items.push({ 
        id: `${currentGroup.toLowerCase()}-${title.toLowerCase().replace(/\s+/g,'-')}`, 
        title: hasChinese ? title : title, // 保持原样，前端会处理
        title_zh: hasChinese ? title : undefined,
        url, 
        link: url, 
        description,
        description_zh: hasChinese && description ? description : undefined,
        // NEW: Add the group property to each item
        group: currentGroup 
      });
    }
  }
  return items;
}

function build() {
  ensureDir(outDir);
  if (!fs.existsSync(contentDir)) {
    console.warn(`[ai] content directory not found: ${contentDir}`);
    fs.writeFileSync(outFile, JSON.stringify([], null, 2), 'utf8');
    return;
  }

  const files = fs.readdirSync(contentDir).filter(f => /\.(md|mdx)$/i.test(f));
  const sections = [];

  for (const file of files) {
    const full = path.join(contentDir, file);
    const raw = fs.readFileSync(full, 'utf8');
    const { data, content } = matter(raw);

    const id = slugify(file);
    const title = data.title || id;
    const description = data.description || '';
    
    // Use the updated parsing function
    const items = parseContent(content);

    // 提取文件名中的数字前缀用于排序
    const orderMatch = file.match(/^(\d+)_/);
    const order = orderMatch ? parseInt(orderMatch[1], 10) : 999;

    sections.push({ id, title, description, items, order });
  }

  // 按照文件名中的数字前缀排序，而不是按字母排序
  sections.sort((a, b) => a.order - b.order);
  
  // 移除临时的 order 字段
  sections.forEach(section => delete section.order);

  fs.writeFileSync(outFile, JSON.stringify(sections, null, 2), 'utf8');
  console.log(`✅ Generated ${sections.length} AI sections → ${path.relative(root, outFile)}`);
}

build();