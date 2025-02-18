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

interface VideoMeta {
  projectId: string;  // 关联到 projects 的 id
  duration: string;
  category: 'tutorial' | 'demo' | 'showcase';  // 添加这行
  tags: string[];
  comments: Comment[];
}

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

export const videoMeta: Record<string, VideoMeta> = {
  'ai-image-generator': {
    projectId: 'ai-image-generator',
    duration: '5:30',
    category: 'demo',  // 添加分类
    tags: ['AI', '图像生成', '演示'],
    comments: []
  },
  'smart-task-manager': {
    projectId: 'smart-task-manager',
    duration: '15:45',
    category: 'tutorial',  // 添加分类
    tags: ['React', '动画', '教程'],
    comments: []
  }
};