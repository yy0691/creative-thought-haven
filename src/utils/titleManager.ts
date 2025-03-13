/**
 * 网站标题管理器
 * 提供动态标题功能，当用户离开页面时显示提示消息
 */

// 原始标题
const originalTitle = document.title;

// 标题视觉效果符号
const symbols = ["✨", "💡", "🌟", "💭", "📚"];

// 获取随机符号
const getRandomSymbol = (): string => {
  return symbols[Math.floor(Math.random() * symbols.length)];
};

// 初始化标题管理器
export const initTitleManager = (): void => {
  // 页面可见性变化事件监听器
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      // 用户离开页面时
      document.title = `${getRandomSymbol()} 思考进行中... ${getRandomSymbol()}`;
    } else {
      // 用户回到页面时
      document.title = originalTitle;
    }
  });
};

// 设置页面标题
export const setPageTitle = (title: string): void => {
  document.title = title ? `${title} | Creative Thought Haven` : originalTitle;
};

// 重置标题
export const resetTitle = (): void => {
  document.title = originalTitle;
};

export default {
  initTitleManager,
  setPageTitle,
  resetTitle
}; 