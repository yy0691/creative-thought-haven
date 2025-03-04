
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { type BlogPostMeta, getBlogPosts, formatDate } from '../lib/blog';
import { CategorySelector } from '../components/CategorySelector';
import { categories } from '../content/categories';
import SplashCursor from '../components/cursor';
import { LayoutGrid, List, ArrowUpDown, Clock, Tag } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPostMeta[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'tag'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = await getBlogPosts();
      setPosts(allPosts);
      setFilteredPosts(allPosts);
    };
    loadPosts();
  }, []);

  useEffect(() => {
    let filtered = [...posts];
    
    // 应用分类过滤
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
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
  }, [posts, selectedCategory, sortBy, sortDirection]);

  const handleCategorySelect = (category: string, subcategory: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className="page-transition space-y-8 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SplashCursor 
        SPLAT_RADIUS={0.12}
        DYE_RESOLUTION={256}
        SPLAT_FORCE={2500}
        DENSITY_DISSIPATION={6}
        VELOCITY_DISSIPATION={3.5}
        COLOR_UPDATE_SPEED={12}
        BACK_COLOR={{ r: 0, g: 0, b: 0 }}
      />
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 animate-gradient">Blog</h1>
        <p className="text-muted-foreground">Thoughts, tutorials and insights</p>
      </header>
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <CategorySelector
          categories={[{
            id: '', name: '所有', label: '所有',
            description: ''
          }, ...categories]}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          onSelect={handleCategorySelect}
          className="max-w-4xl"
        />
        
        <div className="flex items-center gap-4">
          {/* 排序控制 */}
          <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm rounded-lg p-2 border border-border">
            <button
              onClick={() => setSortBy('date')}
              className={`p-2 rounded-md transition-colors ${sortBy === 'date' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              title="按日期排序"
            >
              <Clock size={18} />
            </button>
            <button
              onClick={() => setSortBy('title')}
              className={`p-2 rounded-md transition-colors ${sortBy === 'title' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              title="按标题排序"
            >
              <ArrowUpDown size={18} />
            </button>
            <button
              onClick={() => setSortBy('tag')}
              className={`p-2 rounded-md transition-colors ${sortBy === 'tag' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              title="按标签排序"
            >
              <Tag size={18} />
            </button>
            <button
              onClick={toggleSortDirection}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              title={sortDirection === 'desc' ? '降序' : '升序'}
            >
              {sortDirection === 'desc' ? '↓' : '↑'}
            </button>
          </div>

          {/* 视图切换 */}
          <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm rounded-lg p-2 border border-border">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              title="网格视图"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              title="列表视图"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className={viewMode === 'grid' ? 
        "grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" : 
        "flex flex-col gap-4"
      }>
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${encodeURIComponent(post.slug.replace(/^\//, ''))}`}
            className={`glass dark:dark-card rounded-xl p-6 transform-gpu transition-all duration-500 hover:scale-[1.02] will-change-transform hover:shadow-2xl hover:border-primary/30 group border border-white/20 shadow-lg backdrop-blur-sm relative overflow-hidden ${
              viewMode === 'list' ? 'flex gap-4 items-start' : ''
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
            <article className="relative z-10 flex-1">
              <div className={viewMode === 'list' ? 'flex items-start justify-between gap-4' : 'space-y-4'}>
                <div className={viewMode === 'list' ? 'flex-1' : ''}>
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300 mb-2">{post.title}</h2>
                  <p className="text-muted-foreground text-sm mb-3">{post.excerpt}</p>
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
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${tagColors[colorIndex]} transition-colors`}
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