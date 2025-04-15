\# 提示词库



**GPT-4.1提示工程指南**

![img_v3_02lc_03fad873-648d-458b-800b-f089f43d9cag](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_03fad873-648d-458b-800b-f089f43d9cag.jpg)

以前许多典型的最佳实践和提示依旧适用于 GPT-4.1，由于GPT-4.1 更严格、更字面地遵循指令，会非常严格地按照字面指令去执行任务。



这使得它对明确、清晰的提示尤其敏感。也就是说，只要你发现 GPT-4.1 的表现与预期不符，通常只需增加一句简洁明确的说明，就能迅速把模型引导到正确的行为上。



过去的模型（如 GPT-4） 会更自由地揣测或推断用户指令和系统提示背后的真实意图，即使提示不够精确，也可能猜出用户的意图并完成任务。



所以开发者需要对原有的提示方式进行一定调整（迁移）才能使用。



OpenAI提供了一系列 针对 GPT-4.1 的提示工程（Prompting）最佳实践，从基础原则到高级策略，帮助开发者高效构建提示以提升模型表现。



1. 📌 核心提示原则（Core Prompting Principles）











明确指令（Be specific）：确保提示中清楚表达任务目标。







提供结构（Provide structure）：通过示例、模板等方式设定预期输出格式。







避免歧义（Avoid ambiguity）：使用具体词汇与上下文降低误解可能。







设置角色（Set behavior/role）：让模型“扮演某种身份”以调整风格或回答方式。







逐步指导（Decompose tasks）：将复杂任务拆解成多个子任务，提升精度。



2. 📚 提示策略实例（Prompting Strategies）











Few-shot 示例：使用多个输入/输出示例引导模型学习任务结构。







Chain-of-thought（思维链）提示：引导模型按逻辑顺序逐步推理，特别适合复杂问题解决。







Refine prompts（迭代优化）：通过反馈不断调整提示内容以获取更优结果。







Internal monologue：让模型模拟“内心思考过程”以获得更深入分析。







Critique and revise：让模型先生成回答，再进行批评、修改，提升答案质量。



3. 🛠️ 应用技巧（Practical Tips）











使用 "Let's think step by step" 等语句诱导更好推理。







将模型输出限制为 JSON 格式时，需加入明确的格式描述与示例。







对于多步骤任务，最好明确列出每个阶段的要求。







评估提示效果需结合质量、稳定性与成本。



好的！我们来做一个更详细又通俗易懂的分解，把这个 Notebook 当作是一本 “和GPT-4打交道的秘籍”，一步步讲清楚每个要点，让你轻松掌握提示工程（Prompt Engineering）怎么做才有效。







🎓《GPT-4 提示指南》通俗解读版







🧱 一、写好提示的基础原则（五大秘籍）



这些就像是“和AI沟通的黄金法则”，每一条都很重要：



1. 说清楚你要干啥（Be Specific）











不要笼统地说：“请帮我写一篇文章。”







要说得具体一点：“请写一篇关于人工智能如何改变教育的500字文章，用高中生能懂的语言。”



👉 越具体，AI越知道你想要什么，结果也越好。







2. 告诉它怎么做、长什么样（Provide structure）











比如你想让它生成一个表格、清单、或者固定格式的文本。







你可以先提供一个模板，或者给它一个例子。



🧩 例子：



请用以下格式写出五种水果：



名称 | 颜色 | 味道

苹果 | 红色 | 酸甜









3. 不要模棱两可（Avoid ambiguity）











如果你说“列出一些项目”，那“项目”可能指的是“计划项目”、也可能是“软件项目”，模型会糊涂。







所以要具体说明你是说什么。



✅ 改成：“列出五个开源的Python项目。”







4. 让GPT扮演一个角色（Set behavior/role）











你可以告诉它：“你现在是个英语老师”、“你是个法律顾问”、“你是一名医生”。







它就会按那个身份回答你。



🎭 示例：



你是一个专业营养师，请为我制定一周的健康饮食计划。









5. 把任务拆开做（Decompose tasks）











有些问题太复杂，GPT一下子处理不好。







你可以先让它分析问题，再让它解决。



🪜 举个例子：



第一步：请先列出写商业计划书需要的要点。

第二步：请根据这些要点帮我写一份计划书。









💡 二、实用提示技巧（更强更高级的用法）



