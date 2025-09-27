import exp from "constants";

export const BabelDOC = `
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

\`\`\`
uv tool install --python 3.12 BabelDOC

babeldoc --files paper.pdf --openai --openai-model "gpt-4o-mini" --openai-api-key "你的密钥"
\`\`\`

还可以设定翻译页数、输出路径、模型种类、翻译速度等。

### **方式三：自己部署（高级玩法）**

- 支持导出“离线包”
- 可以在公司/服务器环境运行
- 支持设置代理、API网关、本地模型

## **LLM 模型支持情况**

- 默认支持：**OpenAI 系列模型**（GPT-4o-mini、gpt-3.5、gpt-4）
- 兼容接入：
  - DeepSeek、GLM-4、Baichuan、Yi 等 OpenAI 接口兼容模型
  - 可通过 --openai-base-url + --api-key 实现私服部署（如 Ollama）
- 使用建议：调用推荐通过 LiteLLM 接入多模型网关

## **技术架构与核心流程**

![img_v3_02l8_01b66b01-7051-44ef-92f9-3ee2b27c5e4g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_01b66b01-7051-44ef-92f9-3ee2b27c5e4g.jpg)

🔧 核心模块流程（双阶段架构）

### **🌉 插件机制（可插拔式）**

- **支持添加**：
  - LLM 翻译器
  - OCR 模块
  - 结构优化器（段落重构、跨页处理）
  - 渲染器/导出器
- 配置文件支持插件优先级与并行策略

GitHub：[GitHub - funstory-ai/BabelDOC: Yet Another Document Translator](https://github.com/funstory-ai/BabelDOC) 

在线体验：https://app.immersivetranslate.com/babel-doc/ 
`;

export const ChatgptMemoryUpdate = `

**“** OpenAI 宣布对 ChatGPT 的记忆功能进行重大升级：从现在起，它不仅保存你授权的记忆信息，还能回顾你过往的所有聊天记录，从而更深入地理解你的偏好和兴趣，生成更加个性化、上下文相关的回答。这项功能尤其在写作、学习、获取建议等应用中更显智能化。

用户完全掌握对记忆功能的控制权，包括选择是否启用、修改记忆内容，或使用不影响记忆的临时对话。新功能已开始向全球大部分 Plus 和 Pro 用户推出，企业、教育用户将在未来几周内获得访问权限。”

![img_v3_02l8_a1f1d5d6-d97f-4a72-97a0-3c2b74a9734g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_a1f1d5d6-d97f-4a72-97a0-3c2b74a9734g.jpg)



> 现在ChatGPT 的“记忆（Memory）”功能可以**跨对话记住与你相关的重要信息**，从而在未来的对话中更懂你、回答更贴合你的偏好与需求。

比如：你告诉它你是素食主义者，之后它推荐食谱时会自动避开荤菜。

✅ 自动记忆：ChatGPT 会自动从聊天中提取并存储可能对你有用的信息

✅ 个性化体验：它会记住你的语气、偏好、爱好、职业等来优化输出内容

✅ 可编辑：你可以随时查看、删除或清空它记住的内容

✅ 可控制：支持关闭记忆功能，或使用“临时对话”完全不留痕迹

这意味着：

- 它会变得**更懂你**，比如你喜欢什么、习惯怎么提问。
- 回答会**更贴合你个人需求**，无论是写作、学习还是聊天建议。

比如：

- 如果你之前提过你喜欢写小说，以后它在你写作时就可能主动提供相关建议；
- 或者你提到过你在学英语，它就可能自动用英语跟你练习。

你**可以随时关闭这个功能**，也可以清除记忆、改掉它对你的“印象”； 如果你不想影响记忆，还可以开启“临时聊天”，聊完就不记录。

目前这个新功能已经开放给大多数 ChatGPT 的 Plus 和 Pro 用户，欧洲一些国家暂时还不能用。团队和学校用户要再等几周。

**一句话总结：**

> ChatGPT 现在能“记住你”，用你以往的聊天习惯来更好地帮你，但你随时可以让它“忘掉”。

## **如何启用与关闭记忆？**

**启用/关闭方法：**

- 打开 ChatGPT → 设置 → **Personalization（个性化）** → 打开或关闭：
  - **Saved Memories**（保存记忆）
  - **Reference Chat History**（引用历史对话）![img_v3_02l8_c0371c14-ff36-47e1-bd29-bafd30edef2g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_c0371c14-ff36-47e1-bd29-bafd30edef2g.jpg)

**🔒 临时对话（Temporary Chat）：**

- 如果你只想与模型“当场对话”，不希望它保存任何内容，可点击“临时对话”按钮。



## **ChatGPT 会记住什么？怎么记？**

**📌 ChatGPT 会记住的内容：**

你告诉它“请记住…”的内容（显式指令）

- 它自动识别的有价值信息（如你经常写 Markdown，模型会记住你偏好 Markdown）
- 保存为“记忆片段（Memory Cards）”，并持续更新或合并

**⚠️ 不会主动记住：**

- 敏感信息（如健康信息、身份资料）除非你明确要求
- 企业、团队版默认不用于模型训练

## **如何查看与删除记忆？**

![img_v3_02l8_ffccd5b0-032c-47dc-b959-d38cc4d80fbg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_ffccd5b0-032c-47dc-b959-d38cc4d80fbg.jpg)

**🧠 记忆使用建议**

- 想让模型更“懂你”？试试说：**“记住我喜欢用 Markdown”**
- 想清除误记的内容？说：**“请忘记我住在纽约”**
- 想一次性清空？进入设置 > Manage Memories > Delete All
- 想无痕使用？点击左上角开启 **Temporary Chat 临时聊天**

**✅ 示例用途**

![img_v3_02l8_95ff668a-3c23-4bb8-aee6-2cfed34c186g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_95ff668a-3c23-4bb8-aee6-2cfed34c186g.jpg)

帮助文档：https://help.openai.com/en/articles/8590148-memory-faq
`;

