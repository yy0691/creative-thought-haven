export const bytedanceResearch = `

论文：https://arxiv.org/pdf/2504.00509


近年来大模型（LLMs）在数学和推理任务上表现出“超人类”水平，但这种表现是否真来自“真正的推理能力”，抑或只是“复读机”式的模板记忆和复述。

这个问题尤为关键，因为：

- 当前模型在训练中接触了大量互联网上的“经典题型”和“标准解法”。
- 如果只是靠“背答案”而不是“理解问题”，那么LLM的“智能”本质是有缺陷的。

为此，字节跳动研究团队提出一个新的评测基准 **RoR-Bench** 来研究这一问题。

## **❗ 核心发现**

- 几乎所有知名AI模型（ChatGPT、Claude、Gemini、DeepSeek等）在**改动后的题目上表现一塌糊涂**。
- 本来答对率有80%，一改就掉到20%多，甚至更低。
- 模型常常“不看清题目”，还是用老套路答题。

所有主流大模型（如OpenAI GPT-4系列、Claude、Gemini等）在“变异题”上均**大幅性能下滑**，即：

- 平均准确率下降超过 **50%**
- 部分模型（如DeepSeek-R1、OpenAI-o3）准确率下降超过 **60%**

### **🧠 结论：**

这些模型实际上是**“**复述训练中见过的解题模板**”**，而非基于输入条件真正进行**语义理解与逻辑推理****。

### **📉 示例：**

- 问题改了一个词（如将“相向而行”改为“相背而行”），模型仍套用原来的解法，导致错误回答。
- 在“无解问题”中，绝大多数模型**强行生成错误答案**，无法识别问题本身不可解。

![**img_v3_02l1_dc80573f-377c-4b5d-9d9b-fa83f0af041g**](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_dc80573f-377c-4b5d-9d9b-fa83f0af041g.jpg)

## **🧪 方法：RoR-Bench 数据集设计**

他们设计了一个 **中文多模态评测集 RoR-Bench（Recitation over Reasoning Benchmark）**，专门用于检测“复述 vs 推理”的问题：

### **🎯 数据设计原则：**

- 每个题目对包含：

1. 一个“标准题目”（LLMs 普遍能答对）
2. 一个“轻微修改”的变异题（仅改动一处关键条件，但答案完全不同）

例如：

> - 原题：“两车相向而行，距离300公里……多久相遇？” → 正确答案：1.5小时
> - 改题：“两车相背而行……” → 正确答案：**永远不会相遇**

但大多数 LLM 仍按照第一种情况计算！

### **🔢 数据构成：**

- **总计 215 对题目**（158文本 + 57图像）
- 涉及任务种类广泛，包括：
  - 算术（57题）
  - 几何、概率、博弈、常识、逻辑推理、图像错觉等
- 特别设置了：
  - **32个“无解”题目**（测试模型是否能判断题目无解）
  - **“陷阱题”**：答案与条件无关，用于进一步测试模型对条件的关注度

### **🧑‍🏫 人工标注流程：**

- 由17名人工标注者撰写 & 改题
- 由6名资深审阅员人工检查，确保：
  - 条件变化显著影响解法
  - 没有模糊或歧义
  - 语言变化尽量小，确保检测是否“看懂”了题

![img_v3_02l1_864a74e0-1b43-40a2-a3be-91c4f2c4d54g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_864a74e0-1b43-40a2-a3be-91c4f2c4d54g.jpg)

### **📊 实验设置**

#### **📌 模型列表（共23个文本模型 + 15个多模态模型）：**

🌐 大模型（带CoT长思维）：

- DeepSeek-R1
- OpenAI-o1-1217
- OpenAI-o3-mini-high
- Claude 3.7 Sonnet
- Gemini-2.0 Flash-0121

🔧 常规模型（不带长思维）：

- GPT-4.5-Preview
- Claude 3.5 Sonnet
- Gemini-2.0 Pro
- DeepSeek-V3
- Yi-Lightning、Minimax、Mistral等

🧠 小模型：

- Qwen 2.5-7B、14B

🖼️ 多模态模型（15个）：

- GPT-4o, Claude VLM, Gemini Flash/Pro, Qwen-VL, Nova, SenseChat 等



## **📉 核心实验结果**

### **1️⃣ 文本任务结果（表1）：**

![img_v3_02l1_e7efcc4b-378d-4451-b98f-ef3caab8098g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_e7efcc4b-378d-4451-b98f-ef3caab8098g.jpg)

▶️ 所有模型平均准确率从**70-90分直接跌到20-30分以下**。

**![img_v3_02l1_2ff27a9e-563c-40a3-aea1-e8bcf11c0f3g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_2ff27a9e-563c-40a3-aea1-e8bcf11c0f3g.jpg)**

### **2️⃣ 多模态任务结果（表2）：**

![img_v3_02l1_bf4fe644-a3e1-4342-b6e8-14b26f3a8deg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_bf4fe644-a3e1-4342-b6e8-14b26f3a8deg.jpg)

▶️ 可视推理能力也严重依赖“模板记忆”，视觉模型同样中招。

![img_v3_02l1_e6e7c685-752a-43f2-a96f-ce1682c82b3g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_e6e7c685-752a-43f2-a96f-ce1682c82b3g.jpg)

## **🧨 测试结果令人震惊**

- AI大多数时候**根本没看懂改动的条件**，还是用原来的方法套公式。
- 本来答对率有80%，结果一改动就掉到20%。

就像学生答题时说：

> “我记得这题！答案是 1.5 小时！” 但他完全忽略了题干已经改成“反方向”了。

![img_v3_02l1_5e9e2c8e-de5a-4b2b-b6c3-9af18058601g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_5e9e2c8e-de5a-4b2b-b6c3-9af18058601g.jpg)

## **📉 AI的“聪明”其实是一种误会？**

是的。这说明现在的AI很多时候并不是“理解题目再解题”，而是：

✅ 模型在训练中见过类似题

✅ 它直接复述解决模板

❌ 并没有认真看清题目的“细节差异”

**🧪 原因分析与修正尝试**

他们试过很多办法让AI“别套模板”：

- 加提示语：“请严格看题”
- 给几个类似例子做参考
- 强行告诉它：“题目没有错，按字面理解”
- 让AI思考得更“长一点”（Chain of Thought）

📉 结果：都只能小幅提升，效果仍然不理想！

**❓ 模型是否把改动看成“打错字”？（Typo Hypothesis）**

- 采用 “**强制纠正提示语（Forced Correct, FC）**”：要求严格按题目字面回答
- 结果仍旧大幅下降，说明模型**不是因为误解，而是本质依赖模板**



## **💡 Few-shot 学习能解决吗？**

- 加入类似题目的例子作为引导（1-shot / 5-shot）
- 提升效果有限：**平均提升不到15%**，仍难以恢复原题表现



![img_v3_02l1_3253009d-5834-4c84-9ff9-2619a00e874g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_3253009d-5834-4c84-9ff9-2619a00e874g.jpg)

### **🚫 无解问题识别失败（Mental Seal）**

- 多数模型在“无解问题”中仍强行给出答案，说明**固有偏见：题目必须有解**
- 加入FC提示 + 1-shot 才能小幅提升（部分模型提升较大，如 GPT-4.5，其他仍然差）
- 也就是在“无解问题”测试中，大多数模型都“想象”出一个错误答案。

就像问：“火车逆风时烟往哪儿飘？”

正确答案是：电动车头没有烟。

但AI会自信满满地说：**“往东南方向飘。”**

![img_v3_02l1_8df2cf2e-c884-429d-bec1-77b93d61079g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_8df2cf2e-c884-429d-bec1-77b93d61079g.jpg)



### **🎯 核心发现总结：LLMs 更擅长“复述”而非“推理”**

通过RoR-Bench基准系统性地揭示出一个严重但被忽视的问题：

> 当前主流 LLMs（如 GPT-4, Claude 3, Gemini 等）在面对稍作改动的问题时，大幅性能下降，**原因不是能力不够，而是模型倾向于**“复述见过的解法模板”**而非真正理解题目并推理。**

**具体表现：**

- 修改一个词语（如“相向”改为“相背”），准确率就骤降。
- 模型会自动忽略“变动条件”，选择匹配训练中见过的模板解法。
- 说明模型并没有在“做题”，而是在“背题”。

这被称为：

> **Recitation over Reasoning（复述而非推理）**

**⚠️ 对当前 LLM 发展的警示**

虽然当前大模型在复杂任务中展现出强大能力，但本研究指出：

🚨 警告一：AI 的推理能力 **高度依赖训练数据中的常见模式**

- 在经典题、训练中见过的结构下，模型表现良好。
- 一旦遇到稍作改动、打破常规的输入，模型表现就显著下降。

🚨 警告二：**少量语言变化足以让模型“翻车”**

- 即使大部分条件都一样，仅改变一个方向词、单位词等微小细节，模型也容易误判。
- 显示模型在处理“微语义变异（subtle semantic shift）”方面存在**系统性弱点**。

🚨 警告三：**多模态模型也无法幸免**

- GPT-4V、Claude Vision 等视觉语言模型同样受影响，在视觉错觉类任务中也展现出“看图背答案”的倾向。
- 说明“跨模态理解”也尚未建立真正的推理机制。



## **🧪 对现有解决方案的否定性实验结论**

研究中尝试了以下修正方法，效果都**有限**：

1. Forced Correct Prompt（强提示语）：

> “题目保证没错，请严格按题意回答。”

✅ 轻微提升，但仍有约 **50%准确率下降**。

2. Few-shot In-Context Learning（少样本提示）：

> 在模型前提供1~5个“变异题+正确答案”的例子。

✅ 改进有限，尤其在逻辑陷阱或无解问题中仍无法泛化。

3. Chain-of-Thought（长思维链）推理增强：

✅ 适用于复杂问题，但对简单题中细节变化无帮助。

4. 多轮提示/Instruction Tuning：

❌ 模型反而变得更谨慎甚至拒答。

> 📌 结论：现有主流“调教技巧”（Prompt Engineering / Instruction Tuning）无法有效解决“复述”问题。

### **🧠 对未来研究的启示与方向**

研究人员强调，这一发现并不是为了否定大模型的价值，而是为了：

> ✅ 引导研究者、开发者正视 **“理解”与“泛化推理”能力的缺失**。

**未来大模型的发展应从以下方向突破：**

1. 构建真正的语义理解机制

- 不再仅靠“统计匹配模板”，而是逐步引入语义分析、逻辑结构识别、对条件变化的敏感机制。
- 增强“对差异敏感”的训练

- 设计更多“条件微改题”进行对抗性训练，让模型学会关注变化，而非套用套路。
- 构建具备元认知（metacognition）机制的模型

- 能识别“自己是否真的理解题目” vs “只是熟悉模板”
- 类似人类答题时的“回顾与检查”机制
- 发展跨模态一致性推理机制

- 视觉语言模型不能只靠“图像特征模板匹配”，应能结合图文推理语义链条。

`