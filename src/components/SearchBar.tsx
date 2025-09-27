import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllPosts } from '../lib/blog';
import { getAllProjects } from '../lib/projects';
import { useDesigns } from '../hooks/useContent';

interface SearchResult {
  type: 'blog' | 'project' | 'design';
  title: string;
  description?: string;
  slug: string;
  url: string;
}

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { designs } = useDesigns();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    const searchTerm = searchQuery.toLowerCase();

    // 搜索博客文章
    const posts = await getAllPosts();
    const blogResults = posts
      .filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.description?.toLowerCase().includes(searchTerm) ||
        post.excerpt?.toLowerCase().includes(searchTerm) ||
        post.content?.toString().toLowerCase().includes(searchTerm)
      )
      .map(post => ({
        type: 'blog' as const,
        title: post.title,
        description: post.excerpt || post.description,
        slug: post.slug,
        url: `/blog/${encodeURIComponent(post.slug)}`
      }));

    // 搜索项目
    const projects = await getAllProjects();
    const projectResults = projects
      .filter(project =>
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm)
      )
      .map(project => ({
        type: 'project' as const,
        title: project.title,
        description: project.description,
        slug: project.slug,
        url: `/portfolio/${project.slug}`
      }));

    // 搜索设计作品（从生成数据）
    const designResults = designs
      .filter(design =>
        design.title.toLowerCase().includes(searchTerm) ||
        design.description.toLowerCase().includes(searchTerm)
      )
      .map(design => ({
        type: 'design' as const,
        title: design.title,
        description: design.description,
        slug: design.id,
        url: `/designs/${design.id}`
      }));

    setResults([...blogResults, ...projectResults, ...designResults]);
  };

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="flex items-center">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <input
            type="text"
            placeholder="搜索文章、项目和设计..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className="pl-10 pr-4 py-2 w-64 rounded-full bg-background/90 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          />
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-96 max-h-96 overflow-y-auto rounded-lg border border-border/40 bg-background/95 backdrop-blur-sm shadow-lg">
          {results.map((result, index) => (
            <div
              key={`${result.type}-${result.slug}-${index}`}
              onClick={() => handleResultClick(result)}
              className="p-4 hover:bg-muted/50 cursor-pointer border-b border-border/40 last:border-b-0"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {result.type === 'blog' ? '文章' : result.type === 'project' ? '项目' : '设计'}
                </span>
                <h3 className="font-medium">{result.title}</h3>
              </div>
              {result.description && (
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {result.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;