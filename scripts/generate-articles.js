import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ArticleGenerator {
  constructor() {
    this.contentDir = path.join(__dirname, '../content-repo');
    this.dataDir = path.join(__dirname, '../src/data');
  }

  async generateArticles() {
    try {
      console.log('开始生成文章数据...');
      
      // 确保数据目录存在
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }
      
      const articles = [];
      const articlesDir = path.join(this.contentDir, 'articles');
      
      // 遍历所有文章文件
      this.walkArticles(articlesDir, articles);
      
      // 按日期排序
      articles.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      // 保存文章索引
      fs.writeFileSync(
        path.join(this.dataDir, 'articles.json'),
        JSON.stringify(articles, null, 2)
      );
      
      console.log(`生成了 ${articles.length} 篇文章的数据`);
    } catch (error) {
      console.error('文章数据生成失败:', error);
      throw error;
    }
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
            path: filePath.replace(/.*\/content-repo\//, ''),
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
}

// 执行文章生成
const generator = new ArticleGenerator();
generator.generateArticles().catch(console.error); 