/**
 * 增强版MDX样式修复工具 (ES Module版本)
 * 处理更多边缘情况和样式变体
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { createInterface } from 'readline';

// 获取当前文件目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取项目根目录 (scripts文件夹的上一级)
const ROOT_DIR = path.resolve(__dirname, '..');

// 配置项
const CONFIG = {
  targetDirs: [
    path.join(ROOT_DIR, 'src/content/网络安全_feishu'),
    path.join(ROOT_DIR, 'src/content/网络安全'),
    path.join(ROOT_DIR, 'src/content/AI大模型')
  ],
  createBackup: true,
  backupExt: '.bak',
  logLevel: 'verbose',
  fixTypes: [
    'inlineStyles',      // 修复内联样式
    'brokenJsxStyles',   // 修复已损坏的JSX样式
    'commonPatterns',    // 修复常见的模式 (如特定颜色)
    'linkTargets',       // 修复链接target属性
    'brokenHtmlEntities' // 修复HTML实体
  ]
};

// Promise化exec
const execAsync = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
};

// 获取所有MDX文件的路径
async function findMdxFiles(directory) {
  try {
    console.log(`检查目录: ${directory}`);
    // 检查目录是否存在
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

// 全面修复MDX内容
function fixMdxContent(content) {
  let fixed = content;

  // 修复1: 内联样式 (style="color: red")
  if (CONFIG.fixTypes.includes('inlineStyles')) {
    fixed = fixInlineStyles(fixed);
  }
  
  // 修复2: 已损坏的JSX样式 (style={{color: "red")
  if (CONFIG.fixTypes.includes('brokenJsxStyles')) {
    fixed = fixBrokenJsxStyles(fixed);
  }
  
  // 修复3: 常见模式 (特定颜色)
  if (CONFIG.fixTypes.includes('commonPatterns')) {
    fixed = fixCommonPatterns(fixed);
  }
  
  // 修复4: 链接target属性
  if (CONFIG.fixTypes.includes('linkTargets')) {
    fixed = fixLinkTargets(fixed);
  }
  
  // 修复5: 破损的HTML实体
  if (CONFIG.fixTypes.includes('brokenHtmlEntities')) {
    fixed = fixBrokenHtmlEntities(fixed);
  }
  
  return fixed;
}

// 修复内联样式
function fixInlineStyles(content) {
  const styleRegex = /<(\w+)\s+style="([^"]+)"/g;
  
  return content.replace(styleRegex, (match, tag, styleString) => {
    // 解析样式字符串
    const styleProperties = styleString.split(';').filter(prop => prop.trim());
    const styleObject = {};
    
    styleProperties.forEach(prop => {
      const [key, value] = prop.split(':').map(s => s?.trim());
      if (key && value) {
        // 转换CSS属性为驼峰命名
        const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        styleObject[camelKey] = value;
      }
    });
    
    // 生成新的样式对象字符串
    const styleObjectString = Object.entries(styleObject)
      .map(([k, v]) => `"${k}": "${v}"`)
      .join(', ');
    
    return `<${tag} style={{${styleObjectString}}}`;
  });
}

// 修复损坏的JSX样式
function fixBrokenJsxStyles(content) {
  // 修复不完整的JSX样式 style={{...}
  const incompleteJsxRegex = /<(\w+)\s+style={{([^{}]+)}(?!})/g;
  let fixed = content.replace(incompleteJsxRegex, (match, tag, styleString) => {
    return `<${tag} style={{${styleString}}}}`;
  });
  
  // 修复中间缺少右括号的样式 style={{..."value"}
  const missingBraceRegex = /<(\w+)\s+style={{([^{}]+)"([^"]+)"([^{}]+)}}/g;
  fixed = fixed.replace(missingBraceRegex, (match, tag, before, value, after) => {
    // 检查是否有一对引号但缺少右括号
    if (before.includes('"') && !before.includes('":')) {
      before = before.replace(/"\s*$/, '": ');
      return `<${tag} style={{${before}"${value}"${after}}}`;
    }
    return match;
  });
  
  return fixed;
}

// 修复常见模式
function fixCommonPatterns(content) {
  let fixed = content;
  
  // 将特定颜色的span替换为组件
  const colorMap = {
    '#FBBFBC': '<WarningText>$1</WarningText>',
    '#F9D8B1': '<NoteText>$1</NoteText>',
    '#E0E1E4': '<InfoText>$1</InfoText>'
  };
  
  Object.entries(colorMap).forEach(([color, replacement]) => {
    const colorRegex = new RegExp(`<span[^>]*style="[^"]*color:${color}[^"]*"[^>]*>(.*?)<\\/span>`, 'g');
    const jsxColorRegex = new RegExp(`<span[^>]*style=\\{\\{[^}]*"color":\\s*"${color}"[^}]*\\}\\}[^>]*>(.*?)<\\/span>`, 'g');
    
    fixed = fixed.replace(colorRegex, replacement);
    fixed = fixed.replace(jsxColorRegex, replacement);
  });
  
  // 修复mark背景色
  fixed = fixed.replace(/<mark[^>]*style="[^"]*background-color:\s*#F2F3F5[^"]*"[^>]*>(.*?)<\/mark>/g, 
                       '<HighlightedMark bgColor="#F2F3F5">$1</HighlightedMark>');
  
  return fixed;
}

// 修复链接target属性
function fixLinkTargets(content) {
  // 修复 target="_blank" 到 target="\_blank"
  return content.replace(/target="_blank"/g, 'target="_blank"');
}

// 修复破损的HTML实体
function fixBrokenHtmlEntities(content) {
  const entityMap = {
    '&lt': '&lt;',
    '&gt': '&gt;',
    '&amp': '&amp;'
  };
  
  let fixed = content;
  Object.entries(entityMap).forEach(([broken, fixed]) => {
    // 只修复没有分号的实体
    const brokenRegex = new RegExp(`${broken}(?!;)`, 'g');
    fixed = fixed.replace(brokenRegex, fixed);
  });
  
  return fixed;
}

// 处理单个MDX文件
async function processMdxFile(filePath) {
  try {
    console.log(`处理文件: ${filePath}`);
    
    // 读取文件内容
    const content = await fs.readFile(filePath, 'utf8');
    
    // 修复内容
    const fixedContent = fixMdxContent(content);
    
    // 检查是否有变化
    if (content === fixedContent) {
      if (CONFIG.logLevel === 'verbose') {
        console.log(`  - 无需修改`);
      }
      return { path: filePath, status: 'unchanged' };
    }
    
    // 创建备份
    if (CONFIG.createBackup) {
      const backupPath = `${filePath}${CONFIG.backupExt}`;
      await fs.writeFile(backupPath, content);
      if (CONFIG.logLevel !== 'minimal') {
        console.log(`  - 已创建备份: ${backupPath}`);
      }
    }
    
    // 写入修复后的内容
    await fs.writeFile(filePath, fixedContent);
    
    if (CONFIG.logLevel !== 'minimal') {
      console.log(`  - 已成功修复`);
    }
    
    return { path: filePath, status: 'fixed' };
  } catch (error) {
    console.error(`  - 处理失败: ${filePath}`, error);
    return { path: filePath, status: 'error', error: error.message };
  }
}

// 主函数
async function main() {
  console.log('=== 增强版MDX样式修复工具 ===');
  console.log(`项目根目录: ${ROOT_DIR}`);
  
  // 获取Git状态，确保工作区干净
  try {
    const gitStatus = await execAsync('git status --porcelain');
    if (gitStatus.trim() !== '') {
      console.warn('\n⚠️ 警告: Git工作区不干净，建议在干净的工作区运行此脚本');
      console.log('当前更改:');
      console.log(gitStatus);
      
      // 询问是否继续
      const readline = createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      const answer = await new Promise(resolve => {
        readline.question('\n是否继续? (y/N): ', resolve);
      });
      
      readline.close();
      
      if (answer.toLowerCase() !== 'y') {
        console.log('已取消操作');
        process.exit(0);
      }
    }
  } catch (error) {
    console.warn('无法检查Git状态，继续执行...');
  }
  
  console.log('\n开始扫描目录...');
  
  const stats = {
    processed: 0,
    fixed: 0,
    unchanged: 0,
    error: 0
  };
  
  for (const dir of CONFIG.targetDirs) {
    // 不需要再使用path.resolve，因为已经在CONFIG中使用了绝对路径
    console.log(`\n扫描目录: ${dir}`);
    
    try {
      const mdxFiles = await findMdxFiles(dir);
      console.log(`找到 ${mdxFiles.length} 个MDX文件\n`);
      
      for (const file of mdxFiles) {
        const result = await processMdxFile(file);
        stats.processed++;
        
        if (result.status === 'fixed') {
          stats.fixed++;
        } else if (result.status === 'unchanged') {
          stats.unchanged++;
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
  console.log(`无需修改: ${stats.unchanged}`);
  console.log(`错误文件: ${stats.error}`);
  console.log('=== 处理完成 ===');
}

// 运行脚本
main().catch(err => {
  console.error('脚本执行失败:', err);
  process.exit(1);
}); 