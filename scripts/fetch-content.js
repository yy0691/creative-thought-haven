import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import matter from 'gray-matter';
import { exec } from 'child_process';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const execAsync = promisify(exec);

class ContentFetcher {
  constructor() {
    this.contentRepo = 'https://github.com/yy0691/content-repo.git';
    this.tempDir = path.join(__dirname, '../temp-content');
    this.targetDir = path.join(__dirname, '../content');
  }

  async fetchContent() {
    try {
      console.log('开始拉取内容仓库...');
      
      // 清理临时目录
      if (fs.existsSync(this.tempDir)) {
        if (process.platform === 'win32') {
          await execAsync(`rmdir /s /q "${this.tempDir}"`);
        } else {
          await execAsync(`rm -rf ${this.tempDir}`);
        }
      }
      
      // 克隆内容仓库
      console.log('克隆内容仓库...');
      await execAsync(`git clone ${this.contentRepo} ${this.tempDir}`);
      
      // 同步文章内容
      await this.syncArticles();
      
      // 同步配置文件
      await this.syncConfigs();
      
      // 同步静态资源
      await this.syncAssets();
      
      // 生成元数据
      await this.generateMetadata();
      
      console.log('内容同步完成！');
    } catch (error) {
      console.error('内容同步失败:', error);
      // 如果同步失败，尝试使用本地内容
      console.log('尝试使用本地内容...');
      await this.useLocalContent();
    } finally {
      // 清理临时文件
      if (fs.existsSync(this.tempDir)) {
        try {
          if (process.platform === 'win32') {
            await execAsync(`rmdir /s /q "${this.tempDir}"`);
          } else {
            await execAsync(`rm -rf ${this.tempDir}`);
          }
        } catch (cleanupError) {
          console.warn('清理临时文件失败:', cleanupError);
        }
      }
    }
  }

  async useLocalContent() {
    console.log('使用本地内容...');
    
    // 检查本地content目录是否存在
    if (!fs.existsSync(this.targetDir)) {
      console.log('本地content目录不存在，创建空目录');
      fs.mkdirSync(this.targetDir, { recursive: true });
      return;
    }
    
    // 生成元数据
    await this.generateMetadata();
  }

  async syncArticles() {
    const articlesDir = path.join(this.tempDir, 'articles');
    const targetDir = path.join(this.targetDir, 'articles');
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    await this.copyDirectory(articlesDir, targetDir);
    console.log('文章内容同步完成');
  }

  async syncConfigs() {
    const configDir = path.join(this.tempDir, 'config');
    const targetDir = path.join(this.targetDir, 'config');
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    await this.copyDirectory(configDir, targetDir);
    console.log('配置文件同步完成');
  }

  async syncAssets() {
    const assetsDir = path.join(this.tempDir, 'assets');
    const targetDir = path.join(this.targetDir, 'assets');
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    await this.copyDirectory(assetsDir, targetDir);
    console.log('静态资源同步完成');
  }

  async generateMetadata() {
    const articles = [];
    const articlesDir = path.join(this.targetDir, 'articles');
    
    // 遍历所有文章文件
    this.walkArticles(articlesDir, articles);
    
    // 按日期排序
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // 保存文章索引
    fs.writeFileSync(
      path.join(__dirname, '../src/data/articles.json'),
      JSON.stringify(articles, null, 2)
    );
    
    // 同时保存到public目录，供构建后访问
    const publicDataDir = path.join(__dirname, '../public/data');
    if (!fs.existsSync(publicDataDir)) {
      fs.mkdirSync(publicDataDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(publicDataDir, 'articles.json'),
      JSON.stringify(articles, null, 2)
    );
    
    // 生成分类数据
    await this.generateCategoryData(articles);
    
    // 生成标签数据
    await this.generateTagData(articles);
    
    console.log('元数据生成完成');
  }

  walkArticles(dir, articles) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        this.walkArticles(filePath, articles);
      } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const { data, content: markdown } = matter(content);
          
          articles.push({
            ...data,
            content: markdown,
            path: filePath.replace(/.*\/content\//, ''),
            slug: this.generateSlug(data.title || file.replace(/\.(md|mdx)$/, '')),
            category: this.extractCategory(filePath)
          });
        } catch (error) {
          console.warn(`解析文件失败: ${filePath}`, error);
        }
      }
    });
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  extractCategory(filePath) {
    const pathParts = filePath.split('/');
    const articlesIndex = pathParts.indexOf('articles');
    if (articlesIndex !== -1 && pathParts[articlesIndex + 1]) {
      return pathParts[articlesIndex + 1];
    }
    return 'uncategorized';
  }

  async generateCategoryData(articles) {
    const categoriesFile = path.join(this.targetDir, 'config/categories.yaml');
    if (!fs.existsSync(categoriesFile)) {
      console.warn('分类配置文件不存在');
      return;
    }
    
    const categories = yaml.load(fs.readFileSync(categoriesFile, 'utf8'));
    const categoryData = {};
    
    categories.forEach(category => {
      categoryData[category.id] = {
        ...category,
        articles: articles.filter(article => 
          article.category === category.id || 
          article.category === category.name
        )
      };
    });
    
    fs.writeFileSync(
      path.join(__dirname, '../src/data/categories.json'),
      JSON.stringify(categoryData, null, 2)
    );
    
    // 同时保存到public目录
    fs.writeFileSync(
      path.join(publicDataDir, 'categories.json'),
      JSON.stringify(categoryData, null, 2)
    );
  }

  async generateTagData(articles) {
    const tagMap = new Map();
    
    articles.forEach(article => {
      if (article.tags && Array.isArray(article.tags)) {
        article.tags.forEach(tag => {
          if (!tagMap.has(tag)) {
            tagMap.set(tag, []);
          }
          tagMap.get(tag).push(article);
        });
      }
    });
    
    const tagData = Array.from(tagMap.entries()).map(([name, articles]) => ({
      name,
      count: articles.length,
      articles: articles.map(article => ({
        title: article.title,
        slug: article.slug,
        date: article.date
      }))
    }));
    
    fs.writeFileSync(
      path.join(__dirname, '../src/data/tags.json'),
      JSON.stringify(tagData, null, 2)
    );
    
    // 同时保存到public目录
    fs.writeFileSync(
      path.join(publicDataDir, 'tags.json'),
      JSON.stringify(tagData, null, 2)
    );
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

// 执行内容同步
const fetcher = new ContentFetcher();
fetcher.fetchContent().catch(console.error); 