export const GoogleAgentBuilder = `
- 企业级 AI 正转向 **“多 Agent 系统”**：多个智能体协作完成任务
- Agent 不再只是问答机器人，而是具备：
  - 推理（Reasoning）
  - 规划（Planning）
  - 记忆（Memory）
- Vertex AI 正在构建 **从模型 → 数据 → Agent** 的完整平台

## **🧠 什么是“Agent”？**

> 简单说，Agent 就是一个**会自主思考、决策、执行任务**的 AI 助手。

比如：

- 一个帮你分析数据、做报表的 Agent
- 一个能跨系统调接口、安排工单的自动客服 Agent
- 一个能像人一样规划安装电动车充电桩的城市建设 Agent



## **🌐 Google 要做什么？**

Google 不是只造一个 Agent，而是帮你搭建一个**完整的“Agent 工厂”平台**：

> 不管你用什么模型、用哪个工具、连了哪个数据库，都能在 Vertex AI 上统一开发、部署、运行和监控你的 Agent。

这就像是给企业一整套“AI 员工”招聘、培训、调岗、管理、记忆能力都配套齐全的系统。

## **核心组件概览**

![img_v3_02l8_a1489038-1304-49fc-9ceb-d9b2dfa9195g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_a1489038-1304-49fc-9ceb-d9b2dfa9195g.jpg)

### **🔧 核心模块 1：Agent Development Kit（ADK）——低门槛开发 AI Agent**

ADK 是一个**开源工具包**，只要懂一点 Python，就可以在 100 行代码内写出一个功能完整的 Agent。

它支持你：

![img_v3_02l8_269b4105-c680-4e81-9b48-75f024a0ee5g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_269b4105-c680-4e81-9b48-75f024a0ee5g.jpg)

💡 有个“Agent Garden”仓库，里面放了很多现成的 Agent 示例，你可以复制+改一改直接用。

![img_v3_02l8_ea0d22f6-0017-44af-93e7-df27fff238fg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_ea0d22f6-0017-44af-93e7-df27fff238fg.gif)



- **开源 + 多模型兼容**：支持 Gemini、Claude、Mistral、Meta 等 200+ 模型
- **核心能力**：
  - 指令控制（orchestration + guardrails）
  - 多模态交互（语音/视频流）
  - 工具调用 + 记忆模块 + reasoning 控制
- **支持 MCP（Model Context Protocol）**：从企业数据库/搜索/地图获取事实基础
- **一体化部署支持**：Cloud Run / Kubernetes / Vertex AI

只需不到 100 行直观的代码即可构建 AI 代理。点击[此处](http://github.com/google/adk-samples)查看示例 。

详细：https://google.github.io/adk-docs

### **🚀 核心模块 2：Agent Engine ——一键部署 Agent 到线上系统**

做完 Agent，如何把它上线并稳定运行？

> 用 Agent Engine，它是一个“托管平台”，帮你解决所有部署、扩容、安全、监控问题。

![img_v3_02l8_abcae0f8-6c45-4bf8-a930-6befc2f5008g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_abcae0f8-6c45-4bf8-a930-6befc2f5008g.jpg)

![img_v3_02l8_b592cc17-ec74-4df2-a319-b25ef30b66dg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_b592cc17-ec74-4df2-a319-b25ef30b66dg.png)

📦 可以部署到 Cloud Run、Kubernetes、Vertex AI，甚至可以连到 Google 的 Agentspace 企业协作平台。

### **🤝 核心模块 3：Agent2Agent 协议（A2A）——不同 Agent 之间也能“对话协作”**

> 类似“AI 版的蓝牙”或“公司内部通信标准”，让不同厂家的 Agent 能互相合作、共享能力。

比如：

- 一个客服 Agent 触发另一个数据检索 Agent
- 一个写文案 Agent 配合另一个生成图片的 Agent

✅ 当前已有 50+ 公司支持，包括： Salesforce、PayPal、ServiceNow、UiPath、Elastic、Box、Deloitte 等

### **🧩 核心模块 4：让 Agent “看懂”你已有的公司系统和数据**

Agent 不应该只能靠模型猜，它要能“接地气”，懂你公司的业务数据。

Google 支持：

![img_v3_02l8_ff7aaa34-a965-46af-b286-6c45f463943g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_ff7aaa34-a965-46af-b286-6c45f463943g.jpg)

### **🛡️ 核心模块 5：全面的企业级安全防护**

- ✅ 限制权限（Agent 只能看特定表）
- ✅ 检查输入/输出，防注入/越权
- ✅ 可记录每一步操作与思考过程
- ✅ 默认启用内容安全过滤器（避免输出敏感话题）

**✅ 企业案例：**

- 🏪 Revionics（定价 AI）：多个 Agent 协作完成“定价策略+预测+约束”工作流
- 🚗 Renault（EV部署）：Agent 分析交通+地理数据 → 最优充电桩布局
- 📺 日本电视台：用 Agent Engine 快速部署视频分析系统，节省约 1 个月开发时间

官方介绍：https://cloud.google.com/blog/products/ai-machine-learning/build-and-manage-multi-system-agents-with-vertex-ai
`;

