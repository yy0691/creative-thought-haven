import { CardItem } from './types';
import { tripoMcp } from './tools-models-content/tripo-mcp';
export const toolsItems: CardItem[] = [
  // 通用类AI
  {
    id: 'general-1',
    title: 'Jotform Boards',
    description: '从人工智能代理对话中生成看板任务等',
    link: 'https://www.jotform.com/products/boards/',
    image: 'https://ph-files.imgix.net/74085de9-e472-45f2-88b0-360d4e498957.png?auto=format',
    category: '通用类AI'
  },
  {
    id: 'general-2',
    title: 'Inferless',
    description: '在几分钟内部署任何机器学习模型',
    link: 'https://www.inferless.com/',
    image: 'https://ph-files.imgix.net/7b2f6d44-2e50-4266-9b71-5a1f4f99f3fd.png?auto=format',
    category: '通用类AI'
  },

  // AI绘画
  {
    id: 'painting-0',
    title: 'Ideogram 3.0',
    description: '应对GPT4oldeogram发布全新升级的图像生成模型Ideogram3.0将图像真实感、创意设计和风格一致性统一',
    link: 'https://about.ideogram.ai/3.0 ',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02kp_b7a5650a-60f6-4bb1-9b29-8b096a6ba59g.jpg',
    category: 'AI绘画'
  },
  {
    id: 'painting-1',
    title: 'illustration.app',
    description: '在几秒钟内创建自定义矢量插图',
    link: 'https://www.illustration.app/',
    image: 'https://ph-files.imgix.net/47ae3fbd-0966-40a3-9641-cf837765bf02.jpeg?auto=format',
    category: 'AI绘画'
  },
  {
    id: 'painting-2',
    title: 'Pacdora',
    description: '人工智能背景，打造工作室品质的产品视觉效果',
    link: 'https://www.pacdora.com/tools/ai-background-generator',
    image: 'https://ph-files.imgix.net/fffed2fc-7751-4f4d-8cd5-8c6200e4db84.webp?auto=format',
    category: 'AI绘画'
  },
  {
    id: 'painting-3',
    title: 'FLORA',
    description: '一个集合了所有类型顶级AI模型的无限画布创意工具',
    link: 'https://florafauna.ai/',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/image-20250326193502188.png',
    category: 'AI绘画',
    content: `
***\\*FLORA\\**** 是一个集成最前沿生成式 AI 模型的***\\*可视化创意平台\\****，它将顶级文本、图像和视频生成 AI 模型整合在一个无限画布上，用户可以通过一个平台使用多种工具，***\\*可以将文字、图像、视频等 AI 工具灵活组合。\\****

用于内容创作、设计构思、短视频制作、品牌传播等任务，涵盖了从构思到成品的完整创作流程，无需频繁切换应用程序。

***\\*其核心目标是：\\****

> ✨ "将所有最强大的 AI 创意工具，整合到一个统一的创作流程中，使创作像思考一样快速。"
>
> ***\\*FLORA 的理念：\\****

> 1. ***\\*统一平台入口\\****：省去切换多个 AI 工具的繁琐。
> 2. ***\\*流程可视化\\****：将创作流程结构化、标准化。
> 3. ***\\*低门槛高效率\\****：即使没有 AI 技术背景，也能用它完成高质量输出。

> ***\\*模型即服务（Model-as-a-Service）\\****

> - 所有模型由 FLORA 管理、调度；
> - 用户无需配置 GPU 或推理环境；
> - 调用过程像"积木拼接"，降低技术门槛。

***\\*核心功能模块\\****

***\\*🧠 智能画布（Intelligent Canvas）\\****

FLORA 的核心交互界面是一块"无限延展"的智能画布，类似 Miro + Figma + Notion AI 的综合体。

- 用户可拖放、连接、组合多种 AI 模型模块；
- 创建工作流链路：例如 ***\\*文字生成 → 图像生成 → 视频动效\\****；
- 所有组件之间可以"拖线连接"，实现推理与输出串联。
- 支持 ***\\*预设提示词模板\\****、***\\*变量填充\\****、***\\*上下文嵌套结构\\****，便于非技术用户也能调试出复杂 Prompt 流程。

***\\*🧰 多模态 AI 工具集成\\****

平台已集成各种类别的主流 AI 模型。

FLORA 将这些模型封装为***\\*积木式工具节点\\****，可以随意组合。

***\\*👥 团队协作与共享\\****

- 支持***\\*多人同时在线协作\\****，类似 Google Docs 或 Figma；
- 可邀请团队成员共同编辑、审阅、标注；
- 支持版本回退与实时同步，适合创意工作坊、内容团队。

***\\*🌎 工作流社区（Workflow Community）\\****

FLORA 提供社区工作流库，用户可以：

- 浏览、复用他人构建的完整工作流程；
- 一键导入 "从 idea 到交付"的创作流程；
- 社区内含多种热门模板，例如：
  - TikTok/Reels 视频自动生成；
  - 3D 抽象设计；
  - 科幻视觉风格迭代；
  - Motion/Loop 动效设计等。

这些工作流就像 "AI 创意配方"，极大提升创作效率。
    `
  },

  // AI写作
  {
    id: 'writing-1',
    title: 'GrammarPaw',
    description: 'Mac版人工智能写作助手',
    link: 'https://apps.apple.com/hu/app/grammarpaw-write-better-w-ai/id6739843436',
    image: 'https://ph-files.imgix.net/fe670885-9e2b-4030-aa84-bca7c59a7b85.png?auto=format',
    category: 'AI写作'
  },
  {
    id: 'writing-2',
    title: 'Forage Mail',
    description: '解决电子邮件难题的人工智能，不是另一款邮件应用程序',
    link: 'https://foragemail.com/',
    image: 'https://ph-files.imgix.net/4ba300b8-9982-4207-b6d3-5822f382398b.png?auto=format',
    category: 'AI写作'
  },

  // AI语音
  {
    id: 'voice-1',
    title: 'Elevenreader',
    description: '提升听觉体验',
    link: 'https://elevenreader.io/',
    image: 'https://ph-files.imgix.net/ea251d83-1cf7-4547-abf0-0e459c81fa39.webp?auto=format',
    category: 'AI语音'
  },
  {
    id: 'voice-2',
    title: 'Klangio',
    description: '几秒钟内将音乐转录为音符',
    link: 'https://klang.io/',
    image: 'https://ph-files.imgix.net/84e9cae9-8529-4505-bbdb-2f0f7520d691.jpeg?auto=format',
    category: 'AI语音'
  },

  // AI视频
  {
    id: 'video-1',
    title: 'Hedra Studio',
    description: '新一代人工智能原生视频创作',
    link: 'https://www.hedra.com/',
    image: 'https://ph-files.imgix.net/afcc6d65-746a-433f-95d8-5cf3c4302ccb.png?auto=format',
    category: 'AI视频'
  },
  {
    id: 'video-2',
    title: 'Eddie AI 2.0',
    description: '实际制作视频的助理编辑',
    link: 'https://www.heyeddie.ai/',
    image: 'https://ph-files.imgix.net/be1da0ad-1582-4ec9-b7d0-310fc41df8ac.png?auto=format',
    category: 'AI视频'
  },

  // AI建模
  {
    id: 'modeling-1',
    title: 'Tripo+MCP',
    description: '使用Tripo MCP插件 + Cursor 实现 Al 驱动的 3D 设计生成',
    link: 'https://github.com/VAST-AI-Research/tripo-mcp',
    image: 'https://raw.githubusercontent.com/yy0691/img-bed/main/Blog/Ai_Newsimg_v3_02km_346b7c0c-6631-4bb4-82c8-d799b3570bag.jpg',
    category: 'AI建模',
    content: tripoMcp
  },

  // AI安全
  {
    id: 'security-1',
    title: 'Permit AI Access Control',
    description: '为人工智能应用提供细粒度权限',
    link: 'https://www.permit.io/ai-access-control',
    image: 'https://ph-files.imgix.net/972ad631-82af-46cd-9bea-173600ecb1a2.png?auto=format',
    category: 'AI安全'
  },
  {
    id: 'security-2',
    title: 'TestAI',
    description: '一键完成1,000多项人工智能代理自动测试',
    link: 'https://www.nbulatest.ai/',
    image: 'https://ph-files.imgix.net/c88f0bc4-5d16-485b-8426-4e9ca6c75684.png?auto=format',
    category: 'AI安全'
  },

  // 其他
  {
    id: 'other-1',
    title: 'Zencoder',
    description: '集成、可定制和直观的编码代理',
    link: 'https://zencoder.ai/',
    image: 'https://ph-files.imgix.net/c79518eb-0b64-4e1a-aa3d-51bd2bd3ac9c.png?auto=format',
    category: '其他'
  },
  {
    id: 'other-2',
    title: 'AI Renamer',
    description: '使用AI重命名文件',
    link: 'https://airenamer.app/',
    image: 'https://ph-files.imgix.net/350a8504-1c64-4e3b-9fe8-b7a3ed77c74e.jpeg?auto=format',
    category: '其他'
      }
]; 