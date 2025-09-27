// scripts/build-projects.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDir = path.join(process.cwd(), 'content/projects');
const outputFile = path.join(process.cwd(), 'src/data/projects/generated-projects.json');

function buildProjects() {
  if (!fs.existsSync(projectsDir)) {
    console.warn(`⚠️ 目录不存在: ${projectsDir}，跳过构建 projects`);
    return;
  }

  const projectItems = [];
  const files = fs.readdirSync(projectsDir);

  files.forEach(file => {
    if (file.endsWith('.md') || file.endsWith('.mdx')) {
      const filePath = path.join(projectsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      projectItems.push({
        id: file.replace(/\.(md|mdx)$/, ''),
        title: data.title,
        description: data.description,
        technologies: data.technologies || [],
        githubUrl: data.githubUrl,
        demoUrl: data.demoUrl,
        publishDate: data.publishDate,
        category: data.category || '未分类',
        isRecommended: Boolean(data.isRecommended),
        isHighlight: Boolean(data.isHighlight),
        coverImage: data.coverImage,
        content
      });
    }
  });

  // 按发布日期排序（新到旧）
  projectItems.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  // 确保输出目录存在
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(projectItems, null, 2));
  console.log(`✅ 生成了 ${projectItems.length} 个项目数据 → ${outputFile}`);
}

buildProjects();
