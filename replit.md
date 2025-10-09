# Creative Thought Haven - 个人博客与作品集平台

## Overview

Creative Thought Haven 是一个基于 React + Vite 构建的现代化静态博客与作品集网站。项目采用 Markdown 为核心内容管理方式，通过自动化脚本将内容转换为静态数据，实现高性能的内容展示。网站支持博客文章、AI 工具资讯、项目展示、设计作品和视频内容等多种内容形态。

核心特点：
- 静态站点生成（SSG）架构，部署简单、性能优异
- Markdown/MDX 驱动的内容管理系统
- 多模态内容支持（文章、新闻、项目、设计、视频）
- AI 工具与资源导航系统
- 响应式设计，支持暗色模式

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### October 9, 2025 - AI-Powered Chinese Translation Integration
- Successfully integrated Google Gemini API for automated Chinese translation and summarization
- Implemented multi-account API key rotation system (3 Gemini accounts for 4,500 requests/day total)
- Created `scripts/ai-service.js` with GeminiService class supporting:
  - Automatic API key rotation across 3 accounts
  - Retry logic with exponential backoff for 503 errors
  - Chinese title translation, summary generation, and key point extraction
- Extended data schema with Chinese fields (title_zh, summary_zh, key_points)
- Updated `scripts/fetch-ai-news-auto.js` to automatically translate new articles
- Modified frontend components (AI.tsx, SmallCard, LargeCard) to prioritize Chinese content
- Added graceful fallback to English when translation fails
- Successfully tested end-to-end workflow with live news articles

### October 9, 2025 - AI News Automation YAML Fix
- Fixed critical YAML parsing error in AI news automation system
- Problem: Article titles with special characters (colons, quotes, etc.) caused YAML frontmatter parsing to fail
- Solution: Added `escapeYamlValue()` function to properly escape and quote YAML values
- Updated `scripts/fetch-ai-news-auto.js` to use proper YAML escaping for all frontmatter fields
- Created `scripts/fix-yaml-frontmatter.js` to repair all 65 existing markdown files
- Build process now runs successfully without YAML parsing errors

### October 9, 2025 - Vercel to Replit Migration
- Successfully migrated project from Vercel to Replit
- Updated Vite configuration for Replit compatibility:
  - Server and preview now bind to `0.0.0.0` for external access
  - Dynamic PORT environment variable support (`process.env.PORT || 5000`)
  - Added file watching with polling for Replit's filesystem
- Removed Vercel-specific dependencies (`@vercel/speed-insights`)
- Fixed WebGL compatibility issue in SplashCursor component (graceful fallback)
- Configured deployment settings for Replit Autoscale
- Cleaned up multiple package manager lockfiles (kept npm)

## System Architecture

### 前端技术栈
- **框架**: React 18 + Vite (快速构建工具)
- **路由**: React Router v6 (客户端路由)
- **UI 组件库**: 
  - Radix UI (无障碍组件基础)
  - shadcn/ui (基于 Radix 的组件系统)
  - Material-UI (@mui/material, @mui/icons-material)
- **样式方案**: 
  - Tailwind CSS (实用优先的 CSS 框架)
  - CSS 变量主题系统
  - 支持亮色/暗色模式切换
- **状态管理**: 
  - React Query (@tanstack/react-query) 用于异步状态
  - React Context 用于全局状态（主题、光标效果等）

### 内容管理架构

**内容存储方式**:
- 所有内容以 Markdown/MDX 文件存储在 `/content` 目录
- 内容按类型分类：
  - `/content/ai-news/` - AI 前沿新闻
  - `/content/projects/` - 项目展示
  - `/content/designs/` - 设计作品
  - `/content/videos/` - 视频内容
  - `/content/ai/` - AI 工具与资源链接

**构建流程**:
1. Markdown 文件包含 Front Matter (YAML 元数据) + 正文内容
2. 构建脚本 (`scripts/build-*.js`) 读取并解析 Markdown
3. 使用 `gray-matter` 提取元数据，生成 JSON 数据文件
4. 输出到 `/src/data/**/generated-*.json`
5. 前端通过自定义 Hooks 读取这些 JSON 数据