export const GoogleModelsUpdate = `
## **1️⃣ Veo 2（视频生成）功能升级**

- 🔧 **视频编辑工具上线**：
  - **Inpainting**：逐帧去除视频元素（如背景Logo）

![img_v3_02l8_efe11b26-f7b7-47e5-8d23-a61a2fe5f4cg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_efe11b26-f7b7-47e5-8d23-a61a2fe5f4cg.jpg)



- **Outpainting**：扩展画面边界，适配多种屏幕比例（如横转竖）

![img_v3_02l8_1ad03593-723b-4164-820b-80ab3546527g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_1ad03593-723b-4164-820b-80ab3546527g.jpg)



- **镜头控制**：设定角度、时间流、摄影机轨迹（如航拍感）
- **帧插值（interpolation）**：连接两个片段，平滑过渡

![img_v3_02l8_6cb66674-502f-4ebc-85a2-c8710952a41g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_6cb66674-502f-4ebc-85a2-c8710952a41g.jpg)

- 🎯 从“生成工具”升级为“视频创意平台”
- 🧪 案例：将**达利1937年未实现的剧本**《Giraffes on Horseback Salad》通过 Veo 2 实现成影片

## **2️⃣ Imagen 3（文本生成图像）增强**

- 🖌️ 新能力：
  - 物体去除 + 区块修复（inpainting）

![img_v3_02l8_f15ed2e2-9678-43a5-9c8b-f49d405669eg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_f15ed2e2-9678-43a5-9c8b-f49d405669eg.jpg)

- 图像细节、光影提升，极大减少伪影
- 🎯 用于广告、产品、网页内容创作
- 🧪 应用：L’Oréal、Kraft Heinz 用于全球市场图像内容制作，支持 20+ 国家语言



## **3️⃣ Lyria（文本生成音乐）首次开放**

- 🔥 Vertex AI 首个 AI 作曲模型
- 🎼 特点：
  - 高保真（Hi-Fi），捕捉音乐细节
  - 支持多风格（电子、古典、爵士等）
  - 可精确控制速度、配器、氛围、节奏
- 💼 用途：
  - 为视频创作专属配乐
  - 自动生成品牌声标识（sonic branding）
  - 减少音乐授权成本与创作时间

示例 Prompt：

> “生成一段高强度 Bebop 爵士乐，以高速的萨克斯和小号独奏主导，背景钢琴提供和弦伴奏，低音贝司和鼓快速交替，营造深夜爵士俱乐部氛围。”

## **4️⃣ Chirp 3（语音生成 + 语音理解）强化**

✨ 新功能：

- 🗣️ **Instant Custom Voice**：
  - 输入 10 秒语音，生成个性化配音模型
  - 用于客服系统、品牌语音、无障碍阅读
- 📝 **Transcription with Diarization**：
  - 转录+区分不同发言者（多讲者会议摘要、播客分析）

✅ 覆盖 35+ 种语言 + 8 种发音风格

✅ 所有合成语音配备安全使用验证机制

**Vertex AI 已全面支持四大多模态生成模型**

![img_v3_02l8_d78d3be6-68f2-42bb-9c53-29b1e154d7eg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_d78d3be6-68f2-42bb-9c53-29b1e154d7eg.jpg)

Vertex AI 成为唯一同时支持「图 + 音 + 乐 + 视频」全链条生成的企业平台。

官方介绍：https://cloud.google.com/blog/products/ai-machine-learning/expanding-generative-media-for-enterprise-on-vertex-ai
`;  

