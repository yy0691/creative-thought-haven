import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 测试新闻文件解析
function testNewsFiles() {
  const newsDir = path.join(__dirname, '..', 'content-repo', 'news');
  const news = [];
  
  console.log('开始测试新闻文件解析...');
  
  function walkNews(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkNews(filePath);
      } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const { data, content: markdown } = matter(content);
          
          const newsItem = {
            ...data,
            content: markdown,
            path: filePath.replace(/.*\/content-repo\/news\//, ''),
            slug: generateSlug(data.title || file.replace(/\.(md|mdx)$/, '')),
            category: extractCategory(filePath)
          };
          
          news.push(newsItem);
          console.log(`✅ 解析成功: ${file}`);
        } catch (error) {
          console.warn(`❌ 解析失败: ${filePath}`, error.message);
        }
      }
    });
  }
  
  function generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  
  function extractCategory(filePath) {
    const pathParts = filePath.split('/');
    const newsIndex = pathParts.indexOf('news');
    if (newsIndex !== -1 && pathParts[newsIndex + 1]) {
      return pathParts[newsIndex + 1];
    }
    return 'uncategorized';
  }
  
  walkNews(newsDir);
  
  console.log(`\n📊 解析结果:`);
  console.log(`- 总新闻数: ${news.length}`);
  console.log(`- 分类统计:`);
  
  const categoryStats = {};
  news.forEach(item => {
    categoryStats[item.category] = (categoryStats[item.category] || 0) + 1;
  });
  
  Object.entries(categoryStats).forEach(([category, count]) => {
    console.log(`  - ${category}: ${count} 条`);
  });
  
  // 保存到文件
  const outputPath = path.join(__dirname, '..', 'src/data/news.json');
  fs.writeFileSync(outputPath, JSON.stringify(news, null, 2));
  console.log(`\n💾 新闻数据已保存到: ${outputPath}`);
  
  // 显示前3条新闻的标题
  console.log(`\n📰 新闻预览:`);
  news.slice(0, 3).forEach((item, index) => {
    console.log(`${index + 1}. ${item.title} (${item.category})`);
  });
}

// 执行测试
testNewsFiles(); 