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
    id: 'creative-thought-haven',
    title: '出库工具',
    description: '根据Excel表格一键检索文件，批量替换多文件中的重复文本。',
    thumbnail: 'http://st75yeaid.hb-bkt.clouddn.com/%E5%87%BA%E5%BA%93%E5%B7%A5%E5%85%B7.png',
    technologies: ['C#', 'WPF应用', 'AI编程', 'Vite'],
    githubUrl: 'https://github.com/yy0691/FileManagementApp',
    videoUrl: 'http://st75yeaid.hb-bkt.clouddn.com/%E5%88%9B%E6%96%B0%E6%88%90%E6%9E%9C%E4%BB%8B%E7%BB%8D%E8%A7%86%E9%A2%91%E2%80%94%E2%80%94%E5%B8%88%E5%AE%87%E4%BD%B3.mp4',
    publishDate: '2024-01-15',
    category: 'automation',
    slug: 'creative-thought-haven',  // 添加 slug
    isRecommended: true,  // 设置为推荐项目
    coverImage: 'http://st75yeaid.hb-bkt.clouddn.com/%E5%87%BA%E5%BA%93%E5%B7%A5%E5%85%B7.png',
    details: '# 出库工具\n\n一款基于C#开发的文件管理工具，提供高效的文件检索和文本处理功能。\n\n## 主要特点\n\n- Excel数据导入与解析\n- 文件快速检索与定位\n- 批量文本替换\n- 用户友好界面\n- 操作日志记录\n'
  },
  {
    id: 'creative-thought-haven',
    title: '新闻机器人',
    description: '根据Rss订阅链接分类推送新闻至飞书群。',
    thumbnail: 'http://st75yeaid.hb-bkt.clouddn.com/%E6%9C%BA%E5%99%A8%E4%BA%BA.png',
    technologies: ['Python', 'WorkFlow', 'Auto'],
    githubUrl: 'https://github.com/yy0691/New_Robot',
    publishDate: '2025-01-15',
    category: 'automation',
    slug: 'creative-thought-haven',  // 添加 slug
    coverImage: 'http://st75yeaid.hb-bkt.clouddn.com/Generated%20Image%20March%2018%2C%202025%20-%207_15PM.png.jpeg',
    details: 'xxx'
  },
  {
    id: 'ai-image-generator',
    title: '联通性测试工具',
    description: '针对于ilab-x中虚拟仿真实验项目进行批量测试。',
    thumbnail: 'http://st75yeaid.hb-bkt.clouddn.com/Generated%20Image%20March%2018%2C%202025%20-%207_13PM.png.jpeg',
    technologies: ['Python', 'Selenium'],
    githubUrl: 'https://github.com/yy0691/LinkTest-ilab-x',
    category: 'llm',
    publishDate: '2025-01-20',
    slug: 'ai-image-generator',  // 添加 slug
    isRecommended: true,  // 设置为推荐项目
    coverImage: 'http://st75yeaid.hb-bkt.clouddn.com/ilab-x%20%282%29.png',
    details: 'xxx'
  }
];