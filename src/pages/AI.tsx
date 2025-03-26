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

// 图片组件
export const CardImage = ({ src, alt, style }: { src: string, alt: string, style?: React.CSSProperties }) => {
  const [imgError, setImgError] = useState(false);
  
  // 确保src有值
  if (!src) {
    console.warn('图片源地址为空');
    return (
      <div className="w-full h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
        <div className="flex flex-col items-center text-gray-400">
          <LucideIcons.ImageOff size={24} />
          <span className="text-xs mt-2">无图片</span>
        </div>
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
    // 显示备用图像或占位符
    return (
      <div className="w-full h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
        <div className="flex flex-col items-center text-gray-400">
          <LucideIcons.ImageOff size={24} />
          <span className="text-xs mt-2">{alt}</span>
        </div>
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

  // 初始化数据
  useEffect(() => {
    setNewsData(defaultNewsItems);
    handleRefreshNews();
    console.log('本地标签页:', localTabCategories);
    
    const refreshInterval = setInterval(() => {
      if (activeTab === 'news') {
        handleRefreshNews();
      }
    }, 3600000);
    
    return () => clearInterval(refreshInterval);
  }, []);

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
        case 'tutorials': return tutorialsItems || [];
        case 'general': return (toolsItems || []).filter(item => item.category === '通用类AI');
        case 'painting': return (toolsItems || []).filter(item => item.category === 'AI绘画');
        case 'writing': return (toolsItems || []).filter(item => item.category === 'AI写作');
        case 'voice': return (toolsItems || []).filter(item => item.category === 'AI语音');
        case 'video': return (toolsItems || []).filter(item => item.category === 'AI视频');
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

    // 生成详细的Markdown内容
    const markdownContent = `
${selectedItem.content || selectedItem.description}

${selectedItem.link ? `\n\n[查看原文](${selectedItem.link})` : ''}
`;

    // 对于tools类型的卡片，如果有链接到详情页，可以加上查看详情页链接
    const isToolItem = activeTab === 'tools' || activeTab.match(/^(general|painting|writing|voice|video|security|other)$/);
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
    const cardHeight = isNewsTab ? "h-[420px]" : "h-[300px]";
    const contentHeight = isNewsTab ? "h-[270px]" : "h-[200px]";
    
    const cardContent = (
      <>
        {item.image && (
          <div className={`w-full relative ${isNewsTab ? 'pb-[56.25%]' : 'pb-[50%]'} overflow-hidden`}>
            <div className="absolute inset-0">
              <CardImage key={`${activeTab}-${item.id}`} src={item.image} alt={item.title} />
            </div>
          </div>
        )}
        <div className={`${isNewsTab ? 'p-6' : 'p-4'} flex flex-col ${contentHeight}`}>
          <div className="flex items-center gap-2 mb-2">
            {item.category && (
              <span className={`inline-block ${isNewsTab ? 'px-3 py-1' : 'px-2 py-0.5'} text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground rounded-full`}>
                {item.category}
              </span>
            )}
            {item.date && (
              <span className={`text-xs text-gray-500 dark:text-gray-400 flex items-center ${isNewsTab ? '' : 'ml-auto'}`}>
                <LucideIcons.Calendar size={12} className="mr-1" />
                {item.date}
              </span>
            )}
          </div>
          
          <h3 className={`${isNewsTab ? 'text-xl' : 'text-base'} font-semibold text-gray-900 dark:text-white mb-3 ${isNewsTab ? 'line-clamp-3' : 'line-clamp-2'}`}>
            {item.title}
          </h3>
          
          <p className={`text-gray-600 dark:text-gray-300 ${isNewsTab ? 'text-sm' : 'text-xs'} mb-4 ${isNewsTab ? 'line-clamp-3' : 'line-clamp-2'} flex-grow`}>
            {item.description}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 dark:border-gray-700">
            {item.author && (
              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                <LucideIcons.User size={14} />
                <span className="text-xs">{item.author}</span>
              </div>
            )}
            
            {item.link && (
              <a 
                href={item.link} 
                className={`inline-flex items-center text-primary hover:text-primary-dark ${isNewsTab ? 'text-sm' : 'text-xs'}`}
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                了解更多 <LucideIcons.ChevronRight size={isNewsTab ? 16 : 12} className="ml-1" />
              </a>
            )}
          </div>
        </div>
      </>
    );

    return (
      <div 
        key={item.id} 
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${cardHeight} border border-gray-100 dark:border-gray-700/50`}
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

      // 其他标签页使用卡片网格布局
      return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${
          activeTab === 'news' 
            ? 'lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5'
        }`}>
          {isLoadingNews && activeTab === 'news' ? (
            // 新闻骨架屏
            Array(8).fill(0).map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden animate-pulse border border-gray-100 dark:border-gray-700/50">
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
                  <div className="mt-4 pt-2 border-t border-gray-100 dark:border-gray-700">
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
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden animate-pulse border border-gray-100 dark:border-gray-700/50">
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
                  <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
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
                  className="animate-fade-in-up" 
                  style={{ 
                    animationDelay: `${index * (activeTab === 'news' ? 50 : 30)}ms`,
                    animationDuration: '0.5s',
                    animationFillMode: 'both'
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
              )}+

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
                className="w-full max-w-3xl max-h-[85vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col relative"
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