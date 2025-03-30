import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import * as LucideIcons from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { aiMenuEventBus } from '../components/Navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MDXComponents from '../components/MDXComponents';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCube } from "react-icons/fa";

// 导入博客相关函数
import { getBlogPosts } from '../lib/blog';

// 导入类型和数据
import { CardItem } from '../data/ai';
import { toolsItems } from '../data/ai/tools';
import { defaultNewsItems, fetchLatestNews } from '../data/ai';
import { learningItems } from '../data/ai/learning';
import { coursesItems } from '../data/ai/courses';
import { deeplearningItems } from '../data/ai/deeplearning';
import { promptsItems } from '../data/ai/prompts';
import { linksItems } from '../data/ai/links';
import { tutorialsItems } from '../data/ai/tutorials';
// 导入SVG组件
import { TutorialSvg, DeepLearningSvg, PaintingSvg, PromptSvg, ToolSvg, VoiceSvg, VideoSvg, DefaultSvg } from '../components/AISvgIcons';
// 图片组件
export const CardImage = ({ src, alt, style }: { src: string, alt: string, style?: React.CSSProperties }) => {
  const [imgError, setImgError] = useState(false);
  
  // 为不同类别的卡片生成主题SVG图案
  const renderPlaceholderSvg = () => {
    // 从alt或标题中提取可能的主题关键词
    const topic = alt.toLowerCase();
    
    // 根据主题选择不同的SVG图案
    if (topic.includes('教程') || topic.includes('学习') || topic.includes('指南') || topic.includes('课程')) {
      // 教程/学习主题
      return TutorialSvg();
    } else if (topic.includes('深度学习') || topic.includes('神经网络') || topic.includes('模型') || topic.includes('机器学习')) {
      // 深度学习/神经网络主题
      return DeepLearningSvg();
    } else if (topic.includes('绘画') || topic.includes('图像') || topic.includes('设计') || topic.includes('midjourney') || topic.includes('stable diffusion')) {
      // 绘画/图像生成主题
      return PaintingSvg();
    } else if (topic.includes('提示词') || topic.includes('prompt') || topic.includes('工程') || topic.includes('对话') || topic.includes('大模型')) {
      // 提示词工程主题
      return PromptSvg();
    } else if (topic.includes('工具') || topic.includes('应用') || topic.includes('软件') || topic.includes('chatgpt') || topic.includes('工具箱')) {
      // AI工具主题
      return ToolSvg();
    } else if (topic.includes('语音') || topic.includes('声音') || topic.includes('音频') || topic.includes('朗读')) {
      // 语音/音频主题
      return VoiceSvg();
    } else if (topic.includes('视频') || topic.includes('影片') || topic.includes('电影') || topic.includes('动画')) {
      // 视频主题
      return VideoSvg();
    } else {
      // 默认AI主题
      return DefaultSvg();
    }
  };
  // 确保src有值
  if (!src) {
    console.warn('图片源地址为空');
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 overflow-hidden">
        {renderPlaceholderSvg()}
      </div>
    );
  }
  
  // 处理图片URL
  let imageUrl = src;
  
  // 对于远程URL，使用代理
  if (src.startsWith('http')) {
    // 在生产环境使用代理
    const isProduction = import.meta.env.PROD;
    if (isProduction) {
      const encodedUrl = encodeURIComponent(src);
      imageUrl = `/api/image-proxy?url=${encodedUrl}`;
    } else {
      // 开发环境直接使用原始URL
      imageUrl = src;
    }
  } else if (src.startsWith('/')) {
    // 如果是相对路径，不做修改
    imageUrl = src;
  } else {
    // 如果不是相对路径，假设是本地图片
    imageUrl = `/images/ai/${src}`;
  }
  
  const handleError = () => {
    console.error('图片加载失败:', imageUrl);
    setImgError(true);
  };
  
  if (imgError) {
    // 显示主题SVG占位图
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 overflow-hidden">
        {renderPlaceholderSvg()}
      </div>
    );
  }
  
  return (
    <img 
      src={imageUrl}
      alt={alt} 
      className="w-full h-full object-cover"
      onError={handleError}
      loading="lazy"
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
  );
};

            
  
  

// 图标组件
const TabIcon = ({ iconName }: { iconName: string }) => {
  const IconComponent = (LucideIcons as any)[iconName];
  if (!IconComponent) {
    console.warn(`Icon ${iconName} not found`);
    return null;
  }
  return <IconComponent size={18} />;
};

