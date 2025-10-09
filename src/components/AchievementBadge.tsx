import { Achievement } from '../hooks/useAchievements';

interface AchievementBadgeProps {
  achievement: Achievement;
  progress?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const AchievementBadge = ({ achievement, progress = 0, size = 'md' }: AchievementBadgeProps) => {
  const sizes = {
    sm: 'w-16 h-16 text-2xl',
    md: 'w-20 h-20 text-3xl',
    lg: 'w-24 h-24 text-4xl'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${sizes[size]} rounded-full flex items-center justify-center transition-all ${
          achievement.unlocked
            ? 'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg'
            : 'bg-gray-200 dark:bg-gray-700 opacity-50'
        }`}
      >
        <span className={achievement.unlocked ? 'animate-bounce' : 'grayscale'}>
          {achievement.icon}
        </span>
      </div>
      <div className="text-center max-w-[120px]">
        <div className={`font-semibold ${textSizes[size]} ${achievement.unlocked ? 'text-amber-600 dark:text-amber-400' : 'text-gray-500'}`}>
          {achievement.title}
        </div>
        <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1`}>
          {achievement.description}
        </div>
        {!achievement.unlocked && progress > 0 && (
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-amber-500 h-1.5 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
