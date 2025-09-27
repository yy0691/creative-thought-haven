# 新闻配置文件示例 (config/news.yaml)

## 新闻分类配置

```yaml
news_categories:
  - id: "ai-news"
    name: "AI新闻"
    description: "人工智能相关新闻"
    icon: "🤖"
    color: "#3B82F6"
    subcategories:
      - id: "llm"
        name: "大语言模型"
        description: "大语言模型相关新闻"
      - id: "ai-tools"
        name: "AI工具"
        description: "AI工具和平台新闻"
      - id: "ai-research"
        name: "AI研究"
        description: "AI研究和技术突破"
      - id: "ai-business"
        name: "AI商业"
        description: "AI商业应用和投资"
  
  - id: "tech-news"
    name: "技术新闻"
    description: "技术发展趋势新闻"
    icon: "💻"
    color: "#10B981"
    subcategories:
      - id: "software"
        name: "软件开发"
        description: "软件开发相关新闻"
      - id: "cloud"
        name: "云计算"
        description: "云计算和基础设施"
      - id: "mobile"
        name: "移动开发"
        description: "移动应用开发"
      - id: "web"
        name: "Web技术"
        description: "Web开发和前端技术"
  
  - id: "industry-news"
    name: "行业动态"
    description: "行业发展趋势动态"
    icon: "📈"
    color: "#F59E0B"
    subcategories:
      - id: "startup"
        name: "创业公司"
        description: "创业公司动态"
      - id: "investment"
        name: "投资融资"
        description: "投资和融资新闻"
      - id: "market"
        name: "市场分析"
        description: "市场趋势分析"
      - id: "policy"
        name: "政策法规"
        description: "行业政策法规"

# 新闻来源配置
news_sources:
  - id: "openai"
    name: "OpenAI"
    url: "https://openai.com"
    logo: "/assets/images/news/sources/openai.png"
    category: "ai-news"
    reliability: "high"
  
  - id: "google"
    name: "Google"
    url: "https://ai.google"
    logo: "/assets/images/news/sources/google.png"
    category: "ai-news"
    reliability: "high"
  
  - id: "anthropic"
    name: "Anthropic"
    url: "https://anthropic.com"
    logo: "/assets/images/news/sources/anthropic.png"
    category: "ai-news"
    reliability: "high"
  
  - id: "techcrunch"
    name: "TechCrunch"
    url: "https://techcrunch.com"
    logo: "/assets/images/news/sources/techcrunch.png"
    category: "tech-news"
    reliability: "high"
  
  - id: "venturebeat"
    name: "VentureBeat"
    url: "https://venturebeat.com"
    logo: "/assets/images/news/sources/venturebeat.png"
    category: "industry-news"
    reliability: "high"

# 新闻标签配置
news_tags:
  - name: "GPT"
    count: 25
    description: "GPT相关新闻"
    color: "#3B82F6"
  
  - name: "Gemini"
    count: 15
    description: "Google Gemini相关新闻"
    color: "#10B981"
  
  - name: "Claude"
    count: 12
    description: "Claude相关新闻"
    color: "#8B5CF6"
  
  - name: "LLM"
    count: 30
    description: "大语言模型相关新闻"
    color: "#F59E0B"
  
  - name: "AI工具"
    count: 20
    description: "AI工具相关新闻"
    color: "#EF4444"
  
  - name: "投资"
    count: 18
    description: "投资融资相关新闻"
    color: "#06B6D4"
  
  - name: "创业"
    count: 22
    description: "创业公司相关新闻"
    color: "#84CC16"

# 新闻展示配置
news_display:
  # 首页新闻展示
  homepage:
    max_items: 6
    categories: ["ai-news", "tech-news"]
    featured: true
    breaking: true
  
  # AI页面新闻展示
  ai_page:
    max_items: 12
    categories: ["ai-news"]
    featured: true
    breaking: true
  
  # 新闻列表页
  news_list:
    items_per_page: 20
    sort_by: "date"
    sort_order: "desc"
  
  # 新闻详情页
  news_detail:
    show_related: true
    related_count: 5
    show_comments: false
    show_share: true

# 新闻更新配置
news_update:
  # 自动更新间隔（分钟）
  auto_update_interval: 60
  
  # 手动更新
  manual_update: true
  
  # 更新源
  sources:
    - type: "rss"
      url: "https://openai.com/blog/rss.xml"
      category: "ai-news"
    - type: "api"
      url: "https://api.newsapi.org/v2/top-headlines"
      category: "tech-news"
    - type: "scraper"
      url: "https://techcrunch.com/tag/artificial-intelligence/"
      category: "ai-news"

# 新闻缓存配置
news_cache:
  # 缓存时间（小时）
  cache_duration: 24
  
  # 缓存策略
  strategy: "lazy"
  
  # 缓存清理
  cleanup_interval: 168  # 7天

# 新闻SEO配置
news_seo:
  # 默认标题模板
  title_template: "{title} - AI新闻资讯"
  
  # 默认描述模板
  description_template: "{description}"
  
  # 默认关键词
  default_keywords: ["AI", "人工智能", "科技新闻", "技术趋势"]
  
  # 结构化数据
  structured_data: true
  
  # Open Graph
  open_graph: true
  
  # Twitter Cards
  twitter_cards: true
```

