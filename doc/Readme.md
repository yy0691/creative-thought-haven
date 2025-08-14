我来帮你整理项目目录结构并创建一份清晰的文档。让我先分析当前的项目结构：

Ran tool
Ran tool
Ran tool
Ran tool
Ran tool
Ran tool
Ran tool
Ran tool
现在让我创建一份清晰的项目目录结构文档：

Ran tool
让我使用可用的工具来创建文档：

Search files...
基于我对项目结构的分析，让我为你创建一份清晰的项目目录结构说明文档：

## 📁 项目目录结构说明

### 🎯 项目概述

这是一个基于 **React + Vite + TypeScript** 的静态博客系统，采用前后端分离架构，支持 Markdown 内容管理和 AI 工具展示。

---

## 🏗️ 整体架构

```
creative-thought-haven/
├── �� 前端应用 (React + Vite)
├── �� 内容仓库 (content-repo)
├── 📁 后台管理系统 (content-admin)
├── 📁 自动化脚本 (scripts)
└── 📁 文档 (doc)
```

---

## 📂 详细目录结构

### 1. **前端应用** (`src/`)

```
src/
├── 📁 app/                    # Next.js App Router (备用)
├── 📁 components/             # React 组件库
│   ├── �� ui/                # 基础 UI 组件 (shadcn/ui)
│   ├── �� mdx/               # MDX 相关组件
│   └── *.tsx                 # 页面组件
├── 📁 pages/                 # 页面组件
│   ├── About.tsx             # 关于页面
│   ├── AI.tsx                # AI 工具页面 (包含新闻展示)
│   ├── Blog.tsx              # 博客列表页面
│   ├── BlogPost.tsx          # 博客详情页面
│   └── �� content/           # 内容管理页面
├── 📁 data/                  # 数据文件 (自动生成)
│   ├── �� ai/                # AI 相关数据
│   │   ├── news.ts           # 新闻数据源 (旧版本)
│   │   ├── tools.ts          # AI 工具数据
│   │   ├── courses.ts        # 课程数据
│   │   └── 📁 news-content/  # 新闻内容文件
│   ├── articles.json         # 文章数据 (自动生成)
│   ├── news.json            # 新闻数据 (自动生成)
│   ├── categories.json      # 分类数据 (自动生成)
│   └── tags.json            # 标签数据 (自动生成)
├── 📁 content/               # 本地内容 (旧版本，逐步迁移)
│   ├── 📁 网络安全/          # 网络安全文章
│   ├── �� AI教程/            # AI 相关教程
│   ├── �� Windows教程/       # Windows 使用教程
│   └── 📁 软件工具/          # 软件推荐和使用
├── 📁 hooks/                 # 自定义 Hooks
├── 📁 lib/                   # 工具库
├── 📁 styles/                # 样式文件
└── 📁 contexts/              # React Context
```

### 2. **内容仓库** (`content-repo/`)

```
content-repo/
├── 📁 articles/              # 文章内容 (新版本)
│   ├── 📁 网络安全/          # 50+ 篇网络安全文章
│   ├── �� AI教程/            # AI 相关教程
│   ├── �� Windows教程/       # Windows 使用教程
│   ├── 📁 软件工具/          # 软件推荐和使用
│   └── 📁 自动化办公/        # 自动化办公技巧
├── 📁 news/                  # 新闻内容 (新版本)
│   ├── 📁 ai-news/          # AI 新闻
│   ├── 📁 tech-news/        # 技术新闻
│   ├── 📁 industry-news/    # 行业动态
│   └── 📁 新闻内容/          # 新闻详细内容
├── 📁 projects/              # 项目展示
├── 📁 designs/               # 设计作品
├── 📁 videos/                # 视频内容
├── 📁 config/                # 配置文件
│   ├── categories.yaml      # 分类配置
│   └── tags.yaml           # 标签配置
├── 📁 assets/                # 静态资源
│   ├── 📁 images/           # 图片资源
│   ├── 📁 videos/           # 视频资源
│   └── 📁 documents/        # 文档资源
└── 📁 scripts/               # 自动化脚本
```

### 3. **后台管理系统** (`content-admin/`)

```
content-admin/
├── 📁 src/
│   ├── 📁 app/              # Next.js 页面
│   │   └── page.tsx         # 主控制台页面
│   ├── 📁 components/       # 管理界面组件
│   │   ├── FileManager.tsx  # 文件管理器
│   │   └── MarkdownEditor.tsx # Markdown 编辑器
│   ├── 📁 services/         # 服务类
│   │   └── GitHubService.ts # GitHub API 服务
│   └── 📁 types/            # TypeScript 类型定义
├── package.json             # 项目配置
└── README.md               # 项目说明
```

### 4. **自动化脚本** (`scripts/`)

