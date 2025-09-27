

export const MicroAIAgent = `
这是一个由微软官方发布的**AI 智能体入门教程**，适合初学者学习构建自己的 AI 代理（AI Agents）。

🧩 **项目定位**：帮助初学者理解并构建基于生成式 AI 的智能体（AI Agents）

🎯 **内容形式**：10 个模块化教程 + 视频 + 代码 + 多语言支持

📍 **项目地址**：[GitHub 仓库](https://github.com/microsoft/ai-agents-for-beginners) | [教学官网](https://microsoft.github.io/ai-agents-for-beginners/)

如果这是您第一次使用生成式 AI 模型进行构建，请查看他们的 [生成式 AI 入门课程](https://aka.ms/genai-beginners)，该课程包含 21 节课，讲解如何使用生成式 AI。

**🌟亮点与优势**

![img_v3_02lb_d3247ac8-f5b5-4a3d-9fe6-4a2fd2043dag](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lb_d3247ac8-f5b5-4a3d-9fe6-4a2fd2043dag.jpg)



**📚 教学内容概览（共 10 课）**

![img_v3_02lb_93c08f49-423c-4ccc-b2ed-7d4923a441dg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lb_93c08f49-423c-4ccc-b2ed-7d4923a441dg.jpg)



本课程使用 Microsoft 提供的多种工具和平台进行教学与演示：

![img_v3_02lb_e146cf6a-b047-485d-8053-1ea84ee72dfg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lb_e146cf6a-b047-485d-8053-1ea84ee72dfg.jpg)

✅ 每一节课配有 **Python 示例代码**，可本地运行（支持 VS Code DevContainer）。

**🌐 多语言支持**

官方目前提供 **10+ 语言翻译版本**，包括：

- 中文（简体、繁体、香港）
- 英语、法语、日语、韩语、西班牙语、德语、波兰语、印地语等

📍 中文内容可在官网选择语言或访问 translations/zh 文件夹查看。

**🧪 学习方式与形式**

每课包括以下资源：

- 📄 文本讲义（README）
- ▶️ 短视频讲解
- 💻 Python 示例代码
- 🔗 延伸学习资料（推荐阅读链接）

适合自学、企业培训、课程教学等多种形式使用。

**✅ Lesson 01：什么是 AI Agent？有哪些应用？**

- 介绍 AI Agent 的概念（什么是智能体）
- 常见应用场景：客服、个人助理、任务自动化、智能规划等
- 基本组成部分：感知 → 思考 → 行动（Perceive–Think–Act）
- 举例：AutoGPT、ChatGPT 插件、ReAct 架构等
- 👉🏻[进入课程](https://github.com/microsoft/ai-agents-for-beginners/blob/main/translations/zh/01-intro-to-ai-agents/README.md)



**✅ Lesson 02：主流智能体框架介绍**

- 对比多个流行的 Agent 框架：
  - **Semantic Kernel**（微软）
  - **AutoGen**（微软）
  - **LangChain**（开源）
  - **CrewAI、Autogen Studio 等**
- 每个框架的设计理念、适用场景和优缺点对比
- 演示如何用框架构建简单 Agent 应用
- 👉🏻[进入课程](https://github.com/microsoft/ai-agents-for-beginners/blob/main/translations/zh/02-explore-agentic-frameworks/README.md)



**✅ Lesson 03：Agentic 模式设计入门**

- 什么是 Agentic Design Pattern（智能体编程思想）
- 用“思考–行动–反思”循环构建智能体
- 如何封装模块：Memory、Planner、Executor、ToolBox
- 实战：从 Chatbot 到真正的任务执行智能体
- 👉🏻[进入课程](https://github.com/microsoft/ai-agents-for-beginners/blob/main/translations/zh/03-agentic-design-patterns/README.md)



**✅ Lesson 04：工具调用模式（Tool Use）**

- 让 Agent 不只是聊天，还能“用工具”解决问题
- 示例工具：
  - 调用搜索引擎
  - 查询数据库
  - 调用外部 API（如天气、汇率）
- 实现 Tool Use 的结构：
  - Prompt + 工具定义 + Function Call + 响应解析
- 👉🏻[进入课程](https://github.com/microsoft/ai-agents-for-beginners/blob/main/translations/zh/04-tool-use/README.md)



**✅ Lesson 05：检索增强生成（Agentic RAG）**

- 什么是 RAG（Retrieval-Augmented Generation）？
- Agent 如何从外部文档或知识库中“读资料再回答”
- 结构分离：
  - Retriever（检索器）
  - LLM Generator（生成器）
- 实战：构建“文档问答 Agent”项目
- 👉🏻[进入课程](https://github.com/microsoft/ai-agents-for-beginners/blob/main/translations/zh/05-agentic-rag/README.md)



**✅ Lesson 06：构建可靠、安全的 Agent**

- Agent 可能犯哪些错误？如何防止？
  - 虚构答案（hallucination）
  - 滥用工具、循环失控
- 安全机制：
  - 加入检查器（Critic Agent）
  - 限制调用次数/时间
- 数据隐私、道德、价值对齐等议题
- 👉🏻[进入课程](https://github.com/microsoft/ai-agents-for-beginners/blob/main/translations/zh/06-building-trustworthy-agents/README.md)



**✅ Lesson 07：任务规划模式（Planning）**

- 从“一个问题 → 多个步骤”
- 如何让 Agent 拆解问题，并按步骤执行
- 使用 Planner + Executor 构建分布式代理
- 示例：自动完成一个文件处理 + 发送邮件 + 生成日报的流程
- 👉🏻[进入课程](https://github.com/microsoft/ai-agents-for-beginners/blob/main/translations/zh/07-planning-design/README.md)



**✅ Lesson 08：多智能体协作（Multi-Agent Collaboration）**

- 多个 Agent 如何分工合作解决更复杂的问题
- 角色设计：用户代理、系统代理、工具代理、协调代理
- 通信机制：
  - 共享记忆（memory bus）
  - 明确角色边界（function separation）
- 👉🏻[进入课程](https://github.com/microsoft/ai-agents-for-beginners/blob/main/translations/zh/08-multi-agent/README.md)



**✅ Lesson 09：元认知能力（Metacognition）**

- 让 Agent 不只是执行，还能：
  - 检查自己是否理解任务
  - 对结果进行反思和修正
- 使用 “self-check” 模块或 self-reflection prompt
- 示例：Agent 回顾前几轮回答，自动修正逻辑错误
- 👉🏻[进入课程](https://github.com/microsoft/ai-agents-for-beginners/blob/main/translations/zh/09-metacognition/README.md)



**✅ Lesson 10：将 Agent 推进生产环境**

- 部署 AI Agent 到实际应用中
- 如何集成进 Web 应用、API 服务、聊天机器人、SaaS 工具
- 使用 Azure AI Foundry、OpenAI SDK、LangChain 等部署方式
- 优化推理成本、日志追踪、用户反馈机制
- 👉🏻[进入课程](https://github.com/microsoft/ai-agents-for-beginners/blob/main/translations/zh/10-ai-agents-production/README.md)



GitHub：[GitHub - microsoft/ai-agents-for-beginners: 10 Lessons to Get Started Building AI Agents](https://github.com/microsoft/ai-agents-for-beginners)
`