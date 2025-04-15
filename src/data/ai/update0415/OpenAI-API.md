\#前沿动态



**OpenAI以API的形式发布了三个新模型:GPT-4.1、GPT-4.1 mini和GPT-4.1 nano**

![img_v3_02lc_4f24f94e-264f-4f01-b1f6-b285c7f667dg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_4f24f94e-264f-4f01-b1f6-b285c7f667dg.jpg)

OpenAI 以API 的形式发布了三个新模型：GPT-4.1、GPT-4.1 mini 和 GPT-4.1 nano。

这些模型的性能全面超越 GPT-4o 和 GPT-4o mini

在编码和指令跟踪方面均有显著提升。

拥有100 万个token的上下文

知识截止时间更新至 2024 年 6 月

![img_v3_02lc_d6516000-7d11-4090-9fa7-fca36773733g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_d6516000-7d11-4090-9fa7-fca36773733g.jpg)

![img_v3_02lc_a142cf12-4238-4875-9952-b3ef8a46910g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_a142cf12-4238-4875-9952-b3ef8a46910g.jpg)

- **GPT-4.1**：旗舰模型，在编码、指令遵循和长上下文理解方面表现最佳，适用于复杂任务。
- **GPT-4.1 mini**：小型模型，在多个基准测试中超越 GPT-4o，同时将延迟降低近一半，成本降低 83%，适合需要高效性能的场景。
- **GPT-4.1 nano**：OpenAI 首个超小型模型，速度最快、成本最低，拥有 100 万 token 上下文窗口，适用于低延迟任务如分类和自动补全。

![img_v3_02lc_c89c6e85-f37b-466f-b4b3-e79ec810df9g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_c89c6e85-f37b-466f-b4b3-e79ec810df9g.png)



**🛠️ 关键能力提升**

**1. 编程能力（Coding）**

- **SWE-bench Verified**：GPT-4.1 完成率 **54.6%**，大幅优于 GPT-4o（33.2%）和 GPT-4.5（38%）。
- 在 **Aider’s polyglot diff benchmark** 中（处理代码差异格式），GPT-4.1 diff 格式准确率达 **52.9%**，提升显著。
- **前端开发更优**：GPT-4.1 生成的 Web 页面在功能和美观性方面，80% 被人类评审偏好。

![img_v3_02lc_507d7226-ad3b-47ab-bf48-3e9b0988ad3g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_507d7226-ad3b-47ab-bf48-3e9b0988ad3g.jpg)

- **实际案例**：
  - **Windsurf**：代码接受率提升 60%，调用工具效率提升 30%。
  - **Qodo**：在 200 个真实 PR 上，GPT-4.1 在 55% 的场景下生成更优评审。



**2. 指令遵循能力（Instruction Following）**

- **MultiChallenge（Scale AI）**：GPT-4.1 得分 **38.3%**，比 GPT-4o 高 10.5%。
- **IFEval**：得分 87.4%，显著提升复杂指令的遵循能力。

![img_v3_02lc_4a7ffa55-c91d-45d9-bc4f-b6473325028g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_4a7ffa55-c91d-45d9-bc4f-b6473325028g.jpg)

- 更擅长处理：
  - 自定义格式（如 YAML、Markdown）
  - 否定指令
  - 多步顺序任务
  - “不确定就说不知道”类问题
- **实际案例**：
  - **Blue J**：税务场景中 GPT-4.1 的准确率提升 53%。
  - **Hex**：SQL 查询生成任务准确性提升 2 倍。



**3. 长上下文处理能力（Long Context）**

- 上下文窗口从 GPT-4o 的 12.8 万 token 扩展到 100 万 token，足以处理 8 个 React 代码库的完整内容。
- 在 Video-MME（长视频无字幕）基准测试中，GPT-4.1 得分 72.0%，比 GPT-4o（65.3%）提升 6.7%，在长上下文多模态任务中创下新纪录。
- OpenAI 还发布了两个新评估数据集：
  - **OpenAI-MRCR**：测试模型在长上下文中检索和区分多个相似信息的能力，GPT-4.1 在 100 万 token 上下文中的表现依然强劲。
  - **Graphwalks**：测试多跳推理能力，GPT-4.1 在广度优先搜索任务中得分 61.7%，与 o1 相当，远超 GPT-4o（41.7%）。

![img_v3_02lc_14d562bd-500e-4f35-b155-d62db6d38edg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_14d562bd-500e-4f35-b155-d62db6d38edg.jpg)

