import { Trophy } from 'lucide-react';
import { Achievement } from '../hooks/useAchievements';
import { AchievementBadge } from './AchievementBadge';

interface AchievementsPanelProps {
  achievements: Achievement[];
  stats: {
    totalLikes: number;
    totalReadingTime: number;
    totalArticlesRead: number;
    totalHighlights: number;
  };
  getProgress: (id: string, value: number) => number;
}

export const AchievementsPanel = ({ achievements, stats, getProgress }: AchievementsPanelProps) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const getStatValue = (type: Achievement['type']) => {
    switch (type) {
      case 'likes':
        return stats.totalLikes;
      case 'reading_time':
        return stats.totalReadingTime;
      case 'reading_count':
        return stats.totalArticlesRead;
      case 'highlights':
        return stats.totalHighlights;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-amber-500" />
        <div>
          <h2 className="text-2xl font-bold">成就徽章</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            已解锁 {unlockedCount}/{achievements.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {achievements.map(achievement => (
          <AchievementBadge
            key={achievement.id}
            achievement={achievement}
            progress={achievement.unlocked ? 100 : getProgress(achievement.id, getStatValue(achievement.type))}
          />
        ))}
      </div>
    </div>
  );
};
