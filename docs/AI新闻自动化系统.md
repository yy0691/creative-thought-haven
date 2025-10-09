# AI新闻自动化系统使用指南

## 📋 系统概述

这个自动化系统可以从多个优质AI新闻源自动获取最新内容，并生成Markdown文件，无需手动创建新闻文章。

## 🚀 快速开始

### 1. 手动运行一次获取新闻

```bash
npm run fetch:news
```

这个命令会：
- 从配置的RSS源获取最近7天的AI新闻
- 每个新闻源最多获取3篇文章
- 自动生成Markdown文件到 `content/ai-news/`
- 自动提取标题、描述、图片、链接等信息
- 自动运行构建脚本更新JSON数据

### 2. 配置新闻源

编辑 `config/ai-news-sources.json`：

```json
{
  "sources": [
    {
      "name": "OpenAI Blog",
      "url": "https://openai.com/blog/feed",
      "category": "ai-research",
      "enabled": true
    }
  ],
  "settings": {
    "maxArticlesPerSource": 3,
    "daysToLookBack": 7,
    "author": "LuoYuan",
    "defaultImage": "你的默认图片URL"
  }
}
```

**配置说明：**
- `enabled`: 设为 `false` 可以禁用某个新闻源
- `maxArticlesPerSource`: 每个源最多获取的文章数量
- `daysToLookBack`: 只获取最近N天的文章
- `author`: 自动生成文章的作者名称

## 📰 已配置的新闻源

### AI研究机构
- ✅ OpenAI Blog
- ✅ Google AI Blog  
- ✅ DeepMind Blog
- ✅ Meta AI Research

### 科技媒体
- ✅ VentureBeat AI
- ✅ TechCrunch AI
- ✅ MIT Technology Review AI
- ✅ The Verge AI

## 🔄 设置定时自动更新

### 方案1: 使用Replit的Scheduled Tasks（推荐）

在Replit中配置定时任务：
1. 打开 Tools > Secrets
2. 配置环境变量（如果需要）
3. 使用Replit的cron功能定时运行 `npm run fetch:news`

### 方案2: 手动定期运行

建议每天运行一次：
```bash
npm run fetch:news
```

## 📁 生成的文件格式

自动生成的Markdown文件示例：

```markdown
---
title: DeepSeek V3 模型发布
description: 本文介绍了DeepSeek V3的新功能...
author: LuoYuan
date: 2025-04-11
image: https://example.com/image.jpg
link: https://www.deepseek.com/blog/v3
category: ai-news
tags: ["AI", "DeepSeek", "模型发布"]
featured: false
source: OpenAI Blog
---

## DeepSeek V3 模型发布

[文章内容...]

### 原文链接
[查看原文](https://www.deepseek.com/blog/v3)

---
*本文由自动化系统从 OpenAI Blog 抓取生成*
```

## 🛠️ 高级功能

### 添加新的新闻源

在 `config/ai-news-sources.json` 中添加：

```json
{
  "name": "新闻源名称",
  "url": "RSS Feed URL",
  "category": "ai-research 或 ai-industry",
  "enabled": true
}
```

### 过滤重复文章

系统会自动检查文件是否已存在，跳过重复的文章。

### 自定义内容

如果需要手动调整自动生成的文章：
1. 运行 `npm run fetch:news` 获取新文章
2. 在 `content/ai-news/` 中找到对应的Markdown文件
3. 手动编辑内容和元数据
4. 运行 `npm run build:content` 重新构建

## 🐛 故障排除

### 问题1: RSS源无法访问
- 检查网络连接
- 某些RSS源可能需要VPN
- 可以在配置中禁用有问题的源

### 问题2: 图片无法获取
- 系统会使用默认图片
- 可以手动编辑Markdown文件添加图片URL

### 问题3: 内容格式问题
- 检查RSS源返回的数据格式
- 调整 `scripts/fetch-ai-news-auto.js` 中的解析逻辑

## 📊 监控和维护

### 查看自动化日志
运行时会显示详细日志：
- ✅ 成功创建的文章
- ⏭️ 跳过的已存在文章
- ❌ 失败的操作

### 定期维护建议
1. 每周检查一次配置的RSS源是否正常
2. 定期更新 `daysToLookBack` 设置
3. 根据需要调整 `maxArticlesPerSource`
4. 清理过期的新闻文件（可选）

## 💡 最佳实践

1. **首次运行**：先设置 `maxArticlesPerSource: 1` 测试
2. **逐步增加**：确认无误后再增加文章数量
3. **定期检查**：每周查看生成的内容质量
4. **手动优化**：对重要文章进行人工编辑和优化
5. **备份配置**：保存好你的 `ai-news-sources.json` 配置

## 🔗 相关文件

- `config/ai-news-sources.json` - 新闻源配置
- `scripts/fetch-ai-news-auto.js` - 自动化脚本
- `scripts/build-ai-news.js` - 构建脚本
- `content/ai-news/` - 新闻文章目录

---

现在你可以专注于内容策划，让系统自动处理繁琐的新闻采集工作！🎉
