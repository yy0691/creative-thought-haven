import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import * as LucideIcons from 'lucide-react';
import axios from 'axios';

// 导入类型和数据
import { CardItem } from '../data/ai';
import { toolsItems } from '../data/ai';
import { defaultNewsItems, fetchLatestNews, getCozeAccessToken } from '../data/ai';
import { learningItems } from '../data/ai/learning';
import { coursesItems } from '../data/ai/courses';
import { deeplearningItems } from '../data/ai/deeplearning';
import { promptsItems } from '../data/ai/prompts';
import { linksItems } from '../data/ai/links';

// 图片组件
const CardImage = ({ src, alt }: { src: string, alt: string }) => {
  const [imgError, setImgError] = useState(false);
  
  const handleError = () => {
    setImgError(true);
  };
  
  const getImageUrl = (url: string) => {
    if (url.startsWith('http')) {
      return url;
    }
    const cdnBase = 'https://static.xiaohucdn.com';
    const fileName = url.split('/').pop();
    return `${cdnBase}/blog/ai/${fileName}`;
  };
  
  if (imgError) {
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
      src={getImageUrl(src)} 
      alt={alt} 
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      onError={handleError}
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
    title: '学习',
    tabs: [
      { id: 'learning', label: 'AI学习资料', icon: 'BookOpen' },
      { id: 'courses', label: '李宏毅老师课程', icon: 'GraduationCap' },
      { id: 'deeplearning', label: '深度学习', icon: 'Code' },
      { id: 'prompts', label: '提示词工程', icon: 'Lightbulb' },
    ]
  },
  {
    id: 'resource',
    title: '资源',
    tabs: [
      { id: 'tools', label: 'AI工具箱', icon: 'Briefcase' },
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
          setNewsError('获取新闻失败，显示默认新闻');
        }
      } catch (error) {
        console.error('获取新闻数据失败:', error);
        setNewsData(defaultNewsItems);
        setNewsError('获取最新新闻失败，显示默认新闻');
      } finally {
        setIsLoadingNews(false);
      }
    }
  };

  // 获取当前标签页内容
  const getTabContent = () => {
    switch(activeTab) {
      case 'news': return newsData;
      case 'tools': return toolsItems;
      case 'prompts': return promptsItems;
      case 'learning': return learningItems;
      case 'courses': return coursesItems;
      case 'deeplearning': return deeplearningItems;
      case 'links': return linksItems;
      default: return [];
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
      case 'links': return 'AI领域重要网站和资源链接';
      default: return '';
    }
  };

  // 渲染卡片
  const renderCard = (item: CardItem) => {
    return (
      <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {item.image && (
          <div className="w-full h-40 overflow-hidden">
            <CardImage key={`${activeTab}-${item.id}`} src={item.image} alt={item.title} />
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
              了解更多 <LucideIcons.ChevronRight size={16} className="ml-1" />
            </a>
          )}
        </div>
      </div>
    );
  };

  // 处理菜单开关
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // 处理标签页切换
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsMenuOpen(false);
    if (tabId === 'news') {
      handleRefreshNews();
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
      <div className={`fixed inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden w-[280px] z-50 bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 ease-in-out`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI资源中心</h2>
          <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
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
                    className={`flex items-center w-full px-4 py-2 text-sm ${
                      activeTab === tab.id 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <span className="mr-3">
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
      
      {/* 移动菜单遮罩 */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ease-in-out" 
          onClick={toggleMenu}
        />
      )}
      
      {/* 内容区域 */}
      <div className="flex-1 p-4 pb-24 lg:p-8 lg:pb-24 overflow-y-auto">
        {/* 标题和描述 */}
        <div className="mb-8">
          <div className="flex items-center">
            {localTabCategories.map(category => 
              category.tabs.find(tab => tab.id === activeTab)
            ).filter(Boolean).map(tab => (
              <div key={tab?.id} className="flex items-center animate-fade-in">
                <span className="mr-2 p-2 bg-primary/10 dark:bg-primary/20 rounded-lg transition-colors duration-200">
                  <TabIcon iconName={tab?.icon || ''} />
                </span>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
                    {tab?.label}
                  </h1>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 transition-colors duration-200">
                    {getTabDescription(tab?.id)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 错误信息 */}
        {activeTab === 'news' && newsError && (
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded animate-fade-in">
            {newsError}
          </div>
        )}
        
        {/* 卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoadingNews && activeTab === 'news' ? (
            // 骨架屏
            Array(6).fill(0).map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-5">
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-5 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))
          ) : (
            getTabContent().map((item, index) => (
              <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                {renderCard(item)}
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* 浮动按钮 */}
      <div className="fixed bottom-20 right-4 flex flex-col gap-3 z-20">
        {/* 刷新按钮 */}
        {activeTab === 'news' && (
          <button
            onClick={handleRefreshNews}
            disabled={isLoadingNews}
            className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out hover:scale-110"
          >
            <LucideIcons.RefreshCw className={isLoadingNews ? 'animate-spin' : ''} size={20} />
          </button>
        )}
        
        {/* 移动菜单按钮 */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out hover:scale-110"
        >
          <LucideIcons.Menu size={20} />
        </button>
      </div>
    </div>
  );
};

export default AI; 