export const OrpheusTTS = `
**Orpheus-TTS** 是由 CanopyAI 发布的一个开源**高质量语音合成系统**，目标是：

> 利用大型语言模型（LLM）驱动的语音生成，实现**极为自然的人类语音表达**，在音调、节奏、情绪等方面超越现有商业模型。

它支持**实时流式语音合成、零样本克隆、情感调控**，可部署于本地或云端，适用于数字人、语音助手、AI 视频、教育内容等

## 概述

### **亮点**

- **比闭源强**：号称语音自然度和情感表达超过 Eleven Labs 和 PlayHT 等商业模型。
- **超级灵活**：支持零样本克隆、实时流式处理，还能加情绪标签。

### **两个模型版本**

- **微调版（Finetuned Prod）**：适合日常用，比如做语音助手或播客。
- **预训练版（Pretrained）**：基于 10 万多小时的英文语音数据，适合研究或定制化。

### **主要功能**

1. **超自然语音**

- 生成的语音有自然的语调、节奏，还能表达情绪，比如开心、叹气或笑。
- 支持特殊标签（比如 <laugh>、<sigh>、<yawn>），让语音更生动。

1. **零样本克隆声音**

- 不用额外训练，就能模仿某个人的声音（比如给一段音频，它就能学着说）。
- 提供预设音色（如 "tara", "zoe", "leo", "zac" 等）

1. **控制情绪和语调**

- 用简单的标签或提示，就能让语音听起来兴奋、平静或伤感。
- 支持不同语气风格的表达，便于故事讲述与角色演绎

1. **超低延迟**

- 实时应用延迟低至 200 毫秒（输入流式处理时可降到 100 毫秒），适合聊天机器人或直播场景。

1. **多语言支持**

- 目前主打英文，但也支持法语、德语、西班牙语、意大利语、汉语、韩语和印地语（每种语言训练了 1000 到 2 万小时数据）。
- 可以用其他语言的数据微调，扩展更多语言。

1. **开源免费**

- 用 Apache 2.0 许可证，完全开放，任何人都能用、改或加到自己的项目里。

### **Orpheus-TTS 支持的语言列表**

![img_v3_02l9_9f0f378a-9663-4ba4-9654-c0220b5d2b0g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l9_9f0f378a-9663-4ba4-9654-c0220b5d2b0g.jpg)

**备注：**

- ✅ 每个语言包含一对模型：**Pretrained（基础）+ Finetuned（优化）**
- 📢 官方说明这是**“研究预览”阶段**，可能存在小问题（如声调控制、节奏微调待优化）
- 🧠 项目设计中使用统一的 Prompt 格式，方便在不同语言之间迁移调用
- 🌐 各语言支持不同的声音角色（voice names）和控制标签（如 <笑>、<叹气> 等）

## **模型架构与训练体系**

Orpheus 语音模型基于 **LLaMA 架构**（即 LLM 架构），发布了以下版本：

![img_v3_02l9_ae0af8c0-4f08-4433-bb4e-2303a32b624g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l9_ae0af8c0-4f08-4433-bb4e-2303a32b624g.jpg)

🔍 模型基础：

- 构建于 **LLaMA 3B** 基座之上（LLM 结构）
- 采用大规模语音数据（10万小时以上）进行预训练

![img_v3_02l9_34e8ccfe-5da0-43fb-a915-d1b8683df6fg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l9_34e8ccfe-5da0-43fb-a915-d1b8683df6fg.jpg)

📦 模型种类：

- Finetuned-Prod: 微调后的主力推理模型（推荐使用）
- Pretrained: 仅预训练版本，用于迁移学习
- Multilingual Family: 多语种版本（7种语言）

🎯 训练数据：

- 基于 HuggingFace 格式组织
- **微调（Finetuning）**
  - 建议每个音色用 50~300 条样本即可实现高质量微调
  - 每语言由 2 名专业配音演员录制约 300 句台词
  - 台词中嵌入情绪标签，语言原生化处理
  - 微调参数：全部可训练、bf16 精度、cosine learning rate decay
- 数据量示例：
  - 中文：20,000 小时
  - 法/德/韩：各 5,000 小时
  - 西/意/印地语：各 1,000 小时

## **如何使用**

### **在线测试**

- 用 [Google Colab](https://colab.research.google.com/drive/1KhXT56UePPUHhqitJNUxq63k-pQomz3N) 跑微调版或预训练版（GitHub 里有链接），不用自己装环境。

### **本地部署**

- 需要 GPU（推荐 RTX 系列，12GB+ 显存最好）。
- 装 vLLM（快速推理库），可能得用特定版本（比如 vLLM==0.7.3，避开新版 bug）。
- 支持 LM Studio 或 llama.cpp 跑本地模型。

### **微调模型**

- 改 config.yaml 文件，加入你的语音数据。
- 跑 train.py 脚本，就能训练自己的专属模型。

GitHub：[GitHub - canopyai/Orpheus-TTS: Towards Human-Sounding Speech](https://github.com/canopyai/Orpheus-TTS) 

模型：https://huggingface.co/canopylabs

官网：https://canopylabs.ai/model-releases
`;

