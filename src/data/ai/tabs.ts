import { TabItem } from './types';

export const tabCategories = [
  {
    id: 'main',
    title: '',
    tabs: [
      { id: 'news', label: 'AI前沿新闻', icon: 'Newspaper' },
    ]
  },
  {
    id: 'learn',
    title: '学习',
    tabs: [
      { id: 'learning', label: 'AI学习资料', icon: 'BookOpen' },
      { id: 'courses', label: '李宏毅老师课程', icon: 'GraduationCap' },
      { id: 'deeplearning', label: '深度学习', icon: 'Code' },
      { id: 'prompts', label: '提示词工程', icon: 'Lightbulb' },
    ]
  },
  {
    id: 'resource',
    title: '资源',
    tabs: [
      { id: 'tools', label: 'AI工具箱', icon: 'Briefcase' },
      { id: 'links', label: '常用链接', icon: 'Link' },
    ]
  }
]; 