// 统计更新事件系统
export const STATS_UPDATE_EVENT = 'userStatsUpdated';

export const emitStatsUpdate = () => {
  const event = new CustomEvent(STATS_UPDATE_EVENT);
  window.dispatchEvent(event);
};

export const onStatsUpdate = (callback: () => void) => {
  window.addEventListener(STATS_UPDATE_EVENT, callback);
  return () => window.removeEventListener(STATS_UPDATE_EVENT, callback);
};
