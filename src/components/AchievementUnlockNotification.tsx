import { useEffect } from 'react';
import { X, Trophy } from 'lucide-react';
import { Achievement } from '../hooks/useAchievements';

interface AchievementUnlockNotificationProps {
  achievements: Achievement[];
  onDismiss: () => void;
}

export const AchievementUnlockNotification = ({
  achievements,
  onDismiss
}: AchievementUnlockNotificationProps) => {
  useEffect(() => {
    if (achievements.length > 0) {
      const timer = setTimeout(onDismiss, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievements, onDismiss]);

  if (achievements.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top">
      {achievements.map(achievement => (
        <div
          key={achievement.id}
          className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white rounded-lg shadow-xl p-4 mb-3 min-w-[300px]"
        >
          <div className="flex items-start gap-3">
            <div className="text-4xl animate-bounce">{achievement.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4" />
                <span className="font-bold">成就解锁！</span>
              </div>
              <div className="font-semibold">{achievement.title}</div>
              <div className="text-sm opacity-90">{achievement.description}</div>
            </div>
            <button
              onClick={onDismiss}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