**关键构建脚本**:
- `build-ai-news.js` - 处理 AI 新闻（支持自动抓取封面图和描述）
- `build-projects.js` - 处理项目数据
- `build-designs.js` - 处理设计作品
- `build-videos.js` - 处理视频内容
- `build-ai-sections.js` - 处理 AI 工具分类链接

**AI新闻自动化系统**:
- `fetch-ai-news-auto.js` - 自动从配置的RSS源抓取AI新闻并生成Markdown文件
- `config/ai-news-sources.json` - RSS源配置文件（新闻源、抓取设置）
- `fix-yaml-frontmatter.js` - 修复现有Markdown文件的YAML格式问题
- 自动化流程：
  1. 从RSS源获取最新文章
  2. 提取元数据（标题、描述、日期、标签等）
  3. 自动抓取文章封面图（通过Open Graph元数据）
  4. 生成带有正确YAML frontmatter的Markdown文件
  5. 避免重复创建（基于文件名slug检测）
  6. 支持特殊字符自动转义（冒号、引号等）

### 数据流设计

```
Markdown 源文件 (content/)
    ↓ (gray-matter 解析)
构建脚本 (scripts/build-*.js)
    ↓ (生成 JSON)
静态数据文件 (src/data/**/generated-*.json)
    ↓ (导出为模块)
索引文件 (src/data/**/index.ts)
    ↓ (React Hooks)
自定义 Hooks (src/hooks/useContent.ts 等)
    ↓
React 组件展示
```

**数据获取 Hooks**:
- 前端通过统一的 Hooks 接口获取数据
- 支持过滤、排序、分页等功能
- 数据在构建时已完全静态化，无需运行时处理

### MDX 支持与处理

**MDX 配置** (vite.config.ts):
- 使用 `@mdx-js/rollup` 插件处理 MDX 文件
- 支持的插件：
  - `remark-gfm` - GitHub 风格 Markdown
  - `remark-frontmatter` - Front Matter 支持
  - `remark-mdx-frontmatter` - MDX Front Matter 导出
  - `rehype-slug` - 自动生成标题 ID
  - `rehype-autolink-headings` - 标题自动链接

**内容渲染**:
- MDX 文件支持内嵌 React 组件
- 通过 `@mdx-js/react` 提供组件上下文
- 允许在 Markdown 中使用交互式组件

### 路由架构

**主要路由**:
- `/` - 首页
- `/about` - 关于页面
- `/blog` - 博客列表
- `/blog/:slug` - 博客详情
- `/portfolio` - 项目作品集
- `/portfolio/:id` - 项目详情
- `/designs` - 设计作品
- `/designs/:id` - 设计详情
- `/ai` - AI 工具与新闻页面
- `/videos/:id` - 视频详情
- `/content/*` - 内容管理页面（管理功能）

**懒加载策略**:
- 所有页面组件使用 `React.lazy()` 进行代码分割
- 通过 `<Suspense>` 提供加载状态
- 减小初始加载包体积

### 主题系统

**实现方式**:
- 使用 CSS 变量 + Tailwind CSS
- 通过 `ThemeProvider` (Context) 管理主题状态
- 支持系统主题自动检测
- 持久化存储用户偏好

**CSS 变量定义** (src/index.css):
- 定义了完整的颜色系统变量
- 支持亮色/暗色两套配色方案
- 使用 HSL 颜色空间便于调整

### 特效与交互

**光标特效** (SplashCursor):
- 自定义光标跟随效果
- 仅在首页和关于页面显示
- 使用 Canvas 实现粒子效果
- 通过 Context 管理状态

**图片查看器**:
- 全局图片点击放大功能
- 使用 `ImageViewerProvider` 提供上下文
- 支持图片缩放、拖拽等交互

### 性能优化策略

1. **代码分割**:
   - 路由级别的懒加载
   - 按需加载页面组件
   
2. **资源优化**:
   - 图片压缩配置 (image.config.js)
   - 支持 WebP 格式
   - 配置图片质量参数

3. **构建优化**:
   - 使用 Vite 的快速 HMR
   - 生产构建时自动优化
   - Tree-shaking 移除未使用代码

