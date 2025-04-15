import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    // 设置初始值
    setMatches(mediaQuery.matches);
    
    // 创建事件监听器
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // 添加事件监听
    mediaQuery.addEventListener('change', handler);
    
    // 清理函数
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
} 