import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { type BlogPost, type BlogPostMeta, formatDate, getBlogPosts } from '../lib/blog';
import { MDXProvider } from '@mdx-js/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const components = {
  h1: props => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: props => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
  h3: props => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
  p: props => <p className="my-4" {...props} />,
  ul: props => <ul className="list-disc list-inside my-4 space-y-2" {...props} />,
  ol: props => <ol className="list-decimal list-inside my-4 space-y-2" {...props} />,
  li: props => <li className="ml-4" {...props} />,
  code: ({ children, className }) => {
    const language = className ? className.replace(/language-/, '') : '';
    return (
      <SyntaxHighlighter language={language} style={tomorrow}>
        {children}
      </SyntaxHighlighter>
    );
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostMeta[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const modules = await import(`../content/${slug}.mdx`);
        const Content = modules.default;
        const metadata = modules.metadata || {};
        
        const post: BlogPost = {
          slug: slug || '',
          title: metadata.title || '无标题',
          date: metadata.date || new Date().toISOString(),
          excerpt: metadata.excerpt || '暂无描述',
          tags: metadata.tags || [],
          content: Content
        };
        setPost(post);

        // 加载相关文章
        const allPosts = await getBlogPosts();
        const related = allPosts
          .filter(p => p.slug !== slug && p.tags.some(tag => post.tags.includes(tag)))
          .slice(0, 3);
        setRelatedPosts(related);
      } catch (error) {
        console.error('Failed to load blog post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="page-transition py-12 text-center">
        <p className="text-muted-foreground">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="page-transition py-12 text-center">
        <p className="text-muted-foreground">Post not found</p>
      </div>
    );
  }

  return (
    <div className="page-transition py-12">
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <header className="text-center mb-8 not-prose">
          <div className="text-sm text-muted-foreground mb-2">{formatDate(post.date)}</div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex gap-2 justify-center flex-wrap">
            {post.tags.map(tag => (
              <span key={tag} className="text-sm bg-muted px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mb-12">
          <MDXProvider components={components}>
            {typeof post.content === 'function' ? <post.content /> : post.content}
          </MDXProvider>
        </div>

        {relatedPosts.length > 0 && (
          <aside className="mt-16 not-prose">
            <h2 className="text-2xl font-bold mb-6">相关文章</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {relatedPosts.map(relatedPost => (
                <Link
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="block p-6 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <h3 className="font-semibold mb-2">{relatedPost.title}</h3>
                  <p className="text-sm text-muted-foreground">{relatedPost.excerpt}</p>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </article>
    </div>
  );
};

export default BlogPost;