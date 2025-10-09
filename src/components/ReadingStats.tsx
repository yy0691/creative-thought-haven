import React, { useState, useEffect } from 'react';
import { Clock, Eye } from 'lucide-react';
import { formatReadingTime, getReadingStats } from '../hooks/useReadingTime';

interface ReadingStatsProps {
  articleId: string;
  currentReadingTime: number;
}

export const ReadingStats: React.FC<ReadingStatsProps> = ({ articleId, currentReadingTime }) => {
  const [stats, setStats] = useState({ duration: 0, totalReads: 0, lastRead: '' });

  useEffect(() => {
    const loadedStats = getReadingStats(articleId);
    setStats(loadedStats);
  }, [articleId]);

  const totalTime = stats.duration + currentReadingTime;

  return (
    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
      <div className="flex items-center gap-1.5">
        <Clock size={16} />
        <span>阅读时长: {formatReadingTime(totalTime)}</span>
      </div>
      {stats.totalReads > 0 && (
        <div className="flex items-center gap-1.5">
          <Eye size={16} />
          <span>已读 {stats.totalReads + 1} 次</span>
        </div>
      )}
    </div>
  );
};
