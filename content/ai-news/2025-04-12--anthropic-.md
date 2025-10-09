---
title: Anthropic研究追踪Claude的思考过程
description: 本文介绍了Anthropic研究团队致力于理解大型语言模型内部工作原理的研究，特别是如何追踪Claude的思考过程，以提高AI的透明度和可信度。
author: LuoYuan
date: Sat Apr 12 2025 00:00:00 GMT+0000 (Coordinated Universal Time)
image: "https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02kt_ce6dd3bb-f1f4-44a7-90d0-c429108b67eg.jpg"
link: "https://www.anthropic.com/research/tracing-thoughts-language-model"
category: ai-news
tags: ["Anthropic","Claude","AI透明度","模型解释ability"]
featured: false
source: ""
---

**Anthropic探索AI模型的内部工作原理，他们看到Claude的思考过程**

![img_v3_02kt_ce6dd3bb-f1f4-44a7-90d0-c429108b67eg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02kt_ce6dd3bb-f1f4-44a7-90d0-c429108b67eg.jpg)

原文：https://www.anthropic.com/research/tracing-thoughts-language-model 

Anthropic 的研究团队致力于理解大型语言模型（LLM）的内部工作原理，因为这些模型虽然表现出色，但其决策过程通常是“黑箱”，缺乏透明度。

- 如果我们无法理解 AI 是如何“得出结论的”，就很难判断它是否值得信任、是否真的理解了问题、是否会被误导或利用。

## **🎯 Anthropic 的目标是：**

> 建立一种“AI 显微镜”，让我们**“看到 Claude 的思考过程”**，就像神经科学家研究人脑一样——不是只看它说了什么，而是看它“脑子里是怎么想的”。

![img_v3_02kt_fefb79de-52ba-4b53-b6cc-62bfef66bfeg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02kt_fefb79de-52ba-4b53-b6cc-62bfef66bfeg.jpg)

他们开发了一种新的可解释性工具，旨在追踪 Claude 模型在处理任务时的内部“思维”过程。这不仅有助于揭示模型如何运作，还可能为未来的 AI 安全性和审计提供支持。

研究的核心是通过“电路追踪”（Circuit Tracing）技术，分析模型如何将输入转化为输出，揭示其潜在的推理步骤和行为模式。文章强调，这种方法受到神经科学的启发，类似于研究生物大脑的“布线图”。

## **如何“看见”模型在思考？**

**📄 研究分两部分：**

1. **构建“电路图工具”**：将模型中的“特征”抽象为“电路节点”，追踪它们之间的因果关系；
2. **对 Claude 3.5 Haiku 进行案例分析**：选取十个典型任务，观察模型在处理时内部是怎么“激活思维”的。

**“电路追踪”的技术，具体包括以下步骤：**

1. **特征识别与追踪**：识别模型内部的“特征”（features），这些特征类似于神经元的功能单元，代表特定概念或计算步骤。
2. **归因图（Attribution Graphs）**：通过构建归因图，追踪从输入到输出的中间步骤，分析哪些特征如何相互作用。
3. **扰动实验**：通过人为放大或抑制某些特征，验证这些特征在模型行为中的作用。

他们将这一方法应用于 Claude 3.5 Haiku（Anthropic 的轻量级生产模型），并研究了模型在多种任务中的表现。

详细技术细节在配套论文《[Circuit Tracing: Revealing Computational Graphs in Language Models](https://transformer-circuits.pub/2025/attribution-graphs/methods.html)》中阐述，而《[On the Biology of a Large Language Model](https://transformer-circuits.pub/2025/attribution-graphs/biology.html)》则提供了具体的案例分析。

## **关键研究发现**

他们一共发现了Claude 的9种反常行为：

![img_v3_02kt_4adca135-3771-42ca-b3c0-c11e91ecacdg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02kt_4adca135-3771-42ca-b3c0-c11e91ecacdg.jpg)

### **1️⃣ 跨语言的“通用语言思维”（Shared Conceptual Space）**

- Claude 会在不同语言中激活相同的“意义神经元”。
- 例如，“小的相反词是什么？”用英文、法语、中文询问时，它激活的是同一个“抽象概念空间”，最后翻译成对应语言。
- 模型规模越大，跨语言的共享特征比例越高（Claude 3.5 Haiku 的共享特征是小型模型的两倍），这暗示存在一种“概念通用性”。

![img_v3_02kt_e83cecf2-e924-4cc4-8f88-d2f6ad9593bg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02kt_e83cecf2-e924-4cc4-8f88-d2f6ad9593bg.jpg)

✅ 含义：

- Claude 并不是“装了多个语言模块”，而是有一个**“通用语言的思想空间”**；
- 它可以**把英文中学到的逻辑迁移到其他语言中**；
- 类似于“概念先于语言”，这是通用智能的一种表现。



### **2️⃣ Claude 会“提前计划”写诗的结尾（规划能力）**

研究者以押韵诗为例：

\