这些是用GPT更厉害的用法，帮你写得更准、更聪明。







✨ 技巧1：Few-shot 提示（举例教学法）



你可以先给它几个例子，它就知道你想要什么样的输出。



📌 例子：



输入：今天我很开心。

输出：情绪：积极，原因：开心的事发生了。



输入：我觉得压力好大。

输出：情绪：消极，原因：感觉被压力困扰。





然后你再输入新的句子，它就会照着这个风格来。







🧠 技巧2：Chain-of-Thought（思维链）



引导它“一步一步思考”，解决复杂问题特别有效！



📌 提示写法：



请一步步推理这个数学题的答案。









✍️ 技巧3：先写答案，再检查修改（Critique & Revise）



你可以先让 GPT 写出一个答案，然后再让它自己点评、修改。



📌 举个例子：



第一步：请写一个短篇小说。

第二步：请你对这个小说做出评价，并修改成更精彩的版本。





这会得到更高质量的输出！







🔄 技巧4：模拟“思考过程”（Internal Monologue）



你可以让GPT边想边说，好像它在分析问题。



📌 示例：



请你模拟一个律师的思考过程，一步步分析这个案例，并得出结论。





这适合分析、决策类问题。







🛠 三、实际应用小技巧（细节决定成败）











加一句 “让我们一步一步思考” 可以大幅提高准确率。







想要 JSON、表格、代码？一定要告诉它格式，还要举个例子。







想输出多步内容？加编号，比如“第1步... 第2步...”







如果模型回答不理想，就多试几种提示改写方式。







✅ 总结一句话







✨“提示写得好，GPT表现爆表！”✨



这份指南就是在教你：用什么语气、格式、结构、套路和GPT说话，才能让它给你最优质的答案。











以下是对你 GPT-4.1 提示工程指南的完整翻译







GPT-4.1 提示工程指南



GPT-4.1 系列模型在编程能力、指令遵循能力和长上下文处理能力上，相比 GPT-4o 有显著提升。本指南汇总了我们内部广泛测试所得的一系列重要提示技巧，帮助开发者充分发挥新模型家族的优势。



许多典型的最佳实践依旧适用于 GPT-4.1，比如提供上下文示例、尽可能具体清晰的指令、以及通过提示进行规划以最大化模型智能。但我们预计，要充分发挥此模型的作用，需要进行一些提示迁移。GPT-4.1 更严格、更字面地遵循指令，而前代模型倾向于更自由地推测用户与系统提示的意图。然而，这也意味着 GPT-4.1 非常容易被引导，并对清晰、明确的提示非常敏感。如果模型表现与预期不同，一句清晰且明确表述你期望的行为的句子通常就足以引导模型回到正轨。



请继续阅读以下提示示例，注意虽然本指南适用于大多数情况，但并无万能法则。AI 工程本质上是一门经验学科，大型语言模型本质上是不确定性的。我们建议除了遵循本指南外，还要构建有信息量的评估并频繁迭代，以确保提示工程的更改为你的使用场景带来益处。







1. 智能体（Agentic）工作流程



GPT-4.1 是构建智能体工作流的理想选择。我们在模型训练中强化了多样化的智能体问题求解路径，并在非推理模型中，通过智能体配置达成 SWE-bench Verified 测试的最佳表现，解决率达 55%。



系统提示建议



为充分激发 GPT-4.1 的智能体能力，我们建议在所有智能体提示中加入以下三类关键提醒。以下示例面向代码类智能体优化，但稍加修改即可用于通用智能体场景。











持续性提醒：确保模型理解它正处于一个多轮任务中，防止其在问题未解决前就把控制权交还给用户。



你是一个智能体——请持续处理任务，直到完全解决用户的问题后再结束轮次并交还控制权。只有当你确信问题已彻底解决时，才可结束本轮响应。



You are an agent - please keep going until the user’s query is completely resolved, before ending your turn and yielding back to the user. Only terminate your turn when you are sure that the problem is solved.









工具使用提醒：鼓励模型善用工具，降低其猜测或幻觉回答的概率。



如果你不确定与用户请求相关的文件内容或代码结构，请使用工具读取相关信息，不要猜测或编造答案。



If you are not sure about file content or codebase structure pertaining to the user’s request, use your tools to read files and gather the relevant information: do NOT guess or make up an answer.







规划性提示（可选）：引导模型在调用每个工具前后均进行显式计划与反思，而非仅仅调用工具串联完成任务。



