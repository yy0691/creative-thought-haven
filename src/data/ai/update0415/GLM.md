\# 前沿动态



**智谱发布新一代开源模型GLM系列32B性能媲美671B的Deepseek R1 并宣布启动IPO**

![img_v3_02lc_f36c76d5-3388-4a63-9635-abff8b395f4g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_f36c76d5-3388-4a63-9635-abff8b395f4g.jpg)

智谱宣布**全面开源**其新一代大语言模型 GLM 系列，涵盖以下三款核心模型：

1. **推理模型 GLM-Z1-Air**
2. **沉思模型 GLM-Z1-Rumination**
3. **基座模型 GLM-4-Air-0414**

![img_v3_02lc_3612f60a-3fbb-4b9a-bb3c-1ce66012b73g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_3612f60a-3fbb-4b9a-bb3c-1ce66012b73g.jpg)



- 基础模型 GLM-4-32B 以 320 亿参数量比肩更大参数量的国内外主流模型。GLM-4-32B 强化了代码生成能力，可以生成更为复杂的单文件代码。
- GLM-Z1-Air-32B 是具有深度思考能力的推理模型，在部分任务的性能表现上，在仅使用 32B 参数的情况下，可与参数高达 6710 亿的 DeepSeek-R1 相媲美。
- 推理模型GLM-Z1-Air/AirX-0414不仅性能比肩DeepSeek-R1 等世界一流推理模型，模型推理速度还可以做到**最高 200 Tokens/秒**

![img_v3_02lc_add3590b-b0e9-4dd0-a485-c6482887fedg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_add3590b-b0e9-4dd0-a485-c6482887fedg.jpg)

所有模型均遵循 **MIT 开源协议**，**可商用、无需申请、完全开放权重与部署方式**

**GLM-Z1-Air —— 国内最快的推理模型，性能比肩 DeepSeek-R1**

![img_v3_02lc_c7fc6247-1167-4ac0-b402-ca653f829ceg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_c7fc6247-1167-4ac0-b402-ca653f829ceg.jpg)

![img_v3_02lc_fcba9191-4524-42bf-9f11-6cb285c4e88g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_fcba9191-4524-42bf-9f11-6cb285c4e88g.jpg)

> **关键词：320亿参数、极速推理、推理能力优化、开放式任务适配**

> - AIME 24/25、GPQA、LiveCodeBench 等多个任务中表现接近 DeepSeek-R1（671B）
> - 仅用 32B 参数达到 671B 模型的水平，展现高度优化的推理结构

📌 关键参数与能力：

- **参数规模**：32B
- **对标模型**：DeepSeek-R1（671B），在部分推理任务上性能相当甚至超越
- **测试指标**：在 AIME 2024、LiveCodeBench、GPQA 等基准任务上取得优异表现
- **推理速度**：
  - 标准版：约 50 tokens/s
  - 极速版 AirX：最高可达 **200 tokens/s**
  - 相比 DeepSeek-R1，推理速度最高提升达 **8 倍**

![img_v3_02lc_bd27dff9-68dc-4235-b506-2aad0bb7468g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_bd27dff9-68dc-4235-b506-2aad0bb7468g.jpg)



**速度对比**



**🔧 技术优化细节：**

- 使用 **强化数据微调 + 深度对齐机制**，特别加强数学/逻辑/代码类能力
- 推理框架进行深度优化：
  - GQA 架构 + KV Cache 显存利用最小化，提升并发效率
  - 量化方案、投机采样技术改进推理速度
  - 适配推理调度平台调度粒度，降低吞吐瓶颈

✅ 应用场景：

- 数学/逻辑问答类任务（如考试、作业、流程设计）
- 高并发推理需求平台，如问答机器人、大模型笔试系统、搜索问答引擎
- 低延迟交互式智能体，如AIGC协作助手、教育推理模型

**GLM-Z1-Rumination —— 下一代沉思模型，面向开放式复杂推理任务**

> **关键词：自主思考、动态验证、强化学习、Deep Research**

📌 模型定位：

