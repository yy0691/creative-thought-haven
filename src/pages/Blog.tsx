import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { type BlogPostMeta, getBlogPosts, formatDate } from '../lib/blog';
import { CategorySelector } from '../components/CategorySelector';
import { categories } from '../content/categories';
import SplashCursor from '../components/cursor';
import { LayoutGrid, List, ArrowUpDown, Clock, Tag } from 'lucide-react';

// 定义博客摘要类型
interface PostSummary {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPostMeta[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'tag'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    // 只加载博客摘要列表，不加载全部内容
    const loadPostSummaries = async () => {
      try {
        // 导入摘要文件而不是全部内容
        const postSummaries = await import('../content/blog-summaries.json');
        setPosts(postSummaries.default);
        setLoading(false);
      } catch (e) {
        console.error('Failed to load blog summaries:', e);
        setLoading(false);
      }
    };

    loadPostSummaries();
  }, []);

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
      if (sortBy === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
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

  return (
    <div className="page-transition space-y-6 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* 确保 SplashCursor 在最顶层并且添加适当的定位和 z-index */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
      </div>
      
      <header className="text-center space-y-4 relative z-10">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 animate-gradient">博客文章</h1>
        <p className="text-muted-foreground">Thoughts, tutorials and insights</p>
      </header>
      
      {/* 第一层：主要分类选择按钮 - 单行排列，更小的按钮，增加圆角 */}
      <div className="flex flex-wrap justify-center gap-3 py-3 bg-background/40 backdrop-blur-md rounded-xl">
        <button 
          onClick={() => {
            setSelectedCategory('');
            setSelectedSubcategory('');
          }}
          className={`px-4 py-2 rounded-full text-center transition-all text-sm ${selectedCategory === '' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-accent'}`}
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
            className={`px-4 py-2 rounded-full text-center transition-all text-sm ${selectedCategory === category.id ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-accent'}`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* 第二层：二级分类和控制按钮 */}
      <div className="flex flex-wrap justify-between items-center gap-3 py-3 bg-background/40 backdrop-blur-md rounded-xl">
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
                        className={`px-3 py-1.5 rounded-full text-xs transition-all 
                          ${selectedSubcategory === subcat.id 
                            ? 'bg-primary/10 text-primary border-primary/30 dark:bg-primary/20 dark:text-primary-foreground dark:border-primary/40' 
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
          <div className="flex items-center bg-background/70 rounded-lg p-1">
            <button
              onClick={() => setSortBy('date')}
              className={`p-1.5 rounded-md transition-colors ${sortBy === 'date' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              title="按日期排序"
            >
              <Clock size={16} />
            </button>
            <button
              onClick={() => setSortBy('title')}
              className={`p-1.5 rounded-md transition-colors ${sortBy === 'title' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              title="按标题排序"
            >
              <ArrowUpDown size={16} />
            </button>
            <button
              onClick={() => setSortBy('tag')}
              className={`p-1.5 rounded-md transition-colors ${sortBy === 'tag' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              title="按标签排序"
            >
              <Tag size={16} />
            </button>
            <button
              onClick={toggleSortDirection}
              className="p-1.5 rounded-md hover:bg-accent transition-colors"
              title={sortDirection === 'desc' ? '降序' : '升序'}
            >
              {sortDirection === 'desc' ? '↓' : '↑'}
            </button>
          </div>

          {/* 视图切换 */}
          <div className="flex items-center bg-background/70 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              title="网格视图"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              title="列表视图"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {/* 文章列表 */}
      <div className={viewMode === 'grid' ? 
        "grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" : 
        "flex flex-col gap-4"
      }>
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${encodeURIComponent(post.slug.replace(/^\//, ''))}`}
            className={`glass dark:dark-card rounded-xl p-6 transition-all duration-300 border border-white/20 shadow-lg backdrop-blur-sm relative overflow-hidden ${
              viewMode === 'list' ? 'flex gap-4 items-start' : ''
            } group hover:shadow-xl hover:border-primary/30`}
          >
            {/* 悬浮效果元素 - 渐变光效 */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
            
            {/* 悬浮效果元素 - 微妙的边框光晕 */}
            <div className="absolute inset-px rounded-[10px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out" 
                 style={{background: 'linear-gradient(90deg, transparent, var(--primary-50) 50%, transparent)'}} />
            
            <article className="relative z-10 flex-1">
              <div className={viewMode === 'list' ? 'flex items-start justify-between gap-4' : 'space-y-4'}>
                <div className={viewMode === 'list' ? 'flex-1' : ''}>
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300 mb-2">{post.title}</h2>
                  <p className="text-muted-foreground text-sm mb-3 transition-opacity duration-300 group-hover:text-foreground/90">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag, index) => {
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
                          key={index}
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${tagColors[colorIndex]} transition-all duration-300 group-hover:shadow-sm group-hover:translate-y-[-1px]`}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground group-hover:text-primary/80 transition-colors duration-300 whitespace-nowrap">
                  {formatDate(post.date)}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;