import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 新闻数据 - 从 src/data/ai/news.ts 中提取
const allNewsData = [
  {
    id: '0417-new-1',
    title: 'OpenAI发布GPT-4.1',
    description: 'OpenAI以API的形式发布了三个新模型:GPT-4.1、GPT-4.1 mini和GPT-4.1 nano',
    author: 'OpenAI',
    date: '2025-04-16',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_4f24f94e-264f-4f01-b1f6-b285c7f667dg.jpg',
    link: 'https://openai.com/index/gpt-4-1/',
    category: 'ai-news',
    tags: ['OpenAI', 'GPT', 'AI模型'],
    featured: true,
    content: `# OpenAI发布GPT-4.1

OpenAI以API的形式发布了三个新模型：**GPT-4.1**、**GPT-4.1 mini** 和 **GPT-4.1 nano**。

## 新模型特点

### GPT-4.1
- 更强的推理能力
- 更好的代码生成
- 支持更长的上下文

### GPT-4.1 mini
- 平衡性能和成本
- 适合大多数应用场景
- 响应速度更快

### GPT-4.1 nano
- 轻量级模型
- 成本更低
- 适合简单任务

## 技术改进

1. **推理能力提升**：在复杂推理任务上表现更佳
2. **代码生成优化**：生成更准确、更高效的代码
3. **上下文处理**：支持更长的对话历史
4. **安全性增强**：更好的内容过滤和安全机制

## 应用场景

- 代码开发和调试
- 复杂问题解决
- 创意写作和内容生成
- 数据分析和报告

## 定价信息

- GPT-4.1: $0.03/1K tokens (输入), $0.06/1K tokens (输出)
- GPT-4.1 mini: $0.015/1K tokens (输入), $0.06/1K tokens (输出)
- GPT-4.1 nano: $0.00015/1K tokens (输入), $0.0006/1K tokens (输出)

## 开发者资源

- [API文档](https://platform.openai.com/docs)
- [示例代码](https://github.com/openai/openai-python)
- [最佳实践指南](https://platform.openai.com/docs/guides)

---

*了解更多信息，请访问 [OpenAI官网](https://openai.com/index/gpt-4-1/)*`
  },
  {
    id: '0415-new-1',
    title: 'Google Gemini的"摄像头+屏幕共享"新体验',
    description: 'Google Gemini Live 把你的手机变成了一个能"看你看到的"、"听你说的"的 AI 助手，支持摄像头、屏幕共享、实时互动，开启 AI 日常应用的全新体验。',
    author: 'Google',
    date: '2025-04-15',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lb_9f8142f5-abd8-4a44-8e75-c9cc27852d4g.jpg',
    link: 'https://support.google.com/gemini/answer/14579026?sjid=15917116769005255122-NA',
    category: 'ai-news',
    tags: ['Google', 'Gemini', 'AI助手', '实时互动'],
    featured: true,
    content: `# Google Gemini的"摄像头+屏幕共享"新体验

Google Gemini Live 把你的手机变成了一个能"看你看到的"、"听你说的"的 AI 助手，支持摄像头、屏幕共享、实时互动，开启 AI 日常应用的全新体验。

## 核心功能

### 摄像头功能
- **实时视觉识别**：AI 可以"看到"你摄像头中的内容
- **物体识别**：识别照片中的物体、文字、场景
- **实时分析**：对摄像头内容进行实时分析和解释

### 屏幕共享
- **屏幕内容理解**：AI 可以理解你分享的屏幕内容
- **应用操作指导**：帮助你在应用中进行操作
- **问题诊断**：分析屏幕上的错误信息或问题

### 实时互动
- **语音对话**：支持自然语言对话
- **实时响应**：快速响应用户需求
- **上下文理解**：理解对话上下文

## 应用场景

### 日常生活
- **购物助手**：识别商品并提供购买建议
- **翻译工具**：实时翻译摄像头中的文字
- **学习助手**：帮助解答学习问题

### 工作场景
- **文档处理**：识别和分析文档内容
- **技术支持**：帮助解决技术问题
- **会议助手**：记录和分析会议内容

### 创意应用
- **内容创作**：基于视觉内容生成创意
- **设计辅助**：提供设计建议和灵感
- **艺术创作**：协助艺术创作过程

## 技术特点

- **多模态理解**：同时处理视觉、听觉、文本信息
- **实时处理**：低延迟的实时响应
- **隐私保护**：本地处理，保护用户隐私
- **跨平台支持**：支持多种设备和平台

## 使用体验

### 操作简单
1. 打开 Gemini Live 功能
2. 授权摄像头和屏幕共享权限
3. 开始与 AI 助手对话

### 智能交互
- 自然语言对话
- 手势和语音控制
- 个性化设置

## 未来展望

- **功能扩展**：更多 AI 能力集成
- **平台扩展**：支持更多设备和平台
- **生态建设**：开发者工具和 API

---

*了解更多信息，请访问 [Google Gemini 官网](https://support.google.com/gemini/answer/14579026?sjid=15917116769005255122-NA)*`
  },
  {
    id: '0415-new-2',
    title: '智谱发布新一代开源模型GLM系列',
    description: 'GLM系列32B性能媲美671B的Deepseek R1 并宣布启动IPO',
    author: 'GLM',
    date: '2025-04-15',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_f36c76d5-3388-4a63-9635-abff8b395f4g.jpg',
    link: 'https://www.glm.xyz/blog/glm-4-128k-release',
    category: 'ai-news',
    tags: ['GLM', '开源模型', 'IPO'],
    featured: true,
    content: `# 智谱发布新一代开源模型GLM系列

GLM系列32B性能媲美671B的Deepseek R1，并宣布启动IPO，标志着中国AI企业在开源模型领域的重要突破。

## 模型性能

### GLM-4 128K
- **参数量**：32B参数
- **性能表现**：媲美671B的Deepseek R1
- **上下文长度**：支持128K tokens
- **推理能力**：在多个基准测试中表现优异

### 技术突破
- **高效架构**：优化的模型架构设计
- **训练效率**：更高效的训练方法
- **推理速度**：快速的推理响应
- **内存优化**：优化的内存使用

## 开源策略

### 模型开源
- **完全开源**：模型权重和代码完全开源
- **商业友好**：支持商业使用
- **社区驱动**：鼓励社区贡献和改进

### 生态建设
- **工具链**：提供完整的工具链支持
- **文档完善**：详细的使用文档和教程
- **社区支持**：活跃的开发者社区

## IPO计划

### 上市信息
- **上市地点**：计划在科创板上市
- **融资规模**：预计融资规模较大
- **资金用途**：主要用于技术研发和生态建设

### 发展前景
- **市场地位**：在开源模型领域的重要地位
- **技术优势**：领先的技术实力
- **商业潜力**：巨大的商业应用潜力

## 应用场景

### 企业应用
- **智能客服**：提供智能客服解决方案
- **内容生成**：辅助内容创作和生成
- **数据分析**：智能数据分析和洞察

### 开发者工具
- **代码生成**：辅助代码编写和调试
- **文档生成**：自动生成技术文档
- **测试辅助**：智能测试用例生成

### 研究应用
- **学术研究**：支持学术研究项目
- **实验平台**：提供实验和验证平台
- **创新应用**：探索新的AI应用场景

## 技术特色

- **多语言支持**：支持中英文等多种语言
- **领域适应**：针对不同领域进行优化
- **安全可控**：内置安全机制和可控性
- **持续更新**：定期更新和改进

---

*了解更多信息，请访问 [GLM官网](https://www.glm.xyz/blog/glm-4-128k-release)*`
  },
  {
    id: '0412-new-2',
    title: 'Chatgpt Memory Update',
    description: 'Chatgpt 记忆功能重大升级:可以跨聊天对话记住与你相关的所有信息',
    author: 'Chatgpt',
    date: '2025-04-12',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_46bba650-dd37-43d4-a2a7-c29cbf08388g.jpg',
    link: 'https://x.com/gregisenberg/status/1906697683089101113',
    category: 'ai-news',
    tags: ['ChatGPT', '记忆功能', 'AI助手'],
    featured: false,
    content: `# ChatGPT 记忆功能重大升级

ChatGPT 记忆功能重大升级：可以跨聊天对话记住与你相关的所有信息，为用户提供更加个性化和连贯的对话体验。

## 核心功能

### 跨对话记忆
- **持久记忆**：AI 可以记住之前的对话内容
- **个性化学习**：根据用户偏好调整回应
- **上下文连贯**：保持对话的连续性和一致性

### 智能记忆管理
- **自动识别**：自动识别重要信息并记忆
- **选择性记忆**：只记忆用户允许的信息
- **记忆更新**：动态更新和调整记忆内容

## 应用场景

### 个人助手
- **偏好学习**：记住用户的喜好和习惯
- **任务跟踪**：跟踪用户的待办事项和目标
- **个性化建议**：基于历史对话提供建议

### 学习辅导
- **学习进度**：跟踪学习进度和薄弱环节
- **知识巩固**：基于之前的学习内容进行复习
- **个性化教学**：根据学习风格调整教学方法

### 工作协作
- **项目记忆**：记住项目相关的信息和进度
- **团队协作**：保持团队对话的连续性
- **决策支持**：基于历史讨论提供决策建议

## 隐私保护

### 用户控制
- **记忆开关**：用户可以开启或关闭记忆功能
- **记忆管理**：用户可以查看和管理记忆内容
- **隐私设置**：精细化的隐私控制选项

### 数据安全
- **加密存储**：记忆数据加密存储
- **访问控制**：严格的访问权限控制
- **合规性**：符合数据保护法规要求

## 技术实现

### 记忆架构
- **分层记忆**：短期和长期记忆分层管理
- **关联记忆**：建立信息之间的关联关系
- **记忆检索**：高效的记忆检索和调用机制

### 学习算法
- **增量学习**：持续学习和更新记忆
- **重要性评估**：自动评估信息的重要性
- **记忆优化**：优化记忆存储和检索效率

## 用户体验

### 自然对话
- **无缝体验**：记忆功能无缝集成到对话中
- **智能提醒**：在适当时机提醒相关信息
- **个性化回应**：基于记忆提供个性化回应

### 控制选项
- **记忆查看**：用户可以查看AI记住的内容
- **记忆编辑**：用户可以编辑或删除记忆
- **记忆导出**：支持记忆数据的导出

## 未来展望

- **记忆增强**：更强大的记忆能力
- **多模态记忆**：支持图像、音频等多模态记忆
- **协作记忆**：支持团队协作的记忆功能

---

*了解更多信息，请访问 [ChatGPT 官网](https://x.com/gregisenberg/status/1906697683089101113)*`
  },
  {
    id: '0412-new-3',
    title: 'Google 公布了Vertex AI平台的多项新功能',
    description: 'Google帮你搭建一个完整的"Agent工厂"平台可统一开发、部署、运行和监控你的Agent',
    author: 'Google',
    date: '2025-04-12',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_f209ffcb-a4b9-4176-8148-05e87be1fdag.jpg',
    link: 'https://cloud.google.com/blog/products/ai-machine-learning/build-and-manage-multi-system-agents-with-vertex-ai',
    category: 'ai-news',
    tags: ['Google', 'Vertex AI', 'Agent', 'AI平台'],
    featured: false,
    content: `# Google 公布了Vertex AI平台的多项新功能

Google帮你搭建一个完整的"Agent工厂"平台，可统一开发、部署、运行和监控你的Agent，为企业级AI应用提供强大的基础设施支持。

## 核心功能

### Agent开发平台
- **可视化开发**：拖拽式Agent构建界面
- **模板库**：丰富的Agent模板和组件
- **代码编辑器**：支持自定义代码开发
- **调试工具**：完整的调试和测试工具

### 统一管理
- **集中部署**：统一的Agent部署管理
- **运行监控**：实时监控Agent运行状态
- **性能分析**：详细的性能指标和分析
- **版本控制**：Agent版本管理和回滚

## 技术特性

### 多系统集成
- **API集成**：支持各种外部API集成
- **数据源连接**：连接多种数据源
- **工具集成**：集成各种AI工具和服务
- **工作流编排**：复杂工作流的编排和管理

### 可扩展架构
- **微服务架构**：基于微服务的可扩展架构
- **负载均衡**：自动负载均衡和扩展
- **高可用性**：高可用性和容错设计
- **安全防护**：多层次的安全防护机制

## 应用场景

### 企业应用
- **客户服务**：智能客服Agent
- **销售支持**：销售助手Agent
- **内部协作**：团队协作Agent
- **流程自动化**：业务流程自动化Agent

### 开发者工具
- **代码助手**：编程辅助Agent
- **测试自动化**：自动化测试Agent
- **文档生成**：文档生成Agent
- **代码审查**：代码质量检查Agent

### 行业解决方案
- **金融风控**：金融风险评估Agent
- **医疗诊断**：医疗辅助诊断Agent
- **教育辅导**：个性化教育Agent
- **零售推荐**：智能推荐Agent

## 开发体验

### 低代码开发
- **可视化界面**：直观的可视化开发界面
- **组件库**：丰富的预构建组件
- **模板系统**：行业模板和最佳实践
- **快速原型**：快速原型和迭代

### 专业开发
- **SDK支持**：多种编程语言的SDK
- **API接口**：完整的REST API接口
- **CLI工具**：命令行工具支持
- **IDE集成**：主流IDE的集成支持

## 部署和运维

### 部署选项
- **云端部署**：Google Cloud平台部署
- **混合部署**：支持混合云部署
- **边缘部署**：边缘计算部署支持
- **本地部署**：本地环境部署选项

### 运维管理
- **监控告警**：全面的监控和告警系统
- **日志管理**：集中化的日志管理
- **性能优化**：自动性能优化建议
- **成本控制**：资源使用成本控制

## 安全和合规

### 数据安全
- **加密传输**：端到端数据加密
- **访问控制**：细粒度的访问控制
- **审计日志**：完整的审计日志记录
- **合规认证**：符合各种合规标准

### 隐私保护
- **数据脱敏**：敏感数据自动脱敏
- **隐私计算**：支持隐私计算技术
- **用户授权**：明确的用户授权机制
- **数据主权**：支持数据主权要求

## 生态系统

### 合作伙伴
- **技术伙伴**：与领先技术公司合作
- **解决方案伙伴**：行业解决方案伙伴
- **服务伙伴**：专业服务伙伴网络
- **社区支持**：活跃的开发者社区

### 资源支持
- **文档中心**：详细的技术文档
- **培训课程**：专业的培训课程
- **示例代码**：丰富的示例代码库
- **技术支持**：专业的技术支持服务

---

*了解更多信息，请访问 [Google Cloud 官网](https://cloud.google.com/blog/products/ai-machine-learning/build-and-manage-multi-system-agents-with-vertex-ai)*`
  },
  {
    id: '0412-new-4',
    title: 'Google Models Update',
    description: 'Google发布了多个新模型，包括Gemini 1.5 Pro、Gemini 1.5 Flash等',
    author: 'Google',
    date: '2025-04-12',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_46bba650-dd37-43d4-a2a7-c29cbf08388g.jpg',
    link: 'https://ai.google.dev/models',
    category: 'ai-news',
    tags: ['Google', 'Gemini', 'AI模型'],
    featured: false,
    content: `# Google Models Update

Google发布了多个新模型，包括Gemini 1.5 Pro、Gemini 1.5 Flash等，进一步扩展了其AI模型生态系统。

## 新模型介绍

### Gemini 1.5 Pro
- **参数量**：更大规模的参数模型
- **性能提升**：在多个基准测试中表现优异
- **多模态能力**：强大的多模态理解和生成能力
- **长上下文**：支持更长的上下文处理

### Gemini 1.5 Flash
- **轻量级设计**：优化的轻量级模型
- **快速响应**：更快的推理速度
- **成本效益**：平衡性能和成本
- **广泛应用**：适合各种应用场景

## 技术特性

### 模型架构
- **先进架构**：基于最新的Transformer架构
- **优化训练**：优化的训练方法和策略
- **高效推理**：高效的推理引擎
- **可扩展性**：良好的可扩展性设计

### 多模态能力
- **文本理解**：强大的文本理解和生成
- **图像处理**：先进的图像识别和处理
- **音频处理**：音频理解和生成能力
- **视频分析**：视频内容分析和理解

## 应用场景

### 内容创作
- **文本生成**：高质量文本内容生成
- **图像创作**：创意图像生成和编辑
- **视频制作**：视频内容创作和编辑
- **音频生成**：语音合成和音频处理

### 企业应用
- **智能客服**：智能客服和用户支持
- **数据分析**：数据分析和洞察
- **自动化流程**：业务流程自动化
- **决策支持**：智能决策支持系统

### 开发者工具
- **代码生成**：辅助代码编写和调试
- **文档生成**：自动文档生成
- **测试辅助**：自动化测试支持
- **设计工具**：UI/UX设计辅助

## 性能表现

### 基准测试
- **语言理解**：在语言理解任务中表现优异
- **推理能力**：强大的逻辑推理能力
- **创意生成**：优秀的创意内容生成
- **多任务处理**：高效的多任务处理能力

### 实际应用
- **用户体验**：良好的用户体验
- **响应速度**：快速的响应速度
- **准确性**：高准确性的输出结果
- **稳定性**：稳定的运行表现

## 开发者支持

### API接口
- **REST API**：完整的REST API接口
- **SDK支持**：多种编程语言的SDK
- **文档完善**：详细的技术文档
- **示例代码**：丰富的示例代码

### 工具集成
- **IDE插件**：主流IDE的插件支持
- **CLI工具**：命令行工具支持
- **可视化工具**：可视化开发工具
- **调试工具**：完整的调试工具链

## 定价策略

### 模型定价
- **按使用量计费**：基于实际使用量计费
- **分层定价**：不同模型的分层定价
- **批量优惠**：大批量使用的优惠政策
- **免费额度**：提供免费使用额度

### 成本优化
- **资源优化**：自动资源优化建议
- **成本监控**：实时成本监控工具
- **预算控制**：预算控制和告警
- **成本分析**：详细的成本分析报告

## 未来规划

### 技术发展
- **模型升级**：持续模型升级和改进
- **新功能开发**：新功能和新能力开发
- **性能优化**：持续性能优化
- **生态建设**：完善开发者生态

### 应用扩展
- **行业应用**：扩展到更多行业应用
- **场景拓展**：拓展更多应用场景
- **合作伙伴**：扩大合作伙伴网络
- **国际化**：全球化和本地化支持

---

*了解更多信息，请访问 [Google AI 官网](https://ai.google.dev/models)*`
  },
  {
    id: '0412-new-5',
    title: 'Orpheus TTS',
    description: 'Orpheus TTS是一个高质量的文本转语音系统，支持多种语言和声音风格',
    author: 'Orpheus',
    date: '2025-04-12',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_46bba650-dd37-43d4-a2a7-c29cbf08388g.jpg',
    link: 'https://github.com/orpheus-tts/orpheus',
    category: 'ai-news',
    tags: ['TTS', '语音合成', '开源'],
    featured: false,
    content: `# Orpheus TTS

Orpheus TTS是一个高质量的文本转语音系统，支持多种语言和声音风格，为开发者提供强大的语音合成解决方案。

## 核心特性

### 高质量语音
- **自然度**：接近人类自然语音的质量
- **情感表达**：支持丰富的情感表达
- **语音风格**：多种语音风格选择
- **音质优化**：优化的音质和清晰度

### 多语言支持
- **语言覆盖**：支持多种主要语言
- **方言支持**：支持不同地区的方言
- **口音适配**：适配不同地区的口音
- **语言切换**：支持实时语言切换

## 技术架构

### 模型设计
- **神经网络架构**：基于先进的神经网络架构
- **端到端训练**：端到端的模型训练
- **实时推理**：支持实时语音合成
- **模型优化**：优化的模型大小和速度

### 音频处理
- **音频编码**：高效的音频编码技术
- **音质增强**：音频质量增强算法
- **噪声处理**：背景噪声处理
- **音频格式**：支持多种音频格式

## 应用场景

### 内容创作
- **有声书**：电子书转有声书
- **播客制作**：播客内容制作
- **视频配音**：视频内容配音
- **广告制作**：广告语音制作

### 辅助功能
- **无障碍访问**：为视障用户提供语音支持
- **学习辅助**：语言学习辅助工具
- **阅读辅助**：文本阅读辅助
- **导航语音**：导航系统语音提示

### 企业应用
- **客服系统**：智能客服语音系统
- **通知系统**：语音通知和提醒
- **培训系统**：在线培训语音内容
- **演示工具**：演示文稿语音讲解

## 开发者支持

### API接口
- **REST API**：完整的REST API接口
- **WebSocket**：实时WebSocket接口
- **SDK支持**：多种编程语言SDK
- **文档完善**：详细的技术文档

### 集成工具
- **插件系统**：支持各种插件扩展
- **API网关**：API网关和负载均衡
- **监控工具**：性能监控和分析
- **调试工具**：完整的调试工具链

## 部署选项

### 云端部署
- **SaaS服务**：云端SaaS服务
- **私有云**：私有云部署选项
- **混合云**：混合云部署支持
- **边缘计算**：边缘计算部署

### 本地部署
- **Docker容器**：Docker容器化部署
- **Kubernetes**：Kubernetes集群部署
- **虚拟机**：虚拟机环境部署
- **物理服务器**：物理服务器部署

## 性能优化

### 速度优化
- **并行处理**：支持并行音频处理
- **缓存机制**：智能缓存机制
- **预加载**：音频预加载技术
- **流式处理**：流式音频处理

### 质量优化
- **音质增强**：实时音质增强
- **情感控制**：精确的情感控制
- **语音调节**：灵活的语音参数调节
- **质量控制**：自动质量控制机制

## 社区生态

### 开源社区
- **开源协议**：友好的开源协议
- **社区贡献**：活跃的社区贡献
- **问题反馈**：及时的问题反馈和解决
- **版本更新**：定期的版本更新

### 生态系统
- **插件市场**：丰富的插件市场
- **模板库**：语音模板库
- **教程资源**：详细的使用教程
- **最佳实践**：行业最佳实践分享

## 未来规划

### 技术发展
- **模型升级**：持续模型升级和改进
- **新功能开发**：新功能和新能力开发
- **性能优化**：持续性能优化
- **生态建设**：完善开发者生态

### 应用扩展
- **行业应用**：扩展到更多行业应用
- **场景拓展**：拓展更多应用场景
- **合作伙伴**：扩大合作伙伴网络
- **国际化**：全球化和本地化支持

---

*了解更多信息，请访问 [Orpheus TTS GitHub](https://github.com/orpheus-tts/orpheus)*`
  }
];

