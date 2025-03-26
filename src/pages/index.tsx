import { useEffect, useState, useRef } from 'react';
import SEO from '../components/SEO';
import { getAllPosts } from '../lib/blog';
import { getAllProjects } from '../lib/projects';
import SplashCursor from '../components/cursor';
import Timeline from '../components/Timeline';
import timelineData from '../data/timelineData';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Code, Star, ExternalLink, ArrowLeft, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { defaultNewsItems } from '../data/ai/news';
import { SpeedInsights } from "@vercel/speed-insights/next";

const Index = () => {
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [recommendedProjects, setRecommendedProjects] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [isPostsHovering, setIsPostsHovering] = useState(false);
  const [isProjectsHovering, setIsProjectsHovering] = useState(false);
  const [isNewsHovering, setIsNewsHovering] = useState(false);
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
  
  return (
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
        
        {/* 交互式时间轴 */}
        {/* <div 
          className={`transition-all duration-1000 transform px-4 max-w-7xl mx-auto ${
            showTimeline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <Timeline nodes={timelineData} />
        </div> */}
  
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
                <Link
                  key={news.id}
                  to={`/ai`}
                  className="group relative overflow-hidden rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg hover:border-primary/20 transition-all duration-500 min-w-[300px] md:min-w-[400px] snap-start"
                >
                  <div className="relative w-full h-[180px] overflow-hidden bg-gray-50 dark:bg-gray-900/50">
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
                        <span className="text-xs font-medium">了解更多</span>
                        <ArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
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
                  {/* 项目预览图 */}
                  <div className="relative w-full h-[160px] overflow-hidden bg-gray-50 dark:bg-gray-900/50">
                    <img 
                      src={project.preview} 
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
                      loading="lazy"
                    />
                    {/* 优化渐变遮罩 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-gray-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* 添加顶部微光效果 */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-4 relative">
                    {/* 背景渐变效果 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300 line-clamp-1">
                        {project.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
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
  );
};

export default Index;