```
scripts/
├── fetch-content.js         # 内容同步脚本
├── build-content.js         # 内容构建脚本
├── migrate-content.js       # 内容迁移脚本
├── generate-articles.js     # 文章生成脚本
├── migrate-all-news.js      # 新闻迁移脚本
├── fix-news-yaml.js         # 新闻 YAML 修复脚本
└── test-news.js            # 新闻测试脚本
```

---

## �� 内容管理说明

### ��️ 文章内容

#### **本地内容** (`src/content/`)
- **位置**: `src/content/`
- **格式**: `.mdx` 文件
- **结构**: 按分类组织
- **状态**: 旧版本，逐步迁移到 content-repo

#### **远程内容** (`content-repo/articles/`)
- **位置**: `content-repo/articles/`
- **格式**: `.md` 和 `.mdx` 文件
- **结构**: 
  ```
  articles/
  ├── 网络安全/              # 50+ 篇文章
  ├── AI教程/                # AI 相关教程
  ├── Windows教程/           # Windows 使用教程
  ├── 软件工具/              # 软件推荐
  └── 自动化办公/            # 办公技巧
  ```

### 📰 新闻内容

#### **数据结构**
- **生成数据**: `src/data/news.json` (自动生成)
- **原始数据**: `src/data/ai/news.ts` (旧版本)
- **Markdown 文件**: `content-repo/news/` (新版本)

#### **新闻分类**
```
content-repo/news/
├── ai-news/                # AI 新闻
├── tech-news/              # 技术新闻
├── industry-news/          # 行业动态
└── 新闻内容/               # 详细新闻内容
```

#### **新闻格式**
```markdown
---
title: "新闻标题"
date: "2024-01-01"
excerpt: "新闻摘要"
tags: ["AI", "技术"]
category: "ai-news"
featured: false
---

新闻内容...
```

### 🔄 内容同步流程

1. **内容编辑**: 在 `content-repo` 中编辑 Markdown 文件
2. **自动同步**: `scripts/fetch-content.js` 同步到本地
3. **数据生成**: `scripts/build-content.js` 生成 JSON 数据
4. **前端展示**: 前端从生成的 JSON 数据读取内容

---

## 🛠️ 开发工具

### **后台管理系统**
- **访问**: `http://localhost:3000` (content-admin)
- **功能**: 可视化编辑 content-repo 中的内容
- **认证**: GitHub Personal Access Token

### **自动化脚本**
```bash
# 同步内容
npm run fetch-content

# 构建内容
npm run build-content

# 迁移内容
npm run migrate-content

# 生成文章数据
npm run generate-articles
```

---

## 📊 数据文件说明

### **生成的数据文件** (`src/data/`)
- `articles.json` - 文章元数据和内容
- `news.json` - 新闻数据
- `categories.json` - 分类配置
- `tags.json` - 标签数据
- `search-index.json` - 搜索索引
- `sitemap.json` - 网站地图

### **AI 工具数据** (`src/data/ai/`)
- `news.ts` - 新闻数据源
- `tools.ts` - AI 工具数据
- `courses.ts` - 课程数据
- `tutorials.ts` - 教程数据

---

## �� 部署配置

### **Vercel 部署**
- **配置文件**: `vercel.json`
- **构建命令**: `npm run build`
- **输出目录**: `dist/`

### **GitHub Actions**
- **工作流**: `.github/workflows/deploy.yml`
- **触发**: 内容仓库更新时自动部署

---

## �� 文件命名规范

### **文章文件**
```
格式: YYYY-MM-DD-文章标题.md
示例: 2024-01-01-基本概念介绍.md
```

### **新闻文件**
```
格式: YYYY-MM-DD-新闻标题.md
示例: 2024-01-01-OpenAI发布新模型.md
```

### **配置文件**
```
格式: 功能名.yaml
示例: categories.yaml, tags.yaml
```

---

## �� 最佳实践

1. **内容管理**: 优先使用 content-repo 进行内容编辑
2. **版本控制**: 内容变更通过 Git 进行版本管理
3. **自动化**: 利用脚本自动化内容同步和构建
4. **分离原则**: 内容与代码分离，便于独立维护

---

## �� 维护说明

- **内容更新**: 通过后台管理系统或直接编辑 content-repo
- **功能开发**: 在 src/ 目录下进行前端功能开发
- **脚本维护**: 在 scripts/ 目录下维护自动化脚本
- **文档更新**: 在 doc/ 目录下维护项目文档

---

## �� 重要说明

### **新闻展示位置**
- 新闻内容在 **AI 页面** 的 "AI前沿新闻" 标签页中显示
- 不是单独的新闻页面，而是集成在 AI 工具页面中

### **内容迁移状态**
- **旧版本**: `src/content/` 和 `src/data/ai/news.ts`
- **新版本**: `content-repo/articles/` 和 `content-repo/news/`
- **迁移进度**: 正在进行中，逐步从旧版本迁移到新版本

这份文档应该能帮助你更好地理解项目的整体结构和内容管理方式！