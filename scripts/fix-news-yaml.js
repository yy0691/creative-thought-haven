import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeYamlString(str) {
  // 如果字符串包含特殊字符，用双引号包围并转义
  if (str.includes('"') || str.includes('\n') || str.includes('\\')) {
    return `"${str.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
  }
  // 如果字符串包含冒号或其他特殊字符，用双引号包围
  if (str.includes(':') || str.includes('{') || str.includes('}') || str.includes('[') || str.includes(']')) {
    return `"${str}"`;
  }
  return str;
}

function fixNewsFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 分离 Front Matter 和内容
    const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!frontMatterMatch) {
      console.log(`⚠️  文件格式不正确: ${path.basename(filePath)}`);
      return false;
    }
    
    const [, frontMatter, markdownContent] = frontMatterMatch;
    
    // 解析并修复 Front Matter
    const lines = frontMatter.split('\n');
    const fixedLines = [];
    
    for (const line of lines) {
      if (line.trim() === '') continue;
      
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) {
        fixedLines.push(line);
        continue;
      }
      
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // 移除开头的引号
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      // 修复特定字段
      if (key === 'description' || key === 'title' || key === 'author') {
        value = escapeYamlString(value);
      } else if (key === 'tags') {
        // tags 字段保持 JSON 格式
        if (!value.startsWith('[')) {
          value = '[]';
        }
      } else if (key === 'featured') {
        // featured 字段保持布尔值
        if (typeof value === 'string') {
          value = value.toLowerCase() === 'true';
        }
      }
      
      fixedLines.push(`${key}: ${value}`);
    }
    
    // 重新组装文件内容
    const fixedFrontMatter = fixedLines.join('\n');
    const fixedContent = `---\n${fixedFrontMatter}\n---\n\n${markdownContent}`;
    
    // 写回文件
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    return true;
  } catch (error) {
    console.error(`❌ 修复文件失败: ${path.basename(filePath)}`, error.message);
    return false;
  }
}

function fixAllNewsFiles() {
  const newsDir = path.join(__dirname, '..', 'content-repo', 'news');
  console.log('开始修复新闻文件的YAML格式...');
  
  if (!fs.existsSync(newsDir)) {
    console.log('❌ 新闻目录不存在');
    return;
  }
  
  let successCount = 0;
  let errorCount = 0;
  
  function walkNews(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkNews(filePath);
      } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
        if (fixNewsFile(filePath)) {
          console.log(`✅ 修复成功: ${file}`);
          successCount++;
        } else {
          errorCount++;
        }
      }
    });
  }
  
  walkNews(newsDir);
  
  console.log('\n🎉 新闻文件修复完成！');
  console.log(`📊 修复统计:`);
  console.log(`- 成功: ${successCount} 个文件`);
  console.log(`- 失败: ${errorCount} 个文件`);
}

fixAllNewsFiles(); 