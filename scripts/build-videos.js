// scripts/build-videos.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const videosDir = path.join(process.cwd(), 'content/videos');
const outputFile = path.join(process.cwd(), 'src/data/videos/generated-videos.json');

function buildVideos() {
  if (!fs.existsSync(videosDir)) {
    console.warn(`⚠️ 目录不存在: ${videosDir}，跳过构建 videos`);
    return;
  }

  const items = [];
  const files = fs.readdirSync(videosDir);

  files.forEach(file => {
    if (file.endsWith('.md') || file.endsWith('.mdx')) {
      const filePath = path.join(videosDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      items.push({
        id: file.replace(/\.(md|mdx)$/, ''),
        title: data.title,
        description: data.description,
        category: data.category || '未分类',
        publishDate: data.publishDate,
        videoUrl: data.videoUrl,
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
  console.log(`✅ 生成了 ${items.length} 个视频数据 → ${outputFile}`);
}

buildVideos();