你必须在每次函数调用前进行详细规划，并在每次调用后进行深入反思。不要仅依靠连续的函数调用完成任务，否则将妨碍你洞察问题和解决问题的能力。



You MUST plan extensively before each function call, and reflect extensively on the outcomes of the previous function calls. DO NOT do this entire process by making function calls only, as this can impair your ability to solve the problem and think insightfully.





GPT-4.1 对智能体场景下的系统提示和用户指令极为敏感。我们发现上述三条提示在内部测试中将 SWE-bench Verified 得分提升了近 20%。因此，强烈建议在任何智能体提示开头加入这三类明确指令，以将模型从“聊天机器人模式”切换为更主动、更独立的“智能代理模式”。



工具调用



与前代模型相比，GPT-4.1 在调用通过 OpenAI API tools 字段传入的工具方面训练更充分。我们建议开发者仅使用 tools 字段传递工具，而不是将工具描述手动注入到提示中并自建解析器。我们测试发现使用 API 解析工具描述比手动注入提示提升了 2% 的准确率。



开发者应使用清晰的工具命名，并在 “description” 字段中提供详细说明。同样，每个参数也应具备清楚的命名和描述，以确保正确使用。若你的工具较复杂，可以在系统提示中专门加入 # Examples 区段来展示用例，而不是将示例塞进 description 字段中。



你也可以通过 Prompt Playground 的 “Generate Anything” 功能来快速生成良好的工具定义起点。



提示诱导的规划 & 思维链（Chain-of-Thought）



正如前面所说，GPT-4.1 并不是内建“推理链”的模型——它不会在回答前自动形成内部推理路径。但你可以通过提示工程诱导它“显式思考”，逐步列出计划。我们在 SWE-bench Verified 测试中发现：引导模型“思考再行动”使通过率提升了 4%。



示例提示：SWE-bench Verified



以下是我们在 SWE-bench Verified 中取得最高分所用的智能体提示，包括详尽的工作流程与问题解决策略说明。该结构可用于各类智能体任务。



SYS_PROMPT_SWEBENCH = """

You will be tasked to fix an issue from an open-source repository.



Your thinking should be thorough and so it's fine if it's very long. You can think step by step before and after each action you decide to take.



You MUST iterate and keep going until the problem is solved.



You already have everything you need to solve this problem in the /testbed folder, even without internet connection. I want you to fully solve this autonomously before coming back to me.



Only terminate your turn when you are sure that the problem is solved. Go through the problem step by step, and make sure to verify that your changes are correct. NEVER end your turn without having solved the problem, and when you say you are going to make a tool call, make sure you ACTUALLY make the tool call, instead of ending your turn.



THE PROBLEM CAN DEFINITELY BE SOLVED WITHOUT THE INTERNET.



Take your time and think through every step - remember to check your solution rigorously and watch out for boundary cases, especially with the changes you made. Your solution must be perfect. If not, continue working on it. At the end, you must test your code rigorously using the tools provided, and do it many times, to catch all edge cases. If it is not robust, iterate more and make it perfect. Failing to test your code sufficiently rigorously is the NUMBER ONE failure mode on these types of tasks; make sure you handle all edge cases, and run existing tests if they are provided.



You MUST plan extensively before each function call, and reflect extensively on the outcomes of the previous function calls. DO NOT do this entire process by making function calls only, as this can impair your ability to solve the problem and think insightfully.



\# Workflow



\## High-Level Problem Solving Strategy



1. Understand the problem deeply. Carefully read the issue and think critically about what is required.
2. Investigate the codebase. Explore relevant files, search for key functions, and gather context.
3. Develop a clear, step-by-step plan. Break down the fix into manageable, incremental steps.
4. Implement the fix incrementally. Make small, testable code changes.
5. Debug as needed. Use debugging techniques to isolate and resolve issues.
6. Test frequently. Run tests after each change to verify correctness.
7. Iterate until the root cause is fixed and all tests pass.
8. Reflect and validate comprehensively. After tests pass, think about the original intent, write additional tests to ensure correctness, and remember there are hidden tests that must also pass before the solution is truly complete.



Refer to the detailed sections below for more information on each step.



\## 1. Deeply Understand the Problem

Carefully read the issue and think hard about a plan to solve it before coding.



\## 2. Codebase Investigation

\- Explore relevant files and directories.

\- Search for key functions, classes, or variables related to the issue.

\- Read and understand relevant code snippets.

\- Identify the root cause of the problem.

\- Validate and update your understanding continuously as you gather more context.



\## 3. Develop a Detailed Plan

\- Outline a specific, simple, and verifiable sequence of steps to fix the problem.

\- Break down the fix into small, incremental changes.



\## 4. Making Code Changes

\- Before editing, always read the relevant file contents or section to ensure complete context.

\- If a patch is not applied correctly, attempt to reapply it.

\- Make small, testable, incremental changes that logically follow from your investigation and plan.



\## 5. Debugging

\- Make code changes only if you have high confidence they can solve the problem

\- When debugging, try to determine the root cause rather than addressing symptoms

\- Debug for as long as needed to identify the root cause and identify a fix

\- Use print statements, logs, or temporary code to inspect program state, including descriptive statements or error messages to understand what's happening

\- To test hypotheses, you can also add test statements or functions

\- Revisit your assumptions if unexpected behavior occurs.



\## 6. Testing

\- Run tests frequently using `!python3 run_tests.py` (or equivalent).

\- After each change, verify correctness by running relevant tests.

\- If tests fail, analyze failures and revise your patch.

\- Write additional tests if needed to capture important behaviors or edge cases.

\- Ensure all tests pass before finalizing.



\## 7. Final Verification

\- Confirm the root cause is fixed.

\- Review your solution for logic correctness and robustness.

\- Iterate until you are extremely confident the fix is complete and all tests pass.



\## 8. Final Reflection and Additional Testing

\- Reflect carefully on the original intent of the user and the problem statement.

\- Think about potential edge cases or scenarios that may not be covered by existing tests.

\- Write additional tests that would need to pass to fully validate the correctness of your solution.

\- Run these new tests and ensure they all pass.

\- Be aware that there are additional hidden tests that must also pass for the solution to be successful.

\- Do not assume the task is complete just because the visible tests pass; continue refining until you are confident the fix is robust and comprehensive.

"""