## 新闻文件命名规范

### 1. 新闻文件命名
```
格式：YYYY-MM-DD-新闻标题.md
示例：
- 2024-04-17-OpenAI发布GPT-4.1.md
- 2024-04-15-Google-Gemini摄像头体验.md
- 2024-04-12-ChatGPT记忆功能升级.md
```

### 2. 新闻Front Matter规范
```yaml
---
title: "OpenAI发布GPT-4.1"
description: "OpenAI以API的形式发布了三个新模型:GPT-4.1、GPT-4.1 mini和GPT-4.1 nano"
author: "OpenAI"
date: "2024-04-17"
category: "AI新闻"
subcategory: "大语言模型"
tags: ["AI", "GPT", "OpenAI", "大模型"]
image: "/assets/images/news/ai/gpt4.1.jpg"
link: "https://openai.com/index/gpt-4-1/"
source: "OpenAI"
source_url: "https://openai.com"
featured: true
breaking: false
priority: "high"
content: |
  # OpenAI发布GPT-4.1
  
  OpenAI以API的形式发布了三个新模型:GPT-4.1、GPT-4.1 mini和GPT-4.1 nano...
---
```

### 3. 新闻内容结构
```markdown
# 新闻标题

## 新闻摘要
简要描述新闻的主要内容

## 详细内容
新闻的详细内容，可以包含：
- 背景介绍
- 技术细节
- 影响分析
- 相关链接

## 相关新闻
- [相关新闻1](链接)
- [相关新闻2](链接)

## 参考资料
- [官方公告](链接)
- [技术文档](链接)
```

## 新闻自动化脚本示例

### 1. 新闻同步脚本
```javascript
// scripts/sync-news.js
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('gray-matter');

class NewsSyncer {
  constructor() {
    this.newsDir = path.join(__dirname, '../content/news');
    this.configFile = path.join(__dirname, '../content/config/news.yaml');
  }

  async syncNews() {
    try {
      console.log('开始同步新闻...');
      
      // 读取新闻配置
      const config = yaml.load(fs.readFileSync(this.configFile, 'utf8'));
      
      // 同步RSS源
      await this.syncRSSSources(config.news_update.sources);
      
      // 同步API源
      await this.syncAPISources(config.news_update.sources);
      
      // 生成新闻索引
      await this.generateNewsIndex();
      
      console.log('新闻同步完成！');
    } catch (error) {
      console.error('新闻同步失败:', error);
      throw error;
    }
  }

  async syncRSSSources(sources) {
    const rssSources = sources.filter(s => s.type === 'rss');
    
    for (const source of rssSources) {
      try {
        console.log(`同步RSS源: ${source.url}`);
        // 实现RSS解析和同步逻辑
        await this.parseRSSFeed(source);
      } catch (error) {
        console.error(`RSS源同步失败: ${source.url}`, error);
      }
    }
  }

  async syncAPISources(sources) {
    const apiSources = sources.filter(s => s.type === 'api');
    
    for (const source of apiSources) {
      try {
        console.log(`同步API源: ${source.url}`);
        // 实现API调用和同步逻辑
        await this.fetchAPINews(source);
      } catch (error) {
        console.error(`API源同步失败: ${source.url}`, error);
      }
    }
  }

  async generateNewsIndex() {
    const news = [];
    const newsDir = path.join(this.newsDir, 'AI新闻');
    
    if (fs.existsSync(newsDir)) {
      const files = fs.readdirSync(newsDir);
      
      for (const file of files) {
        if (file.endsWith('.md')) {
          const filePath = path.join(newsDir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const { data } = matter(content);
          
          news.push({
            ...data,
            slug: this.generateSlug(data.title),
            path: `news/AI新闻/${file}`
          });
        }
      }
    }
    
    // 按日期排序
    news.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // 保存新闻索引
    fs.writeFileSync(
      path.join(__dirname, '../src/data/news.json'),
      JSON.stringify(news, null, 2)
    );
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
}

module.exports = NewsSyncer;
```

