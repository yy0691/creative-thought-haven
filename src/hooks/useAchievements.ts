import { useState, useEffect } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'likes' | 'reading_time' | 'reading_count' | 'highlights';
  unlocked: boolean;
  unlockedAt?: string;
}

const ACHIEVEMENTS: Omit<Achievement, 'unlocked' | 'unlockedAt'>[] = [
  {
    id: 'first_like',
    title: '初识点赞',
    description: '点赞第1篇文章',
    icon: '👍',
    requirement: 1,
    type: 'likes'
  },
  {
    id: 'like_enthusiast',
    title: '点赞达人',
    description: '点赞10篇文章',
    icon: '❤️',
    requirement: 10,
    type: 'likes'
  },
  {
    id: 'like_master',
    title: '点赞大师',
    description: '点赞50篇文章',
    icon: '💖',
    requirement: 50,
    type: 'likes'
  },
  {
    id: 'first_read',
    title: '初次阅读',
    description: '阅读第1篇文章',
    icon: '📖',
    requirement: 1,
    type: 'reading_count'
  },
  {
    id: 'avid_reader',
    title: '阅读爱好者',
    description: '阅读10篇文章',
    icon: '📚',
    requirement: 10,
    type: 'reading_count'
  },
  {
    id: 'reading_master',
    title: '阅读大师',
    description: '阅读50篇文章',
    icon: '🎓',
    requirement: 50,
    type: 'reading_count'
  },
  {
    id: 'time_traveler',
    title: '时光旅人',
    description: '累计阅读30分钟',
    icon: '⏰',
    requirement: 1800,
    type: 'reading_time'
  },
  {
    id: 'bookworm',
    title: '书虫',
    description: '累计阅读2小时',
    icon: '🐛',
    requirement: 7200,
    type: 'reading_time'
  },
  {
    id: 'scholar',
    title: '学者',
    description: '累计阅读10小时',
    icon: '🎯',
    requirement: 36000,
    type: 'reading_time'
  },
  {
    id: 'first_highlight',
    title: '笔记新手',
    description: '创建第1个高亮笔记',
    icon: '✍️',
    requirement: 1,
    type: 'highlights'
  },
  {
    id: 'note_taker',
    title: '笔记达人',
    description: '创建10个高亮笔记',
    icon: '📝',
    requirement: 10,
    type: 'highlights'
  },
  {
    id: 'note_master',
    title: '笔记大师',
    description: '创建50个高亮笔记',
    icon: '📓',
    requirement: 50,
    type: 'highlights'
  }
];

const STORAGE_KEY = 'user_achievements';

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newUnlocks, setNewUnlocks] = useState<Achievement[]>([]);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setAchievements(JSON.parse(stored));
      } else {
        const initial = ACHIEVEMENTS.map(a => ({ ...a, unlocked: false }));
        setAchievements(initial);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      }
    } catch (error) {
      console.error('Failed to load achievements:', error);
    }
  };

  const checkAndUnlock = (stats: {
    totalLikes: number;
    totalReadingTime: number;
    totalArticlesRead: number;
    totalHighlights: number;
  }) => {
    const updated = achievements.map(achievement => {
      if (achievement.unlocked) return achievement;

      let currentValue = 0;
      switch (achievement.type) {
        case 'likes':
          currentValue = stats.totalLikes;
          break;
        case 'reading_time':
          currentValue = stats.totalReadingTime;
          break;
        case 'reading_count':
          currentValue = stats.totalArticlesRead;
          break;
        case 'highlights':
          currentValue = stats.totalHighlights;
          break;
      }

      if (currentValue >= achievement.requirement) {
        return {
          ...achievement,
          unlocked: true,
          unlockedAt: new Date().toISOString()
        };
      }
      
      return achievement;
    });

    const newlyUnlocked = updated.filter((a, i) => a.unlocked && !achievements[i].unlocked);

    if (newlyUnlocked.length > 0) {
      setAchievements(updated);
      setNewUnlocks(newlyUnlocked);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const dismissNewUnlocks = () => {
    setNewUnlocks([]);
  };

  const getProgress = (achievementId: string, currentValue: number): number => {
    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement) return 0;
    return Math.min((currentValue / achievement.requirement) * 100, 100);
  };

  return {
    achievements,
    newUnlocks,
    checkAndUnlock,
    dismissNewUnlocks,
    getProgress
  };
};
