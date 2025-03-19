import axios from 'axios';
import { CardItem } from './types';

// 默认新闻数据
export const defaultNewsItems: CardItem[] = [
  {
    id: '1',
    title: 'Claude 4.0 正式发布',
    description: 'Anthropic发布Claude 4.0，在多模态理解、代码生成和长文本处理方面都有重大突破。新版本支持实时语音对话，并能处理超过100万token的上下文。',
    author: 'Anthropic',
    date: '2025-03-19',
    image: 'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/smozbwxkmn5ksr1q9vl1',
    category: 'LLM',
    link: 'https://www.anthropic.com/claude'
  },
  {
    id: '2',
    title: 'OpenAI推出GPT-5多模态版本',
    description: 'GPT-5多模态版本支持实时视频理解和生成，可以直接与用户进行视频对话，理解视频内容并提供实时反馈。',
    author: 'OpenAI',
    date: '2025-03-18',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png',
    category: 'LLM',
    link: 'https://openai.com/'
  },
  {
    id: '3',
    title: 'Google DeepMind发布量子计算突破性研究',
    description: '使用新型量子算法，在室温下实现了稳定的量子比特操作，为大规模量子计算机的实现铺平道路。',
    author: 'DeepMind',
    date: '2025-03-17',
    image: 'https://storage.googleapis.com/deepmind-live-cms/images/social_share_image.width-1100.png',
    category: '科研突破',
    link: 'https://deepmind.google/'
  },
  {
    id: '4',
    title: 'NVIDIA发布H500 AI超级芯片',
    description: 'H500提供比H200高出5倍的AI训练性能，采用4nm工艺，集成了新一代Tensor Core，功耗仅为前代的60%。',
    author: 'NVIDIA',
    date: '2025-03-16',
    image: 'https://www.nvidia.com/content/dam/en-zz/Solutions/about-nvidia/logo-and-brand/01-nvidia-logo-horiz-500x200-2c50-p@2x.png',
    category: '硬件',
    link: 'https://www.nvidia.com/'
  },
  {
    id: '5',
    title: 'Meta推出AR眼镜Meta Glass',
    description: 'Meta Glass采用突破性的全息投影技术，重量仅80克，续航8小时，支持全天候AR体验和AI助手集成。',
    author: 'Meta',
    date: '2025-03-15',
    image: 'https://about.fb.com/wp-content/uploads/2021/10/meta-logo.png',
    category: '硬件',
    link: 'https://about.meta.com/'
  },
  {
    id: '6',
    title: 'Stability AI推出实时AI视频生成引擎',
    description: '新一代AI视频生成技术支持实时渲染，可直接将文本描述转换为高质量视频，开创视频创作新范式。',
    author: 'Stability AI',
    date: '2025-03-14',
    image: 'https://stability.ai/assets/images/stability-ai-logo.svg',
    category: '视频生成',
    link: 'https://stability.ai/'
  },
  {
    id: '7',
    title: 'Anthropic推出企业级AI安全评估工具',
    description: '新工具可以全面评估AI模型的安全性、偏见和潜在风险，帮助企业更好地部署和管理AI系统。',
    author: 'Anthropic',
    date: '2025-03-13',
    image: 'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/smozbwxkmn5ksr1q9vl1',
    category: 'AI安全',
    link: 'https://www.anthropic.com/'
  },
  {
    id: '8',
    title: '微软发布新一代AI开发平台',
    description: '集成了代码生成、测试自动化和部署优化的一站式AI开发平台，大幅提升开发效率。',
    author: 'Microsoft',
    date: '2025-03-12',
    image: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
    category: '开发工具',
    link: 'https://microsoft.com/'
  },
  {
    id: '9',
    title: 'Midjourney推出3D场景生成功能',
    description: 'V8版本支持直接从文本生成完整的3D场景，可导出为多种3D格式，革新了3D内容创作流程。',
    author: 'Midjourney',
    date: '2025-03-11',
    image: 'https://seeklogo.com/images/M/midjourney-logo-431D36BAE4-seeklogo.com.png',
    category: '3D生成',
    link: 'https://www.midjourney.com/'
  },
  {
    id: '10',
    title: 'Cohere发布多语言理解新突破',
    description: '新模型可以同时理解和翻译100种语言，准确率达到人类水平，特别在低资源语言上有显著提升。',
    author: 'Cohere',
    date: '2025-03-10',
    image: 'https://assets-global.website-files.com/614a9edd8139f5def3897a73/61960dbb839ce5fefe853138_Cohere%20Logo%201.png',
    category: '自然语言处理',
    link: 'https://cohere.ai/'
  },
  {
    id: '11',
    title: '谷歌推出新一代量子模拟器',
    description: '可在普通计算机上模拟100量子比特的运算，为量子算法开发和测试提供强大工具。',
    author: 'Google',
    date: '2025-03-09',
    image: 'https://blog.google/static/images/share.png',
    category: '量子计算',
    link: 'https://quantum.google/'
  },
  {
    id: '12',
    title: 'Hugging Face推出企业级模型训练平台',
    description: '新平台支持大规模分布式训练，内置模型评估和部署工具，简化企业AI落地流程。',
    author: 'Hugging Face',
    date: '2025-03-08',
    image: 'https://huggingface.co/front/assets/huggingface_logo.svg',
    category: '开发平台',
    link: 'https://huggingface.co/'
  },
  {
    id: '13',
    title: '百度文心大模型4.0发布',
    description: '百度发布文心大模型4.0，在多模态理解、知识推理和创意创作等方面实现重大突破，支持更强的中文理解和生成能力。',
    author: '百度',
    date: '2025-03-19',
    image: 'https://img0.baidu.com/it/u=2137813120,1780872000&fm=253&fmt=auto&app=138&f=PNG',
    category: '大模型',
    link: 'https://wenxin.baidu.com'
  },
  {
    id: '14',
    title: '阿里云发布通义千问新版本',
    description: '阿里云通义千问推出企业级定制化大模型服务，支持私有化部署，在金融、医疗等垂直领域表现优异。',
    author: '阿里云',
    date: '2025-03-18',
    image: 'https://img.alicdn.com/tfs/TB1Ly5oS3HqK1RjSZFPXXcwapXa-238-54.png',
    category: '大模型',
    link: 'https://tongyi.aliyun.com'
  },
  {
    id: '15',
    title: '商汤科技推出新一代计算机视觉平台',
    description: '商汤科技发布SenseCore 3.0平台，支持更精确的目标检测和场景理解，在智慧城市和工业制造领域大放异彩。',
    author: '商汤科技',
    date: '2025-03-17',
    image: 'https://www.sensetime.com/images/cn/logo.png',
    category: '计算机视觉',
    link: 'https://www.sensetime.com'
  },
  {
    id: '16',
    title: '腾讯混元大模型升级',
    description: '腾讯混元大模型在游戏、社交和内容创作等领域实现重要突破，支持更自然的多轮对话和创意内容生成。',
    author: '腾讯',
    date: '2025-03-16',
    image: 'https://www.tencent.com/img/index/tencent_logo.png',
    category: '大模型',
    link: 'https://hunyuan.tencent.com'
  },
  {
    id: '17',
    title: '智谱AI发布GLM-4超大规模模型',
    description: 'GLM-4在科学计算、代码生成等专业领域展现出色表现，支持更复杂的多模态任务处理。',
    author: '智谱AI',
    date: '2025-03-15',
    image: 'https://zhipuai.cn/images/logo.png',
    category: '大模型',
    link: 'https://zhipuai.cn'
  },
  {
    id: '18',
    title: '科大讯飞发布星火认知大模型3.0',
    description: '新版本在教育、医疗等垂直领域实现突破，支持更精准的行业知识理解和专业问题解答。',
    author: '科大讯飞',
    date: '2025-03-14',
    image: 'https://www.iflytek.com/images/logo.png',
    category: '大模型',
    link: 'https://xinghuo.xfyun.cn'
  },
  {
    id: '19',
    title: '华为发布昇腾AI计算集群',
    description: '新一代昇腾AI计算集群性能提升300%，支持更大规模的AI模型训练，能耗比领先业界。',
    author: '华为',
    date: '2025-03-13',
    image: 'https://www.huawei.com/-/media/corporate/images/home/logo/huawei_logo.png',
    category: '硬件',
    link: 'https://www.huawei.com/cn/mindspore'
  },
  {
    id: '20',
    title: '旷视科技推出先进视觉算法',
    description: '新一代计算机视觉算法在工业检测精度上提升50%，已在多个制造业龙头企业成功落地。',
    author: '旷视科技',
    date: '2025-03-12',
    image: 'https://www.megvii.com/images/logo.png',
    category: '计算机视觉',
    link: 'https://www.megvii.com'
  },
  {
    id: '21',
    title: '字节跳动火山引擎升级AI平台',
    description: '火山引擎推出一站式AI开发平台，提供从模型训练到部署的全流程支持，大幅降低企业AI应用门槛。',
    author: '字节跳动',
    date: '2025-03-11',
    image: 'https://www.volcengine.com/static/img/logo.svg',
    category: '开发平台',
    link: 'https://www.volcengine.com'
  },
  {
    id: '22',
    title: '奇安信发布AI安全防护平台',
    description: '针对AI模型安全推出全方位防护方案，有效防范数据污染、模型攻击等安全威胁。',
    author: '奇安信',
    date: '2025-03-10',
    image: 'https://www.qianxin.com/images/logo.png',
    category: 'AI安全',
    link: 'https://www.qianxin.com'
  },
  {
    id: '23',
    title: '浪潮发布新一代AI服务器',
    description: '新一代AI服务器采用自研芯片，计算性能提升200%，已获得多家大模型公司订单。',
    author: '浪潮',
    date: '2025-03-09',
    image: 'https://www.inspur.com/lcjtww/images/logo.png',
    category: '硬件',
    link: 'https://www.inspur.com'
  },
  {
    id: '24',
    title: '百度智能云推出AI开发平台',
    description: '提供一站式AI开发环境，支持模型训练、优化和部署，简化企业AI应用开发流程。',
    author: '百度智能云',
    date: '2025-03-08',
    image: 'https://img0.baidu.com/it/u=2137813120,1780872000&fm=253&fmt=auto&app=138&f=PNG',
    category: '开发平台',
    link: 'https://cloud.baidu.com'
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