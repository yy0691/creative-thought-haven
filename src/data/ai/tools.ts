import { CardItem } from './types';

export const toolsItems: CardItem[] = [
    {
        id: '1',
        title: 'ChatGPT',
        description: 'OpenAI开发的对话式人工智能，支持自然语言交互，可用于创作内容、编程辅助和知识问答。',
        link: 'https://chat.openai.com',
        image: '/images/ai/chatgpt.jpg',
        category: '对话助手'
      },
      {
        id: '2',
        title: 'Claude',
        description: 'Anthropic开发的AI助手，强调有益、诚实和无害的交互，拥有卓越的推理能力和长文本处理能力。',
        link: 'https://claude.ai',
        image: '/images/ai/claude.jpg',
        category: '对话助手'
      },
      {
        id: '3',
        title: 'Midjourney',
        description: '先进的AI图像生成工具，可根据文字描述创建高质量图像，广泛应用于创意设计和艺术创作。',
        link: 'https://midjourney.com',
        image: '/images/ai/midjourney.jpg',
        category: '图像生成'
      },
      {
        id: '4',
        title: 'Stable Diffusion',
        description: '开源的AI图像生成模型，可本地部署，支持多样化的图像风格和高度定制化的生成选项。',
        link: 'https://stability.ai/',
        image: '/images/ai/stable-diffusion.jpg',
        category: '图像生成'
      },
      {
        id: '5',
        title: 'Cursor',
        description: '基于AI的代码编辑器，集成了强大的代码生成和优化功能，提高开发效率。',
        link: 'https://cursor.sh/',
        image: '/images/ai/cursor.jpg',
        category: '开发工具'
      },
      {
        id: '6',
        title: 'Perplexity AI',
        description: '智能搜索引擎，结合了LLM和实时网络搜索功能，提供更精确和深入的答案。',
        link: 'https://www.perplexity.ai/',
        image: '/images/ai/perplexity.jpg',
        category: '搜索工具'
      }
]; 