### 2. 新闻构建脚本
```javascript
// scripts/build-news.js
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class NewsBuilder {
  constructor() {
    this.newsDir = path.join(__dirname, '../content/news');
    this.configFile = path.join(__dirname, '../content/config/news.yaml');
    this.dataDir = path.join(__dirname, '../src/data');
  }

  async buildNews() {
    try {
      console.log('开始构建新闻...');
      
      // 读取新闻配置
      const config = yaml.load(fs.readFileSync(this.configFile, 'utf8'));
      
      // 生成分类数据
      await this.generateCategoryData(config.news_categories);
      
      // 生成标签数据
      await this.generateTagData(config.news_tags);
      
      // 生成来源数据
      await this.generateSourceData(config.news_sources);
      
      // 生成搜索索引
      await this.generateSearchIndex();
      
      console.log('新闻构建完成！');
    } catch (error) {
      console.error('新闻构建失败:', error);
      throw error;
    }
  }

  async generateCategoryData(categories) {
    const categoryData = {};
    
    for (const category of categories) {
      const categoryNews = await this.getNewsByCategory(category.id);
      
      categoryData[category.id] = {
        ...category,
        news: categoryNews
      };
    }
    
    fs.writeFileSync(
      path.join(this.dataDir, 'news-categories.json'),
      JSON.stringify(categoryData, null, 2)
    );
  }

  async generateTagData(tags) {
    const tagData = [];
    
    for (const tag of tags) {
      const tagNews = await this.getNewsByTag(tag.name);
      
      tagData.push({
        ...tag,
        news: tagNews
      });
    }
    
    fs.writeFileSync(
      path.join(this.dataDir, 'news-tags.json'),
      JSON.stringify(tagData, null, 2)
    );
  }

  async generateSourceData(sources) {
    const sourceData = {};
    
    for (const source of sources) {
      const sourceNews = await this.getNewsBySource(source.id);
      
      sourceData[source.id] = {
        ...source,
        news: sourceNews
      };
    }
    
    fs.writeFileSync(
      path.join(this.dataDir, 'news-sources.json'),
      JSON.stringify(sourceData, null, 2)
    );
  }

  async generateSearchIndex() {
    const newsFile = path.join(this.dataDir, 'news.json');
    
    if (fs.existsSync(newsFile)) {
      const news = JSON.parse(fs.readFileSync(newsFile, 'utf8'));
      
      const searchIndex = news.map(item => ({
        title: item.title,
        description: item.description,
        content: item.content,
        tags: item.tags || [],
        category: item.category,
        author: item.author,
        date: item.date,
        slug: item.slug
      }));
      
      fs.writeFileSync(
        path.join(this.dataDir, 'news-search-index.json'),
        JSON.stringify(searchIndex, null, 2)
      );
    }
  }

  async getNewsByCategory(categoryId) {
    // 实现按分类获取新闻的逻辑
    return [];
  }

  async getNewsByTag(tagName) {
    // 实现按标签获取新闻的逻辑
    return [];
  }

  async getNewsBySource(sourceId) {
    // 实现按来源获取新闻的逻辑
    return [];
  }
}

module.exports = NewsBuilder;
```

## 新闻页面组件示例

### 1. 新闻列表页面
```typescript
// src/pages/News.tsx
import React, { useState, useEffect } from 'react';
import { useNews } from '../hooks/useNews';
import { NewsCard } from '../components/NewsCard';
import { NewsFilter } from '../components/NewsFilter';

const News = () => {
  const { news, categories, tags, loading, error } = useNews();
  const [filteredNews, setFilteredNews] = useState(news);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    let filtered = news;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    if (selectedTags.length > 0) {
      filtered = filtered.filter(item => 
        item.tags.some(tag => selectedTags.includes(tag))
      );
    }
    
    setFilteredNews(filtered);
  }, [news, selectedCategory, selectedTags]);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>加载失败: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">新闻资讯</h1>
      
      <NewsFilter
        categories={categories}
        tags={tags}
        selectedCategory={selectedCategory}
        selectedTags={selectedTags}
        onCategoryChange={setSelectedCategory}
        onTagsChange={setSelectedTags}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map(news => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default News;
```

### 2. 新闻详情页面
```typescript
// src/pages/NewsDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNews } from '../hooks/useNews';
import { MDXContent } from '../components/MDXContent';

const NewsDetail = () => {
  const { slug } = useParams();
  const { getNewsBySlug, getRelatedNews } = useNews();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await getNewsBySlug(slug);
        setNews(newsData);
        
        const related = await getRelatedNews(newsData);
        setRelatedNews(related);
      } catch (error) {
        console.error('加载新闻失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [slug]);

  if (loading) return <div>加载中...</div>;
  if (!news) return <div>新闻未找到</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
              {news.category}
            </span>
            <span className="text-sm text-gray-500">{news.date}</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
          
          <p className="text-lg text-gray-600 mb-4">{news.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>作者: {news.author}</span>
            <span>来源: {news.source}</span>
          </div>
        </header>
        
        {news.image && (
          <img 
            src={news.image} 
            alt={news.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
        )}
        
        <div className="prose prose-lg max-w-none">
          <MDXContent content={news.content} />
        </div>
        
        {news.link && (
          <div className="mt-8 text-center">
            <a 
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              阅读原文
            </a>
          </div>
        )}
      </article>
      
      {relatedNews.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">相关新闻</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedNews.map(news => (
              <NewsCard key={news.id} news={news} compact />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default NewsDetail;
```

这个新闻配置文件示例提供了完整的新闻管理系统配置，包括分类、标签、来源、展示配置等，可以帮助你更好地管理新闻内容。 