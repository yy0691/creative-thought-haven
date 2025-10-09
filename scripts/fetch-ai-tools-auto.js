#!/usr/bin/env node
/**
 * 自动从GitHub Awesome列表抓取高质量AI工具
 * 使用Gemini API翻译成中文并更新到content/ai/*.md文件
 */

import fs from 'fs';
import path from 'path';
import axios from 'axios';
import matter from 'gray-matter';
import GeminiService from './ai-service.js';

const geminiService = new GeminiService();

const CONFIG_FILE = path.join(process.cwd(), 'config', 'ai-tools-sources.json');
const CONTENT_DIR = path.join(process.cwd(), 'content', 'ai');

// 读取配置
function loadConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
}

// 从GitHub获取README内容
async function fetchGitHubReadme(repo, branch = 'main', filePath = 'README.md') {
  try {
    const url = `https://raw.githubusercontent.com/${repo}/${branch}/${filePath}`;
    console.log(`📡 Fetching from ${repo}...`);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 30000
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching from ${repo}:`, error.message);
    return null;
  }
}

// 解析Markdown中的工具链接
function parseToolLinks(markdown) {
  const tools = [];
  const lines = markdown.split('\n');
  let currentCategory = null;
  
  for (const line of lines) {
    // 匹配标题（## 或 ###）作为分类
    const headingMatch = line.match(/^#{2,3}\s+(.+)$/);
    if (headingMatch) {
      currentCategory = headingMatch[1].trim();
      continue;
    }
    
    // 匹配工具链接: - [Name](url) - description 或 - [Name](url): description
    const linkMatch = line.match(/^[\s\-\*]+\[([^\]]+)\]\((https?:\/\/[^\)]+)\)\s*[\-:]\s*(.*)$/);
    if (linkMatch) {
      const name = linkMatch[1].trim();
      const url = linkMatch[2].trim();
      const description = linkMatch[3].trim();
      
      if (name && url) {
        tools.push({
          title: name,
          url: url,
          description: description || '',
          category: currentCategory || 'General'
        });
      }
    }
  }
  
  return tools;
}

// 分类工具到对应的组
function categorizeTools(tools, config) {
  const categorized = {
    tools: [],
    learning: [],
    prompts: [],
    resources: []
  };
  
  for (const tool of tools) {
    const searchText = `${tool.title} ${tool.description} ${tool.category}`.toLowerCase();
    
    // 判断工具属于哪个大类
    let assigned = false;
    
    for (const [category, categoryConfig] of Object.entries(config.categories)) {
      for (const [group, keywords] of Object.entries(categoryConfig.groups)) {
        if (keywords.some(keyword => searchText.includes(keyword.toLowerCase()))) {
          categorized[category].push({
            ...tool,
            group: group
          });
          assigned = true;
          break;
        }
      }
      if (assigned) break;
    }
    
    // 如果没有匹配到分类，默认放到tools
    if (!assigned) {
      categorized.tools.push({
        ...tool,
        group: '其他工具'
      });
    }
  }
  
  return categorized;
}

// 使用Gemini翻译工具信息
async function translateTool(tool) {
  try {
    console.log(`🤖 Translating: ${tool.title}...`);
    
    // 如果描述为空，只翻译标题
    if (!tool.description || tool.description.trim() === '') {
      const titleResult = await geminiService.translateTitle(tool.title);
      return {
        ...tool,
        title_zh: titleResult,
        description_zh: ''
      };
    }
    
    const result = await geminiService.translateToChineseWithSummary(
      tool.title,
      tool.description,
      tool.description
    );
    
    return {
      ...tool,
      title_zh: result.title_zh,
      description_zh: result.summary_zh
    };
  } catch (error) {
    console.error(`❌ Translation failed for ${tool.title}:`, error.message);
    return {
      ...tool,
      title_zh: tool.title,
      description_zh: tool.description
    };
  }
}

// 读取现有的markdown文件
function readExistingMarkdown(category) {
  const filePath = path.join(CONTENT_DIR, `${category}.md`);
  if (!fs.existsSync(filePath)) {
    return { data: {}, content: '', existingTools: [] };
  }
  
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  
  // 解析现有工具
  const existingTools = parseToolLinks(content);
  
  return { data, content, existingTools };
}

// 更新markdown文件
function updateMarkdownFile(category, tools, existingData) {
  const { data, existingTools } = existingData;
  
  // 合并新旧工具，去重
  const existingUrls = new Set(existingTools.map(t => t.url));
  const newTools = tools.filter(t => !existingUrls.has(t.url));
  
  if (newTools.length === 0) {
    console.log(`⏭️  No new tools for ${category}`);
    return 0;
  }
  
  console.log(`✨ Found ${newTools.length} new tools for ${category}`);
  
  // 按组分类
  const toolsByGroup = {};
  for (const tool of [...existingTools, ...newTools]) {
    const group = tool.group || 'General';
    if (!toolsByGroup[group]) {
      toolsByGroup[group] = [];
    }
    toolsByGroup[group].push(tool);
  }
  
  // 生成markdown内容
  let content = '';
  for (const [group, groupTools] of Object.entries(toolsByGroup)) {
    content += `\n## ${group}\n`;
    for (const tool of groupTools) {
      const title = tool.title_zh || tool.title;
      const desc = tool.description_zh || tool.description;
      content += `- [${title}](${tool.url})`;
      if (desc) {
        content += ` - ${desc}`;
      }
      content += '\n';
    }
  }
  
  // 写入文件
  const frontmatter = matter.stringify(content, data);
  const filePath = path.join(CONTENT_DIR, `${category}.md`);
  fs.writeFileSync(filePath, frontmatter, 'utf8');
  
  console.log(`✅ Updated ${filePath} with ${newTools.length} new tools`);
  return newTools.length;
}

