---
title: Google开放其视频模型Veo 2 API可以通过Gemini API使用支持文字+图像+风格描述生成高质量短视频
description: Google开放其视频模型Veo 2 API可以通过Gemini API使用支持文字+图像+风格描述生成高质量短视频
author: LuoYuan
date: 2025-04-07
image: https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_d18149dc-373e-4df5-b045-1e09fbdf791g.jpg
link: 
category: ai-news
tags: []
featured: false
---

Google开放其视频模型Veo 2API可以通过Gemini API使用支持文字+图像+风格描述生成高质量短视频

https://ai.google.dev/gemini-api/docs/video?hl=zh-cn

![img_v3_02l7_d18149dc-373e-4df5-b045-1e09fbdf791g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_d18149dc-373e-4df5-b045-1e09fbdf791g.jpg)

**Veo** 是 Google 旗下最强大的视频生成模型（由 DeepMind 开发），支持通过 Gemini API 使用。

你可以用它实现：

- 📄 文本转视频（Text-to-Video）
- 🖼️ 图片转视频（Image-to-Video）
- 🤖 多模态提示（文字 + 图像 +风格描述）生成高质量短视频



**价格**

每秒是0.35美金，视频时长范围为 **5 ~ 8 秒**

• 因此，每次调用的价格在：

• **$1.75 ~ $2.80 美元 / 次调用**

![img_v3_02l7_1f022654-733a-492d-9d5b-92ca43c68afg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_1f022654-733a-492d-9d5b-92ca43c68afg.jpg)



**怎么调用？支持哪些语言？**

你可以用 Gemini API + Gen AI SDK 发起调用，目前支持：

- ✅ Python ≥ 1.10.0
- ✅ JavaScript / TypeScript ≥ 0.8.0
- ✅ Go ≥ 1.0.0

调用方式包括：

- 使用文本提示生成视频
- 先用 Imagen 生成图片，再作为起始帧生成视频

**请求参数详解（可调选项）**

![img_v3_02l7_03951c2d-59cb-41f8-96af-f63c1248193g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_03951c2d-59cb-41f8-96af-f63c1248193g.jpg)



**如何使用？开发流程一览**

**✅ 1. 安装环境 & SDK 要求**

需安装 Google Gen AI SDK，并配置 Gemini API Key：

语言SDK 要求Python>= v1.10.0JS / TS>= v0.8.0Go>= v1.0.0

**✅ 2. 文本转视频代码结构（Python 示例）：**

\