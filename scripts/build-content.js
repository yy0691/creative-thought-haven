import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ContentBuilder {
  constructor() {
    this.contentDir = path.join(__dirname, '../content');
    this.dataDir = path.join(__dirname, '../src/data');
    this.publicDataDir = path.join(__dirname, '../public/data');
  }

  async buildContent() {
    try {
      console.log('开始构建内容...');
      
      // 确保数据目录存在
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }
      
      // 确保public数据目录存在
      if (!fs.existsSync(this.publicDataDir)) {
        fs.mkdirSync(this.publicDataDir, { recursive: true });
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
      
      // 生成项目数据
      await this.generateProjectData();
      
      // 生成设计数据
      await this.generateDesignData();
      
      // 生成视频数据
      await this.generateVideoData();
      
      // 生成新闻数据
      await this.generateNewsData();
      
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
    
    // 同时保存到public目录
    fs.writeFileSync(
      path.join(this.publicDataDir, 'categories.json'),
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
    
    // 同时保存到public目录
    fs.writeFileSync(
      path.join(this.publicDataDir, 'tags.json'),
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
    
    // 同时保存到public目录
    fs.writeFileSync(
      path.join(this.publicDataDir, 'search-index.json'),
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
    
    // 同时保存到public目录
    fs.writeFileSync(
      path.join(this.publicDataDir, 'sitemap.json'),
      JSON.stringify(sitemap, null, 2)
    );
  }

  async generateProjectData() {
    const projectsFile = path.join(this.contentDir, 'projects/projects.yaml');
    if (!fs.existsSync(projectsFile)) {
      console.warn('项目配置文件不存在');
      return;
    }
    
    try {
      const projectsData = yaml.load(fs.readFileSync(projectsFile, 'utf8'));
      const projects = projectsData.projects || [];
      
      // 保存到src/data目录
      fs.writeFileSync(
        path.join(this.dataDir, 'projects.json'),
        JSON.stringify(projects, null, 2)
      );
      
      // 保存到public目录
      fs.writeFileSync(
        path.join(this.publicDataDir, 'projects.json'),
        JSON.stringify(projects, null, 2)
      );
      
      console.log(`生成了 ${projects.length} 个项目数据`);
    } catch (error) {
      console.error('生成项目数据失败:', error);
    }
  }

  async generateDesignData() {
    const designsFile = path.join(this.contentDir, 'designs/designs.yaml');
    if (!fs.existsSync(designsFile)) {
      console.warn('设计配置文件不存在');
      return;
    }
    
    try {
      const designsData = yaml.load(fs.readFileSync(designsFile, 'utf8'));
      const designs = designsData.designs || [];
      
      // 保存到src/data目录
      fs.writeFileSync(
        path.join(this.dataDir, 'designs.json'),
        JSON.stringify(designs, null, 2)
      );
      
      // 保存到public目录
      fs.writeFileSync(
        path.join(this.publicDataDir, 'designs.json'),
        JSON.stringify(designs, null, 2)
      );
      
      console.log(`生成了 ${designs.length} 个设计数据`);
    } catch (error) {
      console.error('生成设计数据失败:', error);
    }
  }

  async generateVideoData() {
    const videosFile = path.join(this.contentDir, 'videos/videos.yaml');
    if (!fs.existsSync(videosFile)) {
      console.warn('视频配置文件不存在');
      return;
    }
    
    try {
      const videosData = yaml.load(fs.readFileSync(videosFile, 'utf8'));
      const videos = videosData.videos || [];
      
      // 保存到src/data目录
      fs.writeFileSync(
        path.join(this.dataDir, 'videos.json'),
        JSON.stringify(videos, null, 2)
      );
      
      // 保存到public目录
      fs.writeFileSync(
        path.join(this.publicDataDir, 'videos.json'),
        JSON.stringify(videos, null, 2)
      );
      
      console.log(`生成了 ${videos.length} 个视频数据`);
    } catch (error) {
      console.error('生成视频数据失败:', error);
    }
  }

  async generateNewsData() {
    const newsDir = path.join(this.contentDir, 'news');
    if (!fs.existsSync(newsDir)) {
      console.warn('新闻目录不存在');
      return;
    }
    
    try {
      const news = [];
      this.walkNews(newsDir, news);
      
      // 保存到src/data目录
      fs.writeFileSync(
        path.join(this.dataDir, 'news.json'),
        JSON.stringify(news, null, 2)
      );
      
      // 保存到public目录
      fs.writeFileSync(
        path.join(this.publicDataDir, 'news.json'),
        JSON.stringify(news, null, 2)
      );
      
      console.log(`生成了 ${news.length} 条新闻数据`);
    } catch (error) {
      console.error('生成新闻数据失败:', error);
    }
  }

  walkNews(dir, news) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        this.walkNews(filePath, news);
      } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const { data, content: markdown } = matter(content);
          
          news.push({
            ...data,
            content: markdown,
            path: filePath.replace(/.*\/content\//, ''),
            slug: this.generateSlug(data.title || file.replace(/\.(md|mdx)$/, '')),
            category: this.extractCategory(filePath)
          });
        } catch (error) {
          console.warn(`解析新闻文件失败: ${filePath}`, error);
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
    const newsIndex = pathParts.indexOf('news');
    if (newsIndex !== -1 && pathParts[newsIndex + 1]) {
      return pathParts[newsIndex + 1];
    }
    return 'uncategorized';
  }
}

// 执行内容构建
const builder = new ContentBuilder();
builder.buildContent().catch(console.error); 