// 本地标签页定义
const localTabCategories = [
  {
    id: 'main',
    title: '',
    tabs: [
      { id: 'news', label: 'AI前沿新闻', icon: 'Newspaper' },
    ]
  },
  {
    id: 'learn',
    title: '学习资料',
    tabs: [
      // { id: 'learning', label: 'AI学习资料', icon: 'BookOpen' },
      { id: 'courses', label: '李宏毅老师课程', icon: 'GraduationCap' },
      { id: 'deeplearning', label: '深度学习', icon: 'Code' },
      { id: 'prompts', label: '提示词工程', icon: 'Lightbulb' },
      { id: 'tutorials', label: '教程', icon: 'BookOpen' },
    ]
  },
  {
    id: 'tools',
    title: 'AI工具箱',
    tabs: [
      { id: 'general', label: '通用类AI', icon: 'Bot' },
      { id: 'painting', label: 'AI绘画', icon: 'Palette' },
      { id: 'writing', label: 'AI写作', icon: 'PenTool' },
      { id: 'voice', label: 'AI语音', icon: 'Mic' },
      { id: 'video', label: 'AI视频', icon: 'Video' },
      { id: 'modeling', label: 'AI建模', icon: 'Box' },
      { id: 'security', label: 'AI安全', icon: 'Shield' },
      { id: 'other', label: '其他', icon: 'MoreHorizontal' },
    ]
  },
  {
    id: 'resource',
    title: '链接汇总',
    tabs: [
      //{ id: 'tools', label: 'AI工具箱', icon: 'Briefcase' },
      { id: 'links', label: '常用链接', icon: 'Link' },
    ]
  }
];

