const fs = require('fs');
const path = require('path');

// 配置参数
const config = {
  inputPath: './', // 输入：文件或文件夹路径
  outputDir: './output-md', // 输出目录
  frontMatter: {
    author: 'LuoYuan',
    category: 'ai-news',
    featured: false,
  },
  includeSubDir: true, // 是否处理子文件夹
  dateRange: { // 日期范围：2025-04-10 至 2025-04-20
    start: new Date('2025-04-10'),
    end: new Date('2025-04-20')
  }
};

/**
 * 生成指定日期范围内的随机日期（格式：YYYY-MM-DD）
 */
function getRandomDateInRange() {
  const { start, end } = config.dateRange;
  // 计算起始和结束日期的时间戳（毫秒）
  const startTimestamp = start.getTime();
  const endTimestamp = end.getTime();
  // 生成范围内的随机时间戳
  const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);
  // 转换为日期对象并格式化
  const randomDate = new Date(randomTimestamp);
  return randomDate.toISOString().split('T')[0]; // 输出：YYYY-MM-DD
}

/**
 * 从TS文件中提取Markdown内容（支持末尾无分号的情况）
 */
function extractMarkdownFromTs(tsContent) {
  // 关键修改：在正则末尾添加 ;? 表示分号可选（存在或不存在都匹配）
  const regex = /export\s+const\s+\w+\s*=\s*`([\s\S]*?)`;?/;
  const match = tsContent.match(regex);
  
  if (!match || !match[1]) {
    throw new Error('未找到符合格式的模板字符串（检查是否为 export const xxx = `...` 结构）');
  }
  
  // 处理转义符（恢复`和\）
  return match[1]
    .replace(/\\`/g, '`')
    .replace(/\\\\/g, '\\')
    .trim();
}

/**
 * 从Markdown内容中提取标题（优先匹配# 标题格式）
 */
function extractTitle(mdContent) {
  const lines = mdContent.split('\n').filter(line => line.trim() !== '');
  for (const line of lines) {
    if (line.startsWith('#')) { // 匹配Markdown标题（#/##/###等）
      return line.replace(/^#+\s*/, '').trim(); // 移除#和后续空格
    }
  }
  return lines.length > 0 ? lines[0].trim() : '未命名文档';
}

/**
 * 将标题转换为slug格式（短横线连接，小写，去特殊字符）
 */
function titleToSlug(title) {
  return title
    .toLowerCase() // 转为小写
    .replace(/[^\w\s-]/g, '') // 移除特殊字符（保留字母、数字、空格、短横线）
    .replace(/\s+/g, '-') // 空格转为短横线
    .replace(/-+/g, '-') // 合并连续短横线
    .trim(); // 去除首尾空白
}

/**
 * 生成唯一文件名（格式：日期-slug.md，避免重复）
 */
function getUniqueFilename(date, slug, outputDir) {
  const baseName = `${date}-${slug}`;
  const ext = '.md';
  let candidate = `${baseName}${ext}`;
  let counter = 1;
  
  // 检查文件是否存在，存在则加序号（如2025-04-15-ai-model.md → 2025-04-15-ai-model-1.md）
  while (fs.existsSync(path.join(outputDir, candidate))) {
    candidate = `${baseName}-${counter}${ext}`;
    counter++;
  }
  
  return candidate;
}

/**
 * 提取第一张图片链接作为frontmatter的image
 */
function extractFirstImage(mdContent) {
  const imgRegex = /!\[.*?\]\((https?:\/\/.*?)\)/;
  const match = mdContent.match(imgRegex);
  return match ? match[1] : '';
}

/**
 * 生成带Front Matter的MD内容（frontmatter中的date与文件名日期一致）
 */
function generateFinalMd(rawContent, date) {
  const title = extractTitle(rawContent);
  const image = extractFirstImage(rawContent);
  
  const frontMatter = [
    '---',
    `title: ${title}`,
    `description: ${title.substring(0, 100)}...`,
    `author: ${config.frontMatter.author}`,
    `date: ${date}`, // 与文件名日期一致
    `image: ${image}`,
    `link: `,
    `category: ${config.frontMatter.category}`,
    `tags: []`,
    `featured: ${config.frontMatter.featured}`,
    '---',
    ''
  ].join('\n');
  
  return `${frontMatter}${rawContent}`;
}

/**
 * 处理单个TS文件
 */
function processSingleTsFile(tsFilePath) {
  try {
    const tsContent = fs.readFileSync(tsFilePath, 'utf8');
    const rawMdContent = extractMarkdownFromTs(tsContent);
    const title = extractTitle(rawMdContent);
    const slug = titleToSlug(title);
    const randomDate = getRandomDateInRange(); // 生成2025-04-10至20日的随机日期
    
    // 生成唯一文件名
    const mdFilename = getUniqueFilename(randomDate, slug, config.outputDir);
    const outputPath = path.join(config.outputDir, mdFilename);
    
    // 生成并写入MD内容（frontmatter日期与文件名一致）
    const finalMd = generateFinalMd(rawMdContent, randomDate);
    fs.writeFileSync(outputPath, finalMd, 'utf8');
    console.log(`✅ 转换成功：${mdFilename}`);
  } catch (error) {
    console.error(`❌ 处理失败（${tsFilePath}）：${error.message}`);
  }
}

/**
 * 遍历文件夹获取所有.ts文件
 */
function getTsFilesInDir(dirPath) {
  const tsFiles = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory() && config.includeSubDir) {
      tsFiles.push(...getTsFilesInDir(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.ts')) {
      tsFiles.push(fullPath);
    }
  }
  
  return tsFiles;
}

/**
 * 主函数
 */
function main() {
  if (!fs.existsSync(config.inputPath)) {
    console.error(`输入路径不存在：${config.inputPath}`);
    return;
  }
  
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }
  
  const stats = fs.statSync(config.inputPath);
  if (stats.isFile()) {
    if (path.extname(config.inputPath) !== '.ts') {
      console.error(`输入文件不是.ts格式：${config.inputPath}`);
      return;
    }
    processSingleTsFile(config.inputPath);
  } else if (stats.isDirectory()) {
    const tsFiles = getTsFilesInDir(config.inputPath);
    if (tsFiles.length === 0) {
      console.log(`未找到.ts文件：${config.inputPath}`);
      return;
    }
    console.log(`找到 ${tsFiles.length} 个.ts文件，开始转换...`);
    tsFiles.forEach(processSingleTsFile);
    console.log(`转换完成，文件保存至：${config.outputDir}`);
  }
}

main();