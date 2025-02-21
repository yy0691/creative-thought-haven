import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../../lib/blog';
import { toast } from '@/components/ui/use-toast';
import { savePost, deletePost } from '../../lib/file-system';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BlogPost {
  title: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
  content: string;
  slug: string;
}

const blogCategories = [
  { id: 'llm', name: '大语言模型学习笔记', description: '探索AI和大语言模型的学习心得' },
  { id: 'windows', name: 'Windows系统使用教程', description: 'Windows系统使用技巧和教程' },
  { id: 'software', name: '软件/工具推荐', description: '优质软件和工具的使用推荐' },
  { id: 'automation', name: '自动化办公', description: '提升办公效率的自动化解决方案' },
  { id: 'study', name: '学习记录', description: '个人学习过程的心得体会' },
  { id: 'reading', name: '阅读笔记', description: '读书笔记和知识整理' },
];

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState<BlogPost>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'llm',
    tags: [],
    description: '',
    content: '',
    slug: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (selectedPost) {
      setFormData({
        ...selectedPost,
        date: new Date(selectedPost.date).toISOString().split('T')[0]
      });
    } else {
      setFormData({
        title: '',
        date: new Date().toISOString().split('T')[0],
        category: 'llm',
        tags: [],
        description: '',
        content: '',
        slug: ''
      });
    }
  }, [selectedPost]);

  const loadPosts = async () => {
    try {
      const allPosts = await getAllPosts();
      // 将 BlogPostMeta 类型转换为 BlogPost 类型，并获取文章内容
      const postsWithContent = await Promise.all(allPosts.map(async post => {
        const response = await fetch(`http://localhost:3001/api/posts/${post.slug}`);
        const data = await response.json();
        return {
          ...post,
          description: post.excerpt || '',
          content: data.content || ''
        };
      }));
      setPosts(postsWithContent);
    } catch (error) {
      console.error('加载文章失败:', error);
      toast({
        title: '错误',
        description: '加载文章列表失败',
        variant: 'destructive',
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = '标题不能为空';
    }
    if (!formData.date) {
      newErrors.date = '请选择发布日期';
    }
    if (!formData.description.trim()) {
      newErrors.description = '描述不能为空';
    }
    if (!formData.content.trim()) {
      newErrors.content = '内容不能为空';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 添加生成 slug 的函数
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[\s\u4e00-\u9fa5]/g, '-') // 将空格和中文字符替换为连字符
      .replace(/[^a-z0-9-]/g, '') // 移除非字母数字和连字符的字符
      .replace(/-+/g, '-') // 将多个连字符替换为单个
      .replace(/^-|-$/g, ''); // 移除首尾的连字符
  };

  // 修改表单数据变更的处理函数
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // 当标题改变时，自动生成 slug
      if (field === 'title') {
        newData.slug = generateSlug(value);
      }
      
      return newData;
    });
  };

  const handleTagsChange = (value: string) => {
    // 允许输入英文逗号，并正确分割标签
    const tags = value
      .split(/[,，]/) // 同时支持中英文逗号
      .map(tag => tag.trim())
      .filter(Boolean); // 过滤空标签

    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      // 检查 slug 是否存在
      if (!formData.slug) {
        toast({
          title: '错误',
          description: '无法生成文章链接，请检查标题',
          variant: 'destructive',
        });
        return;
      }

      // 构建 frontmatter
      const frontmatter = {
        title: formData.title,
        date: formData.date,
        category: formData.category,
        tags: formData.tags,
        excerpt: formData.description
      };

      const frontmatterContent = Object.entries(frontmatter)
        .map(([key, value]) => {
          if (key === 'tags' && Array.isArray(value)) {
            return `${key}: [${value.map(tag => `"${tag}"`).join(', ')}]`;
          }
          return `${key}: "${value}"`;
        })
        .join('\n');

      const mdxContent = `---
${frontmatterContent}
---

${formData.content}`;

      // 确保 URL 路径正确
      const baseUrl = 'http://localhost:3001/api/posts';
      const url = selectedPost 
        ? `${baseUrl}/${formData.slug}` 
        : baseUrl;

      console.log('请求 URL:', url); // 调试用

      const response = await fetch(url, {
        method: selectedPost ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: formData.slug,
          content: mdxContent
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('服务器响应:', errorText); // 调试用
        throw new Error(`保存失败: ${errorText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || '保存失败');
      }

      toast({
        title: '成功',
        description: '文章已保存',
      });

      await loadPosts();
      setIsEditing(false);
      setSelectedPost(null);
    } catch (error) {
      console.error('保存文章失败:', error);
      toast({
        title: '错误',
        description: error instanceof Error ? error.message : '保存文章失败',
        variant: 'destructive',
      });
    }
  };

  // 添加解析 frontmatter 的函数
  const parseFrontmatter = (content: string) => {
    const match = content.match(/^---([\s\S]*?)---\n([\s\S]*)$/);
    if (!match) return null;

    try {
      const [, frontmatterStr, contentStr] = match;
      const frontmatter = frontmatterStr
        .split('\n')
        .filter(Boolean)
        .reduce((acc, line) => {
          const [key, ...values] = line.split(':').map(s => s.trim());
          const value = values.join(':').replace(/^["']|["']$/g, ''); // 移除引号
          if (key === 'tags') {
            // 处理标签数组
            acc[key] = value
              .replace(/[\[\]]/g, '') // 移除方括号
              .split(',')
              .map(tag => tag.trim().replace(/^["']|["']$/g, '')); // 移除引号
          } else {
            acc[key] = value;
          }
          return acc;
        }, {} as Record<string, any>);

      return {
        frontmatter,
        content: contentStr.trim()
      };
    } catch (error) {
      console.error('解析 frontmatter 失败:', error);
      return null;
    }
  };

  // 修改选择文章的处理函数
  const handleSelectPost = async (post: BlogPost) => {
    try {
      const response = await fetch(`http://localhost:3001/api/posts/${post.slug}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error('获取文章内容失败');
      }

      const parsed = parseFrontmatter(data.content);
      if (!parsed) {
        throw new Error('解析文章内容失败');
      }

      const { frontmatter, content } = parsed;

      // 确保设置 slug
      setFormData({
        title: frontmatter.title || '',
        date: frontmatter.date || '',
        category: frontmatter.category || '',
        tags: frontmatter.tags || [],
        description: frontmatter.excerpt || '', // 注意这里使用 excerpt
        content: content,
        slug: post.slug // 确保设置 slug
      });

      setSelectedPost(post);
      setIsEditing(true);
    } catch (error) {
      console.error('加载文章失败:', error);
      toast({
        title: '错误',
        description: '加载文章失败',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">博客文章管理</h1>
            <p className="text-gray-600 mt-2">创建、编辑和管理博客文章</p>
          </div>
          <button
            onClick={() => {
              setSelectedPost(null);
              setIsEditing(true);
            }}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            新建文章
          </button>
        </header>

        <div className="grid grid-cols-12 gap-8">
          {/* 左侧文章列表 */}
          <div className="col-span-4 bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              {/* 搜索框 */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索文章..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* 分类筛选 */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`px-3 py-1 rounded-full text-sm ${!selectedCategory ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  全部
                </button>
                {blogCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 rounded-full text-sm ${selectedCategory === category.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* 文章列表 */}
              <div className="space-y-4 mt-6">
                {posts
                  .filter(post => 
                    (!selectedCategory || post.category === selectedCategory) &&
                    (!searchTerm || 
                      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      post.description?.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                  )
                  .map((post) => (
                    <div
                      key={post.slug}
                      onClick={() => {
                        handleSelectPost(post);
                      }}
                      className="p-4 border border-gray-200 rounded-lg hover:border-primary/50 cursor-pointer transition-colors"
                    >
                      <h3 className="font-medium text-gray-900">{post.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                      <div className="flex gap-2 mt-2">
                        {post.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (window.confirm('确定要删除这篇文章吗？')) {
                              try {
                                const success = await deletePost(post.slug);
                                if (success) {
                                  toast({
                                    title: '成功',
                                    description: '文章已删除',
                                  });
                                  await loadPosts();
                                } else {
                                  throw new Error('删除文章失败');
                                }
                              } catch (error) {
                                console.error('删除文章失败:', error);
                                toast({
                                  title: '错误',
                                  description: '删除文章失败',
                                  variant: 'destructive',
                                });
                              }
                            }
                          }}
                          className="text-sm text-red-500 hover:text-red-700"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* 右侧编辑区域 */}
          <div className="col-span-8 bg-white rounded-xl shadow-lg p-6">
            {isEditing ? (
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="文章标题"
                  className={`w-full px-4 py-2 text-xl font-medium border-b border-gray-200 focus:outline-none focus:border-primary ${errors.title ? 'border-red-500' : ''}`}
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                    >
                      {blogCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">发布日期</label>
                    <input
                      type="date"
                      className={`w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.date ? 'border-red-500' : ''}`}
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">标签</label>
                  <Input
                    value={formData.tags.join(', ')}
                    onChange={(e) => handleTagsChange(e.target.value)}
                    placeholder="输入标签，用逗号分隔"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                  <textarea
                    rows={3}
                    className={`w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.description ? 'border-red-500' : ''}`}
                    placeholder="请输入文章描述"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
                  <textarea
                    rows={12}
                    className={`w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono ${errors.content ? 'border-red-500' : ''}`}
                    placeholder="使用 Markdown 编写文章内容"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                  />
                  {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    取消
                  </Button>
                  <Button 
                    onClick={handleSave}
                  >
                    保存
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V6a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="mt-4">选择一篇文章进行编辑，或创建新文章</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogManager;