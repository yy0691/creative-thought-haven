import { CardItem } from './types';

export const learningItems: CardItem[] = [
    {
        id: '1',
        title: '生成式AI导论',
        description: '全面介绍生成式AI的基本概念、技术原理及应用场景，适合AI初学者和技术爱好者。',
        author: '技术团队',
        link: '/blog/generative-ai-intro',
        image: '/images/ai/generative-ai.jpg',
        category: '入门指南'
      },
      {
        id: '2',
        title: '深度学习基础',
        description: '深度学习的核心概念与原理，包括神经网络架构、反向传播算法和常见优化技术。',
        author: '研究小组',
        link: '/blog/deep-learning-basics',
        image: '/images/ai/deep-learning.jpg',
        category: '基础理论'
      },
      {
        id: '3',
        title: 'Prompt Engineering指南',
        description: '如何设计有效的提示词以获得更好的AI生成结果，包含多种场景的实用技巧。',
        author: '提示工程师',
        link: '/blog/prompt-engineering',
        image: '/images/ai/prompt-engineering.jpg',
        category: '实践技巧'
      },
      {
        id: '4',
        title: 'AI伦理与安全',
        description: '探讨AI发展中的伦理问题和安全挑战，以及如何构建负责任的AI系统。',
        author: '伦理研究员',
        link: '/blog/ai-ethics',
        image: '/images/ai/ai-ethics.jpg',
        category: '伦理安全'
      },
      {
        id: '5',
        title: '计算机视觉入门',
        description: '介绍计算机视觉的基本原理和常用算法，以及在实际应用中的案例分析。',
        author: '视觉专家',
        link: '/blog/computer-vision',
        image: '/images/ai/computer-vision.jpg',
        category: '专项技术'
      }
]; 