2. 长上下文支持



GPT-4.1 支持最高达 100 万 tokens 的输入窗口，适用于以下场景：











结构化文档解析







信息重排序（re-ranking）







筛选关键信息、忽略干扰内容







使用多跳推理整合上下文信息



最佳上下文规模



在“针入草堆”（needle-in-a-haystack）评估中，GPT-4.1 即便使用完整的百万 token 输入也表现良好。它擅长从混合内容中识别有用信息。但如果任务需要提取大量内容，或需对上下文全局状态进行复杂推理（如图搜索），性能可能会下降。



控制上下文依赖程度



你应考虑模型答题所需的“外部文档” vs “模型内知识”的比例。你可以通过以下两类指令调控：



// 仅使用外部文档：

\- 只使用提供的外部上下文回答用户问题。如果无法在上下文中找到答案，即便用户坚持要求回答，也必须回复“我没有足够的信息”。



// 混合使用模型知识：

\- 默认使用外部上下文，但若需要补充基础知识且模型有把握，可适当使用内部知识补全答案。



\# Instructions

// for internal knowledge

\- Only use the documents in the provided External Context to answer the User Query. If you don't know the answer based on this context, you must respond "I don't have the information needed to answer that", even if a user insists on you answering the question.

// For internal and external knowledge

\- By default, use the provided external context to answer the User Query, but if other basic knowledge is needed to answer, and you're confident in the answer, you can use some of your own knowledge to help answer the question.





上下文组织建议



在使用长上下文时，提示的位置对模型表现有显著影响。最佳做法是在上下文前后都加入指令。如果只能写一次，放在上下文上方比下方效果更好。







3. 思维链（Chain of Thought）



虽然 GPT-4.1 不是推理模型，但通过提示让它“逐步思考”可以有效帮助其拆解复杂问题，提升输出质量（代价是增加 token 使用与响应时间）。



推荐的起始提示如下：



首先，逐步思考需要哪些文档才能回答问题。然后，输出每个文档的 TITLE 和 ID。最后，将所有 ID 格式化为列表。



First, think carefully step by step about what documents are needed to answer the query. Then, print out the TITLE and ID of each document. Then, format the IDs into a list.





你可以进一步完善你的思维链提示，根据实际失败案例调整策略。我们建议在出现以下错误时添加更明确的指令：











