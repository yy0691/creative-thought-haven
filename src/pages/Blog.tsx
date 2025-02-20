
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { type BlogPostMeta, getBlogPosts, formatDate } from '../lib/blog';
import { CategorySelector } from '../components/CategorySelector';

const blogCategories = [
  { id: 'llm', name: '大语言模型学习笔记', description: '探索AI和大语言模型的学习心得' },
  { id: 'windows', name: 'Windows系统使用教程', description: 'Windows系统使用技巧和教程' },
  { id: 'software', name: '软件/工具推荐', description: '优质软件和工具的使用推荐' },
  { id: 'automation', name: '自动化办公', description: '提升办公效率的自动化解决方案' },
  { id: 'study', name: '学习记录', description: '个人学习过程的心得体会' },
  { id: 'reading', name: '阅读笔记', description: '读书笔记和知识整理' },
];

const Blog = () => {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
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
      const filtered = posts.filter(post => post.category === selectedCategory);
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [selectedCategory, posts]);

  return (
    <div className="page-transition space-y-8 py-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-muted-foreground">Thoughts, tutorials and insights</p>
      </header>
      
      <CategorySelector
        categories={blogCategories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
        className="max-w-4xl mx-auto"
      />
      
      <div className="grid gap-8 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group hover:bg-primary/5 p-6 rounded-lg transition-all duration-300 transform-gpu cursor-default hover:translate-y-[-8px] hover:shadow-lg border border-transparent hover:border-primary/30"
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', perspective: '1000px' }}
          >
            <article className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">{post.title}</h2>
                <time className="text-sm text-muted-foreground group-hover:text-primary/80 transition-colors">{post.date}</time>
              </div>
              <p className="text-muted-foreground group-hover:text-primary/80 transition-colors">{post.description}</p>
              <div className="flex gap-2 flex-wrap">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-primary/5 text-primary px-3 py-1 rounded-full border border-primary/10 hover:bg-primary/10 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;