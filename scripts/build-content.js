import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ContentBuilder {
  constructor() {
    this.contentDir = path.join(__dirname, '../content-repo');
    this.dataDir = path.join(__dirname, '../src/data');
  }

  async buildContent() {
    try {
      console.log('开始构建内容...');
      
      // 确保数据目录存在
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }
      
      // 读取文章数据
      const articles = this.loadArticles();
      
      // 生成分类数据
      await this.generateCategoryPages(articles);
      
      // 生成标签数据
      await this.generateTagPages(articles);
      
      // 生成搜索索引
      await this.generateSearchIndex(articles);
      
      // 生成站点地图
      await this.generateSitemap(articles);
      
      console.log('内容构建完成！');
    } catch (error) {
      console.error('内容构建失败:', error);
      throw error;
    }
  }

  loadArticles() {
    const articlesFile = path.join(this.dataDir, 'articles.json');
    if (fs.existsSync(articlesFile)) {
      return JSON.parse(fs.readFileSync(articlesFile, 'utf8'));
    }
    return [];
  }

  async generateCategoryPages(articles) {
    const categoriesFile = path.join(this.contentDir, 'config/categories.yaml');
    if (!fs.existsSync(categoriesFile)) {
      console.warn('分类配置文件不存在');
      return;
    }
    
    const categoriesData = yaml.load(fs.readFileSync(categoriesFile, 'utf8'));
    const categories = categoriesData.categories || [];
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
      path.join(this.dataDir, 'categories.json'),
      JSON.stringify(categoryData, null, 2)
    );
  }

  async generateTagPages(articles) {
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
        date: article.date,
        excerpt: article.excerpt
      }))
    }));
    
    fs.writeFileSync(
      path.join(this.dataDir, 'tags.json'),
      JSON.stringify(tagData, null, 2)
    );
  }

  async generateSearchIndex(articles) {
    const searchIndex = articles.map(article => ({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      tags: article.tags || [],
      category: article.category,
      slug: article.slug,
      date: article.date
    }));
    
    fs.writeFileSync(
      path.join(this.dataDir, 'search-index.json'),
      JSON.stringify(searchIndex, null, 2)
    );
  }

  async generateSitemap(articles) {
    const baseUrl = 'https://yourdomain.com'; // 需要替换为实际域名
    const sitemap = [
      { url: baseUrl, lastmod: new Date().toISOString() },
      { url: `${baseUrl}/blog`, lastmod: new Date().toISOString() },
      { url: `${baseUrl}/portfolio`, lastmod: new Date().toISOString() },
      { url: `${baseUrl}/about`, lastmod: new Date().toISOString() }
    ];
    
    // 添加文章页面
    articles.forEach(article => {
      sitemap.push({
        url: `${baseUrl}/blog/${article.slug}`,
        lastmod: article.date
      });
    });
    
    fs.writeFileSync(
      path.join(this.dataDir, 'sitemap.json'),
      JSON.stringify(sitemap, null, 2)
    );
  }
}

// 执行内容构建
const builder = new ContentBuilder();
builder.buildContent().catch(console.error); 