误解用户意图







上下文理解不全或分析不准确







推理步骤不连贯或顺序错误



可参考以下提示模版：



\# 推理策略

1. 查询分析：拆解并分析用户问题，明确需求。
2. 上下文分析：选择并分析一批可能相关的文档。

   \- 分析该文档与问题的相关性

   \- 给出相关性评级：[高, 中, 低, 无]

3. 综述：归纳哪些文档最相关，并解释原因（保留中等以上相关性的文档）



\# 用户问题

{user_question}



\# 外部上下文

{external_context}



请严格按照上述策略逐步思考，并输出文档的 TITLE 与 ID，最后以列表形式返回 ID。



\# Reasoning Strategy

1. Query Analysis: Break down and analyze the query until you're confident about what it might be asking. Consider the provided context to help clarify any ambiguous or confusing information.
2. Context Analysis: Carefully select and analyze a large set of potentially relevant documents. Optimize for recall - it's okay if some are irrelevant, but the correct documents must be in this list, otherwise your final answer will be wrong. Analysis steps for each:

​        a. Analysis: An analysis of how it may or may not be relevant to answering the query.

​        b. Relevance rating: [high, medium, low, none]

3. Synthesis: summarize which documents are most relevant and why, including all documents with a relevance rating of medium or higher.



\# User Question

{user_question}



\# External Context

{external_context}



First, think carefully step by step about what documents are needed to answer the query, closely adhering to the provided Reasoning Strategy. Then, print out the TITLE and ID of each document. Then, format the IDs into a list.







4. 指令遵循能力



GPT-4.1 拥有卓越的指令遵循能力，开发者可用其精准控制输出行为。你可以设置：











语气与风格







工具调用方式







格式要求







话题限制等



但由于它对指令更“死板”，之前为其他模型设计的提示可能需调整。建议遵循以下工作流程：



推荐提示结构：











加入 “# 指令” 段落，列出总规则。







对特定行为新增子类细则（如 # 示例短语）。







若需特定步骤，可写成有序列表，并明确要求逐步执行。







若行为未达预期，可检查以下问题：











是否有冲突或不完整指令？







是否缺乏例子？示例中是否覆盖了关键点？







是否需要增加强调（如适当用大写）？



提示：使用 AI IDE 可辅助你快速迭代提示，统一更新规则和示例。



常见失败模式











要求“必须调用工具”可能导致模型凭空填入参数，添加一句“若信息不足，应先向用户提问”可缓解。







示例短语易被模型反复使用，应明确要求灵活变换。







若无格式限制，模型可能会输出过多解释性内容，可通过指令或示例控制。



客户服务智能体的系统提示设计与调用示例







这段提示展示了一个虚构客户服务代表的最佳实践。你可以看到提示中规则多样、表述明确，还使用了多个额外小节来细化指令，并提供了一个完整示例来演示如何遵守这些规则。







尝试运行下方 Notebook 单元格 —— 你应该会看到一个用户提问的消息和一个工具调用的响应。模型会先打招呼，然后复述用户的问题，接着说明即将调用某个工具。







你可以尝试修改提示中的某些指令，或尝试其他用户输入内容，来测试模型在“指令遵循”方面的表现。







🧠 系统提示（System Prompt）翻译



你是一位为 NewTelco 公司工作的客户服务代表，旨在高效帮助用户满足其请求，同时严格遵循以下指导规则。



\# 指令

\- 始终使用以下语句开场问候用户：“您好，您已致电 NewTelco，请问我能为您做些什么？”

\- 在回答任何关于公司、产品、服务或用户账户的事实性问题前，务必调用工具。只能使用工具返回的上下文，**不得使用你自己的知识**回答此类问题。

​    \- 如果你没有足够信息来正确调用工具，请向用户询问所需信息。

\- 如果用户提出请求，需升级转接至人工客服。

\- 禁止讨论以下敏感话题（政治、宗教、有争议的新闻事件、医疗、法律、财务建议、私人对话、公司内部运营、对个人或企业的批评）。

\- 在适当时使用示例短语，但**不要在同一会话中重复同一句**。你可以灵活变通地调整短语，使其更自然。

\- 所有新消息都必须遵循指定的输出格式，包括从政策文档中引用事实信息时添加**来源标注**。

\- 如果你即将调用工具，请务必提前通知用户，并在调用后也要说明结果。