export const WordPressAIWebsiteBuilder = `
[WordPress.](http://wordpress.com/)推出了一个全新的 **AI 网站构建器**（AI Website Builder），这是一个基于人工智能的工具，旨在帮助用户快速创建专业网站，无需 coding 经验或复杂的设计操作

它的目标是让**任何人都能快速创建并自定义网站**，无需编程技能。

适用于：

- 博客写作
- 商业网站
- 作品集展示
- 电商初创
- 内容订阅平台（如付费邮件）

## **主要功能**

### AI 一键生成网站

- 输入一句话描述（比如“我想要一个展示我摄影作品的网站”），AI 就会自动生成网站。
- 它会自己写文字、选图片、设计布局，省去你手动调整的麻烦。

### 简单易用

- 完全不需要懂代码或设计。
- 像聊天一样跟 AI 说你想要啥，它就帮你改。比如“把颜色换成蓝色”或“加个联系页面”。

### 个性化调整

- 生成后，你可以随时改字体、颜色、图片或内容。
- 提供拖拽编辑器，方便手动微调。

### 快速上线

- 网站生成后，可以直接托管在 [WordPress.com](http://wordpress.com/) 上，几分钟就能让全世界看到。

### 免费试用

- 新用户有 30 次免费 AI 提示（prompt），可以用来生成或调整网站。
- 想继续用或正式发布网站，需要订阅 [WordPress.com](http://wordpress.com/) 的付费计划（比如 Premium 或 Business 计划）。

![img_v3_02l8_51bc0808-3301-4d8e-bad4-5939df8d45ag](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_51bc0808-3301-4d8e-bad4-5939df8d45ag.jpg)

## **功能特点**

### **🎨 1. 拖放式编辑器（Block Editor）**

- 所有页面均可使用模块化的**拖拽式编辑器**
- 拖动图片、文字、视频、表单等“区块”到页面任意位置
- 支持 **预设布局模板（Block Patterns）**，一键生成好看的页面结构

![img_v3_02l8_b1f1ca1c-a262-4ab3-ac69-3043b3d028fg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_b1f1ca1c-a262-4ab3-ac69-3043b3d028fg.jpg)

### **💡 2. 个性化设计**

- 修改字体、颜色方案、边框、CSS 样式
- 上传 Logo、自定义网站图标
- 调整全站配色和排版风格，适配品牌个性

![img_v3_02l8_d9411c8c-658e-459f-9d5b-0a1ced9e974g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_d9411c8c-658e-459f-9d5b-0a1ced9e974g.png)

### **📦 3. 媒体管理与素材集成**

- 无限上传图片、视频、播客、PDF 等内容

- 集成了 **Openverse 与 Pexels** 免费图库，快速插入免版权图像

  

### **🔌 4. 插件与集成生态（适用于付费用户）**

- 超过 **50,000 个插件支持**（如 SEO、商店、表单等）
- 支持外部服务集成：如 Mailchimp、Google Analytics、Yoast SEO、ConvertKit 等

![img_v3_02l8_5233e3d2-5544-4f33-ab7c-accb324c5e4g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_5233e3d2-5544-4f33-ab7c-accb324c5e4g.jpg)

## **适合谁用？**

- **创业者/小商家**：想快速有个专业网站展示业务，但没时间学设计。
- **自由职业者/创作者**：需要一个好看的作品集，展示作品或服务。
- **博主/副业玩家**：想分享想法或内容，快速建个博客。
- **开发者**：想给客户快速展示网站雏形，省去从头设计的麻烦。



## **有哪些限制？**

- **目前功能**：暂时不适合做复杂的电商网站或需要高级集成的网站（比如复杂的预订系统），但 WordPress 说未来可能会加这些功能。
- **仅限新网站**：这个 AI 构建器目前只能用来创建全新的 [WordPress.com](http://wordpress.com/) 网站，没法用在已有的网站上。
- **托管要求**：免费试用后，要正式上线需要买 [WordPress.com](http://wordpress.com/) 的托管计划（最便宜的 Premium 计划大概每年 96 美元）。



## **怎么开始用？**

1. 去 [WordPress.com](http://wordpress.com/) 注册或登录账号。
2. 进入 AI 网站构建器页面（Appearance → Editor）。
3. 输入你的网站需求，比如名字、类型（博客、商店等）和风格。
4. AI 生成网站后，你可以改动或直接发布。
5. 用完 30 次免费提示后，选个付费计划就能继续用。

## **价格对比**

![img_v3_02l8_988e66a8-ddb0-453f-95c0-8ee6f938286g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_988e66a8-ddb0-453f-95c0-8ee6f938286g.jpg)

![img_v3_02l8_d2cbf195-c76c-41f6-9e15-2d0c92b9b6eg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_d2cbf195-c76c-41f6-9e15-2d0c92b9b6eg.jpg)



详细价格表见：[官方定价页](https://wordpress.com/pricing/) 

在线体验：https://wordpress.com/ai-website-builder/




`;

