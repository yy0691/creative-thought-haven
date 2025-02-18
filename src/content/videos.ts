interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: 'tutorial' | 'demo' | 'showcase';
  duration: string;
  publishDate: string;
  tags: string[];
  details: string;
}

export const videos: Video[] = [
  {
    id: 'ai-image-generator-demo',
    title: 'AI图像生成器演示',
    description: '展示AI图像生成器的核心功能和使用方法，包括文本生成图像和风格迁移。',
    thumbnail: '/placeholder.svg',
    videoUrl: '/videos/ai-image-demo.mp4',
    category: 'demo',
    duration: '5:30',
    publishDate: '2024-03-15',
    tags: ['AI', '图像生成', '演示'],
    details: '# AI图像生成器演示\n\n本视频详细展示了AI图像生成器的主要功能和操作流程。\n\n## 视频内容\n\n- 文本到图像生成演示\n- 风格迁移效果展示\n- 实际应用案例'
  },
  {
    id: 'react-animation-tutorial',
    title: 'React动画实现教程',
    description: '从基础到高级的React动画教程，包括Framer Motion库的使用方法。',
    thumbnail: '/placeholder.svg',
    videoUrl: '/videos/react-animation.mp4',
    category: 'tutorial',
    duration: '15:45',
    publishDate: '2024-03-10',
    tags: ['React', '动画', '教程'],
    details: '# React动画实现教程\n\n深入浅出地讲解React中实现流畅动画的多种方式。\n\n## 教程大纲\n\n- CSS动画基础\n- React Transition Group\n- Framer Motion入门\n- 实战案例'
  },
  {
    id: 'portfolio-showcase',
    title: '作品集网站展示',
    description: '展示个人作品集网站的设计理念和技术实现。',
    thumbnail: '/placeholder.svg',
    videoUrl: '/videos/portfolio-showcase.mp4',
    category: 'showcase',
    duration: '8:20',
    publishDate: '2024-03-05',
    tags: ['作品集', '网站设计', '展示'],
    details: '# 作品集网站展示\n\n详细介绍作品集网站的设计思路和技术选型。\n\n## 视频重点\n\n- 设计理念阐述\n- 技术栈介绍\n- 性能优化措施'
  }
];