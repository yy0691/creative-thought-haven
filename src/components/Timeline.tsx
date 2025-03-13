import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // 监听滚动事件添加视差效果和控制导航箭头显示
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const timeline = timelineRef.current;
      const timelineRect = timeline.getBoundingClientRect();
      
      // 只有当时间轴在视口中时才应用视差效果
      if (
        timelineRect.bottom >= 0 &&
        timelineRect.top <= window.innerHeight
      ) {
        const scrollPosition = window.scrollY;
        const offset = scrollPosition * 0.1; // 视差系数
        
        // 应用视差效果到时间轴的背景
        timeline.style.backgroundPositionX = `${offset}px`;
      }

      // 检查是否显示导航箭头
      updateArrowVisibility();
    };
    
    const updateArrowVisibility = () => {
      if (!timelineRef.current) return;
      
      const timeline = timelineRef.current;
      setShowLeftArrow(timeline.scrollLeft > 20);
      setShowRightArrow(timeline.scrollLeft < timeline.scrollWidth - timeline.clientWidth - 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // 如果timeline有滚动事件，监听它的滚动以更新箭头
    if (timelineRef.current) {
      timelineRef.current.addEventListener('scroll', updateArrowVisibility);
    }
    
    // 初始检查
    updateArrowVisibility();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timelineRef.current) {
        timelineRef.current.removeEventListener('scroll', updateArrowVisibility);
      }
    };
  }, []);

  // 鼠标拖动时间轴的功能
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
    
    // 添加拖动时的鼠标样式
    timelineRef.current.style.cursor = 'grabbing';
    timelineRef.current.style.userSelect = 'none';
  };

  const handleMouseUp = () => {
    if (!timelineRef.current) return;
    
    setIsDragging(false);
    
    // 恢复正常的鼠标样式
    timelineRef.current.style.cursor = 'grab';
    timelineRef.current.style.userSelect = 'auto';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !timelineRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 滚动速度系数
    
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };

  // 滚动导航按钮
  const scrollTimeline = (direction: 'left' | 'right') => {
    if (!timelineRef.current) return;
    
    const scrollAmount = 300; // 每次滚动的距离
    const targetScroll = timelineRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
    // 使用平滑滚动
    timelineRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  // 节点点击展开详情
  const handleNodeClick = (node: TimelineNode) => {
    setSelectedNode(node);
  };

  // 关闭详情弹窗
  const closeDetails = () => {
    setSelectedNode(null);
  };

  // 获取节点颜色
  const getNodeColor = (node: TimelineNode, isSelected: boolean, isHovered: boolean) => {
    if (isSelected) return node.color || 'bg-primary';
    if (isHovered) return node.color || 'bg-primary/80';
    return node.color || 'bg-primary/60';
  };

  return (
    <div className={`relative my-16 ${className}`}>
      <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">学习历程</h2>
      
      {/* 时间轴容器包装器 */}
      <div className="relative">
        {/* 左侧导航箭头 */}
        {showLeftArrow && (
          <motion.button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:shadow-lg transition-all focus:outline-none"
            onClick={() => scrollTimeline('left')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </motion.button>
        )}
        
        {/* 右侧导航箭头 */}
        {showRightArrow && (
          <motion.button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:shadow-lg transition-all focus:outline-none"
            onClick={() => scrollTimeline('right')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </motion.button>
        )}
      
        {/* 时间轴容器 */}
        <div 
          ref={timelineRef}
          className="relative overflow-x-auto py-10 px-4 cursor-grab scrollbar-hide"
          style={{
            background: 'linear-gradient(270deg, var(--background) 0%, var(--primary-50) 50%, var(--background) 100%)',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none',  /* IE and Edge */
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onScroll={() => {
            if (!timelineRef.current) return;
            setShowLeftArrow(timelineRef.current.scrollLeft > 20);
            setShowRightArrow(timelineRef.current.scrollLeft < timelineRef.current.scrollWidth - timelineRef.current.clientWidth - 20);
          }}
        >
          {/* 自定义滚动指示器 */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary/70 rounded-full"
              style={{
                width: timelineRef.current 
                  ? `${(timelineRef.current.scrollLeft / (timelineRef.current.scrollWidth - timelineRef.current.clientWidth)) * 100}%` 
                  : '0%',
                x: timelineRef.current
                  ? (timelineRef.current.scrollLeft / (timelineRef.current.scrollWidth - timelineRef.current.clientWidth)) * (20 - (20 * (timelineRef.current.scrollLeft / (timelineRef.current.scrollWidth - timelineRef.current.clientWidth))))
                  : 0
              }}
            />
          </div>
          
          {/* 时间轴线 */}
          <div className="absolute h-1 bg-gray-200 dark:bg-gray-700 left-0 right-0 top-1/2 transform -translate-y-1/2 z-0"></div>
          
          {/* 时间轴年份标注 - 整齐排列在顶部 */}
          <div className="timeline-labels">
            {nodes.map((node) => (
              <div key={`date-${node.id}`} className="timeline-date">
                {node.date}
              </div>
            ))}
          </div>
          
          {/* 节点容器 */}
          <div className="flex items-center justify-between px-10 relative z-10">
            {nodes.map((node) => (
              <div
                key={node.id}
                className="flex flex-col items-center relative"
                style={{ width: '120px' }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* 悬浮提示框 */}
                <AnimatePresence>
                  {hoveredNode === node.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full mb-2 w-48 transform -translate-x-1/2 left-1/2"
                      style={{ zIndex: 30 }}
                    >
                      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-100/20 dark:border-gray-700/30">
                        <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          {node.title}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                          {node.description}
                        </div>
                        {node.category && (
                          <div className="mt-2 flex items-center gap-1">
                            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: node.color || 'var(--primary)' }}></span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{node.category}</span>
                          </div>
                        )}
                      </div>
                      {/* 提示框小箭头 */}
                      <div 
                        className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45 bg-white/90 dark:bg-gray-800/90 border-r border-b border-gray-100/20 dark:border-gray-700/30"
                        style={{ zIndex: -1 }}
                      ></div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 节点圆点 */}
                <motion.div
                  className={`w-6 h-6 rounded-full cursor-pointer z-10 flex items-center justify-center
                             border-2 border-white dark:border-gray-800 shadow-md transition-all ${
                              getNodeColor(node, selectedNode?.id === node.id, hoveredNode === node.id)
                             }`}
                  onClick={() => handleNodeClick(node)}
                  whileHover={{ 
                    scale: 1.3,
                    transition: { duration: 0.2 }
                  }}
                  animate={{
                    scale: hoveredNode === node.id ? 1.2 : 1,
                    boxShadow: hoveredNode === node.id ? '0 0 10px rgba(90, 103, 216, 0.5)' : '0 0 0 rgba(0, 0, 0, 0)'
                  }}
                >
                  {node.icon && <span className="text-xs">{node.icon}</span>}
                </motion.div>
                
                {/* 节点标题（整齐排列在下方） */}
                <div className="timeline-title">
                  {node.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 详情弹窗 */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-md bg-white/30 dark:bg-black/30"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            onClick={closeDetails}
          >
            <motion.div
              className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg p-6 rounded-xl shadow-xl max-w-md w-full border border-white/20 dark:border-gray-700/30"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:text-white">{selectedNode.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedNode.date}</p>
                </div>
                <button 
                  onClick={closeDetails}
                  className="p-1.5 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{selectedNode.description}</p>
              </div>
              
              {selectedNode.category && (
                <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">
                    {selectedNode.category}
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline; 