import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 新闻数据映射
const newsData = [
  {
    id: '0417-new-1',
    title: 'OpenAI发布GPT-4.1',
    description: 'OpenAI以API的形式发布了三个新模型:GPT-4.1、GPT-4.1 mini和GPT-4.1 nano',
    author: 'OpenAI',
    date: '2024-01-01',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_4f24f94e-264f-4f01-b1f6-b285c7f667dg.jpg',
    link: 'https://openai.com/index/gpt-4.1/',
    category: 'ai-news',
    tags: ['OpenAI', 'GPT', 'AI模型'],
    featured: true,
    content: `# OpenAI发布GPT-4.1

OpenAI以API的形式发布了三个新模型：**GPT-4.1**、**GPT-4.1 mini** 和 **GPT-4.1 nano**。

## 新模型特点

### GPT-4.1
- 更强的推理能力
- 更好的代码生成
- 支持更长的上下文

### GPT-4.1 mini
- 平衡性能和成本
- 适合大多数应用场景
- 响应速度更快

### GPT-4.1 nano
- 轻量级模型
- 成本更低
- 适合简单任务

## 技术改进

1. **推理能力提升**：在复杂推理任务上表现更佳
2. **代码生成优化**：生成更准确、更高效的代码
3. **上下文处理**：支持更长的对话历史
4. **安全性增强**：更好的内容过滤和安全机制

## 应用场景

- 代码开发和调试
- 复杂问题解决
- 创意写作和内容生成
- 数据分析和报告

## 定价信息

- GPT-4.1: $0.03/1K tokens (输入), $0.06/1K tokens (输出)
- GPT-4.1 mini: $0.015/1K tokens (输入), $0.06/1K tokens (输出)
- GPT-4.1 nano: $0.00015/1K tokens (输入), $0.0006/1K tokens (输出)

## 开发者资源

- [API文档](https://platform.openai.com/docs)
- [示例代码](https://github.com/openai/openai-python)
- [最佳实践指南](https://platform.openai.com/docs/guides)

---

*了解更多信息，请访问 [OpenAI官网](https://openai.com/index/gpt-4.1/)*`
  },
  {
    id: '0415-new-1',
    title: 'Google Gemini的"摄像头+屏幕共享"新体验',
    description: 'Google Gemini Live 把你的手机变成了一个能"看你看到的"、"听你说的"的 AI 助手，支持摄像头、屏幕共享、实时互动，开启 AI 日常应用的全新体验。',
    author: 'Google',
    date: '2024-01-02',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lb_9f8142f5-abd8-4a44-8e75-c9cc27852d4g.jpg',
    link: 'https://support.google.com/gemini/answer/14579026?sjid=15917116769005255122-NA',
    category: 'ai-news',
    tags: ['Google', 'Gemini', 'AI助手'],
    featured: true,
    content: `# Google Gemini的"摄像头+屏幕共享"新体验

Google Gemini Live 把你的手机变成了一个能"看你看到的"、"听你说的"的 AI 助手，支持摄像头、屏幕共享、实时互动，开启 AI 日常应用的全新体验。

## 核心功能

### 摄像头功能
- **实时视觉识别**：AI可以"看到"你摄像头中的内容
- **物体识别**：识别照片中的物体、文字、场景
- **实时分析**：对摄像头内容进行实时分析和解释

### 屏幕共享
- **应用界面理解**：AI可以理解你手机屏幕上的应用界面
- **操作指导**：提供具体的操作步骤和指导
- **问题诊断**：帮助诊断和解决技术问题

### 实时互动
- **语音对话**：支持自然语言对话
- **手势识别**：理解用户的手势和操作意图
- **上下文理解**：记住对话历史和用户偏好

## 应用场景

### 日常生活
- **购物助手**：识别商品并提供购买建议
- **翻译工具**：实时翻译文字和语音
- **学习伙伴**：帮助解答学习问题

### 工作辅助
- **文档处理**：帮助处理和分析文档
- **会议记录**：实时记录和总结会议内容
- **技术支持**：提供技术问题解决方案

### 创意创作
- **内容生成**：基于视觉内容生成创意文案
- **设计辅助**：提供设计建议和灵感
- **视频制作**：协助视频内容创作

## 技术特点

- **多模态AI**：结合视觉、语音、文本理解
- **实时处理**：低延迟的实时响应
- **隐私保护**：本地处理和隐私保护机制
- **跨平台支持**：支持多种设备和平台

## 使用指南

1. **下载应用**：在Google Play或App Store下载Gemini应用
2. **开启权限**：允许摄像头和屏幕共享权限
3. **开始对话**：通过语音或文字与AI对话
4. **使用功能**：利用摄像头和屏幕共享功能

---

*了解更多信息，请访问 [Google Gemini官网](https://support.google.com/gemini/answer/14579026)*`
  },
  {
    id: '0415-new-2',
    title: '智谱发布新一代开源模型GLM系列',
    description: 'GLM系列32B性能媲美671B的Deepseek R1 并宣布启动IPO',
    author: 'GLM',
    date: '2024-01-03',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_f36c76d5-3388-4a63-9635-abff8b395f4g.jpg',
    link: 'https://www.glm.xyz/blog/glm-4-128k-release',
    category: 'ai-news',
    tags: ['GLM', '开源模型', 'IPO'],
    featured: true,
    content: `# 智谱发布新一代开源模型GLM系列

GLM系列32B性能媲美671B的Deepseek R1，并宣布启动IPO，标志着中国AI企业在开源模型领域的重要突破。

## 模型性能

### GLM-4 128K
- **参数量**：32B参数
- **性能表现**：媲美671B的Deepseek R1
- **上下文长度**：支持128K tokens
- **推理能力**：在多个基准测试中表现优异

### 技术突破
- **高效架构**：优化的模型架构设计
- **训练效率**：更高效的训练方法
- **推理速度**：快速的推理响应
- **内存优化**：优化的内存使用

## 开源策略

### 模型开源
- **完全开源**：模型权重和代码完全开源
- **商业友好**：支持商业使用
- **社区驱动**：鼓励社区贡献和改进

### 生态建设
- **工具链**：提供完整的工具链支持
- **文档完善**：详细的使用文档和教程
- **社区支持**：活跃的开发者社区

## IPO计划

### 上市信息
- **上市地点**：计划在科创板上市
- **融资规模**：预计融资规模较大
- **资金用途**：主要用于技术研发和生态建设

### 发展前景
- **市场地位**：在开源模型领域的重要地位
- **技术优势**：领先的技术实力
- **商业潜力**：巨大的商业应用潜力

## 应用场景

### 企业应用
- **智能客服**：提供智能客服解决方案
- **内容生成**：辅助内容创作和生成
- **数据分析**：智能数据分析和洞察

### 开发者工具
- **代码生成**：辅助代码编写和调试
- **文档生成**：自动生成技术文档
- **测试辅助**：智能测试用例生成

### 研究应用
- **学术研究**：支持学术研究项目
- **实验平台**：提供实验和验证平台
- **创新应用**：探索新的AI应用场景

## 技术特色

- **多语言支持**：支持中英文等多种语言
- **领域适应**：针对不同领域进行优化
- **安全可控**：内置安全机制和可控性
- **持续更新**：定期更新和改进

---

*了解更多信息，请访问 [GLM官网](https://www.glm.xyz/blog/glm-4-128k-release)*`
  }
];

