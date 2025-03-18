import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { Newspaper, Briefcase, Lightbulb, BookOpen, Link, ChevronRight, GraduationCap, Code, Laptop, ImageOff } from 'lucide-react';

// 定义标签页类型
interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  category?: string;
}

// 定义卡片项类型
interface CardItem {
  id: string;
  title: string;
  description: string;
  author?: string;
  date?: string;
  image?: string;
  link?: string;
  category?: string; 
}

// 定义图片组件，支持错误处理和默认图片
const CardImage = ({ src, alt }: { src: string, alt: string }) => {
  const [imgError, setImgError] = useState(false);
  
  // 图片加载失败时的处理
  const handleError = () => {
    setImgError(true);
  };
  
  // 根据图片URL获取正确的路径
  const getImageUrl = (url: string) => {
    // 使用阿里云OSS CDN加速
    const cdnBase = 'https://static.xiaohucdn.com';
    
    // 从原始路径提取文件名
    const fileName = url.split('/').pop();
    return `${cdnBase}/blog/ai/${fileName}`;
  };
  
  if (imgError) {
    return (
      <div className="w-full h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
        <div className="flex flex-col items-center text-gray-400">
          <ImageOff size={24} />
          <span className="text-xs mt-2">{alt}</span>
        </div>
      </div>
    );
  }
  
  return (
    <img 
      src={getImageUrl(src)} 
      alt={alt} 
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      onError={handleError}
    />
  );
};

