---
title: 概述
description: 概述...
author: LuoYuan
date: 2025-04-11
image: https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_e1a2b05a-b4a3-47ce-b2dd-f0d88ba3345g.jpg
link: 
category: ai-news
tags: []
featured: false
---
在线体验： https://app.immersivetranslate.com/babel-doc/

**BabelDOC** 是一个基于大语言模型（如GPT-4）的开源 **PDF 文档翻译工具**，它可以：

> ✅ 把英文 PDF 翻译成中文，
>
> ✅ 翻译结果要像原文一样排版漂亮，
>
> ✅ 还能“对照阅读”原文和翻译，
>
> ✅ 支持自部署，支持离线使用！

## 概述

### **主要特点**

- **结构感知**翻译（保留原始排版）
- **LLM 接入灵活**（支持 OpenAI 类接口）
- **自部署能力强**（支持 **在线使用、命令行使用、自部署与 Python API 接入**）
- **插件式架构**（方便扩展 OCR、段落分组等）

该项目优于传统基于 Word/PDF 的翻译流程，是中高端科研、出版、出海文档处理首选方案之一。

![img_v3_02l8_e1a2b05a-b4a3-47ce-b2dd-f0d88ba3345g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_e1a2b05a-b4a3-47ce-b2dd-f0d88ba3345g.jpg)

### **主要功能**

![img_v3_02l8_6a4b4f0a-c09e-401e-a710-e9056a85393g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_6a4b4f0a-c09e-401e-a710-e9056a85393g.jpg)



- 🧾 支持中英翻译（支持英文→中文，基本支持中文→英文）
- 📄 保留页面结构、图表、段落、字体排版等
- 📦 一键生成双语 PDF（并排或交替展示）
- 🧰 提供命令行 + Python API + Web 页面三种方式使用
- 🔧 支持自定义配置（包括模型、页码、输出格式）
- 🚫 不依赖传统翻译引擎（如 Google/Bing），完全 LLM 驱动
- 🌐 支持连接多种兼容 OpenAI 接口的模型（支持本地模型如 Ollama）

![img_v3_02l8_56c98187-29e6-40ba-9f68-87629d7df9eg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_56c98187-29e6-40ba-9f68-87629d7df9eg.png)

![img_v3_02l8_95ede232-e5f3-4aa0-be0c-0fb44b0acffg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_95ede232-e5f3-4aa0-be0c-0fb44b0acffg.png)

![img_v3_02l8_34402023-172a-49f4-aeea-18301e7aeeag](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_34402023-172a-49f4-aeea-18301e7aeeag.png)

### **高级特性**

![img_v3_02l8_e4cf07c7-325c-44fa-aa81-1b41660d12cg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_e4cf07c7-325c-44fa-aa81-1b41660d12cg.jpg)

### **CLI 功能详解（babeldoc）**

![img_v3_02l8_51187a7b-2902-4e65-8a0b-b4d250372b3g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_51187a7b-2902-4e65-8a0b-b4d250372b3g.jpg)

- --pages: 指定翻译页码范围（如 1-5, 7, 10-）
- --lang-in / --lang-out: 设置原文/目标语言（如 en ➜ zh）
- --watermark-output-mode: 输出是否含水印 / 输出多个版本
- --use-alternating-pages-dual: 是否交替页展示中英文
- --max-pages-per-part: 对长文自动分页翻译
- --skip-clean: 跳过清理步骤（提升兼容性）
- --disable-rich-text-translate: 关闭加粗/斜体等复杂文本翻译
- --translate-table-text: 启用表格翻译（实验性）

支持通过 .toml 配置文件集中管理以上参数。

## **适合谁用？**

![img_v3_02l8_a63eebfa-d9c8-4819-8e71-940ef9f60dbg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_a63eebfa-d9c8-4819-8e71-940ef9f60dbg.jpg)

## **🚀 怎么用？**

### **方式一：网页版（简单）**

- 网站入口：[BabelDOC 在线版](https://funstory-ai.github.io/BabelDOC/)
- 每月免费翻译 1000 页
- 不需要安装任何东西

### **方式二：命令行（适合开发者）**

\