// 主组件
const AI = () => {
  // 当前选中的标签页
  const [activeTab, setActiveTab] = useState('news');
  
  // 新闻数据状态
  const [newsData, setNewsData] = useState<CardItem[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);
  
  // 菜单状态
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 侧边详情面板状态
  const [selectedItem, setSelectedItem] = useState<CardItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 添加博客文章状态
  const [blogPosts, setBlogPosts] = useState<CardItem[]>([]);
  const [isLoadingBlogPosts, setIsLoadingBlogPosts] = useState(false);

  // 初始化数据
  useEffect(() => {
    setNewsData(defaultNewsItems);
    handleRefreshNews();
    loadBlogPosts(); // 加载博客文章
    console.log('本地标签页:', localTabCategories);
    
    const refreshInterval = setInterval(() => {
      if (activeTab === 'news') {
        handleRefreshNews();
      }
    }, 3600000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  // 加载博客中的AI相关文章
  const loadBlogPosts = async () => {
    try {
      setIsLoadingBlogPosts(true);
      const allPosts = await getBlogPosts();
      
      console.log('加载博客文章数量:', allPosts.length);
      
      // 筛选AI相关文章
      const aiRelatedPosts = allPosts.filter(post => {
        // 检查类别
        const categoryMatch = post.category && 
          ['AI', '人工智能', '机器学习', 'ML', '深度学习', 'LLM'].some(term => 
            post.category.toLowerCase().includes(term.toLowerCase())
          );
        
        // 检查标签
        const tagMatch = post.tags && post.tags.some(tag => 
          ['AI', '人工智能', '机器学习', 'ML', '深度学习', 'LLM', 'GPT', 'ChatGPT', 'Stable Diffusion', 'Midjourney'].some(term => 
            tag.toLowerCase().includes(term.toLowerCase())
          )
        );
        
        return categoryMatch || tagMatch;
      });
      
      console.log('筛选出AI相关博客文章数量:', aiRelatedPosts.length);
      
      // 将博客文章转换为CardItem格式
      const blogPostCards = aiRelatedPosts.map(post => {
        // 确保slug正确编码处理
        const rawSlug = post.slug.replace(/^\//, ''); // 移除开头的斜杠
        const encodedSlug = encodeURIComponent(rawSlug);
        
        console.log(`处理博客文章: ${post.title}, 原始slug: ${post.slug}, 编码后: ${encodedSlug}`);
        
        return {
          id: post.slug,
          title: post.title,
          description: post.description || post.excerpt || '',
          category: post.category || '人工智能',
          date: post.date,
          image: post.coverImage || '/images/ai/blog-post.jpg',
          link: `/blog/${encodedSlug}`,
          author: post.author?.name || '泺源',
          isFromBlog: true, // 标记为来自博客
        };
      });
      
      console.log('最终博客卡片数量:', blogPostCards.length);
      if (blogPostCards.length > 0) {
        console.log('示例卡片链接:', blogPostCards[0].link);
      }
      
      setBlogPosts(blogPostCards);
    } catch (error) {
      console.error('加载博客文章失败:', error);
    } finally {
      setIsLoadingBlogPosts(false);
    }
  };

  // 刷新新闻
  const handleRefreshNews = async () => {
    if (activeTab === 'news') {
      setIsLoadingNews(true);
      setNewsError(null);
      
      try {
        const newsFromApi = await fetchLatestNews();
        
        if (newsFromApi.length > 0) {
          const combinedNews = [...newsFromApi, ...defaultNewsItems];
          const sortedNews = combinedNews.sort((a, b) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateB - dateA;
          });
          
          const uniqueNews = sortedNews.filter((item, index, self) => 
            index === self.findIndex(t => t.title === item.title)
          );
          
          setNewsData(uniqueNews);
        } else {
          setNewsData(defaultNewsItems);
          //setNewsError('获取新闻失败，显示默认新闻');
        }
      } catch (error) {
        //console.error('获取新闻数据失败:', error);
        setNewsData(defaultNewsItems);
        //setNewsError('获取最新新闻失败，显示默认新闻');
      } finally {
        setIsLoadingNews(false);
      }
    }
  };

  // 获取当前标签页内容
  const getTabContent = () => {
    try {
      switch(activeTab) {
        case 'news': return newsData || [];
        case 'tools': return toolsItems || [];
        case 'prompts': return promptsItems || [];
        case 'learning': return learningItems || [];
        case 'courses': return coursesItems || [];
        case 'deeplearning': return deeplearningItems || [];
        case 'links': return linksItems || [];
        case 'tutorials': {
          // 合并教程和博客文章
          const combinedTutorials = [...tutorialsItems, ...blogPosts];
          return combinedTutorials;
        }
        case 'general': return (toolsItems || []).filter(item => item.category === '通用类AI');
        case 'painting': return (toolsItems || []).filter(item => item.category === 'AI绘画');
        case 'writing': return (toolsItems || []).filter(item => item.category === 'AI写作');
        case 'voice': return (toolsItems || []).filter(item => item.category === 'AI语音');
        case 'video': return (toolsItems || []).filter(item => item.category === 'AI视频');
        case 'modeling': return (toolsItems || []).filter(item => item.category === 'AI建模');
        case 'security': return (toolsItems || []).filter(item => item.category === 'AI安全');
        case 'other': return (toolsItems || []).filter(item => item.category === '其他');
        default: return [];
      }
    } catch (error) {
      console.error('获取标签页内容失败:', error);
      return [];
    }
  };

  // 标签页描述
  const getTabDescription = (tabId?: string): string => {
    switch(tabId) {
      case 'news': return '实时更新的AI领域最新动态和重要新闻';
      case 'learning': return 'AI学习路线图和精选学习资源';
      case 'courses': return '李宏毅教授的机器学习、深度学习等系列课程';
      case 'deeplearning': return '深度学习理论与实践的精选资源';
      case 'prompts': return '提示词工程最佳实践和模板库';
      case 'tools': return '精选实用的AI工具和应用';
      case 'links': return '收集整理的AI领域常用网站和资源链接';
      case 'general': return '通用型AI工具和应用，包括聊天机器人、智能助手等';
      case 'painting': return 'AI绘画和图像生成工具，支持各种艺术风格和创作需求';
      case 'writing': return 'AI写作和文本生成工具，提供创意写作和内容创作支持';
      case 'voice': return 'AI语音合成和识别工具，支持多语言和多场景应用';
      case 'video': return 'AI视频处理和生成工具，包括视频编辑、特效制作等';
      case 'modeling': return 'AI建模工具，包括3D建模、3D渲染等';
      case 'security': return 'AI安全工具，保护数据和模型安全';
      case 'other': return '其他创新AI工具和应用';
      default: return '';
    }
  };

  // 处理卡片点击
  const handleCardClick = (item: CardItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
    // 阻止背景内容滚动
    document.body.style.overflow = 'hidden';
  };

  // 关闭详情面板
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    // 恢复背景内容滚动
    document.body.style.overflow = '';
  };

  // 渲染详情面板内容
  const renderDetailContent = () => {
    if (!selectedItem) return null;

    // 检查是否为博客文章
    if (selectedItem.isFromBlog) {
      console.log('渲染博客文章详情:', selectedItem.title, '链接:', selectedItem.link);
      
      return (
        <div className="flex-1 overflow-y-auto">
          {/* 图片 */}
          {selectedItem.image && (
            <div className="w-full h-32 md:h-40 overflow-hidden">
              <CardImage src={selectedItem.image} alt={selectedItem.title} />
            </div>
          )}
          
          {/* 文章标题信息 */}
          <div className="bg-white/95 dark:bg-gray-800/95 shadow-sm">
            <div className="p-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {selectedItem.category && (
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground rounded-full">
                    {selectedItem.category}
                  </span>
                )}
                {selectedItem.date && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <LucideIcons.Calendar size={14} className="mr-1" />
                    {selectedItem.date}
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">{selectedItem.title}</h1>
              {selectedItem.author && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <LucideIcons.User size={16} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-sm">{selectedItem.author}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* 文章内容 - 博客文章显示摘要和链接 */}
          <div className="p-6 pt-8 md:p-8">
            <div className="prose prose-blue dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 text-lg">{selectedItem.description}</p>
              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <Link 
                  to={selectedItem.link}
                  className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300 flex items-center"
                  onClick={() => {
                    console.log('点击博客文章链接:', selectedItem.link);
                    handleCloseDetail();
                  }}
                >
                  阅读全文 <LucideIcons.ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 生成详细的Markdown内容
    const markdownContent = `
${selectedItem.content || selectedItem.description}

${selectedItem.link ? `\n\n[查看原文](${selectedItem.link})` : ''}
`;

    // 对于tools类型的卡片，如果有链接到详情页，可以加上查看详情页链接
    const isToolItem = activeTab === 'tools' || activeTab.match(/^(general|painting|writing|voice|video|modeling|security|other)$/);
    const toolDetailLink = isToolItem ? `/ai/tools/${selectedItem.id}` : null;

    return (
      <div className="flex-1 overflow-y-auto">
        {/* 图片 */}
        {selectedItem.image && (
          <div className="w-full h-32 md:h-40 overflow-hidden">
            <CardImage src={selectedItem.image} alt={selectedItem.title} />
          </div>
        )}
        
        {/* 文章标题信息 */}
        <div className="bg-white/95 dark:bg-gray-800/95 shadow-sm">
          <div className="p-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {selectedItem.category && (
                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground rounded-full">
                  {selectedItem.category}
                </span>
              )}
              {selectedItem.date && (
                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <LucideIcons.Calendar size={14} className="mr-1" />
                  {selectedItem.date}
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">{selectedItem.title}</h1>
            {selectedItem.author && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <LucideIcons.User size={16} className="text-gray-500 dark:text-gray-400" />
                <span className="text-sm">{selectedItem.author}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* 文章内容 */}
        <div className="p-6 pt-8 md:p-8">
          <div className="prose prose-blue dark:prose-invert max-w-none">
            {selectedItem.content ? (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={MDXComponents}
              >
                {markdownContent}
              </ReactMarkdown>
            ) : (
              <>
                <p className="text-gray-700 dark:text-gray-300 text-lg">{selectedItem.description}</p>
                <div className="mt-10 flex flex-wrap gap-4 justify-center">
                  {selectedItem.link && (
                    <a 
                      href={selectedItem.link} 
                      className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300 flex items-center"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      访问官网 <LucideIcons.ExternalLink size={16} className="ml-2" />
                    </a>
                  )}
                  
                  {isToolItem && (
                    <Link 
                      to={`/ai/tools/${selectedItem.id}`}
                      className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300 flex items-center"
                      onClick={handleCloseDetail}
                    >
                      查看详情页 <LucideIcons.ArrowRight size={16} className="ml-2" />
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // 渲染卡片
  const renderCard = (item: CardItem) => {
    // 根据标签页类型决定卡片样式
    const isNewsTab = activeTab === 'news';
    const cardHeight = isNewsTab ? "h-[440px]" : "h-[340px]";
    const contentHeight = isNewsTab ? "h-[240px]" : "h-[180px]";
    
    // 处理链接点击
    const handleLinkClick = (e: React.MouseEvent, url: string) => {
      e.stopPropagation(); // 阻止事件冒泡
      
      // 检查是否为博客文章
      if (item.isFromBlog) {
        console.log('点击博客文章链接:', url);
        
        // 对于博客文章，使用React Router的navigate
        window.location.href = url;
        return;
      }
      
      // 其他链接直接打开
      window.open(url, '_blank');
    };
    
    const cardContent = (
      <div className={`flex flex-col ${contentHeight}  h-full`}>
        
        {/* 图片 */}
        <div className="flex-grow">
        {item.image && (
          <div className={`w-full relative ${isNewsTab ? 'pb-[56.25%]' : 'pb-[50%]'} overflow-hidden`}>
            <div className="absolute inset-0">
              <CardImage key={`${activeTab}-${item.id}`} src={item.image} alt={item.title} />
            </div>
          </div>
        )}
        </div>

        {/* 文字内容 */}
        <div className={`${isNewsTab ? 'p-6' : 'p-4'} flex flex-col flex-grow`}>
        {/* 分类和日期 */}
          <div className="flex items-center gap-2 mb-2">
            {item.category && (
              <span className={`inline-block ${isNewsTab ? 'px-3 py-1' : 'px-2 py-0.5'} text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground rounded-full`}>
                {item.category}
              </span>
            )}
            {item.date && (
              <span className={`text-xs text-gray-500 dark:text-gray-400 flex items-center ml-auto`}>
                <LucideIcons.Calendar size={12} className="mr-1" />
                {item.date}
              </span>
            )}
          </div>
          {/* 标题 */}
          <h3 className={`${isNewsTab ? 'text-lg' : 'text-l'} font-semibold text-gray-900 dark:text-white mb-3 ${isNewsTab ? 'line-clamp-3' : 'line-clamp-2'} overflow-hidden text-ellipsis`}>
            {item.title}
          </h3>

          {/* 描述 */}
          <p className={`text-gray-600 dark:text-gray-300 ${isNewsTab ? 'text-sm' : 'text-sm'} ${isNewsTab ? 'line-clamp-4' : 'line-clamp-2'} flex-grow relative pb-1 mb-3 overflow-hidden`}>
            {item.description}
            <span className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white dark:from-gray-800 to-transparent"></span>
          </p>

          {/* 作者和链接 */}
          <div className="flex items-center justify-between pt-3 mt-auto mb-1 w-full">
            {item.author && (
              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 min-w-0 max-w-[60%]">
                <LucideIcons.User size={14} className="flex-shrink-0" />
                <span className="text-xs truncate">{item.author}</span>
              </div>
            )}
            
            {item.link && (
              <a 
                href={item.link} 
                className={`inline-flex items-center text-primary hover:text-primary-dark ml-auto ${isNewsTab ? 'text-sm' : 'text-xs'} whitespace-nowrap`}
                onClick={(e) => handleLinkClick(e, item.link)}
              >
                {item.isFromBlog ? '阅读博客' : '了解更多'} <LucideIcons.ChevronRight size={isNewsTab ? 16 : 12} className="ml-1 flex-shrink-0" />
              </a>
            )}
          </div>
        </div>
      </div>
    );

    // 修复可能导致卡片黑色阴影的问题
    return (
      <div 
        key={item.id} 
        className={`tutorial-card rounded-xl card-shadow cursor-pointer ${cardHeight} border-0 ${item.isFromBlog ? 'tutorial-card-blog' : ''}`}
        onClick={() => handleCardClick(item)}
      >
        {cardContent}
      </div>
    );
  };

  // 订阅导航栏的AI菜单事件
  useEffect(() => {
    const unsubscribe = aiMenuEventBus.subscribe(() => {
      setIsMenuOpen(!isMenuOpen);
    });
    return () => unsubscribe();
  }, [isMenuOpen]);

  // 处理标签页切换
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'news') {
      handleRefreshNews();
    }
  };

  // 渲染特定标签页内容
  const renderTabContent = () => {
    try {
      if (activeTab === 'links') {
        // 为链接汇总标签页提供特殊渲染逻辑
        // 将链接按类别分组
        const categoryGroups: { [key: string]: CardItem[] } = {};
        const itemsToRender = linksItems || [];
        
        itemsToRender.forEach(item => {
          if (item.category) {
            if (!categoryGroups[item.category]) {
              categoryGroups[item.category] = [];
            }
            categoryGroups[item.category].push(item);
          }
        });

        // 根据类别获取相应的颜色
        const getCategoryColors = (category: string) => {
          const colorMap: {[key: string]: {bg: string, text: string, hoverBg: string, darkBg: string, darkText: string, darkHoverBg: string}} = {
            '学术资源': {
              bg: 'bg-blue-100', 
              text: 'text-blue-700', 
              hoverBg: 'hover:bg-blue-200',
              darkBg: 'dark:bg-blue-900/30',
              darkText: 'dark:text-blue-200',
              darkHoverBg: 'dark:hover:bg-blue-800/50'
            },
            '开源平台': {
              bg: 'bg-green-100', 
              text: 'text-green-700', 
              hoverBg: 'hover:bg-green-200',
              darkBg: 'dark:bg-green-900/30',
              darkText: 'dark:text-green-200',
              darkHoverBg: 'dark:hover:bg-green-800/50'
            },
            '实践平台': {
              bg: 'bg-purple-100', 
              text: 'text-purple-700', 
              hoverBg: 'hover:bg-purple-200',
              darkBg: 'dark:bg-purple-900/30',
              darkText: 'dark:text-purple-200',
              darkHoverBg: 'dark:hover:bg-purple-800/50'
            },
            '趋势分析': {
              bg: 'bg-orange-100', 
              text: 'text-orange-700', 
              hoverBg: 'hover:bg-orange-200',
              darkBg: 'dark:bg-orange-900/30',
              darkText: 'dark:text-orange-200',
              darkHoverBg: 'dark:hover:bg-orange-800/50'
            },
            '研究机构': {
              bg: 'bg-red-100', 
              text: 'text-red-700', 
              hoverBg: 'hover:bg-red-200',
              darkBg: 'dark:bg-red-900/30',
              darkText: 'dark:text-red-200',
              darkHoverBg: 'dark:hover:bg-red-800/50'
            }
          };
          
          return colorMap[category] || {
            bg: 'bg-gray-100', 
            text: 'text-gray-700', 
            hoverBg: 'hover:bg-gray-200',
            darkBg: 'dark:bg-gray-800/50',
            darkText: 'dark:text-gray-200',
            darkHoverBg: 'dark:hover:bg-gray-700/70'
          };
        };

        return (
          <div className="space-y-8 mt-2">
            {Object.entries(categoryGroups).map(([category, items]) => (
              <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => {
                    if (!item.id || !item.title) return null;
                    const colors = getCategoryColors(category);
                    return (
                      <a
                        key={item.id}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center px-4 py-2 rounded-full ${colors.bg} ${colors.text} ${colors.hoverBg} ${colors.darkBg} ${colors.darkText} ${colors.darkHoverBg} transition-colors`}
                      >
                        {item.title}
                        <LucideIcons.ExternalLink size={14} className="ml-1" />
                      </a>
                    );
                  })}
                </div>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  {items.map(item => (
                    item.id && item.title ? (
                      <div key={`desc-${item.id}`} className="py-1">
                        <span className="font-medium">{item.title}</span>: {item.description}
                      </div>
                    ) : null
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      }

      // 如果是教程标签页，显示博客文章加载状态
      if (activeTab === 'tutorials') {
        const tabContent = getTabContent();
        const hasBlogPosts = blogPosts.length > 0;
        
        return (
          <>
            {/* 显示博客文章来源提示 */}
            {hasBlogPosts && (
              <div className="mb-6 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800/30">
                <div className="flex items-center">
                  <LucideIcons.Info className="mr-2 text-green-600 dark:text-green-400" size={20} />
                  <p className="text-green-700 dark:text-green-400">
                    本页显示了来自博客的AI相关文章和官方教程，点击卡片查看详情。
                  </p>
                </div>
              </div>
            )}
            
            {/* 显示卡片网格 */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 border-0`}>
              {isLoadingBlogPosts ? (
                // 博客文章加载中的骨架屏
                Array(4).fill(0).map((_, index) => (
                  <div key={`skeleton-${index}`} className="bg-white dark:bg-gray-800 rounded-xl card-shadow overflow-hidden animate-pulse border-0">
                    <div className="w-full pb-[50%] bg-gray-200 dark:bg-gray-700"></div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      </div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="space-y-1.5">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                      <div className="mt-3 pt-2">
                        <div className="flex justify-between items-center">
                          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                tabContent.map((item, index) => (
                  item && item.id ? (
                    <div 
                      key={item.id} 
                      className="animate-enter-delayed"
                      style={{ 
                        animationDelay: `${index * 30}ms`
                      }}
                    >
                      {renderCard(item)}
                    </div>
                  ) : null
                ))
              )}
            </div>
          </>
        );
      }

      // 其他标签页使用卡片网格布局
      return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${
          activeTab === 'news' 
            ? 'lg:grid-cols-3 xl:grid-cols-3 gap-6' 
            : 'lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5'
        } border-0`}>
          {isLoadingNews && activeTab === 'news' ? (
            // 新闻骨架屏
            Array(8).fill(0).map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl card-shadow overflow-hidden animate-pulse border-0">
                <div className="w-full pb-[56.25%] bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-6">
                  <div className="flex gap-2 mb-2">
                    <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="mt-4 pt-2">
                    <div className="flex justify-between items-center">
                      <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : activeTab !== 'news' && getTabContent().length === 0 ? (
            // 非新闻空状态骨架屏
            Array(12).fill(0).map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl card-shadow overflow-hidden animate-pulse border-0">
                <div className="w-full pb-[50%] bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="space-y-1.5">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="mt-3 pt-2">
                    <div className="flex justify-between items-center">
                      <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // 实际卡片内容
            getTabContent().map((item, index) => (
              item && item.id ? (
                <div 
                  key={item.id} 
                  className="animate-enter-delayed"
                  style={{ 
                    animationDelay: `${index * (activeTab === 'news' ? 40 : 25)}ms`
                  }}
                >
                  {renderCard(item)}
                </div>
              ) : null
            ))
          )}
        </div>
      );
    } catch (error: any) {
      console.error('渲染标签页内容失败:', error);
      return (
        <div className="p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">加载内容时出现错误，请刷新页面重试。</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            刷新页面
          </button>
        </div>
      );
    }
  };

  // 在文件顶部添加CSS变量定义
  useEffect(() => {
    // 添加卡片动画CSS
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes enterDelayed {
        0% {
          opacity: 0;
          transform: translateY(8px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-enter-delayed {
        animation: enterDelayed 0.25s ease-out forwards;
        will-change: opacity, transform;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex relative">
      <SEO title="AI资源中心" description="AI前沿新闻、工具、提示词库、学习资料和相关链接" />
      
      {/* 桌面侧边栏 */}
      <div className="hidden lg:block w-[280px] min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI资源中心</h2>
        </div>
        
        <div className="py-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {localTabCategories.map((category) => (
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
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center w-full px-4 py-2 text-sm transition-all duration-200 ease-in-out ${
                      activeTab === tab.id 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 font-medium transform translate-x-1' 
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50 hover:translate-x-1'
                    }`}
                  >
                    <span className="mr-3 transition-transform duration-200">
                      <TabIcon iconName={tab.icon} />
                    </span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 移动菜单 */}
      <div className={`fixed inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden w-[280px] z-[45] bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 ease-in-out`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI资源中心</h2>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <LucideIcons.X size={20} />
          </button>
        </div>
        
        <div className="py-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {localTabCategories.map((category) => (
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
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center w-full px-4 py-2 text-sm transition-all duration-200 ease-in-out ${
                      activeTab === tab.id 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 font-medium transform translate-x-1' 
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50 hover:translate-x-1'
                    }`}
                  >
                    <span className="mr-3 transition-transform duration-200">
                      <TabIcon iconName={tab.icon} />
                    </span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 主内容区域 */}
      <div className="flex-1 p-8">
        {renderTabContent()}
      </div>

      {/* 悬浮卡片 */}
      <AnimatePresence>
        {isDetailOpen && selectedItem && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={handleCloseDetail}
            />
            
            {/* 卡片内容容器 - 添加外层容器确保居中 */}
            <div className="fixed inset-0 flex items-center justify-center z-50 px-4 py-6" onClick={handleCloseDetail}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-3xl max-h-[85vh] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden flex flex-col relative dark:shadow-none shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 操作按钮组 */}
                <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                  {selectedItem?.link && (
                    <a 
                      href={selectedItem.link} 
                      className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <LucideIcons.ExternalLink size={20} className="text-primary dark:text-primary-foreground" />
                    </a>
                  )}
                  <button
                    onClick={handleCloseDetail}
                    className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <LucideIcons.X size={20} />
                  </button>
                </div>
                
                {/* 卡片内容 */}
                {renderDetailContent()}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AI;