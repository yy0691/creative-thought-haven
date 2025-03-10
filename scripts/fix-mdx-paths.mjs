/**
 * 独立式MDX样式修复工具 - 修复路径版本
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取项目根目录 (scripts文件夹的上一级)
const ROOT_DIR = path.resolve(__dirname, '..');

// 配置项
const CONFIG = {
  // 要处理的目录 (使用正确的绝对路径)
  targetDirs: [
    path.join(ROOT_DIR, 'src/content/网络安全_feishu'),
    path.join(ROOT_DIR, 'src/content/网络安全'),
    path.join(ROOT_DIR, 'src/content/AI大模型')
  ],
  // 是否创建备份
  createBackup: true,
  // 备份文件扩展名
  backupExt: '.bak',
  // 日志级别
  logLevel: 'verbose'
};

// 样式修复函数
function fixMdxStyles(content) {
  let fixed = content;
  
  // 1. 修复基本内联样式 style="color: red"
  const inlineStyleRegex = /<(\w+)\s+style="([^"]+)"/g;
  fixed = fixed.replace(inlineStyleRegex, (match, tag, styleString) => {
    const styleObj = {};
    
    // 解析样式
    styleString.split(';')
      .filter(s => s.trim())
      .forEach(s => {
        const [key, value] = s.split(':').map(p => p.trim());
        if (key && value) {
          // 转换为驼峰命名
          const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
          styleObj[camelKey] = value;
        }
      });
    
    // 构建样式对象字符串
    const styleProps = Object.entries(styleObj)
      .map(([k, v]) => `"${k}": "${v}"`)
      .join(', ');
    
    return `<${tag} style={{${styleProps}}}`;
  });
  
  // 2. 修复已经部分修复但语法错误的JSX样式
  const brokenJsxStyleRegex = /<(\w+)\s+style={{([^{}]+)}(?!})/g;
  fixed = fixed.replace(brokenJsxStyleRegex, (match, tag, styleString) => {
    return `<${tag} style={{${styleString}}}}`;
  });
  
  // 3. 修复多行样式
  const multilineStyleRegex = /<(\w+)\s+style="([^"]+\n[^"]+)"/g;
  fixed = fixed.replace(multilineStyleRegex, (match, tag, styleString) => {
    // 清理样式
    const cleanStyle = styleString.replace(/\n/g, ' ').trim();
    const styleObj = {};
    
    // 解析样式
    cleanStyle.split(';')
      .filter(s => s.trim())
      .forEach(s => {
        const [key, value] = s.split(':').map(p => p.trim());
        if (key && value) {
          const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
          styleObj[camelKey] = value;
        }
      });
    
    // 构建样式对象字符串
    const styleProps = Object.entries(styleObj)
      .map(([k, v]) => `"${k}": "${v}"`)
      .join(', ');
    
    return `<${tag} style={{${styleProps}}}`;
  });
  
  return fixed;
}

// 获取所有MDX文件
async function findMdxFiles(directory) {
  try {
    console.log(`检查目录: ${directory}`);
    const exists = await fs.access(directory).then(() => true).catch(() => false);
    
    if (!exists) {
      console.error(`目录不存在: ${directory}`);
      return [];
    }
    
    const files = await fs.readdir(directory, { withFileTypes: true });
    let mdxFiles = [];
    
    for (const file of files) {
      const filePath = path.join(directory, file.name);
      
      if (file.isDirectory()) {
        const subDirFiles = await findMdxFiles(filePath);
        mdxFiles = [...mdxFiles, ...subDirFiles];
      } else if (file.name.endsWith('.mdx') || file.name.endsWith('.md')) {
        mdxFiles.push(filePath);
      }
    }
    
    return mdxFiles;
  } catch (error) {
    console.error(`无法读取目录 ${directory}:`, error);
    return [];
  }
}

// 处理单个MDX文件
async function processMdxFile(filePath) {
  try {
    console.log(`处理文件: ${filePath}`);
    
    // 读取文件
    const content = await fs.readFile(filePath, 'utf8');
    
    // 检查是否有内联样式
    const hasInlineStyles = /<\w+\s+style="[^"]+"/g.test(content);
    const hasBrokenJsxStyles = /<\w+\s+style={{[^{}]+}(?!})/g.test(content);
    
    if (!hasInlineStyles && !hasBrokenJsxStyles) {
      if (CONFIG.logLevel === 'verbose') {
        console.log(`  - 跳过: 没有检测到样式问题`);
      }
      return { path: filePath, status: 'skipped', reason: 'no-issues' };
    }
    
    // 创建备份
    if (CONFIG.createBackup) {
      const backupPath = `${filePath}${CONFIG.backupExt}`;
      await fs.writeFile(backupPath, content);
      if (CONFIG.logLevel !== 'minimal') {
        console.log(`  - 已创建备份: ${backupPath}`);
      }
    }
    
    // 修复样式
    const fixedContent = fixMdxStyles(content);
    
    // 检查是否有变化
    if (content === fixedContent) {
      if (CONFIG.logLevel === 'verbose') {
        console.log(`  - 无需修改`);
      }
      return { path: filePath, status: 'unchanged' };
    }
    
    // 写入修复后的内容
    await fs.writeFile(filePath, fixedContent);
    
    if (CONFIG.logLevel !== 'minimal') {
      console.log(`  - 已成功修复样式问题`);
    }
    
    return { path: filePath, status: 'fixed' };
  } catch (error) {
    console.error(`  - 处理失败: ${filePath}`, error);
    return { path: filePath, status: 'error', error: error.message };
  }
}

// 主函数
async function main() {
  console.log('=== 独立式MDX样式修复工具 ===');
  console.log(`项目根目录: ${ROOT_DIR}`);
  console.log('开始扫描目录...');
  
  const stats = {
    processed: 0,
    fixed: 0,
    skipped: 0,
    error: 0
  };
  
  for (const dir of CONFIG.targetDirs) {
    console.log(`\n扫描目录: ${dir}`);
    
    try {
      const mdxFiles = await findMdxFiles(dir);
      console.log(`找到 ${mdxFiles.length} 个MDX文件\n`);
      
      for (const file of mdxFiles) {
        const result = await processMdxFile(file);
        stats.processed++;
        
        if (result.status === 'fixed') {
          stats.fixed++;
        } else if (result.status === 'skipped' || result.status === 'unchanged') {
          stats.skipped++;
        } else if (result.status === 'error') {
          stats.error++;
        }
      }
    } catch (error) {
      console.error(`无法处理目录 ${dir}:`, error);
    }
  }
  
  // 输出统计信息
  console.log('\n=== 处理统计 ===');
  console.log(`总文件数: ${stats.processed}`);
  console.log(`修复文件: ${stats.fixed}`);
  console.log(`跳过文件: ${stats.skipped}`);
  console.log(`错误文件: ${stats.error}`);
  console.log('=== 处理完成 ===');
}

// 运行脚本
main().catch(err => {
  console.error('脚本执行失败:', err);
  process.exit(1);
}); 