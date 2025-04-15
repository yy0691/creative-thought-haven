\# AI工具箱



**5ire:跨平台桌面Al助手,也是一个MCP支持多种模型服务、工具集成与本地知识库**

![img_v3_02lb_6d0eba7f-ef1a-4eaa-b534-132bf273139g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lb_6d0eba7f-ef1a-4eaa-b534-132bf273139g.jpg)



> **5ire 是一个跨平台桌面 AI 助手，也是一个 MCP（Model Context Protocol）客户端，支持多种模型服务、工具集成与本地知识库。**

**核心定位**

5ire 是一个类似于 DeepChat、ChatGPT 桌面客户端的 AI 工具，但功能更全面，特别强调：

- 本地知识库（向量检索）
- 工具调用（本地或远程工具扩展）
- 支持 MCP 标准协议（模型上下文扩展协议）

它本质上是一个“**AI 桌面平台 + 插件系统**”。

![img_v3_02lb_59044787-4b20-455a-90f6-7d1149763d8g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lb_59044787-4b20-455a-90f6-7d1149763d8g.jpg)



**三大系统通吃**：

- Windows（支持安装程序）
- macOS（支持 Intel 和 Apple M 系列）
- Linux（支持主流发行版）



**主要功能特点**

![img_v3_02lb_b7cc69ee-b889-43f2-8aec-81bad469ae3g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lb_b7cc69ee-b889-43f2-8aec-81bad469ae3g.jpg)



**✅ 1. 多模型平台支持（LLM）**

兼容主流 API 服务商：

![img_v3_02lb_42c7e273-06e8-4fe8-9bee-f39217494b6g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lb_42c7e273-06e8-4fe8-9bee-f39217494b6g.jpg)

![img_v3_02lb_e9ea56f6-adcc-4f57-acb9-ea2c1b3fcacg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lb_e9ea56f6-adcc-4f57-acb9-ea2c1b3fcacg.jpg)

**✅ 2. MCP 协议支持：工具扩展能力强**

- MCP = 模型上下文协议（Model Context Protocol），就像 AI 的“USB 接口”
- 可连接：本地文件系统、数据库、系统信息、外部 API 等
- 支持通过 **MCP Server 工具插件**调用外部资源
- 提供了一个开放的 MCP 工具市场（Market）

📽 示例功能：

- 查看本地磁盘信息
- 读取某个文件夹内内容
- 调用数据库进行查询
- 执行 Python 脚本



**✅ 3. 本地知识库（Local Knowledge Base）**

- 内置向量模型：bge-m3，多语言支持
- 支持文件类型解析：
  - .pdf, .docx, .xlsx, .pptx, .csv, .txt
- 实现本地 RAG（基于检索的生成）

![img_v3_02lb_51dcb810-5034-4035-b235-f5e357cef08g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lb_51dcb810-5034-4035-b235-f5e357cef08g.png)

⚙ 可将文件“上传进 AI 记忆”，用于后续提问或生成内容。

**✅ 4. Prompt Library（提示词库）**

- 管理你常用的提示模板
- 支持变量参数，适用于自动填充
- 类似“提示词快捷菜单”，提升重复工作效率

![img_v3_02lb_d805c8d3-283d-456d-9854-2431dec9a1eg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lb_d805c8d3-283d-456d-9854-2431dec9a1eg.png)





**✅ 5. 快速搜索 & 收藏对话**

- 支持对所有历史对话进行关键字搜索

![img_v3_02lb_0db406c0-c682-483b-8b34-232ddf976a4g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lb_0db406c0-c682-483b-8b34-232ddf976a4g.jpg)



- 支持“书签”对话保存，即使删除原消息也能保留重要内容

![img_v3_02lb_3ed2395a-d957-44eb-93a3-f80368c734dg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lb_3ed2395a-d957-44eb-93a3-f80368c734dg.png)



**✅ 6. 使用统计 & API 支出监控**

- 可查看调用 OpenAI 等模型的 API 花费
- 更容易规划和控制用量成本

![img_v3_02lb_ce83ff4c-e2b0-41ab-b1eb-81e87ad3f98g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lb_ce83ff4c-e2b0-41ab-b1eb-81e87ad3f98g.png)





GitHub：https://github.com/nanbingxyz/5ire 

下载：https://5ire.app/