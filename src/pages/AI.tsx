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
import { FaCube, FaMicrochip } from "react-icons/fa";
import { CardImage } from '../components/CardImage';
import { TableOfContents } from '../components/TableOfContents';
import { useMediaQuery } from '../app/hooks/useMediaQuery';
import Loader from '../components/Loader';
import { SmallToolCard } from '../components/SmallToolCard';
// 导入博客相关函数
import { getBlogPosts } from '../lib/blog';

// 导入类型和数据
import { CardItem } from '../data/ai';
import { toolsItems } from '../data/ai/tools';
import { useNews } from '../hooks/useContent';
import { learningItems } from '../data/ai/learning';
import { coursesItems } from '../data/ai/courses';
import { deeplearningItems } from '../data/ai/deeplearning';
import { promptsItems } from '../data/ai/prompts';
import { linksItems } from '../data/ai/links';
import { tutorialsItems } from '../data/ai/tutorials';


// 将文章category映射到选项卡ID
const mapCategoryToTabId = (category: string): string => {
  const categoryMap: Record<string, string> = {
    '通用大模型': 'general',
    'AI智能体': 'agent',
    '通用AI': 'general',
    'AI大模型': 'general',
    'AI聊天': 'general',
    'AI绘画': 'painting',
    'Stable Diffusion': 'painting',
    'Midjourney': 'painting',
    'AI编程': 'coding',
    'AI语音': 'voice',
    'AI视频': 'video',
    'AI建模': 'modeling',
    '3D建模': 'modeling',
    'AI安全': 'security',
    '其他': 'other',
    '其他工具': 'other',

  };
  
  return categoryMap[category] || '';
};

