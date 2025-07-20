import { useState, useEffect } from 'react';

interface Article {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  content: string;
  author?: string;
  toc?: boolean;
  draft?: boolean;
  featured?: boolean;
  cover?: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  articles: Article[];
  subcategories?: Category[];
}

interface Tag {
  name: string;
  count: number;
  articles: Article[];
}

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetch('/data/articles.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载文章失败');
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  return { articles, loading, error };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Record<string, Category>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch('/data/categories.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载分类失败');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, loading, error };
};

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const response = await fetch('/data/tags.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTags(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载标签失败');
      } finally {
        setLoading(false);
      }
    };

    loadTags();
  }, []);

  return { tags, loading, error };
};

export const useSearchIndex = () => {
  const [searchIndex, setSearchIndex] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSearchIndex = async () => {
      try {
        const response = await fetch('/data/search-index.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSearchIndex(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载搜索索引失败');
      } finally {
        setLoading(false);
      }
    };

    loadSearchIndex();
  }, []);

  return { searchIndex, loading, error };
};

// 工具函数
export const getArticleBySlug = (articles: Article[], slug: string): Article | undefined => {
  return articles.find(article => article.slug === slug);
};

export const getArticlesByCategory = (articles: Article[], category: string): Article[] => {
  return articles.filter(article => article.category === category);
};

export const getArticlesByTag = (articles: Article[], tag: string): Article[] => {
  return articles.filter(article => 
    article.tags && article.tags.includes(tag)
  );
};

export const searchArticles = (searchIndex: any[], query: string): any[] => {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase();
  return searchIndex.filter(item => 
    item.title.toLowerCase().includes(searchTerm) ||
    item.content.toLowerCase().includes(searchTerm) ||
    item.excerpt.toLowerCase().includes(searchTerm) ||
    (item.tags && item.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm)))
  );
}; 