- Graphwalks BFS <128k 准确率 **61.7%**

  OpenAI-MRCR 1M token 两针准确率 **46.3%**

- **实际案例**：

  - **Thomson Reuters**：多文档法律审核准确率提升 17%
  - **Carlyle**：大文档中财务数据提取效率提升 50%



**4. 多模态能力（Vision）**

- 图表、数学视觉推理上优于 GPT-4o：
  - **MMMU**（图文理解）：GPT-4.1 得分 74.8%

![img_v3_02lc_0f020945-b107-4d89-872a-65603722765g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_0f020945-b107-4d89-872a-65603722765g.jpg)

- **MathVista**（视觉数学）：GPT-4.1 得分 72.2%

![img_v3_02lc_bee49526-a490-43bf-9ad0-d289f18717dg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_bee49526-a490-43bf-9ad0-d289f18717dg.jpg)

- **CharXiv**（科研图表）：GPT-4.1 得分 56.7%

![img_v3_02lc_64f7f356-afe7-4705-a7da-184104958a1g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_64f7f356-afe7-4705-a7da-184104958a1g.jpg)

- **Video-MME**（长视频理解）：GPT-4.1 得分 72.0%，领先行业

![img_v3_02lc_67089f6c-7c17-43bc-a4d0-d047617698dg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_67089f6c-7c17-43bc-a4d0-d047617698dg.jpg)



**💰 价格与性能**

![img_v3_02lc_d132dd0b-a49d-4720-8899-a2c903f2f23g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_d132dd0b-a49d-4720-8899-a2c903f2f23g.jpg)

- GPT-4.1 的中位查询价格比 GPT-4o 低 26%，GPT-4.1 nano 是 OpenAI 有史以来最便宜的模型。
- GPT-4.1 mini 的延迟比 GPT-4o 降低近一半，成本降低 83%，在智能评估中匹配或超越 GPT-4o。
- GPT-4.1 nano 在 12.8 万 token 上下文的查询中，首 token 响应时间通常少于 5 秒。

![img_v3_02lc_091ea1f0-2622-4216-8a20-01c02b4be7dg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_091ea1f0-2622-4216-8a20-01c02b4be7dg.jpg)



- 支持 prompt 缓存，最高可享 **75% 折扣**
- 适配 **Batch API** 可再打 5 折
- 🧾 与 GPT-4o 相比：
  - GPT‑4.1 性价比提升 26%
  - GPT-4.1 mini 性能接近但成本降低 83%
  - nano 是目前**最快+最便宜**模型



**现实世界的应用案例**

OpenAI 与多个合作伙伴测试了 GPT-4.1 系列模型，展示了其在现实世界任务中的表现：

- **编码**：
  - **Windsurf**：GPT-4.1 在内部编码基准测试中比 GPT-4o 高出 60%，代码更改首次审查通过率更高，工具调用效率提升 30%，重复编辑减少 50%。
  - **Qodo**：在 GitHub 拉取请求的代码审查任务中，GPT-4.1 在 55% 的案例中提供更好的建议，兼顾精确性和全面性。
- **指令遵循**：
  - **Blue J**：在复杂税务场景的内部基准测试中，GPT-4.1 比 GPT-4o 准确率高 53%，提升了税务研究的效率。
  - **Hex**：在 SQL 评估中，GPT-4.1 的准确率提升近 2 倍，尤其擅长处理大型模糊模式下的表选择，减少了手动调试。
- **长上下文**：
  - **Thomson Reuters**：GPT-4.1 在多文档法律审查任务中准确率比 GPT-4o 提高 17%，能准确识别文档间的矛盾条款和补充上下文。
  - **Carlyle**：在提取大型金融文档数据时，GPT-4.1 的检索能力提升 50%，克服了其他模型在针尖式检索和多跳推理中的局限。



**支持 AI 代理（Agents）**

GPT-4.1 系列模型在指令遵循和长上下文理解方面的改进，使其更适合构建 AI 代理（能够自主完成任务的系统）。结合 OpenAI 的 Responses API，开发者可以创建更可靠的代理，应用于：

- 软件工程：自动完成代码编写和调试。
- 大型文档分析：提取关键信息，生成洞察。
- 客户支持：处理复杂请求，减少人工干预。

**📌 后续变化**

- **GPT-4.5 Preview 将于 2025 年 7 月 14 日停用**
- GPT-4.1 将逐步成为开发者 API 的核心模型



发布会视频 翻译  

官方介绍：https://openai.com/index/gpt-4-1/