
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { type BlogPostMeta, getBlogPosts, formatDate } from '../lib/blog';
import { CategorySelector } from '../components/CategorySelector';
import { categories } from '../content/categories';

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
          // 当选择了二级分类时，直接匹配完整的分类ID（如 'llm-basics'）
          return post.category === `${selectedCategory}-${selectedSubcategory}`;
        }
        // 当只选择了主分类时，检查文章分类是否以该分类ID开头
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
    <div className="page-transition space-y-8 py-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-muted-foreground">Thoughts, tutorials and insights</p>
      </header>
      
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        onSelect={handleCategorySelect}
        className="max-w-4xl mx-auto"
      />
      
      <div className="grid gap-8 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${encodeURIComponent(post.slug.replace(/^\//, ''))}`}
            className="glass rounded-lg p-6 card-hover transform-gpu transition-all duration-300 hover:scale-[1.02] will-change-transform hover:shadow-xl hover:border-primary/30 group border border-white/20 shadow-lg"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            <article>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">{formatDate(post.date)}</div>
                <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;