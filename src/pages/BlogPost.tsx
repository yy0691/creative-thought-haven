import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { type BlogPost, type BlogPostMeta, formatDate, getBlogPosts } from '../lib/blog';
import { MDXProvider } from '@mdx-js/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Alert } from '../components/ui/alert';
import { RandomEmoji } from '../components/RandomEmoji';
import { TableOfContents } from '@/components/TableOfContents';
import { FileConverter } from '../lib/file-converter';
import Highlight from '../components/Highlight';
import MDXComponents from '@/components/MDXComponents';

const components = {
  h1: props => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: props => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
  h3: props => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
  p: props => <p className="my-4" {...props} />,
  ul: props => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
  ol: props => <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />,
  li: props => <li className="pl-2" {...props} />,
  code: ({ children, className, ...props }) => {
    if (className) {
      const language = className.replace(/language-/, '');
      return (
        <SyntaxHighlighter language={language} style={tomorrow}>
          {children}
        </SyntaxHighlighter>
      );
    }
    return <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>;
  },
  div: ({ className, children, ...props }) => {
    if (className?.includes('columns')) {
      const columnCount = className.match(/columns-(\d+)/)?.[1] || '2';
      return (
        <div className={`grid grid-cols-${columnCount} gap-4 my-4`} {...props}>
          {children}
        </div>
      );
    }
    if (className?.includes('highlight')) {
      const colorClass = className.match(/highlight-(yellow|red|green|blue|purple)/)?.[1] || 'yellow';
      const colors = {
        yellow: 'bg-yellow-100 border-yellow-200',
        red: 'bg-red-100 border-red-200',
        green: 'bg-green-100 border-green-200',
        blue: 'bg-blue-100 border-blue-200',
        purple: 'bg-purple-100 border-purple-200'
      };
      return (
        <div className={`p-4 rounded-lg border ${colors[colorClass]} my-4`} {...props}>
          {children}
        </div>
      );
    }
    return <div {...props}>{children}</div>;
  },
  span: ({ className, children, ...props }) => {
    if (className?.includes('highlight')) {
      return <span className="bg-yellow-100 px-1 rounded-sm" {...props}>{children}</span>;
    }
    if (className?.startsWith('text-')) {
      return <span className={className} {...props}>{children}</span>;
    }
    return <span {...props}>{children}</span>;
  },
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      className="text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => {
    const text = children?.props?.children;
    if (text && typeof text === 'string' && text.includes('Part')) {
      return <Highlight type="info">{children}</Highlight>;
    }
    return <blockquote>{children}</blockquote>;
  },
  Alert,
  RandomEmoji,
  img: props => (
    <img
      {...props}
      className="max-w-full h-auto rounded-lg my-4"
      loading="lazy"
    />
  )
};
// 删除重复的组件声明，因为已经在上面的 components 对象中定义过了

const BlogPost = () => {
  const { slug } = useParams();
  // 移除 /blog 前缀（如果存在）
  const cleanSlug = slug?.replace(/^blog\//, '') || '';
  const decodedSlug = decodeURIComponent(cleanSlug);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostMeta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  useEffect(() => {
    // 修改文章加载部分
    const loadPost = async () => {
      if (!slug) return;
      
      try {
        // 获取所有 MDX 文件
        const mdxModules = import.meta.glob('../content/**/*.mdx', { eager: true });
        
        // 查找匹配的文件（需要处理子目录）
        const modulePath = Object.keys(mdxModules).find(path => {
          const fullPath = path.replace('../content/', '').replace(/\.mdx$/, '');
          // 统一使用正斜杠并解码比较
          const normalizedPath = fullPath.replace(/\\/g, '/');
          const decodedSlug = decodeURIComponent(slug);
          // 添加调试日志
          console.log('比较路径:', {
            normalizedPath,
            decodedSlug,
            originalPath: path
          });
          
          // 处理两种可能的路径格式
          return normalizedPath === decodedSlug || 
                 normalizedPath === decodedSlug.replace('WINDOWS_USE_Sub%2F', '') ||
                 normalizedPath.endsWith(decodedSlug);
        });
    
        if (!modulePath) {
          console.error('未找到匹配文件，可用路径:', Object.keys(mdxModules));
          throw new Error(`找不到文章: ${slug}`);
        }
    
        const module = mdxModules[modulePath] as any;
        const content = module.default;
        const metadata = module.metadata || {};
        
        const post: BlogPost = {
          slug,
          title: metadata.title || '无标题',
          date: metadata.date || new Date().toISOString(),
          excerpt: metadata.excerpt || '暂无描述',
          tags: metadata.tags || [],
          content,
          category: metadata.category || ''
        };
        
        setPost(post);
        
        // 加载相关文章
        const allPosts = await getBlogPosts();
        const related = allPosts
          .filter(p => p.slug !== slug && p.tags.some(tag => post.tags.includes(tag)))
          .slice(0, 3);
        setRelatedPosts(related);
    } catch (error) {
      console.error('加载文章失败:', error);
      setError(error instanceof Error ? error.message : '未知错误');
    } finally {
      setIsLoading(false);
    }
    };
    loadPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">文章未找到</h1>
        <Link to="/blog" className="text-primary hover:underline">返回博客列表</Link>
      </div>
    );
  }

  return (
    <div className="page-transition min-h-screen">
      <article className={`prose prose-lg dark:prose-invert mx-auto py-12 px-4 transition-all duration-500 ease-in-out ${!isCollapsed ? 'md:ml-64 max-w-3xl' : 'max-w-4xl'}`}>
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 hover:scale-105 transition-transform duration-300 transform-gpu backface-visibility-hidden will-change-transform">{post.title}</h1>
          <div className="text-muted-foreground mb-4">{formatDate(post.date)}</div>
          <div className="flex gap-2 justify-center flex-wrap">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-muted rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <MDXProvider
          components={{
            ...components,
            ...MDXComponents,
            blockquote: (props) => (
              <Highlight type="info">{props.children}</Highlight>
            )
          }}
        >
          <post.content />
        </MDXProvider>

        {relatedPosts.length > 0 && (
          <aside className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">相关文章</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map(related => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="glass rounded-lg p-4 card-hover"
                >
                  <h3 className="font-semibold mb-2">{related.title}</h3>
                  <p className="text-sm text-muted-foreground">{related.excerpt}</p>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </article>
      <TableOfContents content={post.content} />
    </div>
  );
};

export default BlogPost;