// 生成Markdown文件
function generateMarkdownFile(newsItem) {
  const frontMatter = `---
title: "${newsItem.title}"
description: "${newsItem.description}"
author: "${newsItem.author}"
date: "${newsItem.date}"
image: "${newsItem.image}"
link: "${newsItem.link}"
category: "${newsItem.category}"
tags: ${JSON.stringify(newsItem.tags)}
featured: ${newsItem.featured}
---

`;

  return frontMatter + newsItem.content;
}

// 生成文件名
function generateFileName(newsItem) {
  const date = newsItem.date.replace(/-/g, '');
  const title = newsItem.title.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  return `${date}-${title}.md`;
}

// 主函数
async function migrateNews() {
  const newsDir = path.join(__dirname, '..', 'content-repo', 'news');
  
  console.log('开始迁移新闻数据到Markdown格式...');
  
  for (const newsItem of newsData) {
    const fileName = generateFileName(newsItem);
    const filePath = path.join(newsDir, newsItem.category, fileName);
    
    // 确保目录存在
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // 生成Markdown内容
    const markdownContent = generateMarkdownFile(newsItem);
    
    // 写入文件
    fs.writeFileSync(filePath, markdownContent, 'utf8');
    
    console.log(`✅ 创建新闻文件: ${fileName}`);
  }
  
  console.log('🎉 新闻迁移完成！');
  console.log(`📁 文件位置: ${newsDir}`);
}

// 执行迁移
migrateNews().catch(console.error); 