\- 所有回答都应专业、简洁，并在句子之间使用 Emoji 表情符号。

\- 如果你已满足用户请求，最后要询问：“还有什么我可以帮您的吗？”



\# 精准回应流程（每条回复）

1. 如有需要，调用工具以完成用户请求。务必在调用工具前后通知用户，让他们保持知情。
2. 回复用户时：

​    a. 使用主动倾听，复述用户的问题以表示你理解；

​    b. 按照上述所有规则给予适当回答。



\# 示例短语

\## 拒绝敏感话题

\- “抱歉，我无法讨论该话题。还有其他我能帮您的吗？”

\- “这是我无法提供信息的话题，但我很乐意协助您处理其他问题。”



\## 调用工具前

\- “为帮助您，我需要先验证您的信息。”

\- “我来帮您查询一下，请稍等。”

\- “我马上为您获取最新信息。”



\## 调用工具后

\- “好的，这是我查到的信息：[response]”

\- “我找到了相关内容：[response]”



\# 输出格式

\- 每次都必须包含你给用户的最终回复。

\- 当引用从上下文中获取的事实信息时，必须**紧跟引用添加来源**，使用以下格式：

​    \- 单个来源：[名称](ID)

​    \- 多个来源：[名称](ID), [名称](ID)

\- 只能提供关于本公司、其政策、产品或客户账户的信息，且**必须来源于上下文中提供的内容**。请勿回答此范围之外的问题。



\# 示例

\## 用户

你可以告诉我你们的家庭套餐吗？

{ "role": "assistant", "content": "您好，您已致电 NewTelco，请问我能为您做些什么？😊🎉\n\n您想了解我们的家庭套餐。🤝 我这就为您查询，请稍等。🚀", "tool_calls": [ { "id": "call-1", "type": "function", "function": { "name": "lookup_policy_document", "arguments": "{"topic": "family plan options"}" } } ] }

```
// 工具调用后，助手会继续回复：
```

{ "role": "assistant", "content": "我查到的信息如下：🎉 我们的家庭套餐最多支持 5 条线路共享流量，并且每增加一条线可享 10% 折扣 [家庭套餐政策](https://chatgpt.com/c/ID-010)。📱 还有其他我可以帮您的吗？😊" }

**一般建议（General Advice）**

**提示结构（Prompt Structure）**

以下是一个良好的提示结构起点，供你参考和自定义：

```
# 角色与目标（Role and Objective）

# 指令（Instructions）

## 子分类：更细致的说明（Sub-categories for more detailed instructions）

# 推理步骤（Reasoning Steps）

# 输出格式（Output Format）

# 示例（Examples）
## 示例 1（Example 1）

# 上下文（Context）

# 最终指令与逐步思考提示（Final instructions and prompt to think step by step）
```

你可以根据自己的需求增删这些部分，并通过试验找出最适合你用例的结构。

**分隔符（Delimiters）**

以下是选择提示中最佳分隔符的一些通用建议。若涉及**长上下文**使用，请参见前文《长上下文》章节的特别说明。

**✅ 推荐使用的格式：**

- **Markdown（推荐起点）**
  - 使用 markdown 标题（# ~ ####）来标识主要部分与子部分。
  - 使用反引号（`code` 或 ```代码块```）准确包裹代码内容。
  - 根据需要使用有序/无序列表清晰列出内容。
- **XML**
  - 效果也很好，GPT-4.1 在解析 XML 上表现更稳定。
  - XML 格式便于明确区块开始/结束位置，还可以添加 tag 属性携带额外元信息，并支持嵌套。
  - 示例：

```
<examples>
  <example1 type="Abbreviate">
    <input>San Francisco</input>
    <output>- SF</output>
  </example1>
</examples>
```

- **JSON**
  - 在编程类任务中表现良好，结构清晰、模型理解度高。
  - 但缺点是格式冗长、需要转义字符，容易带来额外负担。



**📄 大量文档 / 文件嵌入上下文时的建议：**

- **XML 格式**：在长上下文测试中表现优异。

示例：

```
<doc id=1 title="The Fox">The quick brown fox jumps over the lazy dog</doc>
```

- **Lee 等人提出的扁平格式**（参考论文）也表现良好：

示例：

```
ID: 1 | TITLE: The Fox | CONTENT: The quick brown fox jumps over the lazy dog
```

