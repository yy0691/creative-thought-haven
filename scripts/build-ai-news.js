// scripts/build-ai-news.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

class AINewsBuilder {
  constructor() {
    this.newsDir = path.join(process.cwd(), 'content/news/ai-news');
    this.outputFile = path.join(process.cwd(), 'src/data/ai/generated-news.json');
  }

  buildNews() {
    const newsItems = [];
    const files = fs.readdirSync(this.newsDir);
    
    files.forEach(file => {
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const filePath = path.join(this.newsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        
        newsItems.push({
          id: this.generateId(file),
          title: data.title,
          description: data.description,
          author: data.author,
          date: data.date,
          image: data.image,
          link: data.link,
          category: data.category || data.tags?.[0] || 'AI新闻',
          tags: data.tags || [],
          featured: data.featured || false,
          content: content
        });
      }
    });

    // 按日期排序
    newsItems.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    fs.writeFileSync(this.outputFile, JSON.stringify(newsItems, null, 2));
    console.log(`生成了 ${newsItems.length} 条AI新闻`);
  }

  generateId(filename) {
    return filename.replace(/\.(md|mdx)$/, '').toLowerCase();
  }
}

new AINewsBuilder().buildNews();