export const xAIGrok3API = `

xAI 提供多个版本的 **Grok 模型**，适配不同应用场景：

![img_v3_02l8_726811b8-9103-483e-bcf1-f2fe4826ae9g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_726811b8-9103-483e-bcf1-f2fe4826ae9g.jpg)

![](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_f5b474d5-0306-4461-b40a-977be713275g.jpg)

**📘 文本模型定价（Text Completion）**

![img_v3_02l8_006ab3fe-e575-436c-bab6-67956fe6481g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_006ab3fe-e575-436c-bab6-67956fe6481g.jpg)

✅ 所有模型支持 **131K tokens 上下文**，方便长文摘要、长对话场景。

**多模态模型定价（图像输入/生成）**

![img_v3_02l8_95a2624f-3714-4977-b896-1a03dab195ag](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_95a2624f-3714-4977-b896-1a03dab195ag.jpg)

📌 图像文件限制：

- 最大尺寸：10MB
- 格式支持：JPG / PNG
- 可混合输入顺序（图像+文字任意组合）



**上下文窗口与提示结构**

![img_v3_02l8_7c0155ad-531e-407b-bad1-8f9a68d7928g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_7c0155ad-531e-407b-bad1-8f9a68d7928g.jpg)

🧠 特点说明：

- **无对话角色顺序限制**：system / user / assistant 可任意顺序组合
- **多模态支持**：部分模型支持图像 + 文字组合 prompt
- **输出可为文本或图像**（依模型）



**限制与注意事项**

- ❌ **不连接互联网**：Grok 模型无法实时访问外部网页或数据
- 📆 **知识截止时间为 2024 年 11 月 17 日**
- 🛠️ 实时事件必须**作为上下文输入**添加给模型
- ✅ 支持直接指定模型别名（如 grok-3, grok-3-fast-latest）



**是否有免费额度？**

- 官方未标注免费配额（需查看 API 控制台实际调用额度）
- 部分开发者账号可能提供试用期体验额度
- 建议：登录 xAI 控制台，查看你的 API Key 绑定的 **模型可用性和计费状态**



官方信息：https://docs.x.ai/docs/models#models-and-pricing
`









