---
title: DeepChat开源跨平台LLM聊天助手
description: 本文详细介绍了DeepChat开源跨平台桌面应用程序，该程序将多个强大的大语言模型(LLM)和本地工具集成到一个易用、功能强大的智能聊天助手中，支持多模型切换、本地文件处理、插件式搜索引擎等功能。
author: LuoYuan
date: 2025-04-16
image: https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02la_f7d6ec20-07e0-4a39-a625-eefffdfb041g.png
link: https://github.com/deepchat-org/deepchat
category: ai-news
tags: [DeepChat, LLM, 开源应用, 跨平台, 桌面应用, 文件解析, Markdown支持, 本地部署, 聊天助手, AI工具]
featured: false
---
**DeepChat** 是一个开源的跨平台桌面应用程序，旨在将多个强大的大语言模型（LLM）和本地工具集成到一个易用、功能强大的智能聊天助手中。它支持：

- 连接主流云端 LLM（如 OpenAI、Gemini 等）；
- 本地部署模型（如 Ollama）；
- 支持 Markdown、代码、Latex、文件解析、搜索等功能；
- 可在 Windows、macOS、Linux 上运行。

![img_v3_02la_f7d6ec20-07e0-4a39-a625-eefffdfb041g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02la_f7d6ec20-07e0-4a39-a625-eefffdfb041g.png)



它的口号是：**连接强大 AI 与你的个人世界**。

**核心功能特点**

![img_v3_02la_adddfffa-3c25-4f4f-a9c7-829db191040g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02la_adddfffa-3c25-4f4f-a9c7-829db191040g.jpg)

**🔑 1. 多模型支持（模型灵活切换）**

✅ **支持接入以下主流 AI 模型服务：**

![img_v3_02la_023a86cb-c550-4d7a-9a57-44d9d2b0056g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02la_023a86cb-c550-4d7a-9a57-44d9d2b0056g.jpg)

![img_v3_02la_3ec7b173-a413-4cfa-938d-ca29126e3b1g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02la_3ec7b173-a413-4cfa-938d-ca29126e3b1g.jpg)

✨ 支持自定义 OpenAI / Gemini 风格 API 接口，**兼容性强**，可轻松对接企业/私人模型服务。

**💻 2. 多平台支持（可跨设备运行）**

- 支持 **Windows / macOS / Linux** 三大平台；
- 使用 **Electron** 构建，安装方式简单，用户体验一致；
- 前端界面美观清晰，操作直观友好。



**🧵 3. 多对话并发（多窗口聊天）**

- 支持同时打开多个聊天会话；
- **对话互不干扰**，可随时切换；
- 无需等待模型回复就能开启新话题，**极大提升效率**。

![img_v3_02la_c5c1a4b3-a508-44d9-b972-685aba07293g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02la_c5c1a4b3-a508-44d9-b972-685aba07293g.png)



**📄 4. 本地文件处理能力**

✅ 支持用户上传并解析本地文件，如：

- .txt / .md / .pdf 文件
- AI 自动读取文件内容，支持：
  - 摘要生成
  - 问答互动
  - 信息提取
- 实现“**问文档、读资料**”式对话体验。



**🌐 5. 插件式搜索引擎（联网检索 + AI 解读）**

- 提供 **自定义搜索引擎集成**功能；
- 支持用户提出问题 → 自动联网搜索 → AI 总结搜索内容 → 给出回答；
- **无需额外配置 API 接口**，模型自动处理搜索结果。

![img_v3_02la_49d7003a-f6f8-4cf2-a372-3b625f9b04bg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02la_49d7003a-f6f8-4cf2-a372-3b625f9b04bg.png)



**🧩 6. Markdown 与代码支持**

- 聊天窗口支持完整的 **Markdown 渲染**；
- 支持 **代码高亮、代码块输出**，非常适合开发者使用；
- 支持 Latex 数学公式渲染。

![img_v3_02la_1a218fc9-7365-419a-94c8-f87112a3828g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02la_1a218fc9-7365-419a-94c8-f87112a3828g.png)



**📦 7. 本地运行 & 聊天记录存储**

- 所有聊天记录默认保存在本地，**数据私有、可导出备份**；
- 不依赖网络也能与模型互动（配合 Ollama 使用）；
- 对隐私有高要求的用户特别友好。



**🔎 8. 多模态模型支持（图文、音视频潜力）**

虽然当前重点是文本对话，但架构预留了多模态接口，支持将来扩展至：

- 图像输入（如图片识别）
- 多轮对话（带上下文记忆）
- 音频/视频（未来扩展方向）



**🧠 9. Artifact 支持**

- 模型可根据上下文生成附属内容，如代码片段、文档、摘要、表格等；
- 可以将这些“副产物”结构化保存，用于后续引用或导出。

![img_v3_02la_a2fc0dc2-73b8-4849-9523-f03eae28b32g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02la_a2fc0dc2-73b8-4849-9523-f03eae28b32g.jpg)





GitHub：https://github.com/ThinkInAIXYZ/deepchat

在线体验：https://deepchat.thinkinai.xyz/