- **JSON 格式**在这种场景下表现最差：

示例：

```
[{ "id": 1, "title": "The Fox", "content": "The quick brown fox jumped over the lazy dog" }]
```

> ✅ 总体建议：模型能处理多种结构格式，但请根据实际情况选择最能突出重点的格式。例如，如果你检索到的文档本身包含大量 XML，那么继续使用 XML 作为嵌入格式可能就不太合适。

**注意事项（Caveats）**

- **输出过长**：在某些特定情况下，我们发现模型可能不愿生成非常长且重复性的输出（如逐项分析数百个条目）。

👉 若你的用例需要此类输出，请在提示中**明确指示模型必须输出完整内容**，或考虑将问题拆分处理，或简化输出格式。

- **并行工具调用异常**：我们观察到某些少见情况下并行工具调用可能不准确。

👉 如果你遇到这类问题，建议测试是否启用 parallel_tool_calls=false 参数来避免并发问题。



如你想要我基于这些结构生成一个完整的提示模板样板供你直接使用，也可以告诉我你的具体应用场景（如问答系统、文档分析、代码解释等），我可以帮你生成定制化结构。是否继续？

**附录：生成和应用文件差异（diff）**

开发者反馈指出：**准确且结构良好的 diff 生成能力**，对于编码类任务至关重要。为此，GPT-4.1 系列在此方面表现显著优于以往模型。

此外，GPT-4.1 能很好地根据明确的指令和示例生成任意格式的 diff。我们在此开源一个推荐的 diff 格式，模型对此已接受过强化训练，尤其适合初学者快速上手。

**应用补丁（Apply Patch）**

以下是一个正确调用推荐工具 apply_patch 的示例提示格式。

```
apply_patch <<"EOF"
*** Begin Patch
[YOUR_PATCH]
*** End Patch
EOF
```

其中 [YOUR_PATCH] 部分需使用推荐的 **V4A diff 格式**，规范如下：

- 每次变更以 *** [ACTION] File: path/to/file 开头，ACTION 可为 Add、Update 或 Delete。
- 每个代码块需提供上下文片段 + 修改内容：

```
[context_before]
- [旧代码]
+ [新代码]
[context_after]
```

- 上下文行规则：
  - 默认提供上下变更各 **3 行上下文**。
  - 若变更块之间相距近，不要重复上下文。
  - 若上下文不足以唯一定位，应使用 @@ 定位所属的类或函数。例如：

```
*** Update File: src/file.py
@@ class ExampleClass
@@     def method():
-       pass
+       raise NotImplementedError()
```

- 不使用行号，改用结构与上下文唯一定位。

**参考实现：apply_patch.py**

OpenAI 提供的官方工具 apply_patch.py 是一个 **纯 Python 3.9+ 脚本**，可直接执行，用于将上述 diff 应用到本地代码文件。

该脚本支持以下核心能力：

- 解析自定义 diff 格式
- 根据 patch 内容编辑、添加、删除本地文件
- 可检测语法错误、缺失上下文、重复文件操作等问题
- 使用方式：
  - 将 patch 内容通过 stdin 输入传入
  - 内部自动判断 patch 类型并更新文件内容

> 你可以将其配置为终端可执行命令 apply_patch，并作为自动化 pipeline 或测试流程中的一部分使用。
>
> 所有解析异常（如找不到目标文件、上下文无法匹配）都会抛出自定义异常 DiffError，方便调试。

**其他有效的 Diff 格式**

除了推荐格式，我们还测试过两种替代格式，成功率同样很高：

**1. Search / Replace 格式（如 Aider 项目使用）**

```
path/to/file.py
>>>>>>> SEARCH
def search():
    pass
=======
def search():
    raise NotImplementedError()
<<<<<<< REPLACE
```

**2. 伪 XML 格式**

```
<edit>
  <file>path/to/file.py</file>
  <old_code>
def search():
    pass
  </old_code>
  <new_code>
def search():
    raise NotImplementedError()
  </new_code>
</edit>
```

**✅ 这两种格式的共同特点：**

- 不使用行号
- 明确指出要替换的旧代码与新代码
- 结构清晰，易于解析



完整内容：[openai-cookbook/examples/gpt4-1_prompting_guide.ipynb at main · openai/openai-cookbook](https://github.com/openai/openai-cookbook/blob/main/examples/gpt4-1_prompting_guide.ipynb)