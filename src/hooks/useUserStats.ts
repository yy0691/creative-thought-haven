import { useState, useEffect } from 'react';
import { getReadingStats } from './useReadingTime';
import { onStatsUpdate } from '../utils/statsEvents';

export interface UserStats {
  totalLikes: number;
  totalReadingTime: number;
  totalArticlesRead: number;
  totalHighlights: number;
}

export const useUserStats = () => {
  const [stats, setStats] = useState<UserStats>({
    totalLikes: 0,
    totalReadingTime: 0,
    totalArticlesRead: 0,
    totalHighlights: 0
  });

  useEffect(() => {
    calculateStats();
    
    // 监听统计更新事件
    const cleanup = onStatsUpdate(() => {
      calculateStats();
    });
    
    return cleanup;
  }, []);

  const calculateStats = () => {
    // 计算总点赞数
    let totalLikes = 0;
    
    // 计算总阅读时长和阅读文章数
    let totalReadingTime = 0;
    let totalArticlesRead = 0;
    
    // 计算总高亮数
    let totalHighlights = 0;
    
    // 遍历所有 localStorage key
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      
      // 点赞统计
      if (key.startsWith('user_liked_') && localStorage.getItem(key) === 'true') {
        totalLikes++;
      }
      
      // 阅读统计
      if (key.startsWith('reading_stats_')) {
        try {
          const stats = JSON.parse(localStorage.getItem(key) || '{}');
          totalReadingTime += stats.duration || 0;
          totalArticlesRead += stats.totalReads || 0;
        } catch (e) {
          console.error('Failed to parse reading stats:', e);
        }
      }
    }
    
    // 高亮统计
    try {
      const highlightsData = localStorage.getItem('article_highlights');
      if (highlightsData) {
        const highlights = JSON.parse(highlightsData);
        if (Array.isArray(highlights)) {
          totalHighlights = highlights.length;
        } else if (typeof highlights === 'object' && highlights !== null) {
          // 如果是对象格式（按 articleId 分组），计算所有数组的总长度
          totalHighlights = Object.values(highlights).reduce((sum: number, arr: any) => {
            return sum + (Array.isArray(arr) ? arr.length : 0);
          }, 0);
        }
      }
    } catch (e) {
      console.error('Failed to parse highlights:', e);
    }

    setStats({
      totalLikes,
      totalReadingTime,
      totalArticlesRead,
      totalHighlights
    });
  };

  const refreshStats = () => {
    calculateStats();
  };

  return {
    stats,
    refreshStats
  };
};
