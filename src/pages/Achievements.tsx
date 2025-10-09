import { useUserStats } from '../hooks/useUserStats';
import { useAchievements } from '../hooks/useAchievements';
import { AchievementsPanel } from '../components/AchievementsPanel';
import { Trophy, Heart, Clock, BookOpen, Highlighter } from 'lucide-react';

const Achievements = () => {
  const { stats } = useUserStats();
  const { achievements, getProgress } = useAchievements();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}小时${minutes}分钟`;
    }
    return `${minutes}分钟`;
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">我的成就</h1>
        <p className="text-gray-600 dark:text-gray-400">
          记录你的学习旅程，解锁更多成就徽章
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="w-6 h-6 text-red-500" />
            <h3 className="font-semibold">总点赞</h3>
          </div>
          <div className="text-3xl font-bold text-red-500">{stats.totalLikes}</div>
          <p className="text-sm text-gray-500 mt-1">篇文章</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-6 h-6 text-blue-500" />
            <h3 className="font-semibold">阅读时长</h3>
          </div>
          <div className="text-3xl font-bold text-blue-500">
            {formatTime(stats.totalReadingTime)}
          </div>
          <p className="text-sm text-gray-500 mt-1">累计学习</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-6 h-6 text-green-500" />
            <h3 className="font-semibold">阅读文章</h3>
          </div>
          <div className="text-3xl font-bold text-green-500">{stats.totalArticlesRead}</div>
          <p className="text-sm text-gray-500 mt-1">篇文章</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <Highlighter className="w-6 h-6 text-amber-500" />
            <h3 className="font-semibold">高亮笔记</h3>
          </div>
          <div className="text-3xl font-bold text-amber-500">{stats.totalHighlights}</div>
          <p className="text-sm text-gray-500 mt-1">个笔记</p>
        </div>
      </div>

      <AchievementsPanel
        achievements={achievements}
        stats={stats}
        getProgress={getProgress}
      />
    </div>
  );
};

export default Achievements;
