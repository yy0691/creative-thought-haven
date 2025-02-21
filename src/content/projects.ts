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
    category: 'automation',
    slug: 'creative-thought-haven',  // 添加 slug
    details: '# 出库工具\n\n一款基于C#开发的文件管理工具，提供高效的文件检索和文本处理功能。\n\n## 主要特点\n\n- Excel数据导入与解析\n- 文件快速检索与定位\n- 批量文本替换\n- 用户友好界面\n- 操作日志记录\n'
  },
  {
    id: 'ai-image-generator',
    title: 'AI 图像生成器',
    description: '基于 AI 技术的图像生成工具',
    thumbnail: '/placeholder.svg',
    technologies: ['React', 'OpenAI API', 'TailwindCSS'],
    githubUrl: 'https://github.com/yy0691/FileManagementApp',
    videoUrl: 'https://www.bilibili.com/video/BV1QvKWeZEd2/',
    category: 'llm',
    publishDate: '2024-01-10',
    slug: 'ai-image-generator',  // 添加 slug
    details: '# AI 图像生成器\n\n使用 OpenAI API 开发的图像生成工具'
  }
];