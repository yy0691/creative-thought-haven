#!/usr/bin/env node
/*
  One-time migration: extract items from src/data/ai/*.ts arrays
  and append them as link lines to content/ai/*.md files.

  Extracts fields: title, link|url, description
  Output line: - [title](link) - description
*/
import fs from 'fs';
import path from 'path';

const root = process.cwd();

const sources = [
  { ts: 'src/data/ai/links.ts', md: 'content/ai/links.md' },
  { ts: 'src/data/ai/courses.ts', md: 'content/ai/courses.md' },
  { ts: 'src/data/ai/deeplearning.ts', md: 'content/ai/deeplearning.md' },
  { ts: 'src/data/ai/learning.ts', md: 'content/ai/learning.md' },
  { ts: 'src/data/ai/prompts.ts', md: 'content/ai/prompts.md' },
  { ts: 'src/data/ai/tutorials.ts', md: 'content/ai/tutorials.md' },
  { ts: 'src/data/ai/tools.ts', md: 'content/ai/tools.md' }
];

function readFile(file) {
  const p = path.join(root, file);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
}

function extractItems(tsContent) {
  const items = [];
  // Roughly match object literals inside array definitions
  const objectRegex = /\{[\s\S]*?\}/g;
  const titleRegex = /title\s*:\s*(['"])(.*?)\1/;
  const linkRegex = /(link|url)\s*:\s*(['"])(.*?)\2/;
  const descRegex = /description\s*:\s*(['"])([\s\S]*?)\1/;

  // Find the part between the first [ and the last ] to limit scope
  const start = tsContent.indexOf('[');
  const end = tsContent.lastIndexOf(']');
  if (start === -1 || end === -1 || end <= start) return items;
  const arrayText = tsContent.slice(start, end + 1);

  let match;
  while ((match = objectRegex.exec(arrayText)) !== null) {
    const objText = match[0];
    const titleM = objText.match(titleRegex);
    const linkM = objText.match(linkRegex);
    const descM = objText.match(descRegex);
    const title = titleM ? titleM[2].trim() : '';
    const link = linkM ? linkM[3].trim() : '';
    const description = descM ? descM[2].trim() : '';
    if (title && link) {
      items.push({ title, link, description });
    }
  }
  return items;
}

function appendUniqueLinks(mdPath, newItems) {
  const absMd = path.join(root, mdPath);
  if (!fs.existsSync(absMd)) {
    console.warn(`[migrate-ai] Markdown not found, skipping: ${mdPath}`);
    return { added: 0 };
  }
  const md = fs.readFileSync(absMd, 'utf8');
  const existing = new Set(
    md.split(/\r?\n/)
      .map((l) => {
        const m = l.match(/\]\((https?:[^)]+)\)/);
        return m ? m[1] : null;
      })
      .filter(Boolean)
  );

  const linesToAdd = [];
  for (const it of newItems) {
    if (!existing.has(it.link)) {
      const line = `- [${it.title}](${it.link})${it.description ? ` - ${it.description}` : ''}`;
      linesToAdd.push(line);
      existing.add(it.link);
    }
  }
  if (linesToAdd.length === 0) return { added: 0 };

  const updated = md.trimEnd() + '\n' + linesToAdd.map((l) => '\n' + l).join('') + '\n';
  fs.writeFileSync(absMd, updated, 'utf8');
  return { added: linesToAdd.length };
}

function main() {
  let total = 0;
  for (const s of sources) {
    const tsContent = readFile(s.ts);
    if (!tsContent) continue;
    const items = extractItems(tsContent);
    if (items.length === 0) continue;
    const { added } = appendUniqueLinks(s.md, items);
    console.log(`🔁 ${path.basename(s.ts)} → ${path.basename(s.md)}: +${added}`);
    total += added;
  }
  console.log(`✅ 迁移完成，追加 ${total} 条链接到 content/ai/*.md`);
}

main();
