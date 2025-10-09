import { useState, useEffect, useRef } from 'react';
import { emitStatsUpdate } from '../utils/statsEvents';

interface ReadingStats {
  duration: number; // 阅读时长（秒）
  totalReads: number; // 总阅读次数
  lastRead: string; // 最后阅读时间
}

export const useReadingTime = (articleId: string) => {
  const [readingTime, setReadingTime] = useState(0);
  const isActiveRef = useRef(!document.hidden); // 初始化时同步页面可见性状态

  useEffect(() => {
    // 加载之前的阅读记录
    const stats = getReadingStats(articleId);
    let sessionTime = 0;
    
    // 确保初始状态正确
    isActiveRef.current = !document.hidden;
    
    // 页面可见性检测 - 只控制计时器开关，不做额外计算
    const handleVisibilityChange = () => {
      isActiveRef.current = !document.hidden;
    };

    // 计时器 - 只在页面可见时累积
    const timer = setInterval(() => {
      if (isActiveRef.current) {
        sessionTime += 1;
        setReadingTime(sessionTime);
      }
    }, 1000);

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 保存阅读记录 - sessionTime 是准确的本次会话时长
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // 重新读取最新的stats以支持多标签页并发
      const latestStats = getReadingStats(articleId);
      
      // 只保存 sessionTime（已经正确追踪了所有可见时间）
      saveReadingStats(articleId, {
        duration: latestStats.duration + sessionTime,
        totalReads: latestStats.totalReads + 1,
        lastRead: new Date().toISOString()
      });
    };
  }, [articleId]);

  return readingTime;
};

// 获取阅读统计
export const getReadingStats = (articleId: string): ReadingStats => {
  try {
    const key = `reading_stats_${articleId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to get reading stats:', e);
  }
  
  return {
    duration: 0,
    totalReads: 0,
    lastRead: ''
  };
};

// 保存阅读统计
export const saveReadingStats = (articleId: string, stats: ReadingStats) => {
  try {
    const key = `reading_stats_${articleId}`;
    localStorage.setItem(key, JSON.stringify(stats));
    
    // 触发统计更新事件
    emitStatsUpdate();
  } catch (e) {
    console.error('Failed to save reading stats:', e);
  }
};

// 格式化时长
export const formatReadingTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  if (minutes === 0) {
    return `${secs}秒`;
  } else if (minutes < 60) {
    return `${minutes}分${secs}秒`;
  } else {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}小时${mins}分`;
  }
};
