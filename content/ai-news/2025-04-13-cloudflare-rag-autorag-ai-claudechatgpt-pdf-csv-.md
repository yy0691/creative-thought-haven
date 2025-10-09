---
title: AutoRAG
description: Cloudflare 推出了一个全托管的 RAG 系统：AutoRAG ，让你可以很容易地让 AI（如 Claude、ChatGPT）连接你的数据源，读懂你自己的资料，比如 PDF 文...
author: LuoYuan
date: Sun Apr 13 2025 00:00:00 GMT+0000 (Coordinated Universal Time)
image: "https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l5_0fe18e3c-e16f-4e1c-8d36-ba36d10cc93g.jpg"
link: ""
category: ai-news
tags: []
featured: false
source: ""
---

Cloudflare 推出了一个全托管的 **RAG 系统**：**AutoRAG** ，让你可以很容易地让 AI（如 Claude、ChatGPT）连接你的数据源，读懂你自己的资料，比如 PDF 文档、网页、图片、CSV 表格等，并且能“根据这些内容给你更精准和准确的回答”。

- **完全托管 RAG 系统**：无需搭建繁琐流程
- **支持网页内容 ingestion**：通过 Worker+Browser API 轻松抓取网页
- **灵活集成**：可作为 Claude 等工具的智能问答底座
- **面向开发者的控制能力**：AI Gateway、可视化调试、日志监控

**背景：RAG 是什么？为何需要 AutoRAG？**

**Retrieval-Augmented Generation (RAG)** 是一种结合向量检索与大语言模型（LLM）的 AI 技术框架，可用于提升问答质量，特别是涉及私有数据或实时数据的场景。

传统方式存在问题：

- LLM 无法访问用户私有数据
- 精调 LLM 成本高昂且维护困难
- System prompt 增大会话上下文，受限于 token 上限

**RAG 的核心思想：** 在推理时动态查询用户数据源，将其内容与用户问题一起送入 LLM，生成“有根据”的答案。

例如你问一个 AI：“我们公司的退换货政策是什么？”

- 普通的 AI 不知道，因为它没看过你公司的文档；
- 如果你把公司文档给它，它就能从里面“找出答案再回答你”；
- 这就是 RAG 的作用 —— 把用户的数据接入 AI。

**AutoRAG 简介：Cloudflare 推出的托管式 RAG 服务**

**AutoRAG** 是 Cloudflare 推出的 **全托管式 RAG 管道服务**，开发者无需手动搭建复杂的索引/检索/嵌入/调用流程，**仅需指向数据源即可快速构建上下文感知的 AI 系统。**

 **核心特点**

- 无需 glue code：无需手动连接嵌入模型、向量库、LLM 等
- 自动更新：数据变动时自动重新嵌入、重索引
- Cloudflare 原生平台构建，依托全球边缘网络
- 全栈组件可见（非黑盒）
- Beta 阶段免费

**🔍 有啥特别之处？**

✅ **极简部署**：不用写检索系统、不需要搭向量库，几分钟就能用上，不用管服务器。

✅ **自动更新**：你的文件更新了，数据变了，AutoRAG 会自动重新处理

✅ **不限制内容格式**：文本、表格、图片都能转成 AI 能理解的格式

✅ **安全可控**：你的数据不会被送去公开模型或第三方，运行在你自己的 Cloudflare 账户里

✅ **集成灵活**：Claude、Cursor、你自己写的 Worker 应用都能对接，可以用在客服机器人、内部搜索、企业知识库等。

✅ **省钱**：公测期间免费，每个账户能建 10 个 AutoRAG，最多处理 10 万个文件。

**总结一句话：**

**AutoRAG = AI+你的数据，一键生成问答系统，自动更新、免维护，马上可用。**

**架构组成：AutoRAG 的核心组件与流程**

**🔧 核心组件**

![img_v3_02l5_0fe18e3c-e16f-4e1c-8d36-ba36d10cc93g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l5_0fe18e3c-e16f-4e1c-8d36-ba36d10cc93g.jpg)



**AutoRAG 工作机制详解**

![img_v3_02l5_0a68d010-079f-46d8-9014-31cb0ae8e03g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l5_0a68d010-079f-46d8-9014-31cb0ae8e03g.png)
**1️⃣ Indexing（索引过程）**

自动后台运行的异步流程，负责处理和结构化输入数据。

步骤如下：

![img_v3_02l5_9e5e32cb-3139-4e89-a26c-89746e95532g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l5_9e5e32cb-3139-4e89-a26c-89746e95532g.jpg)



**索引（后台跑）**：

- 当你把文件上传到 Cloudflare（R2），AutoRAG 会做以下事：

1. **读取文件**（PDF、HTML、CSV、图片等）
2. **转成 Markdown 文本**（图像会转成描述性文字）
3. **把文章切块**（一整篇文档分成一段段小段落）
4. **每段转成“向量”**（AI 用来理解语义的数字形式）
5. **把向量保存到数据库中**（Cloudflare 的 Vectorize）

这一步是在后台自动运行的，AutoRAG 会不断检测你的内容是否有变化并更新索引。

✅ 支持文档格式：PDF、TXT、HTML、Markdown、CSV、图像等

![img_v3_02l5_25b831e9-08cd-45a6-87ec-efca5bfd427g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l5_25b831e9-08cd-45a6-87ec-efca5bfd427g.png)





**2️⃣ Querying（查询过程）**

同步执行的流程，响应用户查询。

流程如下：

![img_v3_02l5_b55046bd-c4bd-4920-b05c-47756c1c5b6g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l5_b55046bd-c4bd-4920-b05c-47756c1c5b6g.jpg)



**查询（实时答）**：

- 当你或用户向 AutoRAG 提出问题，比如：

> “我们支持多少种付款方式？”

AutoRAG 会自动：

1. **接收问题**（你通过 Claude、API、前端发过来）
2. **（可选）优化问题表达**，让检索更准
3. **将问题转成向量**（和之前处理的内容一样的格式）
4. **在向量数据库中查找最匹配的内容段落**
5. **把找到的内容和你的问题一起发给 AI 模型**
6. **AI 返回“有根据”的回答**

![img_v3_02l5_607771a4-a06b-49a4-944c-1fd664c5a74g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l5_607771a4-a06b-49a4-944c-1fd664c5a74g.png)



**快速上手教程（集成网页内容）**

**🕸️ 步骤 1：抓取网站内容并上传至 R2**

- 使用 Cloudflare Worker + Puppeteer 抓取网页 HTML
- 存储至新建的 R2 bucket 中，如 html-bucket

**🔧 步骤 2：创建 AutoRAG 实例**

通过 Cloudflare Dashboard:

1. 选择数据源：如上一步的 html-bucket
2. 选择嵌入模型（默认即可）
3. 选择生成模型（默认即可）
4. 创建 AI Gateway 与 API Token
5. 命名并创建 AutoRAG

**💬 步骤 3：测试并集成**

- 使用 Playground 提问验证效果
- 在应用中通过 aiSearch() 或 search() 方法集成查询

- 

\