- 能解决不确定性、多解性、高复杂度问题
- 构建“**提问—搜索—推理—验证—输出**”完整链条
- 可进行 **工具调用 + 搜索引擎整合 + 深度生成分析**

🧠 技术特点：

- **end-to-end 强化学习（RL）训练管线**，跨越搜索、思考、反馈验证全过程
- 模型可调用工具（如搜索引擎、代码运行器、文献数据库）
- 内建“反思—总结—修正”链式推理流程，**避免信息孤岛、单路径思维局限**
- 与人类研究者类比：如“AI 博士生”，可以处理需要检索、归纳、逻辑论证的长任务

示例场景：

- 科研写作、市场调研、政策评估等开放问题生成任务
- 多文档摘要、真伪验证、跨源知识对比任务
- 支持通过 [Z.ai](http://z.ai/) 平台体验，或部署至企业级智能体平台

**GLM-4-Air-0414 —— 强行动能力的基础模型，支持多任务智能体建设**

> **关键词：基础能力、工具调用优化、智能体能力增强、代码能力强化**

- GLM-4-Air-0414：高性能工具智能体基础
- GLM-4-Flash-250414：免费调用基础模型版本

![img_v3_02lc_6c098a21-84ca-41b8-a9e1-6638d2549d3g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_6c098a21-84ca-41b8-a9e1-6638d2549d3g.jpg)



**🌟 技术亮点：**

- 预训练使用 **15T 多源高质量数据**，强化逻辑、代码与推理能力
- 强调指令跟随、函数调用、代码生成与 Artifacts 操作
- 后训练融合 **拒绝采样 + 强化学习** 技术，提升任务完成准确性与泛化能力

📈 性能表现：

- 在工程代码、工具调用、搜索问答方面表现优异
- 与 GPT-4o、DeepSeek-V3（671B）部分任务表现持平
- HTML/CSS/JS/SVG 代码生成可实时预览，支持交互修改（已接入 [z.ai](http://z.ai/)）

![img_v3_02lc_8a9a154b-1ffa-4ac5-b414-97c7864c86fg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_8a9a154b-1ffa-4ac5-b414-97c7864c86fg.jpg)

💻 编程交互能力：

- 原生支持 HTML、CSS、JavaScript、SVG 等前端语言的实时代码生成与运行展示
- 可部署于代码生成平台、AIGC 设计辅助系统、低代码工具中

⚙️ 模块与接口：

- 与工具接口原生兼容，适合智能搜索、插件化助手、企业工具链集成
- 支持大模型原生开发 Agent 系统，形成完整**“感知—思考—行动”链**

🧪 示例任务：

- 用 HTML 模拟太阳系运动
- 用 SVG 展示 LLM 训练流程

![img_v3_02lc_08d26f48-2d0b-40af-ae40-1ceaa5609bbg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_08d26f48-2d0b-40af-ae40-1ceaa5609bbg.jpg)

- 用 JS 实现小游戏（如2048）

**[z.ai](http://z.ai/)** **上线**

智谱全新站点 **[z.ai](http://z.ai/)** 正式启用！该平台集成了对话、推理与沉思三类 GLM 模型，自今日起全面向全球用户免费开放使用。覆盖从文本生成、深度问答到多轮对话的智能场景，帮助用户快速进行智能问答、信息检索与研究任务。

**[z.ai](http://z.ai/)** 目前已上线三款开源模型：

- **GLM-4-32B（对话模型）**：具备强大代码生成能力，支持全新 Artifacts 功能，打造交互式开发体验
- **Z1-32B（推理模型）**：超强推理性能，在线体验最高达 **200 Tokens/秒** 的极速输出
- **Z1-Rumination-32B（沉思模型）**：驱动 Deep Research 能力的强大模型，免费开放

![img_v3_02lc_7e20442e-dfe0-44fe-bcdd-6139dbfb938g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_7e20442e-dfe0-44fe-bcdd-6139dbfb938g.jpg)



同时智谱宣布开始A股IPO...成为第一家正式启动IPO的大模型创业公司