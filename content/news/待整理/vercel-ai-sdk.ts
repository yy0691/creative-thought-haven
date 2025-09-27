export const vercelAiSdkContent = `

4.2版本核心亮点：  

![img](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02km_c9ec786e-087d-4253-9e5d-11857c83777g.jpg)

1. Reasoning 推理模型的支持：让 AI"会思考"**
  - AI SDK 4.2 新增了对推理模型的支持，例如 Anthropic 的 Claude 3.7 Sonnet 和 DeepSeek 的 R1。这些模型在推理时会分配计算资源，逐步解决问题，类似于人类的"思维链"（chain-of-thought），特别适用于逻辑性强或多步骤分析的任务。
  - 使用方式与普通模型一致，开发者只需通过 reasoning 属性即可访问模型的推理过程。
  **✅ 是什么？**
  现在你可以调用支持**"推理链（chain-of-thought）"**的大模型，比如：
  - Anthropic Claude 3.7 Sonnet
  - DeepSeek R1
  这些模型可以像人一样"解释它是怎么想的"，给你一个带逻辑过程的答案。
  **🔧 2. MCP 客户端支持：AI 直接操作工具（本地或远程）**
  **✅ 是什么？**
  **MCP（Model Context Protocol）** 是一种开放协议，让 AI 模型可以直接控制各种工具，比如：
  - GitHub（管理 PR、Issue）
  - 文件系统（读写文件）
  - Slack（发送消息）

  **🧠 示例：**

  \`\`\`
  const mcpClient = await createMCPClient({
    transport: { type: 'sse', url: 'https://my-server.com/sse' }
  });
  const response = await generateText({
    model: openai('gpt-4o'),
    tools: await mcpClient.tools(),
    prompt: '查找100美元以下的商品'
  });
  \`\`\`

  **✅ 有什么用？**

  - 让 AI 不只是回答问题，还可以**动手操作任务**（像 Agent）
  - 适用于：自动化开发工具、AI 办公助手、智能工作流系统等



  **💬 3. useChat Message Parts：多模态消息结构更清晰**

  **✅ 是什么？**

  之前聊天消息只有文本。现在一条消息可以包含：

  - 文本（text）
  - 推理步骤（reasoning）
  - 工具调用（tool-invocation）
  - 图片（image）
  - 来源链接（source）

  每一段都结构化分开，更容易显示和处理。

  **🧠 示例结构：**

  \`\`\`
  [
    { type: "text", text: "这是我的分析：" },
    { type: "reasoning", reasoning: "首先我们假设…" },
    { type: "image", mimeType: "image/png", data: "base64..." }
  ]
  \`\`\`

  **✅ 有什么用？**

  - 做聊天 UI 更灵活（可以同时显示文字+图片+引用链接）
  - 支持复杂代理（多个步骤输出拆分）



  **🖼️ 4. 图像生成支持：大语言模型生成图片**

  - AI SDK 4.2 扩展了图像生成能力，支持通过语言模型直接生成图像。
  - 这使得开发者可以通过文本提示生成视觉内容，进一步丰富应用交互性。

  **✅ 是什么？**

  支持 Gemini 2.0 Flash 等模型**直接输出图像**（非调用第三方 API，而是语言模型内生成）。

  **🧠 示例应用：**

  - "帮我画一只像素风格的猫"
  - "生成一张代表'自由'的抽象图像"
  - "把刚才生成的图换成蓝色背景"

  **✅ 有什么用？**

  - 构建多模态 AI（文本 + 图像）
  - 适合创作类应用、儿童故事生成、广告素材生成等



  **🌐 5. URL Sources：网页来源统一显示**

  **✅ 是什么？**

  统一展示语言模型回答时引用的网页来源。比如：

  > "根据 [nytimes.com](https://nytimes.com/)，昨天纽约市有大雨。"

  以前每个模型返回格式不一致，现在 AI SDK 统一封装了 source 结构。

  **✅ 有什么用？**

  - 提高回答的可溯源性和可信度
  - 支持 OpenAI、Gemini、Perplexity 等多个模型

  > 视频二：见评论区

  **🔁 6. OpenAI Responses API 支持**

  **✅ 是什么？**

  OpenAI 新推出的 Responses API：

  - 支持 **持久对话记录**（不像以前每次都发全对话）
  - 支持 **联网搜索、文件搜索、未来还会支持模拟电脑操作**

  **✅ 有什么用？**

  - 节省开发复杂度：调用逻辑更简单，支持更多 AI 工具组合
  - 未来可以构建"联网 + 本地搜索 + 文件分析"的全能 AI 助手



  **🧩 7. Middleware 中间件系统（更强大）**

  新增多个可组合使用的中间件：

  中间件 功能 extractReasoningMiddleware 自动抽出模型的推理过程 <think> 标签 simulateStreamingMiddleware 模拟非流式模型的分段输出 defaultSettingsMiddleware 设定统一默认参数（如温度、预算 token）

  📌 中间件可以组合使用，非常适合企业应用进行定制。

  **💡 8. Svelte 5 支持（前端开发者福利）**

  - @ai-sdk/svelte 包重构，由 Svelte 团队直接参与
  - 完全原生支持 Svelte 5 的响应式系统
  - 示例结构类似：

  \`\`\`
  <script>
    import { Chat } from '@ai-sdk/svelte';
    const chat = new Chat();
  </script>

  <div>
    {#each chat.messages as message}
      <div class="message">{message.content}</div>
    {/each}
  </div>
  \`\`\`

  **📦 更多更新 & 提供商支持**

  ![img_v3_02km_7d89ab51-4555-4c35-ba40-93721529c4ag](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02km_7d89ab51-4555-4c35-ba40-93721529c4ag.jpg)



  **✅ 总结一句话：**

  > **AI SDK 4.2 是一个面向开发者的"AI 构建工具超级包"，让你能在网页中轻松构建会"听说思考画图找资料还能动手"的 AI 助理。**

  **AI SDK 4.2 Showcase 展示案例**

  Vercel 展示了多个已经用 **AI SDK** 构建的创新项目，它们来自真实开发团队或公司，涵盖办公自动化、内容生成、前端框架整合等领域。

  **🧮 1. Otto：AI 智能表格助理**

  **🧾 项目简介：**

  [Otto ](https://ottogrid.ai/)是一个基于电子表格的智能代理系统，专为**重复性知识工作自动化**设计。

  **✅ 用到 AI SDK 的能力：**

  - 多轮推理（reasoning）
  - 工具调用（MCP）
  - 数据结构化与操作
  - LLM 代理执行任务

  **💡 举例：**

  > 你在 Otto 中输入一句话："帮我把销售数据做成分类统计图表"，它就会自动调用大模型生成代码、执行操作、输出图表。

  **🛠️ 2. Payload：开源全栈 CMS 框架，接入 AI 助理**

  **🧾 项目简介：**

  [Payload ](https://payloadcms.com/)是一个基于 Next.js 的全栈开发框架，集成了数据库管理、Admin 面板、API 自动生成等功能。

  **✅ 用到 AI SDK 的能力：**

  - 使用 AI SDK 替代原本复杂的 AI 接入代码
  - 快速对接多个模型供应商
  - 原生 TypeScript 支持，提升开发体验

  **💬 官方评价：**

  > "切换到 AI SDK 后，我们立刻删掉了大量自定义代码，同时支持所有 AI 提供商。API 设计优雅，TypeScript 支持一流，非常满意。"

  —— Payload 联合创始人 Alessio Gravili

  **💬 模板推荐（由社区开发者构建）**

  🧪 示例类型包括：

  - 多模态聊天机器人（文字 + 图片 + 来源链接）
  - Agent 自动化工作流（通过工具调用自动完成任务）
  - 联网搜索问答助手（结合 OpenAI Responses API 与搜索）

  🔍 模板入口：

  Vercel 提供官方 AI SDK 模板库，开发者可以一键部署这些项目，也可以 fork 自己定制。

  官方介绍：https://vercel.com/blog/ai-sdk-4-2
`; 