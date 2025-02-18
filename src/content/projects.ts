interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  publishDate: string;  // 添加发布日期
  details: string;
  figmaUrl?: string;  // 添加 Figma 链接属性
}

export const projects: Project[] = [
  {
    id: 'creative-thought-haven',
    title: '出库工具',
    description: '根据Excel表格一键检索文件，批量替换多文件中的重复文本。',
    thumbnail: '/placeholder.svg',
    technologies: ['C#', 'WPF应用', 'AI编程', 'Vite'],
    githubUrl: 'https://github.com/yy0691/FileManagementApp',
    videoUrl: '/videos/出库工具-作品介绍.mp4',
    publishDate: '2024-01-15',
    details: '# 出库工具\n\n一款基于C#开发的文件管理工具，提供高效的文件检索和文本处理功能。\n\n## 主要特点\n\n- Excel数据导入与解析\n- 文件快速检索与定位\n- 批量文本替换\n- 用户友好界面\n- 操作日志记录\n'
  },
  {
    id: 'ai-image-generator',
    title: 'AI 图像生成器',
    description: '基于深度学习的图像生成工具，支持多种风格转换和图像编辑功能。',
    thumbnail: '/placeholder.svg',
    technologies: ['Python', 'PyTorch', 'FastAPI', 'React'],
    videoUrl: '/videos/喷水.mp4',
    publishDate: '2024-03-15',
    details: '# AI 图像生成器\n\n结合最新的深度学习技术，提供直观的图像生成和编辑功能。\n\n## 核心功能\n\n- 文本到图像生成\n- 风格迁移\n- 图像编辑与优化\n- 批量处理支持\n'
  },
  {
    id: 'smart-task-manager',
    title: '智能任务管理器',
    description: '集成AI助手的任务管理应用，帮助用户更高效地组织和完成任务。',
    thumbnail: '/placeholder.svg',
    technologies: ['Next.js', 'TypeScript', 'OpenAI API', 'MongoDB'],
    githubUrl: 'https://github.com/yourusername/smart-task-manager',
    videoUrl: 'https://www.bilibili.com/video/BV1uGA3eLEeu',
    demoUrl: 'https://www.bilibili.com/video/BV1uGA3eLEeu',
    publishDate: '2024-02-20',
    details: '# 智能任务管理器\n\n结合AI技术的现代化任务管理工具，提供智能建议和自动化功能。\n\n## 特色功能\n\n- AI辅助任务分解\n- 智能时间管理\n- 自动化工作流\n- 团队协作支持\n'
  },
  {
    id: 'test',
    title: '夸克网盘测试项目',
    description: '夸克网盘测试项目。',
    thumbnail: '/placeholder.svg',
    technologies: ['Next.js', 'TypeScript', 'OpenAI API', 'MongoDB'],
    githubUrl: 'https://github.com/yourusername/smart-task-manager',
    videoUrl: 'https://pan.quark.cn/s/11c0344ba94a',
    demoUrl: 'https://www.bilibili.com/video/BV1uGA3eLEeu',
    publishDate: '2024-02-20',
    details: '# 夸克网盘测试项目\n\n夸克网盘测试项目。\n\n## 特色功能\n\n- AI辅助任务分解\n- 智能时间管理\n- 自动化工作流\n- 团队协作支持\n'
  }
];