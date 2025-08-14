import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class YAMLFormatter {
  constructor() {
    this.contentRepo = path.join(__dirname, '../content-repo');
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

  // 修复单个文件的YAML格式
  fixFileYAML(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 检查是否包含Front Matter
      if (!content.startsWith('---')) {
        console.log(`⚠️ 文件没有Front Matter: ${filePath}`);
        return false;
      }
      
      // 提取Front Matter和内容
      const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!frontMatterMatch) {
        console.log(`⚠️ 无法解析Front Matter: ${filePath}`);
        return false;
      }
      
      const [, frontMatter, markdownContent] = frontMatterMatch;
      
      // 修复Front Matter中的特殊字符
      const fixedFrontMatter = frontMatter
        .split('\n')
        .map(line => {
          if (line.includes(': ')) {
            const [key, ...valueParts] = line.split(': ');
            const value = valueParts.join(': ');
            
            // 如果值包含特殊字符，用引号包围
            if (value.includes('"') || value.includes('\n') || value.includes('\\')) {
              return `${key}: "${this.escapeYamlString(value)}"`;
            }
            return line;
          }
          return line;
        })
        .join('\n');
      
      // 重新组合文件内容
      const fixedContent = `---\n${fixedFrontMatter}\n---\n\n${markdownContent}`;
      
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`✅ 修复文件: ${path.basename(filePath)}`);
      return true;
    } catch (error) {
      console.error(`❌ 修复文件失败: ${filePath}`, error.message);
      return false;
    }
  }

  // 递归修复目录中的所有Markdown文件
  fixDirectoryYAML(dirPath) {
    if (!fs.existsSync(dirPath)) {
      console.log(`⚠️ 目录不存在: ${dirPath}`);
      return;
    }
    
    const items = fs.readdirSync(dirPath);
    let successCount = 0;
    let errorCount = 0;
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        // 递归处理子目录
        const result = this.fixDirectoryYAML(itemPath);
        successCount += result.success;
        errorCount += result.error;
      } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
        // 修复Markdown文件
        const success = this.fixFileYAML(itemPath);
        if (success) {
          successCount++;
        } else {
          errorCount++;
        }
      }
    }
    
    return { success: successCount, error: errorCount };
  }

  // 执行YAML格式修复
  async fixAllYAML() {
    console.log('🔧 开始修复YAML格式问题...');
    
    const directories = [
      path.join(this.contentRepo, 'news'),
      path.join(this.contentRepo, 'ai-tools'),
      path.join(this.contentRepo, 'ai-tutorials')
    ];
    
    let totalSuccess = 0;
    let totalError = 0;
    
    for (const dir of directories) {
      if (fs.existsSync(dir)) {
        console.log(`\n📁 处理目录: ${path.basename(dir)}`);
        const result = this.fixDirectoryYAML(dir);
        totalSuccess += result.success;
        totalError += result.error;
      }
    }
    
    console.log('\n📊 YAML修复统计:');
    console.log(`- 成功修复: ${totalSuccess} 个文件`);
    console.log(`- 修复失败: ${totalError} 个文件`);
    console.log(`- 总计: ${totalSuccess + totalError} 个文件`);
  }
}

// 执行YAML格式修复
const formatter = new YAMLFormatter();
formatter.fixAllYAML();