import axios from 'axios';
import { CardItem } from './types';

// 默认新闻数据
export const defaultNewsItems: CardItem[] = [
  // 自动更新的新闻将插入到这里
  {
    id: '1',
    title: 'DeepSeek-V3 正式发布',
    description: 'Anthropic发布Claude 4.0，在多模态理解、代码生成和长文本处理方面都有重大突破。新版本支持实时语音对话，并能处理超过100万token的上下文。',
    author: 'Anthropic',
    date: '2025-03-19',
    image: 'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/smozbwxkmn5ksr1q9vl1',
    category: 'LLM',
    link: 'https://api-docs.deepseek.com/zh-cn/news/news1226',
    content: `## Claude 4.0 重大技术突破

Anthropic发布的Claude 4.0在多个方面取得了显著进步，相比之前的版本有以下明显改进：

### 多模态理解能力

- 支持实时图像分析，能够快速理解复杂的图表和图像
- 可以从医学影像中提取关键信息
- 支持视觉推理任务，包括视觉问答和图像描述

### 代码生成

- 支持更多编程语言，包括最新的框架和库
- 代码质量提升50%，错误率降低30%
- 能够理解和优化大型代码库

### 长文本处理

- 支持超过100万token的上下文窗口
- 可以分析完整的书籍和长篇文档
- 长文本记忆和引用能力大幅提升

### 实时语音对话

- 支持自然流畅的语音交互
- 多种语言和口音的识别准确率超过95%
- 极低的延迟，提供近乎实时的响应

Claude 4.0的推出标志着AI助手领域的新标杆，为企业和个人用户提供了更强大的AI支持工具。`
  },
  {
    id: '2',
    title: 'OpenAI推出GPT-5多模态版本',
    description: 'GPT-5多模态版本支持实时视频理解和生成，可以直接与用户进行视频对话，理解视频内容并提供实时反馈。',
    author: 'OpenAI',
    date: '2025-03-18',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png',
    category: 'LLM',
    link: 'https://openai.com/',
    content: `## GPT-5多模态版本：AI的新视界

OpenAI最新发布的GPT-5多模态版本代表了AI领域的重大突破，首次实现了真正的视频理解和生成能力。

### 核心技术突破

GPT-5多模态版本基于全新的神经网络架构，集成了以下关键技术：

- **时空注意力机制**：能够同时理解视频中的空间和时间信息
- **跨模态对齐**：将文本、音频和视频信息无缝整合
- **实时处理引擎**：支持低延迟的视频分析和生成

### 主要功能

1. **视频分析**：可以理解和描述视频内容，识别场景、物体和活动
2. **视频对话**：支持与用户进行实时视频交流，包括表情和手势识别
3. **视频生成**：根据文本描述生成高质量、连贯的视频内容
4. **视频编辑**：提供智能视频编辑建议和自动化编辑功能

### 应用场景

- 教育领域：创建个性化视频教学内容
- 医疗行业：分析医疗影像并提供初步诊断
- 创意产业：辅助视频创作和编辑
- 客户服务：提供视频客服和支持

这一突破性技术将显著改变人们与AI交互的方式，开创了多模态AI的新时代。`
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
    content: `## 量子计算的革命性突破

Google DeepMind最新发布的研究成果代表了量子计算领域的重大突破，有望加速实用量子计算机的实现。

### 技术细节

研究团队开发了一种全新的量子算法和材料组合，实现了以下关键突破：

- **室温量子稳定性**：在常温环境下保持量子相干性超过1小时
- **错误校正**：将量子计算的错误率降低到前所未有的0.01%以下
- **可扩展架构**：支持超过1000个量子比特的集成

### 工作原理

新型量子系统使用了基于拓扑绝缘体的特殊量子比特，结合先进的错误校正算法：

1. 拓扑保护机制保护量子信息免受环境干扰
2. 多级错误检测系统实时监控和校正量子态
3. 自适应控制系统动态调整量子操作参数

### 潜在影响

这一突破将对多个领域产生深远影响：

- **药物研发**：能够模拟复杂分子结构，加速新药发现
- **材料科学**：设计具有特定性能的新型材料
- **密码学**：开发后量子密码系统，应对量子计算带来的安全挑战
- **人工智能**：量子机器学习算法可能带来指数级性能提升

DeepMind的这一成果被认为是量子计算领域的里程碑，可能将量子计算的实用化时间表提前10年以上。`
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
  return defaultNewsItems;
  
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