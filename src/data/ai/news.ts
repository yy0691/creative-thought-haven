import axios from 'axios';
import { CardItem } from './types';
import { vercelAiSdkContent } from './news-content/vercel-ai-sdk';
import { deepSeekV3Content } from './news-content/deepseek-v3';
import { gpt5Content } from './news-content/gpt5';
import { deepmindContent } from './news-content/deepmind';
import { claudeThinkContent } from './news-content/claude-think';
import { qwen25omin } from './news-content/qwen-2.5omni';
import { GPT4oImg } from './news-content/GPT-4o-img';
import { CloudflareAutoRAGContent } from './update0410/Cloudflare-AutoRAG';
import { ElevenLabsContent } from './update0410/ElevenLabs';
import { FirebaseContent } from './update0410/Firebase';
import { GeospatialFoundationModelsContent } from './update0410/Geospatial Foundation Models';
import { GoogleAgentContent } from './update0410/Google-Agent';
import { OmiTalkerContent } from './update0410/OmiTalker';
// 默认新闻数据
export const defaultNewsItems: CardItem[] = [
  {
    id:'0410-new-1',
    title:'Cloudflare推出全托管的RAG系统AutoRAG',
    description:'Cloudflare推出了一个全托管的RAG系统:AutoRAG自动连接你的各种数据源',
    author:'Cloudflare',
    date:'2025-04-09',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l5_2b2de908-cd53-4e09-8944-963b1573f0bg.jpg',
    link:'https://blog.cloudflare.com/introducing-autorag-on-cloudflare/',
    category:'RAG',
    content:CloudflareAutoRAGContent
  },
  {
    id:'0410-new-2',
    title:'ElevenLabs推出MCP服务器可以让Al轻松使用ElevenLabs的语音技术如TTS、克隆声音、甚至打电话',
    description:'ElevenLabs推出了一个MCP服务器，可以让AI轻松使用ElevenLabs的语音技术如TTS、克隆声音、甚至打电话。',
    author:'ElevenLabs',
    date:'2025-04-08',  
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l5_06e9dc3d-843c-41c2-ad0b-7e29adbaa01g.jpg',
    link:'https://github.com/lharries/whatsapp-mcp',
    category:'MCP',
    content:ElevenLabsContent
  },
  {
    id:'0410-new-3',
    title:'Google发布基于浏览器的全栈Al应用开发环境Firebase',
    description:'Google发布了基于浏览器的全栈Al应用开发环境Firebase，可以让开发者轻松使用Firebase的AI技术如TTS、克隆声音、甚至打电话。',
    author:'TTS',
    date:'2025-04-10',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_1635c59b-2462-449c-9eba-77cb53a2d56g.jpg',
    link:'https://firebase.blog/posts/2025/04/cloud-next-announcements',
    category:'Firebase',
    content:FirebaseContent
  },
  {
    id:'0410-new-4',
    title:'Google发布基于多模态大模型和AI Agent的"地球Al大脑"系统',
    description:'Google发布了基于多模态大模型和AI Agent的"地球Al大脑"系统，可以让AI轻松使用Firebase的AI技术如TTS、克隆声音、甚至打电话。',
    author:'Agent',
    date:'2025-04-10',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_3adcde7c-4ede-4db9-b0bb-4cee7ddcb92g.jpg',
    link:'https://research.google/blog/geospatial-reasoning-unlocking-insights-with-generative-ai-and-multiple-foundation-models/',
    category:'Geospatial Foundation Models',
    content:GeospatialFoundationModelsContent
  },
  {
    id:'0410-new-5',
    title:'Google推出Agent2Agent协议(A2A)可让多个Agent跨平台互通并协作完成任务组成一个智能协同体',
    description:'Google推出了Agent2Agent协议(A2A)可让多个Agent跨平台互通并协作完成任务组成一个智能协同体。',
    author:'Google',
    date:'2025-04-10',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_5c80e6ec-4e0f-4ae1-a967-dcdf66acd69g.jpg',
    link:'https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/',
    category:'Agent',
    content:GoogleAgentContent
  },
  {
    id:'0410-new-6',
    title:'新的语音模型支持实时视觉对话',
    description:'Kyutai 发布了 MoshiVis，这是一种开放式视觉语音模型，允许用户对图像进行自然的语音对话，同时保持低延迟。',
    author:'Kyutai',
    date:'2025-04-10',
    image:'https://humanaigc.github.io/omnitalker/content/images/motivation-two-columns-V4.png',
    link:'https://humanaigc.github.io/omnitalker/',
    category:'MCP',
    content:OmiTalkerContent
  },
  {
    id:'new-3',
    title:'阿里云发布Qwen2.5Omni',
    description:'Qwen2.5-Omni是通义千问（Qwen）团队发布的最新旗舰多模态大模型，是一款端到端全模态感知与响应模型，是一个可以看、听、说、写、理解一切的 AI 模型。',
    author:'通义千问',
    date:'2025-03-27',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02kp_ef7f8a2c-b785-4043-8cdb-25e4c52a443g.png',
    link:'https://chat.qwenlm.ai/',
    category:'LLM',
    content: qwen25omin
  },
  {
    id: 'new-1',
    title: 'Vercel发布AISDK4.2版本引入一系列重大更新支持推理模型、MCP、图像生成等',
    description: ' 加入了多模态（图像+文本）、支持开放模型上下文协议（MCP）、推理能力、搜索来源展示、Svelte 5 支持等众多新特性。',
    author: 'Anthropic',
    date: '2025-03-19',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02km_9f052d63-3541-488c-a56b-bed376ee7d5g.jpg',
    link: 'https://vercel.com/blog/ai-sdk-4-2',
    category: 'LLM',
    content: vercelAiSdkContent
  },
  {
    id: 'new-2',
    title: 'Claude发布新功能"think"工具',
    description: '"think"工具可以让AI在复杂任务解决过程中拥有专门的思考空间。',
    author: 'Anthropic',
    date: '2025-03-19',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/image-20250326230344704.png',
    link: 'https://www.anthropic.com/engineering/claude-think-tool',
    category: 'LLM',
    content: claudeThinkContent
  },
  // 自动更新的新闻将插入到这里
  {
    id: '1',
    title: 'DeepSeek-V3 正式发布',
    description: 'DeepSeek 的新 V3 在 aider 的多语言基准测试中得分为 55%，比上一版本有显著提升。它是排名第二的非思考/推理模型，仅次于 Sonnet 3.7。V3 与 R1 和 o3-mini 等思考模型相比具有竞争力。',
    author: 'Anthropic',
    date: '2025-03-19',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02kn_f68891a8-627b-49fd-a86f-21ee8ecc0dbg.jpg',
    category: 'LLM',
    link: 'https://api-docs.deepseek.com/zh-cn/news/news1226',
    content: deepSeekV3Content
  },
  
  {
    id: '3',
    title: 'Google DeepMind发布量子计算突破性研究',
    description: '使用新型量子算法，在室温下实现了稳定的量子比特操作，为大规模量子计算机的实现铺平道路。',
    author: 'DeepMind',
    date: '2025-03-17',
    image: 'https://storage.googleapis.com/deepmind-live-cms/images/social_share_image.width-1100.png',
    category: '科研突破',
    link: 'https://deepmind.google/',
    content: deepmindContent
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
/*
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
*/

// 从Coze智能体API获取最新新闻
export const fetchLatestNews = async (): Promise<CardItem[]> => {
  // 返回默认新闻数据，不再调用Coze API
  const sortedNews = [...defaultNewsItems].sort((a, b) => {
    // 将日期字符串转换为Date对象进行比较
    const dateA = new Date(a.date.replace(/-/g, '/'));
    const dateB = new Date(b.date.replace(/-/g, '/'));
    // 降序排序（从新到旧）
    return dateB.getTime() - dateA.getTime();
  });
  
  return sortedNews;
  
  /*
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
  */
}; 