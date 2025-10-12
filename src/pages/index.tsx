import { useEffect, useState, useRef } from 'react';
import SEO from '../components/SEO';
import { getAllPosts } from '../lib/blog';
import { getAllProjects } from '../lib/projects';
import SplashCursor from '../components/cursor';
import Timeline from '../components/Timeline';
import timelineData from '../data/timelineData';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Code, Star, ExternalLink, ArrowLeft, Newspaper, X, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { defaultNewsItems } from '../data/ai/news';
import { MDXContent } from '../components/MDXContent';

const Index = () => {
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [recommendedProjects, setRecommendedProjects] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [isPostsHovering, setIsPostsHovering] = useState(false);
  const [isProjectsHovering, setIsProjectsHovering] = useState(false);
  const [isNewsHovering, setIsNewsHovering] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFullscreenView, setIsFullscreenView] = useState(false);
  const postsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  
  // 添加标签颜色生成函数
  const getTagColors = (tag: string) => {
    const tagColors = [
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
      'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200'
    ];
    const colorIndex = Math.abs(tag.split('').reduce((acc: number, char) => acc + char.charCodeAt(0), 0)) % tagColors.length;
    return tagColors[colorIndex];
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 获取所有文章和项目
        const allPosts = await getAllPosts();
        const allProjects = await getAllProjects();
        
        // 从文章中筛选推荐内容
        const recommendedPosts = allPosts
          .filter(post => post.isRecommended)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map(post => ({
            id: post.slug,
            title: post.title,
            description: post.excerpt,
            category: post.category?.split('-')[0] || '技术博客',
            readTime: `${Math.ceil((post.excerpt?.length || 0) / 500)}分钟`,
            link: `/blog/${encodeURIComponent(post.slug)}`,
            color: getColorByCategory(post.category),
            tags: post.tags || [] // 确保包含标签信息
          }));
        
        // 从项目中筛选推荐内容
        const recommendedProjects = allProjects
          .filter(project => project.isRecommended)  // 只筛选推荐的项目
          .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())  // 按发布日期排序
          .map(project => ({
            id: project.id,
            title: project.title,
            description: project.description,
            tech: project.technologies || [],
            preview: project.coverImage || '/images/projects/default.png',
            link: `/portfolio/${encodeURIComponent(project.id)}`,
            color: getColorByTech(project.technologies?.[0])
          }));

        setRecommendedPosts(recommendedPosts);
        setRecommendedProjects(recommendedProjects);
      } catch (error) {
        console.error('获取推荐内容失败:', error);
      }
    };

    fetchData();
  
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowContent(scrollPosition > windowHeight * 0.5);
      setShowTimeline(scrollPosition > windowHeight * 0.3);
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 根据分类返回渐变色
  const getColorByCategory = (category) => {
    const colors = {
      '前端开发': 'from-blue-500 to-cyan-500',
      '后端开发': 'from-green-500 to-emerald-500',
      '设计思维': 'from-purple-500 to-pink-500',
      '人工智能': 'from-red-500 to-orange-500',
      '区块链': 'from-amber-500 to-yellow-500',
      '技术博客': 'from-indigo-500 to-purple-500'
    };
    return colors[category] || 'from-gray-500 to-slate-500';
  };

  // 根据技术栈返回渐变色
  const getColorByTech = (tech) => {
    const colors = {
      'React': 'from-blue-500 to-cyan-500',
      'Vue': 'from-green-500 to-emerald-500',
      'Node.js': 'from-lime-500 to-green-500',
      'Python': 'from-yellow-500 to-amber-500',
      'TypeScript': 'from-blue-600 to-indigo-500',
      'Next.js': 'from-gray-600 to-gray-900',
      'TailwindCSS': 'from-cyan-500 to-blue-500'
    };
    return colors[tech] || 'from-purple-500 to-pink-500';
  };

  // 处理鼠标滚轮事件 - 推荐文章
  const handlePostsWheel = (e: WheelEvent) => {
    if (!postsRef.current || !isPostsHovering) return;
    
    // 阻止默认的垂直滚动
    e.preventDefault();
    
    // 使用deltaY控制水平滚动
    postsRef.current.scrollBy({
      left: e.deltaY,
      behavior: 'smooth'
    });
  };

  // 处理鼠标滚轮事件 - 推荐项目
  const handleProjectsWheel = (e: WheelEvent) => {
    if (!projectsRef.current || !isProjectsHovering) return;
    
    // 阻止默认的垂直滚动
    e.preventDefault();
    
    // 使用deltaY控制水平滚动
    projectsRef.current.scrollBy({
      left: e.deltaY,
      behavior: 'smooth'
    });
  };

  // 设置和移除事件监听器 - 推荐文章
  useEffect(() => {
    const postsElement = postsRef.current;
    if (!postsElement) return;

    // 只在鼠标悬停时添加滚轮事件监听
    if (isPostsHovering) {
      postsElement.addEventListener('wheel', handlePostsWheel, { passive: false });
    }
    
    return () => {
      if (postsElement) {
        postsElement.removeEventListener('wheel', handlePostsWheel);
      }
    };
  }, [isPostsHovering]);

  // 设置和移除事件监听器 - 推荐项目
  useEffect(() => {
    const projectsElement = projectsRef.current;
    if (!projectsElement) return;

    // 只在鼠标悬停时添加滚轮事件监听
    if (isProjectsHovering) {
      projectsElement.addEventListener('wheel', handleProjectsWheel, { passive: false });
    }
    
    return () => {
      if (projectsElement) {
        projectsElement.removeEventListener('wheel', handleProjectsWheel);
      }
    };
  }, [isProjectsHovering]);

  // AI新闻部分
  useEffect(() => {
    const newsElement = newsRef.current;
    if (!newsElement) return;

    if (isNewsHovering) {
      newsElement.addEventListener('wheel', handleNewsWheel, { passive: false });
    }
    
    return () => {
      if (newsElement) {
        newsElement.removeEventListener('wheel', handleNewsWheel);
      }
    };
  }, [isNewsHovering]);

  // 处理新闻滚动
  const handleNewsWheel = (e: WheelEvent) => {
    if (!newsRef.current || !isNewsHovering) return;
    e.preventDefault();
    newsRef.current.scrollBy({
      left: e.deltaY,
      behavior: 'smooth'
    });
  };
  
  // 处理全屏查看
  const handleFullscreenView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedNews) {
      setIsFullscreenView(true);
      setIsDetailOpen(false);
      // 阻止背景内容滚动
      document.body.style.overflow = 'hidden';
    }
  };

  // 关闭全屏查看
  const handleCloseFullscreen = () => {
    setIsFullscreenView(false);
    // 恢复背景内容滚动
    document.body.style.overflow = '';
  };
  
  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        <div className="ripple-background absolute inset-0 z-0"></div>
        
        <div className="relative z-10">
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
              <h1 className="text-5xl md:text-8xl font-bold mb-6 md:mb-9 gradient-text dark:text-white hover:scale-105 transition-transform duration-500 cursor-default">
                ENDLESS
              </h1>
              <p className="text-lg md:text-2xl mb-8 md:mb-12 text-gray-600 dark:text-white animate-fade-in-delay max-w-2xl mx-auto hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300">
                用软件作品与文字构筑更广阔的思维空间。
              </p>
            </div>
          </div>
          
    
          {/* 推荐内容区域 */}
          <div className={`max-w-7xl mx-auto px-4 pb-32 mt-20 transition-all duration-1000 transform ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            {/* AI新闻部分 */}
            <div className="mb-20">
              <div className="flex items-center mb-10">
                <div className="flex items-center gap-3">
                  <Newspaper className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">AI前沿动态</h2>
                </div>
              </div>
              
              <div 
                ref={newsRef}
                className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseEnter={() => setIsNewsHovering(true)}
                onMouseLeave={() => setIsNewsHovering(false)}
              >
                {defaultNewsItems.slice(0, 6).map((news) => (
                  <div
                    key={news.id}
                    onClick={() => {
                      setSelectedNews(news);
                      setIsDetailOpen(true);
                      document.body.style.overflow = 'hidden'; // 防止背景滚动
                    }}
                    className="group relative overflow-hidden rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg hover:border-primary/20 transition-all duration-500 min-w-[260px] sm:min-w-[280px] md:min-w-[350px] max-w-[400px] flex-shrink-0 snap-start cursor-pointer"
                  >
                    <div className="relative w-full h-[160px] sm:h-[180px] overflow-hidden bg-gray-50 dark:bg-gray-900/50">
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-gray-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <div className="p-4 relative">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">
                          {news.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {news.date}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300 line-clamp-1">
                        {news.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                        {news.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {news.author}
                        </span>
                        <div className="flex items-center text-primary group-hover:text-primary/80 transition-colors duration-300">
                          <span className="text-xs font-medium">阅读详情</span>
                          <ArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 推荐阅读 */}
            <div className="mb-20">
              <div className="flex items-center mb-10">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">推荐阅读</h2>
                </div>
              </div>
              
              <div 
                ref={postsRef}
                id="recommended-posts"
                className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseEnter={() => setIsPostsHovering(true)}
                onMouseLeave={() => setIsPostsHovering(false)}
              >
                {recommendedPosts.map((article) => (
                  <Link
                    key={article.id}
                    to={article.link}
                    className="group relative overflow-hidden rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-lg transition-all duration-300 min-w-[300px] md:min-w-[400px] snap-start"
                  >
                    {/* 背景渐变效果 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${article.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">
                          {article.category}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {article.readTime}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                        {article.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                        {article.description}
                      </p>
                      
                      {/* 添加标签显示 */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-300 group-hover:shadow-sm group-hover:translate-y-[-1px] ${getTagColors(tag)}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-primary">
                        <span className="text-sm font-medium">阅读更多</span>
                        <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 推荐项目 */}
            <div>
              <div className="flex items-center mb-10">
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">推荐项目</h2>
                </div>
              </div>
              
              <div 
                ref={projectsRef}
                id="recommended-projects"
                className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseEnter={() => setIsProjectsHovering(true)}
                onMouseLeave={() => setIsProjectsHovering(false)}
              >
                {recommendedProjects.map((project) => (
                  <Link
                    key={project.id}
                    to={project.link}
                    className="group relative overflow-hidden rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg hover:border-primary/20 transition-all duration-500 min-w-[250px] md:min-w-[300px] snap-start"
                  >
                    <div className="p-6 relative">
                      {/* 背景渐变效果 */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                      
                      <div className="relative z-10">
                        <h5 className="text-base font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300 line-clamp-1">
                          {project.title}
                        </h5>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {project.tech.slice(0, 3).map((tech, index) => (
                            <span 
                              key={index}
                              className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors duration-300">
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center text-primary group-hover:text-primary/80 transition-colors duration-300">
                          <span className="text-xs font-medium">查看项目</span>
                          <ExternalLink className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 新闻详情悬浮卡片 */}
      <AnimatePresence>
        {isDetailOpen && selectedNews && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => {
                setIsDetailOpen(false);
                document.body.style.overflow = '';
              }}
            />
            
            {/* 卡片内容容器 - 添加外层容器确保居中 */}
            <div className="fixed inset-0 flex items-center justify-center z-50 px-4 py-6" 
              onClick={() => {
                setIsDetailOpen(false);
                document.body.style.overflow = '';
              }}
            >
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
                    <Maximize2 size={20} className="text-primary dark:text-primary-foreground" />
                  </button>
                  {selectedNews?.link && (
                    <a 
                      href={selectedNews.link} 
                      className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={20} className="text-primary dark:text-primary-foreground" />
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setIsDetailOpen(false);
                      document.body.style.overflow = '';
                    }}
                    title="关闭"
                    aria-label="关闭"
                    className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                {/* 新闻内容 */}
                <div className="flex-1 overflow-y-auto">
                  {/* 图片 */}
                  {selectedNews.image && (
                    <div className="w-full h-48 md:h-64 overflow-hidden">
                      <img 
                        src={selectedNews.image} 
                        alt={selectedNews.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* 内容 */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">
                        {selectedNews.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedNews.date}
                      </span>
                    </div>
                    
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {selectedNews.title}
                    </h1>
                    
                    <div className="prose prose-blue dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
                        {selectedNews.description}
                      </p>
                      
                      {selectedNews.content && (
                        <div className="mt-6">
                          <MDXContent content={selectedNews.content} />
                        </div>
                      )}
                      
                      {selectedNews.link && (
                        <div className="mt-8 flex justify-center">
                          <a 
                            href={selectedNews.link} 
                            className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300 flex items-center"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            阅读原文 <ExternalLink size={16} className="ml-2" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* 全屏阅读视图 */}
      <AnimatePresence>
        {isFullscreenView && selectedNews && (
          <div className="fixed inset-0 bg-white dark:bg-gray-900 z-[60] overflow-y-auto">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
              {/* 返回按钮 */}
              <div className="mb-8 flex justify-between items-center">
                <button
                  onClick={handleCloseFullscreen}
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground transition-colors"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  <span>返回</span>
                </button>
                
                {selectedNews.link && (
                  <a 
                    href={selectedNews.link} 
                    className="flex items-center text-primary hover:text-primary-dark transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>访问官网</span>
                    <ExternalLink size={18} className="ml-2" />
                  </a>
                )}
              </div>
              
              {/* 文章内容 */}
              <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                {/* 封面图片 */}
                {selectedNews.image && (
                  <div className="w-full relative aspect-[21/9] overflow-hidden">
                    <img 
                      src={selectedNews.image} 
                      alt={selectedNews.title}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                
                {/* 文章标题信息 */}
                <div className="p-6 md:p-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {selectedNews.category && (
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground rounded-full">
                        {selectedNews.category}
                      </span>
                    )}
                    {selectedNews.date && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <span className="mr-1">日期:</span>
                        {selectedNews.date}
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight" id="article-title">{selectedNews.title}</h1>
                  {selectedNews.author && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <span className="text-sm">作者: {selectedNews.author}</span>
                    </div>
                  )}
                </div>
                
                {/* 文章内容 */}
                <div className="p-6 md:p-8 pt-8">
                  <div className="prose prose-lg prose-blue dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 text-xl">{selectedNews.description}</p>
                    {selectedNews.content && (
                      <div className="mt-6">
                        <MDXContent content={selectedNews.content} />
                      </div>
                    )}
                    {selectedNews.link && (
                      <div className="mt-10 text-center">
                        <a 
                          href={selectedNews.link} 
                          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          阅读原文 <ExternalLink size={16} className="ml-2" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;

