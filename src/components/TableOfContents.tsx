import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  useEffect(() => {
    // 解析内容中的标题
    const headings = document.querySelectorAll('h1, h2, h3');
    const tocItems: TocItem[] = Array.from(headings).map((heading) => ({
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

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };  const handleMouseEnter = () => {
    setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    setIsCollapsed(true);
  };

  return (
    <nav
      className={`fixed left-0 top-24 h-[calc(100vh-6rem)] transition-all duration-500 ease-in-out ${isCollapsed ? 'w-8' : 'w-64'} bg-background border-r shadow-lg`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-4 p-1 bg-background border rounded-full hover:bg-primary/10 transition-colors"
        title={isCollapsed ? '展开目录' : '收起目录'}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
      
      {!isCollapsed && (
        <div className="p-4 overflow-y-auto h-full">
          <h3 className="font-bold mb-4 text-sm text-muted-foreground">目录</h3>
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
        </div>
      )}
    </nav>
  );
};