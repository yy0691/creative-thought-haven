---
title: Google《Prompt Engineering》提示词工程指南
description: 本文介绍了由Lee Boonstra等Google团队成员编写的《Prompt Engineering》提示词工程指南，这是一份长达60+页的PDF文档，详细讲解如何设计高质量提示来优化大语言模型输出，适用于自然语言处理、AI代码生成、多模态输入等场景。
author: LuoYuan
date: 2025-04-17
image: https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l8_c9850062-2160-4645-88ad-374c6c6d8a5g.jpg
link: 
category: ai-news
tags: [Google, 提示词工程, Gemini, Vertex AI, Lee Boonstra, LLM优化, 代码生成, 多模态输入, 结构化输出]
featured: false
---
这是由Lee Boonstra 等 Google 团队成员联合编写的《**Prompt Engineering**》提示词工程。

长达 60+ 页的 PDF详细介绍如何通过设计高质量的提示来优化大语言模型（LLM）的输出。

文档面向广泛的读者群体，无需具备数据科学或机器学习背景即可掌握提示工程，同时聚焦于使用Google的Gemini模型（通过Vertex AI或API）进行实践。

- **作者**：Lee Boonstra 等 Google 团队成员
- **定位**：面向使用 Vertex AI / Gemini / 通用 LLM 的开发者，深入讲解如何写出优质 prompt、配置模型参数、调试与优化提示结构等技巧
- **应用范围**：适用于自然语言处理、AI 代码生成、多模态输入、结构化输出、复杂推理等


**目录**

- **Prompt Engineering 的基础理念**
- **模型输出控制参数（Token / Temperature / Top-K/Top-P）详解**
- **提示词类型与结构构建方法**
- **核心提示技巧（Zero-shot, CoT, ReAct, ToT, Self-Consistency 等）**
- **代码生成相关提示策略**
- **自动提示生成（APE）机制**
- **多模态提示支持（图+文输入）**
- **最佳实践清单**
- **典型模板示例与用法建议**



**✅ 第一节：Prompt Engineering 的核心理念**

**📌 核心观点**

- **大语言模型（LLM）是“预测型引擎”**：它根据上下文预测下一个 token，而不是“理解”语义
- **提示词（Prompt）决定模型的输出方向与质量**
- 好的 Prompt 可以“激活”模型的知识、结构化其输出，提升可控性



**🧠 Prompt Engineering 的目标是：**

1. **提出明确任务**
2. **引导模型产生可控、有用的输出**
3. **降低错误/幻觉风险**
4. **提高输出一致性与格式正确率**



**✨ 为什么提示词如此重要？**

![img_v3_02l8_c9850062-2160-4645-88ad-374c6c6d8a5g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l8_c9850062-2160-4645-88ad-374c6c6d8a5g.jpg)



**🔍 实际问题举例：**

![img_v3_02l8_075294ac-5b86-4216-8292-2196dd13aacg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l8_075294ac-5b86-4216-8292-2196dd13aacg.jpg)



**💡 提示词可以做的事情包括：**

![img_v3_02l8_93783402-0820-4f4a-9853-ea8c77d4933g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l8_93783402-0820-4f4a-9853-ea8c77d4933g.jpg)



**✅ 第二节：模型采样参数详解**

![img_v3_02l8_19b595ae-00d2-4418-9af7-16865614109g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l8_19b595ae-00d2-4418-9af7-16865614109g.jpg)



⚠️ 过低温度会导致输出单调，过高温度则容易陷入“重复循环 bug”。

🧮 掌控生成式模型输出的“温度计与水龙头”

![img_v3_02l8_3d747853-acee-4d7b-906b-857a8008c36g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l8_3d747853-acee-4d7b-906b-857a8008c36g.jpg)



**🔧 1. Max Tokens（最大生成长度）**

- 控制模型最多能输出多少个 token（不是字数！）
- 1K tokens ≈ 750 词 ≈ 1~2 页文字
- 设置过小会**截断结果**，设置过大**浪费成本或时间**

**✅ 建议：**

![img_v3_02l8_18c082e6-307e-46ca-848c-acdcd1c900eg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l8_18c082e6-307e-46ca-848c-acdcd1c900eg.jpg)



**🔥 2. Temperature（温度）**

**控制模型输出的随机性 / 创造性程度**

- 范围：0 ~ 2（大多数平台为 0.0 ~ 1.0）
- 越接近 **0**：输出更稳定、保守（适合结构化任务）
- 越接近 **1**：输出更发散、更有创意（适合写作、头脑风暴）

![img_v3_02l8_f7c6283c-5aea-4dff-b1e2-2fecb7690f7g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l8_f7c6283c-5aea-4dff-b1e2-2fecb7690f7g.jpg)



**🎲 3. Top-K（采样上限）**

- 限制模型在预测下一个 token 时，只考虑概率最高的前 K 个选项
- 举例：
  - top-k = 1：只考虑概率最高的 token（非常确定）
  - top-k = 40：从概率最高的前 40 个 token 中采样

→ 增加 top-k 会让输出更加多样，但稳定性降低。

**🎯 4. Top-P（核采样 / 多样性过滤）**

- 不是按数量，而是按**累计概率总和**
- 例如 top-p = 0.9 表示只考虑概率总和达到 90% 的 token
- 适合控制“安全且多样”的输出范围



**🧪 推荐组合设定（实用模板）：**

![img_v3_02l8_82051cba-f697-478c-976a-2ea28676bbeg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l8_82051cba-f697-478c-976a-2ea28676bbeg.jpg)



**📌 提醒：**

- **不要同时开启 Temperature、Top-k、Top-p 全部设为高值** → 输出极不稳定
- **对于多轮对话任务，建议固定采样参数，避免风格跳变**



**✅ 第三节：提示词结构与类型全解析**

🎭 **让模型“听懂你”的艺术表达**

提示词（Prompt）不只是“问一个问题”，它更像是**一段剧本 + 指令 + 示例 + 角色设定**的组合。结构设计得越清晰，模型的响应就越接近你想要的。

**🧩 1、提示词的常见结构层级**

![img_v3_02l8_bb3b2320-91f5-4113-be0c-7bf484c6d41g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l8_bb3b2320-91f5-4113-be0c-7bf484c6d41g.jpg)



**📘 2、系统提示词（System Prompt）**

**决定“模型扮演什么角色”**

- 类似“隐藏指导语”
- 适用于 Gemini、ChatGPT、Claude 等对话型模型

示例：

\