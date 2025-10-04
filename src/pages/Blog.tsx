import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { type BlogPostMeta, formatDate, getBlogPosts } from '../lib/blog';
//import { useArticles } from '../hooks/useContent'; // 添加这行
import { CategorySelector } from '../components/CategorySelector';
import { categories } from '../content/categories';
import SplashCursor from '../components/cursor';
import { LayoutGrid, List, ArrowUpDown, Clock, Tag, AlignJustify, Pin as PinIcon } from 'lucide-react';
import { Virtuoso } from 'react-virtuoso';



// 定义博客摘要类型，与BlogPostMeta兼容
type PostSummary = BlogPostMeta;

const BlogList = ({ posts }) => {
  return (
    <Virtuoso
      style={{ height: 'calc(100vh - 300px)' }}
      totalCount={posts.length}
      itemContent={index => {
        const post = posts[index];
        return (
          <div className="p-4 border rounded-lg mb-4 hover:shadow-md transition-shadow">
            <Link to={`/blog/${post.slug}`} className="block">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-600">{post.excerpt}</p>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span>{new Date(post.date).toLocaleDateString('zh-CN')}</span>
                <span className="mx-2">•</span>
                <span>{post.category}</span>
              </div>
            </Link>
          </div>
        );
      }}
    />
  );
};

