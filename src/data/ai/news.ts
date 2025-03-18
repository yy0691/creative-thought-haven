import axios from 'axios';
import { CardItem } from './types';

// 默认新闻数据
export const defaultNewsItems: CardItem[] = [
  {
    id: '1',
    title: 'Claude 3.5 Sonnet 发布',
    description: 'Claude 3.5 Sonnet 现已上线，在推理、编程和视觉理解方面有重大突破。这是Anthropic公司有史以来最强大的模型，表现超越了许多现有的AI模型。',
    author: 'Anthropic',
    date: '2024-03-18',
    image: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc3c9bdf4-6ab8-4e90-b3dd-a1711db91e23_1200x617.jpeg',
    category: 'LLM',
    link: 'https://www.anthropic.com/claude'
  },
  {
    id: '2',
    title: 'Mistral AI 发布 Mistral Small 3.1',
    description: '多模态模型 多个关键指标上均优于 Gemma，这款开源模型特别擅长代码生成和多语言支持，为开发者提供了更多选择。',
    author: 'Mistral团队',
    date: '2024-03-17',
    image: 'https://techcrunch.com/wp-content/uploads/2023/09/mistral-7b-v0.1.jpg',
    category: '开源模型',
    link: 'https://mistral.ai/'
  },
  {
    id: '3',
    title: 'Google DeepMind 推出 AlphaFold 3',
    description: '新一代蛋白质结构预测工具，可预测几乎所有分子的3D结构。这一突破将为药物研发和生物医学研究带来革命性变化。',
    author: 'DeepMind团队',
    date: '2024-03-15',
    image: 'https://deepmind.google/static/images/alphafold-3.jpg',
    category: '科学研究',
    link: 'https://deepmind.google/technologies/alphafold/'
  },
  {
    id: '4',
    title: 'NVIDIA发布新一代AI芯片H200',
    description: 'H200 GPU提供比上一代产品高出3倍的性能，专为大规模AI训练和推理优化，将加速各行业的AI应用部署。',
    author: 'NVIDIA',
    date: '2024-03-12',
    image: 'https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/h200/h200-gpu-og-1200x630.jpg',
    category: '硬件',
    link: 'https://www.nvidia.com/'
  },
  {
    id: '5',
    title: 'OpenAI宣布GPT-5训练已完成',
    description: '下一代大型语言模型GPT-5训练完成，预计将在今年内发布。据悉，其推理能力和知识库都有显著提升。',
    author: 'OpenAI',
    date: '2024-03-10',
    image: 'https://openai.com/images/gpt-5.jpg',
    category: 'LLM',
    link: 'https://openai.com/'
  },
  {
    id: '6',
    title: 'Meta推出多模态AI系统NIAM',
    description: 'Meta的新型多模态AI系统NIAM可以理解并生成文本、图像、音频和视频内容，代表了AI领域多模态融合的重要突破。',
    author: 'Meta AI',
    date: '2024-03-08',
    image: 'https://ai.meta.com/images/niam-og.jpg',
    category: '多模态AI',
    link: 'https://ai.meta.com/'
  },
  {
    id: '7',
    title: 'Google Gemini 1.5 Pro正式推出',
    description: 'Google的最新AI模型Gemini 1.5 Pro具有100万token的上下文窗口，可以分析数小时的视频、音频或数千页文档，模型尺寸更小，成本更低。',
    author: 'Google',
    date: '2024-03-20',
    image: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-1.5-pro.max-1000x1000.png',
    category: 'LLM',
    link: 'https://blog.google/technology/ai/google-gemini-1-5-pro/'
  },
  {
    id: '8',
    title: 'Stability AI发布全新Stable Diffusion 3',
    description: 'Stable Diffusion 3提供了更高质量的图像生成能力，可以更好地理解文本提示并生成更一致、更符合要求的图像，支持多种模型尺寸和效率级别。',
    author: 'Stability AI',
    date: '2024-03-22',
    image: 'https://stability.ai/images/stable-diffusion-3.jpg',
    category: '图像生成',
    link: 'https://stability.ai/news/stable-diffusion-3'
  },
  {
    id: '9',
    title: 'Midjourney V6发布',
    description: 'Midjourney V6版本大幅提升了图像质量、照片真实感和文本理解能力，支持更准确的人像生成和更丰富的艺术风格。',
    author: 'Midjourney',
    date: '2024-03-16',
    image: 'https://cdn.midjourney.com/v6-preview.jpg',
    category: '图像生成',
    link: 'https://midjourney.com'
  },
  {
    id: '10',
    title: 'Inflection AI推出Personal AI',
    description: 'Inflection AI推出了Personal AI，这是一款专注于个人助理功能的AI模型，能够学习用户偏好并提供更个性化的帮助。',
    author: 'Inflection AI',
    date: '2024-03-25',
    image: 'https://inflection.ai/images/personal-ai.jpg',
    category: '个人助理',
    link: 'https://inflection.ai/'
  },
  {
    id: '11',
    title: 'AI芯片初创公司Cerebras完成10亿美元融资',
    description: 'AI芯片公司Cerebras完成10亿美元融资，估值达到80亿美元，将扩大其晶圆级引擎的生产，与NVIDIA竞争AI加速器市场。',
    author: 'Cerebras',
    date: '2024-03-28',
    image: 'https://cerebras.net/wp-content/uploads/2024/03/cerebras-wafer-scale-engine.jpg',
    category: '行业动态',
    link: 'https://cerebras.net/'
  },
  {
    id: '12',
    title: 'Anthropic宣布开放Claude API给所有开发者',
    description: 'Anthropic宣布所有开发者现在都可以访问Claude API，不再需要等待名单，同时提供初始免费使用额度和新的开发者工具。',
    author: 'Anthropic',
    date: '2024-03-31',
    image: 'https://www.anthropic.com/images/claude-api.jpg',
    category: 'API',
    link: 'https://www.anthropic.com/news'
  }
];

