interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  publishDate: string;
  details: string;
  figmaUrl?: string;
  category: string;
  slug: string;  // 添加 slug 字段
  isRecommended?: boolean;  // 是否推荐到首页
  isHighlight?: boolean;    // 是否作为重点项目
  coverImage?: string;      // 项目封面图，用于首页展示
}

export const projects: Project[] = [
  {
    id: 'ai-dialogue-smba',
    title: 'AI对话系统（SMBA）',
    description: '智能对话系统，支持多轮对话、上下文理解和个性化回复，适用于客服、助手等场景。',
    thumbnail: 'https://miro.medium.com/v2/resize:fit:1400/1*8fGl_D4Gz2_nGC-kHqxPNQ.jpeg',
    technologies: ['Python', 'NLP', 'AI', 'LLM'],
    githubUrl: 'https://github.com/yy0691/ai-dialogue-smba',
    publishDate: '2024-03-15',
    category: 'custom',
    slug: 'ai-dialogue-smba',
    isRecommended: true,
    coverImage: 'https://miro.medium.com/v2/resize:fit:1400/1*8fGl_D4Gz2_nGC-kHqxPNQ.jpeg',
    details: '# AI对话系统（SMBA）\n\n基于大语言模型的智能对话系统，提供自然流畅的多轮对话体验。\n\n## 核心功能\n\n- 多轮对话上下文管理\n- 自然语言理解与生成\n- 智能意图识别\n- 个性化回复策略\n- 对话历史记录\n- 可扩展的对话流程'
  },
  {
    id: 'promptmate',
    title: 'PromptMate',
    description: '一款轻量级桌面应用程序，用于存放和管理用户常用的Prompts，同时预置一组常用Prompts。',
    thumbnail: 'https://pic.nximg.cn/file/20230409/11283626_112242292108_2.jpg',
    technologies: ['Node.js', 'Electron', 'Vite', 'TypeScript'],
    githubUrl: 'https://github.com/yy0691/PromptMate',
    publishDate: '2024-04-09',
    category: 'custom',
    slug: 'promptmate',
    isRecommended: true,
    coverImage: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_News首页.png',
    details: '# PromptMate\n\nPromptMate是一款轻量级桌面应用程序，用于存放和管理用户常用的Prompts，同时预置一组常用Prompts。\n\n## 主要特点\n\n- 📝 Prompt模板管理\n- 🎨 苹果风格界面设计\n- 🌈 多主题和多字体支持\n- ⌨️ 全局快捷键唤出\n- 📌 窗口置顶功能\n- 💾 本地数据存储\n- 🔍 快速搜索与过滤'
  },
  {
    id: 'file-management-app',
    title: '出库工具（FileManagementApp）',
    description: '根据Excel表格一键检索文件，批量替换多文件中的重复文本，提高办公效率。',
    thumbnail: 'https://pic.nximg.cn/file/20230409/11283626_112242292108_2.jpg',
    technologies: ['C#', 'WPF', '.NET', 'Excel'],
    githubUrl: 'https://github.com/yy0691/FileManagementApp',
    videoUrl: 'http://st75yeaid.hb-bkt.clouddn.com/%E5%88%9B%E6%96%B0%E6%88%90%E6%9E%9C%E4%BB%8B%E7%BB%8D%E8%A7%86%E9%A2%91%E2%80%94%E2%80%94%E5%B8%88%E5%AE%87%E4%BD%B3.mp4',
    publishDate: '2024-01-15',
    category: 'custom',
    slug: 'file-management-app',
    isRecommended: true,
    coverImage: 'https://npimg.hellouikit.com/d7/e9/d7e9bca4357b8c87b450c289ab5c7fcb?imageView2/2/w/1000',
    details: '# 出库工具\n\n一款基于C#开发的文件管理工具，提供高效的文件检索和文本处理功能。\n\n## 主要功能\n\n- 📊 Excel数据导入与解析\n- 🔍 文件快速检索与定位\n- 📝 批量文本替换\n- 🎯 智能匹配算法\n- 💻 用户友好的WPF界面\n- 📋 操作日志记录\n- ⚡ 高性能批处理'
  },
  {
    id: 'social-simulation',
    title: '社会模拟系统（Social Simulation）',
    description: '基于多智能体的社会行为模拟系统，用于研究和预测社会现象和群体行为模式。',
    thumbnail: 'https://www.researchgate.net/publication/347899898/figure/fig1/AS:973155462516736@1609220878623/Agent-based-Modeling-Framework-Source-Gilbert-and-Troitzsch-2005.png',
    technologies: ['Python', 'Multi-Agent', 'Simulation', 'Data Analysis'],
    githubUrl: 'https://github.com/yy0691/Social_Simulation',
    publishDate: '2024-06-20',
    category: 'custom',
    slug: 'social-simulation',
    isRecommended: true,
    coverImage: 'https://www.researchgate.net/publication/347899898/figure/fig1/AS:973155462516736@1609220878623/Agent-based-Modeling-Framework-Source-Gilbert-and-Troitzsch-2005.png',
    details: '# 社会模拟系统\n\n基于多智能体技术的社会行为模拟平台，为社会科学研究提供计算实验环境。\n\n## 核心特性\n\n- 🤖 多智能体建模\n- 📈 社会网络分析\n- 🎲 随机事件模拟\n- 📊 数据可视化\n- 🔬 行为模式分析\n- 📉 统计数据导出\n- ⚙️ 可配置参数系统'
  },
  {
    id: 'linktest-ilab-x',
    title: '联通性测试工具（LinkTest-ilab-x）',
    description: '针对ilab-x虚拟仿真实验项目进行批量自动化测试，提升测试效率和准确性。',
    thumbnail: 'https://talkie.ai/app/uploads/2022/02/what-are-virtual-agents.jpg',
    technologies: ['Python', 'Selenium', 'Automation', 'Testing'],
    githubUrl: 'https://github.com/yy0691/LinkTest-ilab-x',
    category: 'custom',
    publishDate: '2024-08-20',
    slug: 'linktest-ilab-x',
    isRecommended: true,
    coverImage: 'https://talkie.ai/app/uploads/2022/02/what-are-virtual-agents.jpg',
    details: '# 联通性测试工具\n\n专为ilab-x虚拟仿真实验平台设计的自动化测试工具。\n\n## 主要功能\n\n- 🔗 批量链接检测\n- 🤖 自动化测试流程\n- 📊 测试报告生成\n- 🐛 异常检测与记录\n- ⚡ 并发测试支持\n- 📝 详细日志记录\n- 🎯 可配置测试用例'
  },
  {
    id: 'news-robot',
    title: '新闻机器人（New_Robot）',
    description: '基于RSS订阅的智能新闻聚合与推送机器人，自动分类并推送至飞书群聊。',
    thumbnail: 'https://www.skynettoday.com/assets/img/digests/year-2020/wordcloud.png',
    technologies: ['Python', 'RSS', 'API', 'Automation'],
    githubUrl: 'https://github.com/yy0691/New_Robot',
    publishDate: '2024-10-15',
    category: 'custom',
    slug: 'news-robot',
    isRecommended: true,
    coverImage: 'http://st75yeaid.hb-bkt.clouddn.com/Generated%20Image%20March%2018%2C%202025%20-%207_15PM.png.jpeg',
    details: '# 新闻机器人\n\n智能新闻聚合推送系统，自动获取、分类并推送新闻至飞书工作群。\n\n## 核心功能\n\n- 📰 RSS订阅源管理\n- 🏷️ 智能内容分类\n- 🤖 自动定时推送\n- 📱 飞书群聊集成\n- 🔍 关键词过滤\n- 📊 推送统计分析\n- ⚙️ 灵活配置选项'
  }
];