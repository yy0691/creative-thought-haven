
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
            className="glass rounded-lg p-6 card-hover"
          >
            <article>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">{formatDate(post.date)}</div>
                <h2 className="text-xl font-semibold">{post.title}</h2>
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