// 获取Coze访问令牌
export const getCozeAccessToken = async () => {
  try {
    // Coze API服务地址
    const baseUrl = 'https://api.coze.cn';
    
    // 从环境变量获取Personal Access Token(PAT)
    const pat = import.meta.env.VITE_COZE_PAT || process.env.VITE_COZE_PAT;
    
    if (!pat) {
      console.error('未找到Coze PAT环境变量，请设置VITE_COZE_PAT环境变量');
      return null;
    }
    
    // 请求访问令牌
    const response = await axios.post(
      `${baseUrl}/api/auth/v1/access_token`, 
      {
        grant_type: 'client_credentials'
      },
      {
        headers: {
          'Authorization': `Bearer ${pat}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.data && response.data.access_token) {
      return response.data.access_token;
    }
    
    return null;
  } catch (error) {
    console.error('获取Coze访问令牌失败:', error);
    return null;
  }
};

// 从Coze智能体API获取最新新闻
export const fetchLatestNews = async (): Promise<CardItem[]> => {
  try {
    // Coze API地址
    const baseUrl = 'https://api.coze.cn';
    
    // 智能体ID - 从环境变量中获取
    const botId = import.meta.env.VITE_COZE_BOT_ID || process.env.VITE_COZE_BOT_ID || '7433632883987939380';
    
    // 获取访问令牌
    const accessToken = await getCozeAccessToken();
    
    if (!accessToken) {
      throw new Error('无法获取Coze访问令牌');
    }
    
    // 设置请求头
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };
    
    // 调用Coze API
    const response = await axios.post(
      `${baseUrl}/api/bot/v1/chat/completions`,
      {
        bot_id: botId,
        messages: [
          {
            role: 'user',
            content: '请提供最新的AI新闻资讯'
          }
        ],
        stream: false
      },
      { headers }
    );
    
    // 处理响应数据
    if (response.data && response.data.output && response.data.output.newslist) {
      // 将API响应格式转换为CardItem格式
      return response.data.output.newslist.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        author: item.source,
        date: item.ctime.split(' ')[0], // 提取日期部分
        image: item.picUrl, // 直接使用API返回的图片URL
        link: item.url,
        category: 'AI新闻'
      }));
    }
    
    return [];
  } catch (error) {
    console.error('获取新闻数据失败:', error);
    return [];
  }
}; 