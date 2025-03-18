import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons/lib'; // 修正导入,使用IconType类型

// 定义时间轴节点类型
export interface TimelineNode {
  id: string;
  date: string;
  title: string;
  description: string;
  icon?: string; // 可选的图标
  category?: string; // 可选的类别
  color?: string; // 节点颜色
}

interface TimelineProps {
  nodes: TimelineNode[];
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ nodes, className = '' }) => {
  const [selectedNode, setSelectedNode] = useState<TimelineNode | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // 监听滚动更新进度条
  const handleScroll = () => {
    if (!timelineRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = timelineRef.current;
    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    setScrollProgress(progress);
  };

  // 处理鼠标滚轮事件
  const handleWheel = (e: WheelEvent) => {
    if (!timelineRef.current || !isHovering) return;
    
    // 阻止默认的垂直滚动
    e.preventDefault();
    
    // 使用deltaY控制水平滚动
    timelineRef.current.scrollBy({
      left: e.deltaY,
      behavior: 'smooth'
    });
  };

  // 设置和移除事件监听器
  useEffect(() => {
    const timelineElement = timelineRef.current;
    if (!timelineElement) return;

    // 只在鼠标悬停时添加滚轮事件监听
    if (isHovering) {
      timelineElement.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      if (timelineElement) {
        timelineElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isHovering]);

  return (
    <div className={`timeline-container ${className}`}>
      <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">学习历程</h2>
      
      <div className="relative">
        {/* 时间轴滚动容器 */}
        <div 
          ref={timelineRef}
          className="timeline-scroll"
          onScroll={handleScroll}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* 时间轴主轴线 */}
          <div className="timeline-line" />
          
          {/* 节点容器 */}
          <div className="timeline-nodes">
            {nodes.map((node) => (
              <motion.div
                key={node.id}
                className="timeline-node"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="timeline-date">{node.date}</span>
                
                <motion.div
                  className={`timeline-dot bg-primary text-white`}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setSelectedNode(node)}
                >
                  {node.icon && (
                    <span className="absolute inset-0 flex items-center justify-center text-[20px] md:text-[24px]">
                      {node.icon}
                    </span>
                  )}
                </motion.div>
                <span className="timeline-title">{node.title}</span>
                
                {/* 悬浮卡片 */}
                <div className="timeline-hover-card">
                  <div className="text-sm font-medium mb-1 dark:text-white">
                    {node.title}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    {node.description}
                  </div>
                  {node.category && (
                    <div className="mt-2 flex items-center gap-1">
                      <span 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: node.color }}
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {node.category}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 滚动进度指示器 */}
        <div className="timeline-indicator">
          <div 
            className="timeline-indicator-progress"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline; 