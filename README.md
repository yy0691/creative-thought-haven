# Creative Thought Haven

🎆 个人博客 & 作品集 - 基于 React + Vite + Markdown 构建的静态网站

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📝 写作流程

### 1. 在飞书中写作
- 使用你熟悉的飞书编辑器写作

### 2. 导出 Markdown
- 安装 Chrome 插件：**Cloud Document Converter**
- 在飞书文档页面右键 → “下载为 Markdown”

### 3. 添加文章信息
在 VS Code 中打开 `.md` 文件，输入 `blog` + Tab 键自动生成：

```markdown
---
title: "文章标题"
date: 2025-09-23
description: "文章描述"
tags: ["产品管理"]
---

# 你的文章内容
```

### 4. 发布文章
```bash
# 将文件保存到
git add .
git commit -m "新增文章：产品思考"
git push
```

✨ Vercel 会自动部署，2-3分钟后文章上线！

## 📁 项目结构

```
creative-thought-haven/
├── src/
│   ├── components/      # UI 组件
│   ├── pages/           # 页面
│   └── lib/             # 工具函数
├── content/
│   ├── articles/        # 博客文章 (.md)
│   ├── projects/        # 项目介绍
│   └── designs/         # 设计作品
└── public/              # 静态资源
```

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI 组件**: shadcn/ui + Tailwind CSS
- **路由**: React Router
- **内容管理**: Markdown + Gray Matter
- **部署平台**: Vercel

## 📝 VS Code Snippet 配置

1. 按 `Ctrl+Shift+P` 打开命令面板
2. 搜索 "Configure User Snippets"
3. 选择 "markdown"
4. 添加以下内容：

```json
{
  "Blog Frontmatter": {
    "prefix": "blog",
    "body": [
      "---",
      "title: \"${1:$TM_FILENAME_BASE}\"",
      "date: $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
      "description: \"${2:文章描述}\"",
      "tags: [\"${3:产品管理}\"]",
      "---",
      "",
      "$0"
    ],
    "description": "博客文章 frontmatter"
  }
}
```

## 🔗 相关链接

- **网站地址**: [luoyuanai.cn](https://luoyuanai.cn)
- **部署平台**: Vercel
- **Chrome 插件**: [Cloud Document Converter](https://chromewebstore.google.com/detail/cloud-document-converter/)

---

❤️ Made with ❤️ by LuoYuan