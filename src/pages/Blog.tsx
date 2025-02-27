
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { type BlogPostMeta, getBlogPosts, formatDate } from '../lib/blog';
import { CategorySelector } from '../components/CategorySelector';
import { categories } from '../content/categories';
import SplashCursor from '../components/cursor';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPostMeta[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.className = 'mouse-ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = await getBlogPosts();
      setPosts(allPosts);
      setFilteredPosts(allPosts);
    };
    loadPosts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = posts.filter(post => {
        if (selectedSubcategory) {
          return post.category === `${selectedCategory}-${selectedSubcategory}`;
        }
        return post.category.startsWith(`${selectedCategory}-`);
      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [selectedCategory, selectedSubcategory, posts]);

  const handleCategorySelect = (categoryId: string, subcategoryId?: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(subcategoryId || '');
  };

  return (
    <div className="page-transition space-y-8 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SplashCursor 
        SPLAT_RADIUS={0.15}
        DYE_RESOLUTION={512}
        SPLAT_FORCE={3000}
        DENSITY_DISSIPATION={4}
        VELOCITY_DISSIPATION={2.5}
        COLOR_UPDATE_SPEED={10}
        BACK_COLOR={{ r: 0, g: 0, b: 0 }}
      />
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 animate-gradient">Blog</h1>
        <p className="text-muted-foreground">Thoughts, tutorials and insights</p>
      </header>
      
      <CategorySelector
        categories={[{ id: '', label: '所有' }, ...categories]}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        onSelect={handleCategorySelect}
        className="max-w-4xl mx-auto"
      />
      
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${encodeURIComponent(post.slug.replace(/^//,''))}`}
            className="glass rounded-xl p-6 transform-gpu transition-all duration-500 hover:scale-[1.02] will-change-transform hover:shadow-2xl hover:border-primary/30 group border border-white/20 shadow-lg backdrop-blur-sm relative overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
            <article className="relative z-10">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="text-sm text-muted-foreground group-hover:text-primary/80 transition-colors duration-300">{formatDate(post.date)}</div>
                </div>
                <h2 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">{post.title}</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags?.map((tag, index) => {
                    const tagColors = [
                      'bg-blue-100 text-blue-800',
                      'bg-green-100 text-green-800',
                      'bg-purple-100 text-purple-800',
                      'bg-yellow-100 text-yellow-800',
                      'bg-pink-100 text-pink-800'
                    ];
                    const colorIndex = Math.abs(tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % tagColors.length;
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
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;