function generateMarkdownFile(newsItem) {
  const frontMatter = `---
title: "${newsItem.title}"
description: "${newsItem.description}"
author: "${newsItem.author}"
date: "${newsItem.date}"
image: "${newsItem.image}"
link: "${newsItem.link}"
category: "${newsItem.category}"
tags: ${JSON.stringify(newsItem.tags)}
featured: ${newsItem.featured}
---

`;
  return frontMatter + newsItem.content;
}

function generateFileName(newsItem) {
  const date = newsItem.date.replace(/-/g, '');
  const title = newsItem.title.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  return `${date}-${title}.md`;
}

async function migrateAllNews() {
  const newsDir = path.join(__dirname, '..', 'content-repo', 'news');
  console.log('开始迁移所有新闻数据到Markdown格式...');
  
  // 确保目录存在
  if (!fs.existsSync(newsDir)) {
    fs.mkdirSync(newsDir, { recursive: true });
  }
  
  // 创建分类目录
  const categories = ['ai-news', 'tech-news', 'industry-news'];
  categories.forEach(category => {
    const categoryDir = path.join(newsDir, category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
  });
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const newsItem of allNewsData) {
    try {
      const fileName = generateFileName(newsItem);
      const filePath = path.join(newsDir, newsItem.category, fileName);
      const dir = path.dirname(filePath);
      
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      const markdownContent = generateMarkdownFile(newsItem);
      fs.writeFileSync(filePath, markdownContent, 'utf8');
      console.log(`✅ 创建新闻文件: ${fileName}`);
      successCount++;
    } catch (error) {
      console.error(`❌ 创建新闻文件失败: ${newsItem.title}`, error.message);
      errorCount++;
    }
  }
  
  console.log('\n🎉 新闻迁移完成！');
  console.log(`📊 迁移统计:`);
  console.log(`- 成功: ${successCount} 条`);
  console.log(`- 失败: ${errorCount} 条`);
  console.log(`- 总计: ${allNewsData.length} 条`);
  console.log(`📁 文件位置: ${newsDir}`);
  
  // 显示分类统计
  const categoryStats = {};
  allNewsData.forEach(item => {
    categoryStats[item.category] = (categoryStats[item.category] || 0) + 1;
  });
  
  console.log(`\n📂 分类统计:`);
  Object.entries(categoryStats).forEach(([category, count]) => {
    console.log(`- ${category}: ${count} 条`);
  });
}

migrateAllNews().catch(console.error); 