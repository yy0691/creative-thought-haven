interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  details: string;
}

export const projects: Project[] = [
  {
    id: 'creative-thought-haven',
    title: 'Creative Thought Haven',
    description: '个人博客与作品展示平台，使用现代前端技术栈构建的响应式网站。',
    thumbnail: '/placeholder.svg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/yourusername/creative-thought-haven',
    details: '# Creative Thought Haven\n\n一个现代化的个人博客与作品展示平台，专注于提供良好的用户体验和内容展示。\n\n## 主要特点\n\n- 响应式设计，支持多设备访问\n- MDX 支持，轻松创作富媒体内容\n- 作品集展示\n- 性能优化\n'
  },
  {
    id: 'ai-image-generator',
    title: 'AI 图像生成器',
    description: '基于深度学习的图像生成工具，支持多种风格转换和图像编辑功能。',
    thumbnail: '/placeholder.svg',
    technologies: ['Python', 'PyTorch', 'FastAPI', 'React'],
    demoUrl: 'https://ai-image-generator.demo',
    videoUrl: '/videos/ai-image-demo.mp4',
    details: '# AI 图像生成器\n\n结合最新的深度学习技术，提供直观的图像生成和编辑功能。\n\n## 核心功能\n\n- 文本到图像生成\n- 风格迁移\n- 图像编辑与优化\n'
  },
  {
    id: 'smart-task-manager',
    title: '智能任务管理器',
    description: '集成AI助手的任务管理应用，帮助用户更高效地组织和完成任务。',
    thumbnail: '/placeholder.svg',
    technologies: ['Next.js', 'TypeScript', 'OpenAI API', 'MongoDB'],
    githubUrl: 'https://github.com/yourusername/smart-task-manager',
    demoUrl: 'https://smart-task-manager.demo',
    details: '# 智能任务管理器\n\n结合AI技术的现代化任务管理工具，提供智能建议和自动化功能。\n\n## 特色功能\n\n- AI辅助任务分解\n- 智能时间管理\n- 自动化工作流\n'
  }
];