const AI = () => {
  // 标签页分类与列表
  const tabCategories = [
    {
      id: 'main',
      title: '',
      tabs: [
        { id: 'news', label: '前沿新闻', icon: <Newspaper size={18} /> },
      ]
    },
    {
      id: 'learn',
      title: '学习',
      tabs: [
        { id: 'learning', label: 'AI学习资料', icon: <BookOpen size={18} /> },
        { id: 'courses', label: '李宏毅课程', icon: <GraduationCap size={18} /> },
        { id: 'deeplearning', label: '深度学习', icon: <Code size={18} /> },
        { id: 'prompts', label: '提示词库', icon: <Lightbulb size={18} /> },
      ]
    },
    {
      id: 'resource',
      title: '资源',
      tabs: [
        { id: 'tools', label: 'AI工具箱', icon: <Briefcase size={18} /> },
        { id: 'links', label: '常用链接', icon: <Link size={18} /> },
      ]
    }
  ];

  // 当前选中的标签页
  const [activeTab, setActiveTab] = useState('news');
  
  // 前沿新闻数据
  const newsItems: CardItem[] = [
    {
      id: '1',
      title: 'Claude 3.5 Sonnet 发布',
      description: 'Claude 3.5 Sonnet 现已上线，在推理、编程和视觉理解方面有重大突破。这是Anthropic公司有史以来最强大的模型，表现超越了许多现有的AI模型。',
      author: 'Anthropic',
      date: '2024-03-18',
      image: '/images/ai/claude-sonnet.jpg',
      category: 'LLM',
      link: 'https://www.anthropic.com/claude'
    },
    {
      id: '2',
      title: 'Mistral AI 发布 Mistral Small 3.1',
      description: '多模态模型 多个关键指标上均优于 Gemma，这款开源模型特别擅长代码生成和多语言支持，为开发者提供了更多选择。',
      author: 'Mistral团队',
      date: '2024-03-17',
      image: '/images/ai/mistral.jpg',
      category: '开源模型',
      link: 'https://mistral.ai/'
    },
    {
      id: '3',
      title: 'Google DeepMind 推出 AlphaFold 3',
      description: '新一代蛋白质结构预测工具，可预测几乎所有分子的3D结构。这一突破将为药物研发和生物医学研究带来革命性变化。',
      author: 'DeepMind团队',
      date: '2024-03-15',
      image: '/images/ai/alphafold.jpg',
      category: '科学研究',
      link: 'https://deepmind.google/technologies/alphafold/'
    },
    {
      id: '4',
      title: 'NVIDIA发布新一代AI芯片H200',
      description: 'H200 GPU提供比上一代产品高出3倍的性能，专为大规模AI训练和推理优化，将加速各行业的AI应用部署。',
      author: 'NVIDIA',
      date: '2024-03-12',
      image: '/images/ai/nvidia-h200.jpg',
      category: '硬件',
      link: 'https://www.nvidia.com/'
    },
    {
      id: '5',
      title: 'OpenAI宣布GPT-5训练已完成',
      description: '下一代大型语言模型GPT-5训练完成，预计将在今年内发布。据悉，其推理能力和知识库都有显著提升。',
      author: 'OpenAI',
      date: '2024-03-10',
      image: '/images/ai/gpt5.jpg',
      category: 'LLM',
      link: 'https://openai.com/'
    },
    {
      id: '6',
      title: 'Meta推出多模态AI系统NIAM',
      description: 'Meta的新型多模态AI系统NIAM可以理解并生成文本、图像、音频和视频内容，代表了AI领域多模态融合的重要突破。',
      author: 'Meta AI',
      date: '2024-03-08',
      image: '/images/ai/meta-niam.jpg',
      category: '多模态AI',
      link: 'https://ai.meta.com/'
    }
  ];

  // AI工具箱数据
  const toolsItems: CardItem[] = [
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

  // 提示词库数据
  const promptsItems: CardItem[] = [
    {
      id: '1',
      title: '写作助手提示词',
      description: '改进你的写作风格，增强表达的清晰度和影响力。包含多种文体和场景的专业写作提示。',
      category: '写作提示',
      link: '/blog/writing-prompts'
    },
    {
      id: '2',
      title: '编程指导提示词',
      description: '获取更精确的代码建议和问题解决方案。针对不同编程语言和开发任务的优化提示词。',
      category: '编程提示',
      link: '/blog/coding-prompts'
    },
    {
      id: '3',
      title: '创意生成提示词',
      description: '激发创意思维，生成创新概念和想法。适用于艺术创作、营销策划和产品设计。',
      category: '创意提示',
      link: '/blog/creative-prompts'
    },
    {
      id: '4',
      title: '图像生成提示词',
      description: '优化AI图像生成效果的提示词技巧，包括构图、风格、光影等元素的指导语。',
      category: '视觉提示',
      link: '/blog/image-prompts'
    },
    {
      id: '5',
      title: '教育辅导提示词',
      description: '帮助学习和教学的提示词模板，包括概念解释、问题分解和知识整合。',
      category: '教育提示',
      link: '/blog/education-prompts'
    }
  ];

  // 李宏毅课程数据
  const coursesItems: CardItem[] = [
    {
      id: '1',
      title: '机器学习 2024',
      description: '李宏毅教授最新的机器学习入门课程，包含深度学习基础、CNN、RNN等核心内容。',
      author: '李宏毅',
      date: '2024',
      image: '/images/ai/lhy-ml-2024.jpg',
      category: '入门课程',
      link: 'https://speech.ee.ntu.edu.tw/~hylee/ml/2024-spring.php'
    },
    {
      id: '2',
      title: '生成式AI 2025',
      description: '专注于生成式AI的全面课程，涵盖GAN、Diffusion Models、大型语言模型等主题。',
      author: '李宏毅',
      date: '2023',
      image: '/images/ai/lhy-generative-2023.jpg',
      category: '进阶课程',
      link: 'https://speech.ee.ntu.edu.tw/~hylee/ml/2025-spring.php'
    },
    {
      id: '3',
      title: '深度强化学习 2022',
      description: '探索深度强化学习的理论与实践，包括Q-Learning、Policy Gradient和最新研究进展。',
      author: '李宏毅',
      date: '2022',
      image: '/images/ai/lhy-rl-2022.jpg',
      category: '专项课程',
      link: 'https://speech.ee.ntu.edu.tw/~hylee/ml/2022-spring.php'
    },
    {
      id: '4',
      title: '自监督学习 2021',
      description: '介绍自监督学习的原理和应用，展示如何利用未标记数据提升模型性能。',
      author: '李宏毅',
      date: '2021',
      image: '/images/ai/lhy-self-supervised-2021.jpg',
      category: '专项课程',
      link: 'https://speech.ee.ntu.edu.tw/~hylee/ml/2021-spring.php'
    }
  ];

  // 深度学习数据
  const deeplearningItems: CardItem[] = [
    {
      id: '1',
      title: 'Deep Learning Specialization',
      description: 'Andrew Ng的深度学习专项课程，涵盖神经网络基础、CNN、RNN和机器学习项目结构化等内容。',
      author: 'Andrew Ng',
      image: '/images/ai/dl-specialization.jpg',
      category: 'Coursera',
      link: 'https://www.coursera.org/specializations/deep-learning'
    },
    {
      id: '2',
      title: 'PyTorch官方教程',
      description: 'PyTorch官方提供的教程，从基础到高级应用的全面指南，包含实例代码和练习。',
      author: 'PyTorch Team',
      image: '/images/ai/pytorch.jpg',
      category: '框架教程',
      link: 'https://pytorch.org/tutorials/'
    },
    {
      id: '3',
      title: 'DeepLearning.AI',
      description: '由Andrew Ng创建的AI教育平台，提供多种深度学习课程和项目实践机会。',
      author: 'DeepLearning.AI',
      image: '/images/ai/deeplearning-ai.jpg',
      category: '在线平台',
      link: 'https://www.deeplearning.ai/'
    },
    {
      id: '4',
      title: 'Fast.ai课程',
      description: '强调实践优先的深度学习课程，适合快速掌握深度学习应用技能。',
      author: 'Jeremy Howard & Rachel Thomas',
      image: '/images/ai/fast-ai.jpg',
      category: '在线课程',
      link: 'https://www.fast.ai/'
    },
    {
      id: '5',
      title: 'TensorFlow官方教程',
      description: 'Google提供的TensorFlow学习资源，包括基础教程、高级模型构建和部署指南。',
      author: 'Google Brain Team',
      image: '/images/ai/tensorflow.jpg',
      category: '框架教程',
      link: 'https://www.tensorflow.org/tutorials'
    },
    {
      id: '6',
      title: 'd2l.ai - 动手学深度学习',
      description: '交互式深度学习教材，结合理论讲解和代码实践，支持多种深度学习框架。',
      author: 'Aston Zhang, Zachary C. Lipton等',
      image: '/images/ai/d2l.jpg',
      category: '在线教材',
      link: 'https://d2l.ai/'
    }
  ];

  // 学习资料数据
  const learningItems: CardItem[] = [
    {
      id: '1',
      title: '生成式AI导论',
      description: '全面介绍生成式AI的基本概念、技术原理及应用场景，适合AI初学者和技术爱好者。',
      author: '技术团队',
      link: '/blog/generative-ai-intro',
      image: '/images/ai/generative-ai.jpg'
    },
    {
      id: '2',
      title: '深度学习基础',
      description: '深度学习的核心概念与原理，包括神经网络架构、反向传播算法和常见优化技术。',
      author: '研究小组',
      link: '/blog/deep-learning-basics',
      image: '/images/ai/deep-learning.jpg'
    },
    {
      id: '3',
      title: 'Prompt Engineering指南',
      description: '如何设计有效的提示词以获得更好的AI生成结果，包含多种场景的实用技巧。',
      author: '提示工程师',
      link: '/blog/prompt-engineering',
      image: '/images/ai/prompt-engineering.jpg'
    },
    {
      id: '4',
      title: 'AI伦理与安全',
      description: '探讨AI发展中的伦理问题和安全挑战，以及如何构建负责任的AI系统。',
      author: '伦理研究员',
      link: '/blog/ai-ethics',
      image: '/images/ai/ai-ethics.jpg'
    },
    {
      id: '5',
      title: '计算机视觉入门',
      description: '介绍计算机视觉的基本原理和常用算法，以及在实际应用中的案例分析。',
      author: '视觉专家',
      link: '/blog/computer-vision',
      image: '/images/ai/computer-vision.jpg'
    }
  ];

  // 链接数据
  const linksItems: CardItem[] = [
    {
      id: '1',
      title: 'arXiv',
      description: '最新AI研究论文预印本平台，是了解前沿研究动态的首选资源。',
      link: 'https://arxiv.org/list/cs.AI/recent',
      category: '学术资源'
    },
    {
      id: '2',
      title: 'Hugging Face',
      description: '开源AI社区和模型库，提供大量预训练模型和数据集。',
      link: 'https://huggingface.co',
      category: '开源平台'
    },
    {
      id: '3',
      title: 'Papers With Code',
      description: '附带源代码实现的最新研究论文，帮助快速理解和应用研究成果。',
      link: 'https://paperswithcode.com',
      category: '学术资源'
    },
    {
      id: '4',
      title: 'Kaggle',
      description: '数据科学和机器学习竞赛平台，提供大量数据集和学习资源。',
      link: 'https://www.kaggle.com',
      category: '实践平台'
    },
    {
      id: '5',
      title: 'AI研究趋势',
      description: '追踪AI领域最热门的研究方向和突破性进展。',
      link: 'https://www.catalyzex.com',
      category: '趋势分析'
    },
    {
      id: '6',
      title: 'Google AI',
      description: 'Google的AI研究和产品信息，包括最新的技术公告和开源项目。',
      link: 'https://ai.google',
      category: '研究机构'
    },
    {
      id: '7',
      title: 'OpenAI Blog',
      description: 'OpenAI的官方博客，发布最新研究成果和产品更新。',
      link: 'https://openai.com/blog',
      category: '研究机构'
    },
    {
      id: '8',
      title: 'DeepMind',
      description: 'Google DeepMind的官方网站，分享前沿AI研究和应用案例。',
      link: 'https://deepmind.google',
      category: '研究机构'
    }
  ];

  // 根据当前标签页返回对应的数据
  const getTabContent = () => {
    switch(activeTab) {
      case 'news':
        return newsItems;
      case 'tools':
        return toolsItems;
      case 'prompts':
        return promptsItems;
      case 'learning':
        return learningItems;
      case 'courses':
        return coursesItems;
      case 'deeplearning':
        return deeplearningItems;
      case 'links':
        return linksItems;
      default:
        return [];
    }
  };

  // 渲染卡片
  const renderCard = (item: CardItem) => {
    return (
      <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {item.image && (
          <div className="w-full h-40 overflow-hidden">
            <CardImage src={item.image} alt={item.title} />
          </div>
        )}
        <div className="p-5">
          {item.category && (
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground rounded-full mb-2">
              {item.category}
            </span>
          )}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{item.description}</p>
          
          <div className="flex items-center justify-between">
            {item.author && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.author}
              </span>
            )}
            {item.date && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {item.date}
              </span>
            )}
          </div>
          
          {item.link && (
            <a 
              href={item.link} 
              className="mt-3 inline-flex items-center text-primary hover:text-primary-dark"
              target="_blank" 
              rel="noopener noreferrer"
            >
              了解更多 <ChevronRight size={16} className="ml-1" />
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <SEO title="AI资源中心" description="AI前沿新闻、工具、提示词库、学习资料和相关链接" />
      
      {/* 侧边栏 */}
      <div className="w-60 min-h-screen bg-white dark:bg-gray-800 shadow-md flex-shrink-0 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI资源中心</h2>
        </div>
        
        <div className="py-4">
          {tabCategories.map((category) => (
            <div key={category.id} className="mb-4">
              {category.title && (
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {category.title}
                </div>
              )}
              <div>
                {category.tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center w-full px-4 py-2 text-sm ${
                      activeTab === tab.id 
                        ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground font-medium' 
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 内容区域 */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* 当前页面标题 */}
        <div className="mb-8">
          {tabCategories.map(category => 
            category.tabs.find(tab => tab.id === activeTab)
          ).filter(Boolean).map(tab => (
            <div key={tab?.id} className="flex items-center">
              <span className="mr-2 p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">{tab?.icon}</span>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {tab?.label}
              </h1>
            </div>
          ))}
        </div>
        
        {/* 卡片内容 */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {getTabContent().map(renderCard)}
        </motion.div>
      </div>
    </div>
  );
};

export default AI; 