4. **缓存策略**:
   - 静态数据在构建时生成
   - 利用浏览器缓存
   - 配置了缓存控制头 (index.html)

### 错误处理

**Error Boundary**:
- 全局错误边界组件
- 捕获渲染错误并显示友好提示
- 提供错误恢复机制

**404 处理**:
- 自定义 404 页面组件
- 提供导航回到首页功能

### SEO 优化

**元数据管理** (index.html):
- 完整的 meta 标签配置
- Open Graph 协议支持
- Twitter Card 支持
- 结构化数据标记

**标题管理** (titleManager):
- 动态页面标题更新
- 自动添加站点名称后缀
- 路由变化时自动更新

## External Dependencies

### 核心依赖

**React 生态**:
- `react` & `react-dom` (v18) - 核心框架
- `react-router-dom` - 客户端路由
- `@tanstack/react-query` - 异步状态管理与缓存

**构建工具**:
- `vite` - 现代化构建工具
- `@vitejs/plugin-react-swc` - React + SWC 编译
- `typescript` - 类型系统

**UI 组件库**:
- `@radix-ui/*` - 无障碍组件原语（17+ 组件包）
- `@mui/material` & `@mui/icons-material` - Material Design 组件
- `@emotion/react` & `@emotion/cache` - CSS-in-JS 方案

**样式工具**:
- `tailwindcss` - 实用优先的 CSS 框架
- `autoprefixer` - CSS 自动前缀
- `postcss` & `postcss-import` - CSS 处理

**内容处理**:
- `@mdx-js/rollup`, `@mdx-js/react`, `@mdx-js/loader` - MDX 支持
- `gray-matter` - Front Matter 解析
- `remark-gfm`, `remark-frontmatter` - Markdown 插件
- `rehype-slug`, `rehype-autolink-headings` - HTML 处理插件

**辅助工具**:
- `axios` - HTTP 客户端（用于构建时抓取元数据）
- `cheerio` - HTML 解析（用于抓取网页信息）
- `class-variance-authority` - 类名变体管理
- `clsx` & `tailwind-merge` - 类名合并工具

### 部署平台

**Replit Deployment** (Current):
- Deployment Type: Autoscale (stateless, scales automatically)
- Build Command: `npm run build`
- Run Command: `npm run preview`
- Port Configuration: Uses dynamic `PORT` environment variable
- Host: Binds to `0.0.0.0` for external access
- Build Output: `dist/` directory

**Legacy Platforms** (Deprecated):
- Cloudbase (腾讯云) - 配置文件: `cloudbase.json`
- Vercel - 配置文件: `vercel.json`

### 开发工具

**代码质量**:
- `eslint` - 代码检查
- `typescript-eslint` - TypeScript 检查规则
- `eslint-plugin-react-hooks` - React Hooks 规则
- `eslint-plugin-react-refresh` - React Refresh 规则

**类型定义**:
- `@types/react` & `@types/react-dom` - React 类型
- `@types/node` - Node.js 类型

### 表单与验证

- `react-hook-form` - 表单状态管理
- `@hookform/resolvers` - 表单验证解析器
- `zod` - Schema 验证库（推断）

### 第三方服务

**内容抓取**:
- 构建时通过 Axios + Cheerio 自动抓取文章封面图和描述
- 支持 Open Graph 元数据提取
- User-Agent 模拟真实浏览器请求

**图标**:
- `lucide-react` - 图标库（推断）
- Material Icons - 通过 @mui/icons-material

### 配置文件说明

- `components.json` - shadcn/ui 组件配置
- `tailwind.config.ts` - Tailwind 配置
- `tsconfig.json` - TypeScript 配置
- `vite.config.ts` - Vite 构建配置
- `eslint.config.js` - ESLint 配置

### 注意事项

1. 项目使用 ES Modules (type: "module")
2. 支持严格模式的 TypeScript（部分关闭以兼容快速开发）
3. 所有内容数据在构建时生成，运行时为纯静态
4. 新闻数据支持自动抓取元信息，需要网络访问
5. 项目不依赖传统数据库，所有数据来自 Markdown 文件