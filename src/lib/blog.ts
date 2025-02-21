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
    // 获取 MDX 和 MD 文件
    const mdxModules = import.meta.glob('../content/*.{md,mdx}', { eager: true });
    const mdxPosts = Object.entries(mdxModules).map(([path, module]) => {
        const slug = path.split('/').pop()?.replace(/\.(md|mdx)$/, '') || '';
        const content = module as any;
        const metadata = content.metadata || {};
        
        return {
            slug,
            category: metadata.category || '未分类',
            title: metadata.title || '无标题',
            date: metadata.date || new Date().toISOString(),
            excerpt: metadata.excerpt || '暂无描述',
            tags: metadata.tags || [],
            type: path.endsWith('.md') ? 'md' : 'mdx'
        };
    });

    // 获取 Word 文件
    const wordFiles = import.meta.glob('../content/*.docx', { eager: true });
    const wordPosts = Object.entries(wordFiles).map(([path]) => {
        const fileName = path.split('/').pop() || '';
        const slug = fileName.replace(/\.docx$/, '');
        
        return {
            slug,
            category: 'reading',  // 默认归类到阅读笔记
            title: slug,  // 使用文件名作为标题
            date: new Date().toISOString(),
            excerpt: '从 Word 文档导入的笔记',
            tags: ['读书笔记'],
            type: 'docx'
        };
    });

    const allPosts = [...mdxPosts, ...wordPosts];

    return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
