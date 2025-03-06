import { useEffect, useState } from 'react';          

// 多彩涟漪鼠标跟随效果组件
const ColorfulRippleEffect = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  
  useEffect(() => {
    // 创建涟漪效果函数
    const createRipple = (e: MouseEvent) => {
      if (!isEnabled) return;
      
      // 创建涟漪元素
      const ripple = document.createElement('div');
      ripple.className = 'colorful-ripple';
      
      // 随机生成颜色
      const colors = [
        'rgba(255, 105, 180, 0.4)', // 粉色
        'rgba(123, 104, 238, 0.4)', // 紫色
        'rgba(30, 144, 255, 0.4)',  // 蓝色
        'rgba(50, 205, 50, 0.4)',   // 绿色
        'rgba(255, 165, 0, 0.4)',   // 橙色
        'rgba(255, 69, 0, 0.4)',    // 红橙色
        'rgba(138, 43, 226, 0.4)',  // 紫罗兰
        'rgba(0, 191, 255, 0.4)'    // 天蓝色
      ];
      
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      ripple.style.background = randomColor;
      
      // 设置涟漪位置
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      
      // 添加到页面
      document.body.appendChild(ripple);
      
      // 动画完成后移除元素
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    };
    
    // 节流函数，限制事件触发频率
    let lastTime = 0;
    const throttledMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime > 50) { // 50ms节流
        lastTime = now;
        createRipple(e);
      }
    };
    
    // 鼠标点击时一定创建涟漪
    const handleClick = (e: MouseEvent) => {
      createRipple(e);
    };
    
    // 监听事件
    document.addEventListener('mousemove', throttledMouseMove);
    document.addEventListener('click', handleClick);
    
    // 清理函数
    return () => {
      document.removeEventListener('mousemove', throttledMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, [isEnabled]);
  
  return null; // 这个组件不渲染任何内容
};

export default ColorfulRippleEffect;