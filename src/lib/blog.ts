export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string | React.ComponentType;
}

export interface BlogPostMeta {
  [x: string]: any;
  category: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export async function getBlogPosts(): Promise<BlogPostMeta[]> {
    const modules = import.meta.glob('../content/*.mdx', { eager: true });
    
    const posts = Object.entries(modules).map(([path, module]) => {
        const slug = path.split('/').pop()?.replace(/\.mdx$/, '') || '';
        const content = module as any;
        const metadata = content.metadata || {};
        
        return {
            slug,
            category: metadata.category || '未分类', // 添加 category 属性
            title: metadata.title || '无标题',
            date: metadata.date || new Date().toISOString(),
            excerpt: metadata.excerpt || '暂无描述',
            tags: metadata.tags || []
        };
    });

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  return getBlogPosts();
}

export function formatDate(date: string) {
    return new Date(date).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
