import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pin, PinOff } from 'lucide-react';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: React.ComponentType<object> | string;
}

export const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const articleRef = useRef<HTMLElement | null>(null);

  // 从localStorage读取用户的固定偏好设置
  useEffect(() => {
    const pinnedPreference = localStorage.getItem('toc-pinned');
    if (pinnedPreference !== null) {
      setIsPinned(pinnedPreference === 'true');
    }
    // 如果没有保存过偏好设置，说明是首次访问，保持默认的展开但非锁定状态
  }, []);

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

  // 设置初始折叠状态：默认展开，移动设备上根据是否固定决定
  useEffect(() => {
    if (isPinned) {
      // 如果固定了，则展开
      setIsCollapsed(false);
    } else {
      // 如果未固定，桌面端展开，移动端收起
      setIsCollapsed(isMobile);
    }
  }, [isMobile, isPinned]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // 在移动端点击目录项后自动收起目录，除非目录已固定
      if (isMobile && !isPinned) {
        setIsCollapsed(true);
      }
    }
  };

  const handleMouseEnter = () => {
    // 只在非移动端和非固定状态时通过鼠标悬浮展开
    if (!isMobile && !isPinned) {
      setIsCollapsed(false);
    }
  };

  const handleMouseLeave = () => {
    // 只在非移动端和非固定状态时通过鼠标离开收起
    if (!isMobile && !isPinned) {
      setIsCollapsed(true);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const togglePinned = () => {
    const newPinnedState = !isPinned;
    setIsPinned(newPinnedState);
    
    // 保存用户偏好到localStorage
    localStorage.setItem('toc-pinned', String(newPinnedState));
    
    // 触发一个自定义事件，以便其他组件可以监听这个变化
    const event = new Event('tocPinnedChanged');
    window.dispatchEvent(event);
    
    // 如果取消固定，并且是在移动设备上，则自动折叠目录
    if (!newPinnedState && isMobile) {
      setIsCollapsed(true);
    } else if (newPinnedState) {
      // 如果固定，则展开目录
      setIsCollapsed(false);
    }
  };

  // 计算目录导航的样式
  const navStyleClass = isMobile 
    ? `fixed bottom-0 left-0 w-full transition-all duration-300 ease-in-out ${isCollapsed ? 'h-10' : 'h-64'} bg-background/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg z-50`
    : `fixed left-0 top-24 h-[calc(100vh-6rem)] transition-all duration-500 ease-in-out ${isCollapsed ? 'w-8' : 'w-64'} bg-background/70 dark:bg-black/30 backdrop-blur-sm z-30`;

  return (
    <nav
      className={navStyleClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isMobile ? (
        // 移动设备视图
        <>
          <div className="flex justify-between items-center h-10 px-4 border-t dark:border-gray-700">
            <button
              onClick={toggleCollapse}
              className="text-base text-muted-foreground flex items-center gap-1"
            >
              目录
              {isCollapsed ? (
                <ChevronRight size={16} />
              ) : (
                <ChevronLeft size={16} />
              )}
            </button>
            <button
              onClick={togglePinned}
              className={`p-1 rounded-full hover:bg-primary/10 transition-colors ${isPinned ? 'text-primary' : 'text-muted-foreground'}`}
              title={isPinned ? '取消固定目录' : '固定目录'}
            >
              {isPinned ? <Pin size={16} /> : <PinOff size={16} />}
            </button>
          </div>
          
          {!isCollapsed && (
            <div className="overflow-y-auto h-[calc(100%-2.5rem)] p-4">
              {items.length > 0 ? (
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
                    >
                      <button
                        onClick={() => handleClick(item.id)}
                        className={`text-left text-base hover:text-primary transition-colors ${activeId === item.id ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                        title={item.text}
                      >
                        {item.text}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-base text-muted-foreground">没有找到目录项</p>
              )}
            </div>
          )}
        </>
      ) : (
        // 桌面设备视图
        <>
          <button
            onClick={toggleCollapse}
            className="absolute -right-4 top-4 p-1 bg-background border rounded-full hover:bg-primary/10 transition-colors"
            title={isCollapsed ? '展开目录' : '收起目录'}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
          
          {!isCollapsed && (
            <div className="p-4 overflow-y-auto h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-base text-muted-foreground">目录</h3>
                <button
                  onClick={togglePinned}
                  className={`p-1 rounded-full hover:bg-primary/10 transition-colors ${isPinned ? 'text-primary' : 'text-muted-foreground'}`}
                  title={isPinned ? '取消固定目录' : '固定目录'}
                >
                  {isPinned ? <Pin size={16} /> : <PinOff size={16} />}
                </button>
              </div>
              
              {items.length > 0 ? (
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
                    >
                      <button
                        onClick={() => handleClick(item.id)}
                        className={`text-left text-sm hover:text-primary transition-all duration-300 hover:scale-110 ${activeId === item.id ? 'text-primary font-medium' : 'text-muted-foreground/70'}`}
                        title={item.text}
                      >
                        {item.text}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">没有找到目录项</p>
              )}
            </div>
          )}
        </>
      )}
    </nav>
  );
};