import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ContentMigrator {
  constructor() {
    this.sourceDir = path.join(__dirname, '../src/content');
    this.targetDir = path.join(__dirname, '../content-repo');
  }

  async migrateContent() {
    try {
      console.log('开始迁移内容...');
      
      // 迁移网络安全文章
      await this.migrateCybersecurityArticles();
      
      // 迁移AI教程
      await this.migrateAITutorials();
      
      // 迁移Windows教程
      await this.migrateWindowsTutorials();
      
      // 迁移软件工具
      await this.migrateSoftwareTools();
      
      // 迁移自动化办公
      await this.migrateAutomationOffice();
      
      // 迁移项目数据
      await this.migrateProjects();
      
      // 迁移设计数据
      await this.migrateDesigns();
      
      // 迁移视频数据
      await this.migrateVideos();
      
      console.log('内容迁移完成！');
    } catch (error) {
      console.error('内容迁移失败:', error);
      throw error;
    }
  }

  async migrateCybersecurityArticles() {
    const sourceDir = path.join(this.sourceDir, '网络安全');
    const targetDir = path.join(this.targetDir, 'articles/网络安全');
    
    if (!fs.existsSync(sourceDir)) {
      console.log('网络安全目录不存在，跳过迁移');
      return;
    }
    
    // 创建目标目录
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // 复制所有.mdx文件
    const files = fs.readdirSync(sourceDir);
    let articleCount = 0;
    
    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);
        
        // 读取并处理文件内容
        const content = fs.readFileSync(sourcePath, 'utf8');
        const { data, content: markdown } = matter(content);
        
        // 生成新的front matter
        const newFrontMatter = this.generateFrontMatter(data, file, '网络安全');
        
        // 写入新文件
        const newContent = `---\n${newFrontMatter}\n---\n\n${markdown}`;
        fs.writeFileSync(targetPath, newContent);
        
        articleCount++;
      }
    }
    
    console.log(`迁移了 ${articleCount} 篇网络安全文章`);
  }

  async migrateAITutorials() {
    const sourceDir = path.join(this.sourceDir, 'AI教程');
    const targetDir = path.join(this.targetDir, 'articles/AI教程');
    
    if (!fs.existsSync(sourceDir)) {
      console.log('AI教程目录不存在，跳过迁移');
      return;
    }
    
    // 创建目标目录
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // 复制大模型目录
    const llmSourceDir = path.join(sourceDir, '大模型');
    const llmTargetDir = path.join(targetDir, '大模型');
    
    if (fs.existsSync(llmSourceDir)) {
      if (!fs.existsSync(llmTargetDir)) {
        fs.mkdirSync(llmTargetDir, { recursive: true });
      }
      await this.copyDirectory(llmSourceDir, llmTargetDir);
    }
    
    // 复制AI绘画目录
    const paintingSourceDir = path.join(sourceDir, 'AI绘画');
    const paintingTargetDir = path.join(targetDir, 'AI绘画');
    
    if (fs.existsSync(paintingSourceDir)) {
      if (!fs.existsSync(paintingTargetDir)) {
        fs.mkdirSync(paintingTargetDir, { recursive: true });
      }
      await this.copyDirectory(paintingSourceDir, paintingTargetDir);
    }
    
    console.log('AI教程迁移完成');
  }

  async migrateWindowsTutorials() {
    const sourceDir = path.join(this.sourceDir, 'WINDOWS_USE_Sub');
    const targetDir = path.join(this.targetDir, 'articles/Windows教程');
    
    if (!fs.existsSync(sourceDir)) {
      console.log('Windows教程目录不存在，跳过迁移');
      return;
    }
    
    // 创建目标目录
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    await this.copyDirectory(sourceDir, targetDir);
    console.log('Windows教程迁移完成');
  }

  async migrateSoftwareTools() {
    const sourceDir = path.join(this.sourceDir, '软件工具');
    const targetDir = path.join(this.targetDir, 'articles/软件工具');
    
    if (!fs.existsSync(sourceDir)) {
      console.log('软件工具目录不存在，跳过迁移');
      return;
    }
    
    // 创建目标目录
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    await this.copyDirectory(sourceDir, targetDir);
    console.log('软件工具迁移完成');
  }

  async migrateAutomationOffice() {
    const sourceDir = path.join(this.sourceDir, '自动化办公技巧');
    const targetDir = path.join(this.targetDir, 'articles/自动化办公');
    
    if (!fs.existsSync(sourceDir)) {
      console.log('自动化办公目录不存在，跳过迁移');
      return;
    }
    
    // 创建目标目录
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    await this.copyDirectory(sourceDir, targetDir);
    console.log('自动化办公迁移完成');
  }

  async migrateProjects() {
    const sourceFile = path.join(this.sourceDir, 'projects.ts');
    const targetFile = path.join(this.targetDir, 'projects/projects.yaml');
    
    if (!fs.existsSync(sourceFile)) {
      console.log('项目数据文件不存在，跳过迁移');
      return;
    }
    
    // 创建目标目录
    const targetDir = path.dirname(targetFile);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // 读取TypeScript文件并转换为YAML
    const content = fs.readFileSync(sourceFile, 'utf8');
    const yamlContent = this.convertProjectsToYaml(content);
    
    fs.writeFileSync(targetFile, yamlContent);
    console.log('项目数据迁移完成');
  }

  async migrateDesigns() {
    const sourceFile = path.join(this.sourceDir, 'designs.ts');
    const targetFile = path.join(this.targetDir, 'designs/designs.yaml');
    
    if (!fs.existsSync(sourceFile)) {
      console.log('设计数据文件不存在，跳过迁移');
      return;
    }
    
    // 创建目标目录
    const targetDir = path.dirname(targetFile);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // 读取TypeScript文件并转换为YAML
    const content = fs.readFileSync(sourceFile, 'utf8');
    const yamlContent = this.convertDesignsToYaml(content);
    
    fs.writeFileSync(targetFile, yamlContent);
    console.log('设计数据迁移完成');
  }

  async migrateVideos() {
    const sourceFile = path.join(this.sourceDir, 'videos.ts');
    const targetFile = path.join(this.targetDir, 'videos/videos.yaml');
    
    if (!fs.existsSync(sourceFile)) {
      console.log('视频数据文件不存在，跳过迁移');
      return;
    }
    
    // 创建目标目录
    const targetDir = path.dirname(targetFile);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // 读取TypeScript文件并转换为YAML
    const content = fs.readFileSync(sourceFile, 'utf8');
    const yamlContent = this.convertVideosToYaml(content);
    
    fs.writeFileSync(targetFile, yamlContent);
    console.log('视频数据迁移完成');
  }

  generateFrontMatter(data, filename, category) {
    const title = data.title || filename.replace(/\.mdx$/, '');
    const date = data.date || this.extractDateFromFilename(filename);
    const author = data.author || '作者';
    const tags = data.tags || [category];
    const excerpt = data.excerpt || data.description || '';
    
    return `title: "${title}"
date: "${date}"
author: "${author}"
category: "${category}"
tags: ${JSON.stringify(tags)}
excerpt: "${excerpt}"
toc: ${data.toc !== false}
draft: ${data.draft || false}
featured: ${data.featured || false}`;
  }

  extractDateFromFilename(filename) {
    // 尝试从文件名中提取日期
    const dateMatch = filename.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (dateMatch) {
      return `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
    }
    return new Date().toISOString().split('T')[0];
  }

  convertProjectsToYaml(content) {
    // 简单的转换逻辑，实际项目中可能需要更复杂的解析
    return `# 项目数据
# 从 ${content.substring(0, 100)}... 转换而来
projects:
  - title: "示例项目"
    description: "项目描述"
    technologies: ["技术栈"]
    githubUrl: "https://github.com/example"
    demoUrl: "https://demo.example.com"
    publishDate: "2024-01-01"
    category: "项目分类"
    isRecommended: true
    isHighlight: false
    coverImage: "封面图片路径"`;
  }

  convertDesignsToYaml(content) {
    return `# 设计数据
# 从 ${content.substring(0, 100)}... 转换而来
designs:
  - title: "示例设计"
    description: "设计描述"
    category: "设计分类"
    publishDate: "2024-01-01"
    coverImage: "封面图片路径"`;
  }

  convertVideosToYaml(content) {
    return `# 视频数据
# 从 ${content.substring(0, 100)}... 转换而来
videos:
  - title: "示例视频"
    description: "视频描述"
    category: "视频分类"
    publishDate: "2024-01-01"
    videoUrl: "视频链接"
    coverImage: "封面图片路径"`;
  }

  async copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const files = fs.readdirSync(src);
    for (const file of files) {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      
      const stat = fs.statSync(srcPath);
      if (stat.isDirectory()) {
        await this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

// 执行迁移
const migrator = new ContentMigrator();
migrator.migrateContent().catch(console.error); 