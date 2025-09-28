---
title: A2A（Agent2Agent）
description: Google 推出了一个类似MCP的 **开放协议：A2A（Agent2Agent）** ，旨在让不同平台、不同厂商构建的 AI Agent 能够**互相通信、协作和协同完成任务**。...
author: LuoYuan
date: 2025-04-16
image: https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_07ba3f9b-06d5-4f08-89f7-c3859e0e673g.jpg
link: https://github.com/google/A2A
category: ai-news
tags: []
featured: false
---
Google 推出了一个类似MCP的 **开放协议：A2A（Agent2Agent）** ，旨在让不同平台、不同厂商构建的 AI Agent 能够**互相通信、协作和协同完成任务**。

它是一个类似“AI 代理之间的通用语言”，让企业内部或跨平台的多个 Agent 互通有无、共同工作，形成一个**智能协同体**。

> “让不同公司的 AI Agent 能像人类一样互相合作、对话、分工完成任务。”

你可以把它想象成是：

- 🧠 AI 代理之间的“通用语言”
- 🌐 类似 HTTP 是网页通信协议，A2A 是 Agent 之间通信的协议
- 👷‍♂️ 专门为多个 Agent 协同工作而生

**🚀 背景动因：**

当前的 AI Agent 面临一个大问题：

- 每个 Agent 都是**“孤岛”**，只能自己干活，不能找别的 Agent 帮忙
- 它们用的是不同平台、不同架构、不同格式，**无法互通**
- 想让一个 Agent 管理邮件、另一个处理简历，根本无法沟通

A2A 就是为了解决这个痛点：

✅ 让 Agent 能够 **像拼乐高一样互相对接**

✅ 让企业能组建一个**“AI 团队”**协作处理任务

**🎯 核心目标：**

1. 打破 Agent 间“信息孤岛”
2. 支持跨厂商、跨云环境的协作
3. 降低系统整合复杂度和长期维护成本

**A2A 与 MCP 有啥区别？**

![img_v3_02l7_07ba3f9b-06d5-4f08-89f7-c3859e0e673g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_07ba3f9b-06d5-4f08-89f7-c3859e0e673g.jpg)



👉 A2A 像是 Agent 之间对话

👉 MCP 像是 Agent 调用“工具箱”里的东西

**A2A 的设计原则（5 大核心理念）**

![img_v3_02l7_a1fb093d-7049-47b8-a2cc-47b2b4eaf59g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_a1fb093d-7049-47b8-a2cc-47b2b4eaf59g.jpg)



**多模态与异步能力**

A2A 支持：

- 多模态通信（文本 + 图像 + 音频 + 视频）
- 多语言/自然语言任务协作（适配 LLM 输出）
- **异步长时间任务挂起/恢复**
  - Agent 可暂停任务执行，待资源准备后继续处理
  - 适用于视频渲染、数据训练等非实时任务

**A2A 是如何工作的？**

A2A 协议构建在以下核心结构之上：

![img_v3_02l7_c5716219-8b47-4f3a-af14-a7c06da0610g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_c5716219-8b47-4f3a-af14-a7c06da0610g.jpg)

![img_v3_02l7_db09c0e0-66cf-40cc-be5b-654105797e0g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_db09c0e0-66cf-40cc-be5b-654105797e0g.png)

**工作原理流程图**

