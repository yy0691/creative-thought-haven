// scripts/build-designs.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const designsDir = path.join(process.cwd(), 'content/designs');
const outputFile = path.join(process.cwd(), 'src/data/designs/generated-designs.json');

function buildDesigns() {
  if (!fs.existsSync(designsDir)) {
    console.warn(`⚠️ 目录不存在: ${designsDir}，跳过构建 designs`);
    return;
  }

  const items = [];
  const files = fs.readdirSync(designsDir);

  files.forEach(file => {
    if (file.endsWith('.md') || file.endsWith('.mdx')) {
      const filePath = path.join(designsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      items.push({
        id: file.replace(/\.(md|mdx)$/, ''),
        title: data.title,
        description: data.description,
        category: data.category || '未分类',
        publishDate: data.publishDate,
        coverImage: data.coverImage,
        content
      });
    }
  });

  // 按发布日期排序（新到旧）
  items.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  // 确保输出目录存在
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(items, null, 2));
  console.log(`✅ 生成了 ${items.length} 个设计数据 → ${outputFile}`);
}

buildDesigns();
