import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: React.ComponentType<{}> | string;
}

export const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const articleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // 获取文章内容区域，排除相关文章部分
    articleRef.current = document.querySelector('article');
    
    if (!articleRef.current) return;
    
    // 只选择文章内容区域中的标题，排除相关文章部分
    // 查找相关文章的aside元素
    const relatedPostsSection = articleRef.current.querySelector('aside');
    
    // 获取所有标题
    const allHeadings = Array.from(articleRef.current.querySelectorAll('h1, h2, h3'));
    
    // 过滤掉相关文章部分的标题
    const headings = allHeadings.filter(heading => {
      if (!relatedPostsSection) return true;
      return !relatedPostsSection.contains(heading);
    });
    
    const tocItems: TocItem[] = headings.map((heading) => ({
      id: heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
      text: heading.textContent || '',
      level: parseInt(heading.tagName[1])
    }));
    setItems(tocItems);

    // 设置标题ID
    headings.forEach((heading) => {
      if (!heading.id) {
        heading.id = heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
      }
    });

    // 监听滚动事件
    const handleScroll = () => {
      const headingElements = Array.from(headings);
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const heading = headingElements[i];
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [content]);

  // 在移动端默认收起目录
  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // 在移动端点击目录项后自动收起目录
      if (isMobile) {
        setIsCollapsed(true);
      }
    }
  };

  const handleMouseEnter = () => {
    // 只在非移动端时通过鼠标悬浮展开
    if (!isMobile) {
      setIsCollapsed(false);
    }
  };

  const handleMouseLeave = () => {
    // 只在非移动端时通过鼠标离开收起
    if (!isMobile) {
      setIsCollapsed(true);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav
      className={`fixed left-0 top-24 h-[calc(100vh-6rem)] transition-all duration-500 ease-in-out ${isCollapsed ? 'w-8' : 'w-64'} bg-background/70 dark:bg-black/30 backdrop-blur-sm`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={toggleCollapse}
        className="absolute -right-4 top-4 p-1 bg-background border rounded-full hover:bg-primary/10 transition-colors"
        title={isCollapsed ? '展开目录' : '收起目录'}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
      
      {!isCollapsed && (
        <div className="p-4 overflow-y-auto h-full">
          <h3 className="font-bold mb-4 text-sm text-muted-foreground">目录</h3>
          {items.length > 0 ? (
            <ul className="space-y-1.5">
              {items.map((item) => (
                <li
                  key={item.id}
                  style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
                >
                  <button
                    onClick={() => handleClick(item.id)}
                    className={`text-left text-xs hover:text-primary transition-all duration-300 hover:scale-110 ${activeId === item.id ? 'text-primary font-medium' : 'text-muted-foreground/70'}`}
                    title={item.text}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground">没有找到目录项</p>
          )}
        </div>
      )}
    </nav>
  );
};