\`\`\`
你：我想找一个会生成 PPT 的 AI Agent

↓（Agent Card 发现）

Agent A：我找到了 Agent B，它专门做 PPT

↓（发任务）

Agent A → Agent B：请根据这份内容生成一个 10 页的商业计划书

↓（执行任务）

Agent B：已完成，请看这里：[artifact_url]

↓（你下载文件 or 发给下一个 Agent）
\`\`\`

**🧭 Agent Card（能力描述卡）**

🌟 功能作用：

- 告诉其他 agent：“我能干什么”、“我支持哪些接口”、“我接受哪种格式”
- 是 Agent 的“API 自我描述文件”

**💡 示例字段：**

\`\`\`
{
  "id": "agent://vendor/example-agent",
  "name": "Resume Analyzer Agent",
  "capabilities": ["parse_resume", "rank_candidates"],
  "input_format": "application/json",
  "output_format": "application/json+artifact",
  "authentication": {
    "type": "OAuth2",
    "scopes": ["task.read", "task.write"]
  }
}
\`\`\`

**Task（任务对象）**

**A2A 协议的核心是“任务”：**

每个任务都像一张待办事项，包含：

- 任务 ID
- 谁发的（发起者 Agent）
- 谁来干（接收者 Agent）
- 状态：准备中、进行中、成功、失败
- 输出结果（称为 Artifact）

它还支持“长任务”——比如视频分析、文档审批可以跑几小时没问题。

**Artifact（任务产物）**

这是任务的最终结果，比如：

- 文本总结
- 图片、表格、PPT
- JSON 文件、数据库查询结果

A2A 会自动管理这些产物的引用地址和格式，让下一个 Agent 能继续处理。

 **Message Part（消息内容块）**

Agent 和人/其他 Agent 交流时，内容可以很丰富，不只是文字。

![img_v3_02l7_6ebe3102-fc4c-490d-ac37-5bf07d7bfb5g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_6ebe3102-fc4c-490d-ac37-5bf07d7bfb5g.jpg)



A2A 允许发送：

这让 Agent 的响应可以直接嵌入到前端 UI，变得**更智能、更好用**！

**应用场景：**

![img_v3_02l7_4b4682ee-d7be-4c54-9253-fbab91bb8fbg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_4b4682ee-d7be-4c54-9253-fbab91bb8fbg.jpg)



**多个 Agent 像流水线一样协作完成一个复杂任务。**

**案例：候选人招聘协作**

以招聘软件工程师为例：

1. 招聘经理使用 Agentspace 任务界面，请求找符合条件的候选人
2. 主 Agent 识别并分派子任务给：

- 候选人检索 Agent（匹配简历与职位）
- 面试安排 Agent
- 背景调查 Agent

1. 所有 Agent 在 A2A 协议下协作、信息同步
2. 用户看到聚合的推荐信息并选择下一步行动

> **价值**：无需开发多个 API 集成，只需遵循 A2A，所有 Agent 可自然协作，降低开发负担。

<video data-key="file_v3_00l7_3d3594cd-af38-47df-ab24-1ba78676cd6g" data-middle-image="{&quot;key&quot;:&quot;middle:img_v3_02l7_b8ad5b62-8f0d-466e-bfa2-9ffc100e784g&quot;,&quot;urls&quot;:[],&quot;width&quot;:1920,&quot;height&quot;:1080,&quot;type&quot;:2,&quot;exifOrientation&quot;:0,&quot;crypto&quot;:&quot;CAESMgog7VE/9Bc6oSqVubKeuMsdse2Fm3PwStm70yk89aq3h7MSDMsq0D9pwPVObF9aJBoA&quot;,&quot;fsUnit&quot;:&quot;eu_nc-cdn&quot;}" data-crypto-token="img_v3_02l7_b8ad5b62-8f0d-466e-bfa2-9ffc100e784g" data-duration="82366" data-copy-id="7400356674370256898" data-lark-video-uri="imkey://file_v3_00l7_3d3594cd-af38-47df-ab24-1ba78676cd6g?visit_info=%7B%22entityId%22%3A%227491498621947510812%22%2C%22sceneType%22%3A1%7D" data-lark-video-duration="82366" data-lark-video-height="1080" data-lark-video-mime="video/mp4" data-lark-video-name="9dc6a2c1-d521-49f8-805b-06ad675e4008.mp4" data-lark-video-size="5394264" data-lark-video-width="1920"></video>



**A2A 已获得 50+ 技术公司与咨询机构支持，**

包括：

🌐 技术平台支持方：

- Google Cloud, LangChain, MongoDB, Salesforce, SAP, ServiceNow, Intuit, PayPal, JetBrains 等
- Agent 框架支持：LangChain、Box Agent、Articul8 Agent-of-Agents（ModelMesh）

🏢 企业咨询合作方：

- Accenture、BCG、Deloitte、McKinsey、Infosys、Wipro、TCS、KPMG 等

![img_v3_02l7_24f51fcd-1699-4e03-a7fb-d4fe5c59a22g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_24f51fcd-1699-4e03-a7fb-d4fe5c59a22g.jpg)



**🧱 应用方向：**

- 客户体验自动化（AskAI、Box）
- 企业自动化与流程编排（SAP、Salesforce、Workday）
- AI Agent 开发工具链支持（Weights & Biases、LangChain、JetBrains）

**安全认证机制**

企业场景对安全要求高，A2A 支持：

- OAuth2：标准授权协议
- API Token：简化接入
- 双向 TLS：加密连接

Agent 之间的每次通信都需要权限校验，防止滥用。

要了解有关 A2A 框架的更多信息，请深入研究**[完整的规范草案](https://github.com/google/A2A)**并探索**[可用的代码示例，以](https://google.github.io/A2A)**检查协议的结构及其代码实验。

GitHub：https://github.com/google/A2A