const Blog = () => {
  // 使用新的数据源
  //const { articles, loading: articlesLoading, error: articlesError } = useArticles();
  
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const blogPosts = await getBlogPosts();
        setPosts(blogPosts);
        setError(null);
      } catch (err) {
        console.error('加载博客文章失败:', err);
        setError(err instanceof Error ? err.message : '加载文章失败');
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<PostSummary[]>([]);
  // 从localStorage加载视图模式，如果没有则使用默认值'grid'
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>(() => {
    const stored = localStorage.getItem('blogViewMode');
    return stored === 'list' || stored === 'compact' ? stored : 'grid';
  });
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'tag'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // 当视图模式变化时，保存到localStorage
  useEffect(() => {
    localStorage.setItem('blogViewMode', viewMode);
  }, [viewMode]);

  // 将 articles 转换为 PostSummary 格式
  // const posts: PostSummary[] = useMemo(() => {
  //   return articles.map(article => ({
  //     slug: article.slug,
  //     category: article.category,
  //     title: article.title,
  //     date: article.date,
  //     excerpt: article.excerpt,
  //     tags: article.tags || [],
  //     isSticky: article.featured || false,
  //     isRecommended: article.featured || false,
  //     type: 'mdx'
  //   }));
  // }, [articles]);

  // useEffect(() => {
  //   // 只加载博客摘要列表，不加载全部内容
  //   const loadPostSummaries = async () => {
  //     try {
  //       // 导入摘要文件而不是全部内容
  //       const postSummaries = await getBlogPosts();
  //       setPosts(postSummaries);
  //       setLoading(false);
  //     } catch (e) {
  //       console.error('Failed to load blog summaries:', e);
  //       setLoading(false);
  //     }
  //   };

  //   loadPostSummaries();
  // }, []);

  useEffect(() => {
    let filtered = [...posts];
    
    // 应用分类过滤
    if (selectedCategory) {
      if (selectedSubcategory) {
        // 同时筛选一级和二级分类
        // 格式为："一级分类id-二级分类id"
        const fullCategory = `${selectedCategory}-${selectedSubcategory}`;
        filtered = filtered.filter(post => post.category === fullCategory);
      } else {
        // 只筛选一级分类
        // 检查 category 是否以 selectedCategory- 开头
        filtered = filtered.filter(post => 
          post.category === selectedCategory || // 精确匹配
          post.category.startsWith(`${selectedCategory}-`) // 带有二级分类的匹配
        );
      }
    }

    // 应用排序
    filtered.sort((a, b) => {
      // 首先按置顶状态排序
      if (a.isSticky && !b.isSticky) return -1;
      if (!a.isSticky && b.isSticky) return 1;
      
      // 然后按选定的排序字段排序
      if (sortBy === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortDirection === 'desc' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
      } else if (sortBy === 'title') {
        return sortDirection === 'desc' 
          ? b.title.localeCompare(a.title)
          : a.title.localeCompare(b.title);
      } else { // sortBy === 'tag'
        const tagA = a.tags?.[0] || '';
        const tagB = b.tags?.[0] || '';
        return sortDirection === 'desc'
          ? tagB.localeCompare(tagA)
          : tagA.localeCompare(tagB);
      }
    });

    setFilteredPosts(filtered);
  }, [posts, selectedCategory, selectedSubcategory, sortBy, sortDirection]);

  const handleCategorySelect = (category: string, subcategory: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  if (loading) return <div>加载博客列表中...</div>;
  if (error) return <div>加载博客列表失败: {error}</div>;

  return (
    <div className="page-transition space-y-6 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* 确保 SplashCursor 在最顶层并且添加适当的定位和 z-index */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
      </div>
      
      <header className="text-center space-y-4 relative z-10">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 animate-gradient">博客文章</h1>
        <p className="text-muted-foreground dark:text-gray-300">Thoughts, tutorials and insights</p>
      </header>
      
      {/* 第一层：主要分类选择按钮 - 单行排列，更小的按钮，增加圆角 */}
      <div className="flex flex-wrap justify-center gap-3 py-3 bg-background/40 backdrop-blur-md rounded-xl dark:bg-black/30">
        <button 
          onClick={() => {
            setSelectedCategory('');
            setSelectedSubcategory('');
          }}
          className={`px-4 py-2 rounded-full text-center transition-all text-sm dark:text-gray-200 ${
            selectedCategory === '' 
              ? 'bg-primary text-primary-foreground shadow-sm dark:text-gray-900' 
              : 'hover:bg-accent hover:text-foreground dark:hover:bg-gray-800 dark:hover:text-white'
          }`}
        >
          所有
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.id);
              setSelectedSubcategory('');
            }}
            className={`px-4 py-2 rounded-full text-center transition-all text-sm dark:text-gray-200 ${
              selectedCategory === category.id 
                ? 'bg-primary text-primary-foreground shadow-sm dark:text-gray-900' 
                : 'hover:bg-accent hover:text-foreground dark:hover:bg-gray-800 dark:hover:text-white'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* 第二层：二级分类和控制按钮 */}
      <div className="flex flex-wrap justify-between items-center gap-3 py-3 bg-background/40 backdrop-blur-md rounded-xl dark:bg-black/30">
        {/* 左侧：二级分类按钮 */}
        <div className="flex flex-wrap gap-2">
          {selectedCategory && (
            <>
              {(() => {
                const currentCategory = categories.find(c => c.id === selectedCategory);
                if (!currentCategory || !currentCategory.subcategories?.length) return null;
                
                return (
                  <>
                    {currentCategory.subcategories.map(subcat => (
                      <button
                        key={subcat.id}
                        onClick={() => setSelectedSubcategory(subcat.id)}
                        className={`px-3 py-1.5 rounded-full text-xs transition-all dark:text-gray-300
                          ${selectedSubcategory === subcat.id 
                            ? 'bg-primary/10 text-primary border-primary/30 dark:bg-primary/80 dark:text-gray-900 dark:border-primary/40' 
                            : 'hover:bg-primary/5 hover:text-primary hover:border-primary/20 dark:hover:bg-primary/15 dark:hover:text-primary-foreground'}
                          border border-white/20 dark:border-gray-700`}
                      >
                        {subcat.name}
                      </button>
                    ))}
                  </>
                );
              })()}
            </>
          )}
        </div>
        
        {/* 右侧：控制按钮 */}
        <div className="flex items-center gap-3">
          {/* 排序控制 */}
          <div className="flex items-center bg-background/70 dark:bg-black/50 rounded-lg p-1">
            <button
              onClick={() => setSortBy('date')}
              className={`p-1.5 rounded-md transition-colors dark:text-gray-300 ${
                sortBy === 'date' 
                  ? 'bg-primary text-primary-foreground dark:text-gray-900' 
                  : 'hover:bg-accent dark:hover:bg-gray-700'
              }`}
              title="按日期排序"
            >
              <Clock size={16} />
            </button>
            <button
              onClick={() => setSortBy('title')}
              className={`p-1.5 rounded-md transition-colors dark:text-gray-300 ${
                sortBy === 'title' 
                  ? 'bg-primary text-primary-foreground dark:text-gray-900' 
                  : 'hover:bg-accent dark:hover:bg-gray-700'
              }`}
              title="按标题排序"
            >
              <ArrowUpDown size={16} />
            </button>
            <button
              onClick={() => setSortBy('tag')}
              className={`p-1.5 rounded-md transition-colors dark:text-gray-300 ${
                sortBy === 'tag' 
                  ? 'bg-primary text-primary-foreground dark:text-gray-900' 
                  : 'hover:bg-accent dark:hover:bg-gray-700'
              }`}
              title="按标签排序"
            >
              <Tag size={16} />
            </button>
            <button
              onClick={toggleSortDirection}
              className="p-1.5 rounded-md hover:bg-accent dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              title={sortDirection === 'desc' ? '降序' : '升序'}
            >
              {sortDirection === 'desc' ? '↓' : '↑'}
            </button>
          </div>

          {/* 视图切换 */}
          <div className="flex items-center bg-background/70 dark:bg-black/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors dark:text-gray-300 ${
                viewMode === 'grid' 
                  ? 'bg-primary text-primary-foreground dark:text-gray-900' 
                  : 'hover:bg-accent dark:hover:bg-gray-700'
              }`}
              title="网格视图"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors dark:text-gray-300 ${
                viewMode === 'list' 
                  ? 'bg-primary text-primary-foreground dark:text-gray-900' 
                  : 'hover:bg-accent dark:hover:bg-gray-700'
              }`}
              title="列表视图"
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`p-1.5 rounded-md transition-colors dark:text-gray-300 ${
                viewMode === 'compact' 
                  ? 'bg-primary text-primary-foreground dark:text-gray-900' 
                  : 'hover:bg-accent dark:hover:bg-gray-700'
              }`}
              title="紧凑视图"
            >
              <AlignJustify size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {/* 文章列表 */}
      <div className={
        viewMode === 'grid' 
          ? "grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" 
          : viewMode === 'compact'
            ? "max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
            : "flex flex-col gap-4"
      }>
        {viewMode === 'compact' ? (
          <>
            {[0, 1].map((colIndex) => {
              // 计算每列显示的文章数量
              const postsPerColumn = Math.ceil(filteredPosts.length / 2);
              // 根据列索引获取对应的文章列表
              const columnPosts = filteredPosts.slice(
                colIndex * postsPerColumn, 
                Math.min((colIndex + 1) * postsPerColumn, filteredPosts.length)
              );
              
              return columnPosts.length > 0 ? (
                <div key={colIndex} className="border border-border dark:border-gray-800 rounded-md overflow-hidden">
                  <table className="w-full text-base">
                    <thead className="bg-muted/50 dark:bg-gray-800/50">
                      <tr className="border-b border-border dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground dark:text-gray-300">标题</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground dark:text-gray-300 w-[120px]">标签</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground dark:text-gray-300 w-[130px]">日期</th>
                      </tr>
                    </thead>
                    <tbody>
                      {columnPosts.map((post) => (
                        <tr 
                          key={post.slug} 
                          className="border-b border-border/50 dark:border-gray-800/70 hover:bg-muted/30 dark:hover:bg-gray-800/30 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <Link 
                              to={`/blog/${encodeURIComponent(post.slug.replace(/^\//, ''))}`}
                              className="block hover:text-primary transition-colors relative"
                            >
                              {/* 置顶图标 */}
                              {post.isSticky && (
                                <div className="absolute -right-1 top-1/2 -translate-y-1/2 z-10  p-1 rounded-full text-primary dark:bg-primary/30 dark:text-primary-foreground" title="置顶文章">
                                  <PinIcon size={12} className="animate-pulse" />
                                </div>
                              )}
                              <div className="flex items-center">
                                <h2 className="text-[16px] font-medium leading-[1.6] line-clamp-1 pr-6 flex items-center">
                                  {post.title}
                                </h2>
                              </div>
                            </Link>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {post.tags && post.tags.length > 0 && (
                                <>
                                  {(() => {
                                    const tag = post.tags[0];
                                    const tagColors = [
                                      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
                                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
                                      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
                                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
                                      'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200'
                                    ];
                                    const colorIndex = Math.abs(tag.split('').reduce((acc: number, char) => acc + char.charCodeAt(0), 0)) % tagColors.length;
                                    
                                    return (
                                      <span
                                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${tagColors[colorIndex]}`}
                                      >
                                        {tag}
                                      </span>
                                    );
                                  })()}
                                  
                                  {post.tags.length > 1 && (
                                    <span className="text-xs text-muted-foreground">
                                      +{post.tags.length - 1}
                                    </span>
                                  )}
                                </>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground text-right whitespace-nowrap">
                            {formatDate(post.date)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null;
            })}
          </>
        ) : (
          filteredPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${encodeURIComponent(post.slug.replace(/^\//, ''))}`}
              className={`glass dark:dark-card rounded-xl transition-all duration-300 border border-white/20 backdrop-blur-sm relative overflow-hidden group ${
                viewMode === 'list'
                  ? 'p-4 hover:shadow-md hover:border-primary/20 hover:bg-accent/5'
                  : 'p-6 shadow-lg hover:shadow-xl hover:border-primary/30'
              }`}
            >
              {viewMode === 'list' ? (
                <>
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        {post.isSticky && (
                          <div className="flex-shrink-0 text-primary dark:text-primary-foreground" title="置顶文章">
                            <PinIcon size={16} className="animate-pulse" />
                          </div>
                        )}

                        <h2 className="text-lg font-medium group-hover:text-primary transition-colors duration-200 dark:text-white truncate">
                          {post.title}
                        </h2>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center gap-1.5">
                          {post.tags.slice(0, 2).map((tag, index) => {
                            const tagColors = [
                              'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
                              'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
                              'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
                              'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
                              'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300'
                            ];
                            const colorIndex = Math.abs(tag.split('').reduce((acc: number, char) => acc + char.charCodeAt(0), 0)) % tagColors.length;

                            return (
                              <span
                                key={index}
                                className={`px-2.5 py-1 rounded-md text-xs font-medium ${tagColors[colorIndex]}`}
                              >
                                {tag}
                              </span>
                            );
                          })}
                          {post.tags.length > 2 && (
                            <span className="text-xs text-muted-foreground dark:text-gray-400">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex-shrink-0 text-sm text-muted-foreground dark:text-gray-400 min-w-[100px] text-right">
                      {formatDate(post.date)}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {post.isSticky && (
                    <div className="absolute top-2 right-2 z-20 bg-primary/10 p-1.5 rounded-full text-primary dark:bg-primary/30 dark:text-primary-foreground shadow-sm" title="置顶文章">
                      <PinIcon size={14} className="animate-pulse" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />

                  <div className="absolute inset-px rounded-[10px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"
                       style={{background: 'linear-gradient(90deg, transparent, var(--primary-50) 50%, transparent)'}} />

                  <article className="relative z-10 flex-1">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h2 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300 dark:text-white flex items-center">
                            {post.title}
                          </h2>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3 transition-opacity duration-300 group-hover:text-foreground/90 dark:text-gray-300">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags?.map((tag, index) => {
                            const tagColors = [
                              'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
                              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
                              'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200',
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
                              'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200'
                            ];
                            const colorIndex = Math.abs(tag.split('').reduce((acc: number, char) => acc + char.charCodeAt(0), 0)) % tagColors.length;

                            return (
                              <span
                                key={index}
                                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${tagColors[colorIndex]} transition-all duration-300 group-hover:shadow-sm group-hover:translate-y-[-1px]`}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground group-hover:text-primary/80 transition-colors duration-300">
                        {formatDate(post.date)}
                      </div>
                    </div>
                  </article>
                </>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;