// 图标组件
const TabIcon = ({ iconName }: { iconName: string }) => {
  // 为LucideIcons定义正确的类型
  type LucideIconsType = Record<string, React.ComponentType<{ size?: number }>>;
  
  // 处理React Icons图标
  if (iconName === 'FaMicrochip') {
    return <FaMicrochip size={18} />;
  }
  
  const IconComponent = (LucideIcons as unknown as LucideIconsType)[iconName];
  if (!IconComponent) {
    console.warn(`图标 ${iconName} 未找到，可用图标:`, Object.keys(LucideIcons).slice(0, 10));
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
      { id: 'deeplearning', label: '深度学习', icon: 'Brain' },
      { id: 'prompts', label: '提示词工程', icon: 'Lightbulb' },
      // { id: 'tutorials', label: '其他教程', icon: 'BookOpen' },
    ]
  },
  {
    id: 'tools',
    title: 'AI工具箱',
    tabs: [
      { id: 'general', label: '通用大模型', icon: 'Bot' },
      { id: 'agent', label: 'AI智能体', icon: 'Cpu' },
      { id: 'painting', label: 'AI绘画', icon: 'Palette' },
      { id: 'coding', label: 'AI编程', icon: 'Code' },
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
  
  // 使用新的新闻 Hook
  const { news: newsData, loading: isLoadingNews, error: newsError } = useNews();
  
  // 添加markdown新闻和教程数据状态
  const [markdownNews, setMarkdownNews] = useState<CardItem[]>([]);
  const [markdownTutorials, setMarkdownTutorials] = useState<CardItem[]>([]);
  const [isLoadingMarkdown, setIsLoadingMarkdown] = useState(false);
  
  // 菜单状态
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 侧边详情面板状态
  const [selectedItem, setSelectedItem] = useState<CardItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // 添加全屏阅读状态
  const [fullscreenItem, setFullscreenItem] = useState<CardItem | null>(null);
  const [isFullscreenView, setIsFullscreenView] = useState(false);

  // 添加博客文章状态
  const [blogPosts, setBlogPosts] = useState<CardItem[]>([]);
  const [isLoadingBlogPosts, setIsLoadingBlogPosts] = useState(false);

  // 加载Markdown内容
  const loadMarkdownContent = React.useCallback(async () => {
    try {
      setIsLoadingMarkdown(true);
      
      // 使用默认空数组替代已删除的函数
      const newsFromMarkdown: CardItem[] = [];
      const tutorialsFromMarkdown: CardItem[] = [];
      
      setMarkdownNews(newsFromMarkdown);
      setMarkdownTutorials(tutorialsFromMarkdown);
      
      console.log('从Markdown加载的新闻数量:', newsFromMarkdown.length);
      console.log('从Markdown加载的教程数量:', tutorialsFromMarkdown.length);
    } catch (error) {
      console.error('加载Markdown内容失败:', error);
    } finally {
      setIsLoadingMarkdown(false);
    }
  }, []);



  // 初始化数据
  useEffect(() => {
    loadBlogPosts(); // 加载博客文章
    loadMarkdownContent(); // 加载Markdown内容
    console.log('本地标签页:', localTabCategories);
    
    // 新闻数据现在通过 Hook 自动加载，无需手动刷新
  }, [loadMarkdownContent, activeTab]); // 添加activeTab作为依赖项

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
          ['AI', '人工智能', '机器学习', 'ML', '深度学习', 'LLM', 'GPT', 'ChatGPT', 'Stable Diffusion', 'Midjourney'].some(term => 
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
          // 合并教程、Markdown教程和博客文章
          const combinedTutorials = [...tutorialsItems, ...markdownTutorials, ...blogPosts];
          // 根据日期排序
          return combinedTutorials.sort((a, b) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateB - dateA;
          });
        }
        case 'general': return (toolsItems || []).filter(item => item.category === '通用大模型');
        case 'painting': return (toolsItems || []).filter(item => item.category === 'AI绘画');
        case 'coding': return (toolsItems || []).filter(item => item.category === 'AI编程');
        case 'voice': return (toolsItems || []).filter(item => item.category === 'AI语音');
        case 'video': return (toolsItems || []).filter(item => item.category === 'AI视频');
        case 'modeling': return (toolsItems || []).filter(item => item.category === 'AI建模');
        case 'security': return (toolsItems || []).filter(item => item.category === 'AI安全');
        case 'agent': return (toolsItems || []).filter(item => item.category === 'AI智能体');
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
      case 'tutorials': return '本模块文章页面AI相关的教程、Markdown教程和博客文章';
      case 'tools': return '精选实用的AI工具和应用';
      case 'links': return '收集整理的AI领域常用网站和资源链接';
      case 'general': return '通用型AI工具和应用，包括聊天机器人、智能助手等(鼠标左键点击跳转，右键点击查看详情)';
      case 'painting': return 'AI绘画和图像生成工具，支持各种艺术风格和创作需求(鼠标左键点击跳转，右键点击查看详情)';
      case 'coding': return 'AI编程工具，提供创意编程和内容创作支持(鼠标左键点击跳转，右键点击查看详情)';
      case 'voice': return 'AI语音合成和识别工具，支持多语言和多场景应用(鼠标左键点击跳转，右键点击查看详情)';
      case 'video': return 'AI视频处理和生成工具，包括视频编辑、特效制作等(鼠标左键点击跳转，右键点击查看详情)';
      case 'modeling': return 'AI建模工具，包括3D建模、3D渲染等(鼠标左键点击跳转，右键点击查看详情)';
      case 'security': return 'AI安全工具，保护数据和模型安全(鼠标左键点击跳转，右键点击查看详情)';
      case 'other': return '其他创新AI工具和应用(鼠标左键点击跳转，右键点击查看详情)';
      case 'agent': return 'AI智能体工具，包括AI智能体入门教程、AI智能体开发工具等(鼠标左键点击跳转，右键点击查看详情)';
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

  // 处理全屏查看
  const handleFullscreenView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItem) {
      setFullscreenItem(selectedItem);
      setIsFullscreenView(true);
      setIsDetailOpen(false);
      // 阻止背景内容滚动
      document.body.style.overflow = 'hidden';
    }
  };

  // 关闭全屏查看
  const handleCloseFullscreen = () => {
    setIsFullscreenView(false);
    setFullscreenItem(null);
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
            <div className="w-full h-32 md:h-40 overflow-hidden bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-400">
              <CardImage 
                src={selectedItem.image} 
                alt={selectedItem.title} 
              />
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
    `;

    // 对于tools类型的卡片，如果有链接到详情页，可以加上查看详情页链接
    const isToolItem = activeTab === 'tools' || activeTab === 'news' || activeTab.match(/^(general|painting|coding|voice|video|modeling|security|other|agent)$/);
    const toolDetailLink = isToolItem ? `/ai/tools/${selectedItem.id}` : null;

    return (
      <div className="flex-1 overflow-y-auto">
        {/* 图片 */}
        {selectedItem.image && (
          <div className={`w-full relative overflow-hidden rounded-t-xl bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-400`} style={{paddingBottom: '56.25%'}}>
            <div className="absolute inset-0">
              <CardImage 
                key={`detail-${selectedItem.id}`} 
                src={selectedItem.image} 
                alt={selectedItem.title}
              />
            </div>
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
              <>
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={MDXComponents as React.ComponentProps<typeof ReactMarkdown>['components']}
                >
                  {markdownContent}
                </ReactMarkdown>
                
                {/* 查看原文按钮 */}
                {selectedItem.link && (
                  <div className="mt-8 flex justify-center">
                    <a 
                      href={selectedItem.link} 
                      className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300 flex items-center"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      查看原文 <LucideIcons.ExternalLink size={16} className="ml-2" />
                    </a>
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="text-gray-700 dark:text-gray-300 text-lg">{selectedItem.description}</p>
                <div className="mt-10 flex flex-wrap gap-4 justify-center">
                  {selectedItem.link && (
                    <a 
                      href={selectedItem.link} 
                      className="px-6 py-3 bg-primary text-white rounded-full hover:bg-blue-900  transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300 flex items-center"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      访问官网 <LucideIcons.ExternalLink size={16} className="ml-2" />
                    </a>
                  )}

                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // 渲染卡片(标准大卡片)
  const renderCard = (item: CardItem) => {
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
      <div className="flex flex-col h-full">
        
        {/* 图片 */}
        <div className="flex-shrink-0">
          {item.image && (
            <div className="w-full relative aspect-video sm:aspect-[16/5] md:aspect-[16/5] lg:aspect-[16/6] xl:aspect-[16/7] overflow-hidden rounded-t-xl bg-white dark:bg-gray-800 text-green-500 dark:text-blue-400">
              <div className="absolute inset-0">
                <CardImage 
                  key={`${activeTab}-${item.id}`} 
                  src={item.image} 
                  alt={item.title}
                />
              </div>
            </div>
          )}
        </div>

        {/* 文字内容 */}
        <div className="p-4 flex flex-col flex-grow overflow-hidden">
          {/* 分类和日期 */}
          <div className="flex items-center gap-2 mb-2">
            {item.category && (
              <span className="inline-block px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground rounded-full truncate max-w-[60%]">
                {item.category}
              </span>
            )}
            {item.date && (
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center ml-auto truncate">
                <LucideIcons.Calendar size={12} className="mr-1 flex-shrink-0" />
                {item.date}
              </span>
            )}
          </div>
          
          {/* 标题 */}
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 overflow-hidden text-ellipsis">
            {item.title}
          </h3>

          {/* 描述 */}
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 md:line-clamp-4 flex-grow relative">
            {item.description}
          </p>

          {/* 作者和链接 */}
          <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-100 dark:border-gray-700/50 w-full">
            {item.author && (
              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 min-w-0 max-w-[60%]">
                <LucideIcons.User size={14} className="flex-shrink-0" />
                <span className="text-xs truncate">{item.author}</span>
              </div>
            )}
            
            {item.link && (
              <a 
                href={item.link} 
                className="inline-flex items-center text-primary hover:text-primary-dark ml-auto text-xs whitespace-nowrap"
                onClick={(e) => handleLinkClick(e, item.link)}
              >
                {item.isFromBlog ? '阅读博客' : '了解更多'} <LucideIcons.ChevronRight size={14} className="ml-1 flex-shrink-0" />
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
        className="tutorial-card rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer bg-white dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700 h-[340px] sm:h-[320px] md:h-[360px] lg:h-[320px] xl:h-[340px]"
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
    // 新闻数据现在通过 Hook 自动加载，无需手动刷新
  };

  // 渲染特定标签页内容
  const renderTabContent = () => {
    try {
      // 为工具标签页提供特殊渲染逻辑，使用小卡片和分割线
      if (activeTab.match(/^(general|painting|coding|voice|video|modeling|security|other|agent)$/)) {
        // 获取当前标签对应类别的工具
        const toolsForCategory = (toolsItems || []).filter(item => item.category === getToolCategory(activeTab));
        const tabDescription = getTabDescription(activeTab);
        // 分割工具与教程
        // 根据是否有content字段区分，有content一般是教程
        const tools = toolsForCategory.filter(item => !item.content);
        const tutorials = toolsForCategory.filter(item => item.content);
        
        // 获取教程标签页的内容，可能有相关教程
        const relatedTutorials = [...tutorialsItems, ...markdownTutorials, ...blogPosts].filter(item => {
          // 例如，如果是AI绘画标签页，尝试查找标题或描述包含"绘画"、"画图"等关键词的教程

          if (item.category && mapCategoryToTabId(item.category) === activeTab) {
            return true;
          }
          // 如果没有直接匹配，再尝试关键词匹配（保留原有逻辑作为备选）
          // const keywords = getCategoryKeywords(activeTab);
          // return keywords.some(keyword => 
          //   (item.title && item.title.includes(keyword)) || 
          //   (item.description && item.description.includes(keyword)) ||
          //   (item.category && item.category.includes(keyword))
          // );
        });
        
        // 合并可能的相关教程
        const allTutorials = [...tutorials, ...relatedTutorials];
        
        return (
          <div className="space-y-10 mt-2">
            {/* 添加标签页描述 */}
            {tabDescription && (
              <div className="bg-green-100/50 dark:bg-green-800/50 rounded-xl shadow-sm shadow-green-100/75 dark:shadow-green-700/50 p-3 border border-green-500/50 dark:border-green-700/50">
                <div className="flex items-center gap-2">
                  <LucideIcons.Info className="text-green-700 dark:text-gray-200" size={20} />
                  <p className="text-green-700 dark:text-gray-200 text-[15px] leading-relaxed tracking-wide font-medium">{tabDescription}</p>
                </div>
              </div>
            )}
            {/* 工具部分 */}
            <div>
              {/* 工具标题 */}
              <div className="flex items-center px-2 mb-4">
                <LucideIcons.Briefcase className="text-primary w-5 h-5 mr-2" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{getToolCategory(activeTab)}</h3>
              </div>
              
              {/* 工具卡片网格 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {tools.length > 0 ? (
                  tools.map(tool => (
                    <SmallToolCard 
                      key={tool.id} 
                      item={tool} 
                      onOpenDetail={(item) => {
                        setSelectedItem(item);
                        setIsDetailOpen(true);
                        document.body.style.overflow = 'hidden';
                      }}
                    />
                  ))
                ) : (
                  <div className="col-span-3 py-8 text-center text-gray-500 dark:text-gray-400">
                    <LucideIcons.Search className="mx-auto mb-3 w-10 h-10 opacity-20" />
                    <p>暂无相关工具</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* 分割线 */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gray-50 dark:bg-gray-900 px-4 text-sm text-gray-500 dark:text-gray-400">
                  相关教程资源
                </span>
              </div>
            </div>
            
            {/* 教程部分 */}
            <div>
              {/* 教程标题 */}
              <div className="flex items-center px-2 mb-4">
                <LucideIcons.BookOpen className="text-primary w-5 h-5 mr-2" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">学习教程</h3>
              </div>
              
              {/* 教程卡片网格 - 使用大卡片 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {allTutorials.length > 0 ? (
                  allTutorials.map(item => (
                    <div 
                      key={item.id} 
                      className="animate-enter-delayed"
                      style={{
                        animationDelay: `${Math.random() * 0.2}s`
                      }}
                    >
                      <SmallToolCard 
                        item={item} 
                        onOpenDetail={handleCardClick}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 py-12 text-center text-gray-500 dark:text-gray-400">
                    <LucideIcons.BookText className="mx-auto mb-3 w-12 h-12 opacity-20" />
                    <p>暂无相关教程</p>
                    <p className="mt-2 text-sm">我们正在努力添加更多教程资源</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }
      
      // 其他标签页内容处理不变
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
      } else if (activeTab === 'news' || activeTab === 'prompts' || activeTab === 'tutorials' || activeTab === 'courses' || activeTab === 'deeplearning' || activeTab === 'learning' || activeTab === 'general' || activeTab === 'painting' || activeTab === 'coding' || activeTab === 'voice' || activeTab === 'video' || activeTab === 'modeling' || activeTab === 'security' || activeTab === 'other' || activeTab === 'agent' ) {
        // 通用标签页渲染逻辑 - 使用卡片网格
        const items = getTabContent();
        const tabDescription = getTabDescription(activeTab);
        
        return (
          <div className="space-y-8 mt-2">
            {/* 标签页描述 */}
            {tabDescription && (
              <div className="bg-green-100/50 dark:bg-green-800/50 rounded-xl shadow-sm shadow-green-100/75 dark:shadow-green-700/50 p-3 border border-green-500/50 dark:border-green-700/50">
                <div className="flex items-center gap-2">
                  <LucideIcons.Info className="text-green-700 dark:text-gray-200" size={20} />
                  <p className="text-green-700 dark:text-gray-200 text-[15px] leading-relaxed tracking-wide font-medium">{tabDescription}</p>
                </div>
              </div>
            )}
            
            {/* 内容加载中 */}
            {(activeTab === 'news' && isLoadingNews) || (activeTab === 'tutorials' && isLoadingMarkdown) || (activeTab === 'tutorials' && isLoadingBlogPosts) ? (
              <div className="flex justify-center py-20">
                <Loader />
                <span className="ml-3 text-gray-500 dark:text-gray-400">加载中...</span>
              </div>
            ) : (
              <>
                {/* 错误提示 */}
                {activeTab === 'news' && newsError && (
                  <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg mb-6">
                    <p>{newsError}</p>
                  </div>
                )}
                
                {/* 卡片网格 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.length > 0 ? (
                    items.map(item => (
                      <div 
                        key={item.id} 
                        className="animate-enter-delayed"
                        style={{
                          animationDelay: `${Math.random() * 0.3}s`
                        }}
                      >
                        {renderCard(item)}
                      </div>
                    ))
                  ) : (
                    <div className="col-span-3 py-20 text-center text-gray-500 dark:text-gray-400">
                      <LucideIcons.Search className="mx-auto mb-3 w-16 h-16 opacity-20" />
                      <p className="text-lg">暂无内容</p>
                      <p className="mt-2">我们将尽快添加更多内容</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        );
      } else {
        // 默认标签页内容
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center h-40 text-gray-500 dark:text-gray-400">
              <p>没有内容可显示</p>
            </div>
          </div>
        );
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('渲染标签页内容失败:', errorMessage);
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
      
      /* 隐藏滚动条但保持滚动功能 */
      .scrollbar-hide {
        -ms-overflow-style: none;  /* IE 和 Edge */
        scrollbar-width: none;  /* Firefox */
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none; /* Chrome, Safari 和 Opera */
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // 渲染全屏文章内容（用于目录导航识别）
  const renderFullscreenContent = () => {
    if (!fullscreenItem) return '';

    // 创建包含标题的内容
    const contentWithHeadings = `
# ${fullscreenItem.title}

${fullscreenItem.content || fullscreenItem.description}

${fullscreenItem.link ? `\n\n[查看原文](${fullscreenItem.link})` : ''}
`;

    return contentWithHeadings;
  };

  // 获取工具分类
  const getToolCategory = (tabId: string): string => {
    switch(tabId) {
      case 'general': return '通用大模型';
      case 'painting': return 'AI绘画';
      case 'coding': return 'AI编程';
      case 'voice': return 'AI语音';
      case 'video': return 'AI视频';
      case 'modeling': return 'AI建模';
      case 'security': return 'AI安全';
      case 'agent': return 'AI智能体';
      case 'other': return '其他';
      default: return '';
    }
  };

  // 获取分类关键词，用于查找相关教程
  const getCategoryKeywords = (tabId: string): string[] => {
    switch(tabId) {
      case 'general': return ['通用', '大模型', 'LLM', 'ChatGPT', 'Claude', 'Gemini', '文心一言', '通义千问'];
      case 'painting': return ['绘画', '画图', 'AI绘画', 'Stable Diffusion', 'Midjourney', 'DALL-E'];
      case 'coding': return ['编程', '代码', 'AI编程', 'AI代码', 'AI代码生成', 'AI代码补全', 'AI代码解释', 'AI代码重构', 'AI代码优化', 'AI代码测试', 'AI代码调试', 'AI代码生成器', 'AI代码解释器', 'AI代码重构器', 'AI代码优化器', 'AI代码测试器', 'AI代码调试器'];
      case 'voice': return ['语音', '声音', '音频', '文字转语音', '语音识别', 'TTS'];
      case 'video': return ['视频', '动画', '剪辑', '影像处理'];
      case 'modeling': return ['建模', '3D', '模型', '场景生成'];
      case 'security': return ['安全', '隐私', '防护', '审计'];
      case 'other': return ['其他', '工具', '辅助'];
      case 'agent': return ['智能体', 'AI智能体', 'AI代理', 'AI代理开发', 'AI代理教程', 'AI代理工具'];
      default: return [];
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
        
        <div className="py-4 overflow-y-auto max-h-[calc(100vh-4rem)] scrollbar-hide">
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
      
      {/* 移动菜单遮罩 - 添加点击关闭功能 */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      {/* 移动菜单 */}
      <div className={`fixed inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden w-[280px] z-[45] bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 ease-in-out`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI资源中心</h2>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <LucideIcons.X size={20} />
          </button>
        </div>
        
        <div className="py-4 overflow-y-auto max-h-[calc(100vh-4rem)] scrollbar-hide">
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
                    onClick={() => {
                      handleTabChange(tab.id);
                      setIsMenuOpen(false); // 点击菜单项后关闭菜单
                    }}
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
                  <button
                    onClick={handleFullscreenView}
                    className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="全屏阅读"
                  >
                    <LucideIcons.Maximize2 size={20} className="text-primary dark:text-primary-foreground" />
                  </button>
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

      {/* 全屏阅读视图 */}
      <AnimatePresence>
        {isFullscreenView && fullscreenItem && (
          <div className="fixed inset-0 bg-white dark:bg-gray-900 z-[60] overflow-y-auto">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
              {/* 返回按钮 */}
              <div className="mb-8 flex justify-between items-center">
                <button
                  onClick={handleCloseFullscreen}
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground transition-colors"
                >
                  <LucideIcons.ArrowLeft size={20} className="mr-2" />
                  <span>返回</span>
                </button>
                
                {fullscreenItem.link && (
                  <a 
                    href={fullscreenItem.link} 
                    className="flex items-center text-primary hover:text-primary-dark transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>访问官网</span>
                    <LucideIcons.ExternalLink size={18} className="ml-2" />
                  </a>
                )}
              </div>
              
              {/* 文章内容 */}
              <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                {/* 封面图片 */}
                {fullscreenItem.image && (
                  <div className="w-full relative aspect-[21/9] overflow-hidden">
                    <div className="absolute inset-0">
                      <CardImage 
                        src={fullscreenItem.image} 
                        alt={fullscreenItem.title}
                      />
                    </div>
                  </div>
                )}
                
                {/* 文章标题信息 */}
                <div className="p-6 md:p-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {fullscreenItem.category && (
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground rounded-full">
                        {fullscreenItem.category}
                      </span>
                    )}
                    {fullscreenItem.date && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <LucideIcons.Calendar size={14} className="mr-1" />
                        {fullscreenItem.date}
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight" id="article-title">{fullscreenItem.title}</h1>
                  {fullscreenItem.author && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <LucideIcons.User size={16} className="text-gray-500 dark:text-gray-400" />
                      <span className="text-sm">{fullscreenItem.author}</span>
                    </div>
                  )}
                </div>
                
                {/* 文章内容 */}
                <div className="p-6 md:p-8 pt-8">
                  <div className="prose prose-lg prose-blue dark:prose-invert max-w-none">
                    {fullscreenItem.content ? (
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={MDXComponents as React.ComponentProps<typeof ReactMarkdown>['components']}
                      >
                        {renderFullscreenContent()}
                      </ReactMarkdown>
                    ) : (
                      <>
                        <p className="text-gray-700 dark:text-gray-300 text-xl">{fullscreenItem.description}</p>
                        {fullscreenItem.link && (
                          <div className="mt-10 text-center">
                            <a 
                              href={fullscreenItem.link} 
                              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              访问官网 <LucideIcons.ExternalLink size={16} className="ml-2" />
                            </a>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </article>
            </div>
            
            {/* 添加目录导航 */}
            <TableOfContents content={renderFullscreenContent()} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AI;