import { CardItem } from './types';

export const promptsItems: CardItem[] = [
  {
    id: '1',
    title: 'Midjourney提示词指南',
    description: '全面的Midjourney提示词教程，包含构图、风格、光影等元素的详细说明和最佳实践。',
    link: 'https://docs.midjourney.com/docs/prompts',
    image: '/images/ai/midjourney-prompts.jpg',
    category: '图像生成'
  },
  {
    id: '2',
    title: 'ChatGPT提示工程',
    description: 'OpenAI官方的提示工程课程，教你如何设计有效的提示以获得最佳回答。',
    link: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
    image: '/images/ai/chatgpt-prompts.jpg',
    category: '文本生成'
  },
  {
    id: '3',
    title: 'Stable Diffusion提示词库',
    description: '精选的Stable Diffusion提示词集合，帮助你生成高质量的AI艺术作品。',
    link: 'https://stable-diffusion-art.com/prompt-guide/',
    image: '/images/ai/sd-prompts.jpg',
    category: '图像生成'
  },
  {
    id: '4',
    title: 'Claude提示策略',
    description: 'Anthropic的Claude模型提示指南，包含高级提示技巧和最佳实践。',
    link: 'https://docs.anthropic.com/claude/docs/prompt-engineering',
    image: '/images/ai/claude-prompts.jpg',
    category: '文本生成'
  },
  {
    id: '5',
    title: 'AI提示词模式库',
    description: '常用AI提示词模式的集合，包括任务分解、角色扮演、思维链等技巧。',
    link: '/blog/prompt-patterns',
    image: '/images/ai/prompt-patterns.jpg',
    category: '通用技巧'
  }
]; 