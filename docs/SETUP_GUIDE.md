# 功能配置指南

本文档介绍如何配置博客的各项新功能。

## ✅ 已完成的功能

### 1. 笔记和标注系统 ✅
- **文章中添加笔记**：选中文本即可高亮并添加笔记
- **高亮文本保存**：所有高亮自动保存到本地存储
- **笔记管理中心**：访问 `/notes` 查看和管理所有笔记
- **导出笔记为Markdown**：支持单篇文章导出和全部笔记导出

**使用方式**：
1. 在任意博客文章页面选中文字
2. 在弹出的菜单中选择高亮颜色或添加笔记
3. 点击"我的笔记"按钮查看当前文章的笔记
4. 访问 `/notes` 管理所有笔记

### 2. 评论系统（Giscus）✅
基于GitHub Discussions的评论系统，免费且易于使用。

**配置步骤**：

1. **启用GitHub Discussions**
   - 进入你的GitHub仓库
   - 点击 Settings
   - 勾选 Discussions

2. **获取Giscus配置**
   - 访问 https://giscus.app/zh-CN
   - 输入你的仓库地址（格式：username/repo）
   - 选择讨论分类（推荐创建一个"Comments"分类）
   - 复制生成的配置信息

3. **配置环境变量**
   编辑 `.env` 文件，添加以下内容：
   ```bash
   VITE_GISCUS_REPO="你的GitHub用户名/仓库名"
   VITE_GISCUS_REPO_ID="你的仓库ID"
   VITE_GISCUS_CATEGORY="讨论分类名称"
   VITE_GISCUS_CATEGORY_ID="分类ID"
   ```

4. **重启服务**
   ```bash
   npm run dev
   ```

**效果**：
- 每篇文章底部会显示评论区
- 读者可以通过GitHub账号登录并评论
- 支持Markdown、表情符号和代码高亮
- 自动跟随主题（明暗模式）

### 3. 订阅通知系统 ✅
支持邮件订阅和RSS订阅两种方式。

**RSS订阅**（无需配置）：
- RSS Feed文件：`/rss.xml`
- 自动生成，包含最新文章
- 用户可使用Feedly、Inoreader等RSS阅读器订阅

**邮件订阅**（可选配置）：
目前邮件订阅请求会保存到本地存储，如需实现真正的邮件发送，可选择：

**方案A：使用Resend（推荐）**
1. 注册 https://resend.com
2. 获取API密钥
3. 在 `.env` 中配置：
   ```bash
   VITE_RESEND_API_KEY="re_xxxxx"
   ```

**方案B：使用Buttondown**
1. 注册 https://buttondown.email
2. 获取API密钥
3. 在 `.env` 中配置：
   ```bash
   BUTTONDOWN_API_KEY="your-key"
   ```

**效果**：
- 博客页面顶部显示订阅表单
- 支持邮件订阅和RSS订阅
- 用户友好的订阅界面

### 4. AI工具对比功能 ✅
强大的AI工具对比页面，帮助用户选择最合适的工具。

**访问路径**：`/ai/compare`

**功能特性**：
- 搜索和选择AI工具（最多3个）
- 并排对比功能、价格、优缺点
- 查找相似工具和替代品
- URL参数支持（可分享对比链接）

**使用方式**：
1. 访问 `/ai/compare`
2. 搜索或浏览AI工具列表
3. 选择最多3个工具进行对比
4. 查看详细的对比表格
5. 点击"找替代品"发现相似工具

**从AI页面快速访问**：
- 在导航栏点击"人工智能"
- 顶部会显示"工具对比"入口

### 5. 成就系统 ✅
游戏化的阅读激励系统。

**访问路径**：`/achievements`

**成就类型**：
- 点赞成就：初识点赞、点赞达人、点赞大师
- 阅读成就：初次阅读、阅读爱好者、阅读大师
- 时长成就：时光旅人、书虫、学者
- 笔记成就：笔记新手、笔记达人、笔记大师

**特性**：
- 实时解锁通知
- 进度追踪
- 精美的成就徽章
- 自动统计用户行为

## 📱 快捷导航

新增的快捷功能链接（移动端菜单中）：
- **AI工具对比** → `/ai/compare`
- **我的笔记** → `/notes`
- **成就系统** → `/achievements`

## 🎨 用户体验优化

### 深色模式支持
所有新功能都完美支持深色模式：
- 评论系统自动切换主题
- 笔记界面适配暗色
- 订阅表单响应主题变化

### 响应式设计
所有功能在移动端和桌面端都有优化：
- 触摸友好的交互
- 自适应布局
- 移动端优化的菜单

### 本地存储
以下数据保存在浏览器本地：
- 笔记和高亮（localStorage）
- 阅读历史（localStorage）
- 成就进度（localStorage）
- 订阅请求（临时，localStorage）

## 🚀 快速开始

1. **克隆项目并安装依赖**
   ```bash
   npm install
   ```

2. **配置环境变量**
   复制 `.env.example` 为 `.env` 并填写配置

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **访问功能**
   - 博客文章：http://localhost:5000/blog
   - 笔记中心：http://localhost:5000/notes
   - AI对比：http://localhost:5000/ai/compare
   - 成就系统：http://localhost:5000/achievements

## 📝 待完善功能

以下功能框架已搭建，可根据需要进一步完善：

### 系列文章标记和导航
- 在文章frontmatter中添加 `series` 字段
- 自动生成系列导航
- 显示上一篇/下一篇

### 每周精选内容
- 创建精选标记系统
- 定期更新推荐内容
- 添加"编辑推荐"标签

### 实战案例模板
- 创建案例文章模板
- 统一案例展示格式
- 添加代码示例和演示

## 🐛 故障排查

### 评论系统不显示
- 检查 `.env` 文件中的Giscus配置
- 确认GitHub仓库已启用Discussions
- 查看浏览器控制台错误信息

### 笔记无法保存
- 检查浏览器是否允许localStorage
- 清除浏览器缓存后重试
- 确认没有隐私模式限制

### RSS订阅链接404
- 运行 `npm run build:content` 生成RSS
- 确认 `public/rss.xml` 文件存在
- 重启开发服务器

## 📚 更多资源

- Giscus官网：https://giscus.app
- Resend文档：https://resend.com/docs
- RSS规范：https://www.rssboard.org/rss-specification

---

**版本**: v2.0.0  
**更新日期**: 2025-01-11  
**维护者**: LuoYuan