// 主函数
async function main() {
  console.log('🤖 Starting AI tools auto-fetch...\n');
  
  const config = loadConfig();
  const allTools = [];
  
  // 从GitHub源抓取工具
  for (const source of config.githubSources) {
    if (!source.active) continue;
    
    const markdown = await fetchGitHubReadme(source.repo, source.branch, source.path);
    if (!markdown) continue;
    
    const tools = parseToolLinks(markdown);
    console.log(`✅ Parsed ${tools.length} tools from ${source.name}`);
    allTools.push(...tools);
    
    // 添加延迟避免请求过快
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log(`\n📊 Total tools collected: ${allTools.length}`);
  
  // 去重（基于URL）
  const uniqueTools = [];
  const seenUrls = new Set();
  for (const tool of allTools) {
    if (!seenUrls.has(tool.url)) {
      uniqueTools.push(tool);
      seenUrls.add(tool.url);
    }
  }
  
  console.log(`📊 Unique tools after deduplication: ${uniqueTools.length}\n`);
  
  // 分类工具
  const categorized = categorizeTools(uniqueTools, config);
  
  // 为每个类别更新文件
  let totalAdded = 0;
  
  for (const [category, tools] of Object.entries(categorized)) {
    if (tools.length === 0) continue;
    
    console.log(`\n📁 Processing category: ${category} (${tools.length} tools)`);
    
    // 翻译前10个新工具（避免API配额用尽）
    const toolsToTranslate = tools.slice(0, 10);
    const translatedTools = [];
    
    for (const tool of toolsToTranslate) {
      const translated = await translateTool(tool);
      translatedTools.push(translated);
      await new Promise(resolve => setTimeout(resolve, 1000)); // 延迟避免API限流
    }
    
    // 读取现有数据
    const existingData = readExistingMarkdown(category);
    
    // 更新文件
    const added = updateMarkdownFile(category, translatedTools, existingData);
    totalAdded += added;
  }
  
  console.log(`\n🎉 Automation complete! Added ${totalAdded} new tools.`);
  
  // 显示API使用统计
  const stats = geminiService.getStats();
  console.log(`\n📊 API Usage Stats:`);
  console.log(`   Total Keys: ${stats.totalKeys}`);
  console.log(`   Total Requests: ${stats.totalRequests}`);
  stats.requestCounts.forEach((count, index) => {
    console.log(`   Key #${index + 1}: ${count} requests`);
  });
}

// 运行
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
