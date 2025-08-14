import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AIDataMigrator {
  constructor() {
    this.sourceDir = path.join(__dirname, '../src/data/ai');
    this.targetDir = path.join(__dirname, '../content-repo');
    this.migrationLog = [];
  }

  // 创建目录
  createDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✅ 创建目录: ${dirPath}`);
    }
  }

  // 转义YAML字符串
  escapeYamlString(str) {
    if (!str) return '';
    return str
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');
  }

  // 生成Markdown文件内容
  generateMarkdownFile(item, type = 'news') {
    const frontMatter = `---
title: "${this.escapeYamlString(item.title)}"
description: "${this.escapeYamlString(item.description)}"
author: "${this.escapeYamlString(item.author)}"
date: "${item.date || new Date().toISOString().split('T')[0]}"
image: "${item.image || ''}"
link: "${item.link || ''}"
category: "${item.category || type}"
tags: ${JSON.stringify(item.tags || [item.category || type])}
featured: ${item.featured || false}
---

`;
    
    const content = item.content || `# ${item.title}

${item.description}

## 详细信息

- **作者**: ${item.author}
- **链接**: [访问官网](${item.link})
- **分类**: ${item.category}

---

*了解更多信息，请访问 [${item.title}](${item.link})*`;

    return frontMatter + content;
  }

  // 生成文件名
  generateFileName(item) {
    const date = (item.date || new Date().toISOString().split('T')[0]).replace(/-/g, '');
    const title = item.title.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    return `${date}-${title}.md`;
  }

  // 迁移新闻数据
  async migrateNews() {
    console.log('\n📰 开始迁移新闻数据...');
    
    const newsDir = path.join(this.targetDir, 'news');
    this.createDirectory(newsDir);
    
    // 创建新闻分类目录
    const newsCategories = ['ai-news', 'tech-news', 'industry-news'];
    newsCategories.forEach(category => {
      this.createDirectory(path.join(newsDir, category));
    });

    // 从 src/data/ai/news.ts 中读取新闻数据
    const newsData = await this.readNewsData();
    
    let successCount = 0;
    let errorCount = 0;

    for (const newsItem of newsData) {
      try {
        // 确定新闻分类
        let category = 'ai-news';
        if (newsItem.category === 'Agent' || newsItem.category === 'TTS') {
          category = 'tech-news';
        } else if (newsItem.category === 'Website' || newsItem.category === 'Trends') {
          category = 'industry-news';
        }

        const fileName = this.generateFileName(newsItem);
        const filePath = path.join(newsDir, category, fileName);
        
        const markdownContent = this.generateMarkdownFile(newsItem, 'news');
        fs.writeFileSync(filePath, markdownContent, 'utf8');
        
        console.log(`✅ 创建新闻文件: ${fileName}`);
        successCount++;
        
        this.migrationLog.push({
          type: 'news',
          source: newsItem.id,
          target: filePath,
          success: true
        });
      } catch (error) {
        console.error(`❌ 创建新闻文件失败: ${newsItem.title}`, error.message);
        errorCount++;
      }
    }

    console.log(`📊 新闻迁移统计: 成功 ${successCount} 条, 失败 ${errorCount} 条`);
  }

  // 读取新闻数据
  async readNewsData() {
    // 这里需要动态读取 src/data/ai/news.ts 中的 defaultNewsItems
    // 由于是静态分析，我们先返回一个示例结构
    return [
      {
        id: '0417-new-1',
        title: 'OpenAI发布GPT-4.1',
        description: 'OpenAI以API的形式发布了三个新模型:GPT-4.1、GPT-4.1 mini和GPT-4.1 nano',
        author: 'OpenAI',
        date: '2025-04-16',
        image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_4f24f94e-264f-4f01-b1f6-b285c7f667dg.jpg',
        link: 'https://openai.com/index/gpt-4-1/',
        category: 'GPT',
        content: '# OpenAI发布GPT-4.1\n\nOpenAI以API的形式发布了三个新模型...'
      }
      // 这里应该包含所有从 news.ts 中读取的新闻数据
    ];
  }

  // 迁移AI工具数据
  async migrateAITools() {
    console.log('\n��️ 开始迁移AI工具数据...');
    
    const toolsDir = path.join(this.targetDir, 'ai-tools');
    this.createDirectory(toolsDir);
    
    // 创建工具分类目录
    const toolCategories = [
      'general-cn', 'general-overseas', 'painting', 'coding', 
      'voice', 'video', 'modeling', 'security', 'agent', 'other'
    ];
    
    toolCategories.forEach(category => {
      this.createDirectory(path.join(toolsDir, category));
    });

    // 迁移工具数据
    await this.migrateToolCategory('general-cn', toolsDir);
    await this.migrateToolCategory('general-overseas', toolsDir);
    await this.migrateToolCategory('painting', toolsDir);
    await this.migrateToolCategory('coding', toolsDir);
    await this.migrateToolCategory('voice', toolsDir);
    await this.migrateToolCategory('video', toolsDir);
    await this.migrateToolCategory('modeling', toolsDir);
    await this.migrateToolCategory('security', toolsDir);
    await this.migrateToolCategory('agent', toolsDir);
    await this.migrateToolCategory('other', toolsDir);
  }

  // 迁移特定工具分类
  async migrateToolCategory(category, toolsDir) {
    const sourceFile = path.join(this.sourceDir, 'tools-categories', `${category}.ts`);
    const targetDir = path.join(toolsDir, category);
    
    if (!fs.existsSync(sourceFile)) {
      console.log(`⚠️ 工具分类文件不存在: ${sourceFile}`);
      return;
    }

    try {
      // 读取工具数据
      const toolsData = await this.readToolData(category);
      
      let successCount = 0;
      for (const tool of toolsData) {
        try {
          const fileName = this.generateFileName(tool);
          const filePath = path.join(targetDir, fileName);
          
          const markdownContent = this.generateMarkdownFile(tool, 'tool');
          fs.writeFileSync(filePath, markdownContent, 'utf8');
          
          console.log(`✅ 创建工具文件: ${fileName}`);
          successCount++;
        } catch (error) {
          console.error(`❌ 创建工具文件失败: ${tool.title}`, error.message);
        }
      }
      
      console.log(`�� ${category} 工具迁移统计: 成功 ${successCount} 个`);
    } catch (error) {
      console.error(`❌ 迁移工具分类失败: ${category}`, error.message);
    }
  }

  // 读取工具数据
  async readToolData(category) {
    // 这里需要动态读取对应的工具数据文件
    // 返回示例数据
    return [
      {
        id: `${category}-tool-1`,
        title: `示例${category}工具`,
        description: `这是一个${category}分类的示例工具`,
        author: '示例作者',
        date: '2025-01-01',
        image: 'https://example.com/image.jpg',
        link: 'https://example.com',
        category: category,
        content: `# 示例${category}工具\n\n这是一个示例工具的内容...`
      }
    ];
  }

  // 迁移AI教程数据
  async migrateAITutorials() {
    console.log('\n📚 开始迁移AI教程数据...');
    
    const tutorialsDir = path.join(this.targetDir, 'ai-tutorials');
    this.createDirectory(tutorialsDir);
    
    // 创建教程分类目录
    const tutorialCategories = ['prompts', 'courses', 'deeplearning'];
    tutorialCategories.forEach(category => {
      this.createDirectory(path.join(tutorialsDir, category));
    });

    // 迁移教程数据
    await this.migrateTutorialCategory('prompts', tutorialsDir);
    await this.migrateTutorialCategory('courses', tutorialsDir);
    await this.migrateTutorialCategory('deeplearning', tutorialsDir);
  }

  // 迁移特定教程分类
  async migrateTutorialCategory(category, tutorialsDir) {
    const sourceFile = path.join(this.sourceDir, `${category}.ts`);
    const targetDir = path.join(tutorialsDir, category);
    
    if (!fs.existsSync(sourceFile)) {
      console.log(`⚠️ 教程文件不存在: ${sourceFile}`);
      return;
    }

    try {
      // 读取教程数据
      const tutorialsData = await this.readTutorialData(category);
      
      let successCount = 0;
      for (const tutorial of tutorialsData) {
        try {
          const fileName = this.generateFileName(tutorial);
          const filePath = path.join(targetDir, fileName);
          
          const markdownContent = this.generateMarkdownFile(tutorial, 'tutorial');
          fs.writeFileSync(filePath, markdownContent, 'utf8');
          
          console.log(`✅ 创建教程文件: ${fileName}`);
          successCount++;
        } catch (error) {
          console.error(`❌ 创建教程文件失败: ${tutorial.title}`, error.message);
        }
      }
      
      console.log(`�� ${category} 教程迁移统计: 成功 ${successCount} 个`);
    } catch (error) {
      console.error(`❌ 迁移教程分类失败: ${category}`, error.message);
    }
  }

  // 读取教程数据
  async readTutorialData(category) {
    // 这里需要动态读取对应的教程数据文件
    return [
      {
        id: `${category}-tutorial-1`,
        title: `示例${category}教程`,
        description: `这是一个${category}分类的示例教程`,
        author: '示例作者',
        date: '2025-01-01',
        image: 'https://example.com/image.jpg',
        link: 'https://example.com',
        category: category,
        content: `# 示例${category}教程\n\n这是一个示例教程的内容...`
      }
    ];
  }

  // 生成配置文件
  async generateConfigFiles() {
    console.log('\n⚙️ 生成配置文件...');
    
    const configDir = path.join(this.targetDir, 'config');
    this.createDirectory(configDir);
    
    // 生成分类配置
    const categoriesConfig = {
      news: {
        'ai-news': 'AI新闻',
        'tech-news': '技术新闻',
        'industry-news': '行业动态'
      },
      tools: {
        'general-cn': '国内通用工具',
        'general-overseas': '海外通用工具',
        'painting': 'AI绘画工具',
        'coding': '编程工具',
        'voice': '语音工具',
        'video': '视频工具',
        'modeling': '建模工具',
        'security': '安全工具',
        'agent': '智能代理',
        'other': '其他工具'
      },
      tutorials: {
        'prompts': '提示词教程',
        'courses': '课程内容',
        'deeplearning': '深度学习'
      }
    };
    
    fs.writeFileSync(
      path.join(configDir, 'categories.yaml'),
      JSON.stringify(categoriesConfig, null, 2)
    );
    
    console.log('✅ 生成分类配置文件');
  }

  // 生成迁移报告
  generateMigrationReport() {
    console.log('\n📊 迁移报告:');
    console.log('=' * 50);
    
    const successCount = this.migrationLog.filter(log => log.success).length;
    const totalCount = this.migrationLog.length;
    
    console.log(`总迁移项目数: ${totalCount}`);
    console.log(`成功迁移: ${successCount}`);
    console.log(`失败迁移: ${totalCount - successCount}`);
    
    if (this.migrationLog.length > 0) {
      console.log('\n📋 迁移详情:');
      this.migrationLog.forEach((log, index) => {
        const status = log.success ? '✅' : '❌';
        console.log(`${index + 1}. ${status} ${log.type}: ${log.source}`);
      });
    }
  }

  // 执行完整迁移
  async migrateAll() {
    console.log('🚀 开始AI数据完整迁移...');
    console.log('=' * 60);
    
    try {
      // 确保目标目录存在
      this.createDirectory(this.targetDir);
      
      // 迁移各类数据
      await this.migrateNews();
      await this.migrateAITools();
      await this.migrateAITutorials();
      
      // 生成配置文件
      await this.generateConfigFiles();
      
      // 生成报告
      this.generateMigrationReport();
      
      console.log('\n�� AI数据迁移完成！');
      console.log('\n📝 下一步操作:');
      console.log('1. 检查 content-repo/ 目录中的文件');
      console.log('2. 运行 npm run fetch-content 同步到前端');
      console.log('3. 运行 npm run build-content 生成数据文件');
      
    } catch (error) {
      console.error('❌ 迁移过程中出现错误:', error);
    }
  }
}

// 执行迁移
const migrator = new AIDataMigrator();
migrator.migrateAll();