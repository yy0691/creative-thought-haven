import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { throttle } from 'lodash';

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
  const handleWheel = throttle((e: WheelEvent) => {
    if (!timelineRef.current || !isHovering) return;
    
    // 阻止默认的垂直滚动
    e.preventDefault();
    e.stopPropagation();
    
    // 使用deltaY控制水平滚动，调整滚动速度
    timelineRef.current.scrollBy({
      left: e.deltaY * 10 , // 减小滚动速度
      behavior: 'smooth'
    });
  }, 100); // 提高响应速度

  // 设置和移除事件监听器
  useEffect(() => {
    const timelineElement = timelineRef.current;
    if (!timelineElement) return;

    const wheelHandler = (e: WheelEvent) => {
      handleWheel(e);
      if (isHovering) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // 添加事件监听
    if (isHovering) {
      timelineElement.addEventListener('wheel', wheelHandler, { passive: false });
      // 阻止页面滚动
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      if (timelineElement) {
        timelineElement.removeEventListener('wheel', wheelHandler);
        document.body.style.overflow = 'auto';
      }
    };
  }, [isHovering]);

  return (
    <div className={`timeline-container ${className}`}>
      <h2 className="text-3xl font-bold text-center mb-10 dark:text-white"> </h2>
      
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
                  className="timeline-dot text-white"
                  style={{ backgroundColor: node.color }}
                  whileHover={{ scale: 1.2 }}
                >
                  <span
                    className="absolute inset-0 flex items-center justify-center text-[20px] md:text-[24px]"
                  >
                    {node.icon}
                  </span>
                </motion.div>
                <span className="timeline-title">{node.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline; 