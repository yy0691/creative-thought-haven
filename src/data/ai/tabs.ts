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
      { id: 'tools', label: '开源项目', icon: 'Briefcase' },
      { id: 'links', label: '常用链接', icon: 'Link' },
    ]
  },
  {
    id: 'tools',
    title: '工具汇总',
    tabs: [
      { id: 'general', label: '通用大模型', icon: 'Briefcase' },
      { id: 'painting', label: 'AI绘画', icon: 'Briefcase' },
      { id: 'writing', label: 'AI编程', icon: 'Briefcase' },
      { id: 'voice', label: 'AI语音', icon: 'Briefcase' },
      { id: 'video', label: 'AI视频', icon: 'Briefcase' },
      { id: 'modeling', label: 'AI建模', icon: 'Cube' },
      { id: 'security', label: 'AI安全', icon: 'Briefcase' },
      { id: 'other', label: '其他', icon: 'Briefcase' },
    ]
  }
]; 