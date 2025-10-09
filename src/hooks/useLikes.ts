import { useState, useEffect } from 'react';
import { emitStatsUpdate } from '../utils/statsEvents';

interface LikeData {
  count: number;
  liked: boolean;
}

export const useLikes = (articleId: string) => {
  const [likeData, setLikeData] = useState<LikeData>({ count: 0, liked: false });

  useEffect(() => {
    // 从localStorage加载点赞数据
    const loadLikeData = () => {
      try {
        // 获取总点赞数（模拟的全局数据）
        const globalLikesKey = `article_likes_${articleId}`;
        const globalLikes = localStorage.getItem(globalLikesKey);
        const count = globalLikes ? parseInt(globalLikes, 10) : 0;

        // 获取用户是否点赞
        const userLikesKey = `user_liked_${articleId}`;
        const liked = localStorage.getItem(userLikesKey) === 'true';

        setLikeData({ count, liked });
      } catch (e) {
        console.error('Failed to load like data:', e);
      }
    };

    loadLikeData();
  }, [articleId]);

  const toggleLike = () => {
    try {
      const newLiked = !likeData.liked;
      const newCount = newLiked ? likeData.count + 1 : Math.max(0, likeData.count - 1);

      // 保存到localStorage
      localStorage.setItem(`article_likes_${articleId}`, newCount.toString());
      localStorage.setItem(`user_liked_${articleId}`, newLiked.toString());

      setLikeData({ count: newCount, liked: newLiked });
      
      // 触发统计更新事件
      emitStatsUpdate();
    } catch (e) {
      console.error('Failed to toggle like:', e);
    }
  };

  return { ...likeData, toggleLike };
};

// 获取所有点赞记录
export const getAllLikes = (): string[] => {
  const likes: string[] = [];
  
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('user_liked_') && localStorage.getItem(key) === 'true') {
        likes.push(key.replace('user_liked_', ''));
      }
    }
  } catch (e) {
    console.error('Failed to get all likes:', e);
  }
  
  return likes;
};
