import { CardImage } from './CardImage';
import { CardItem } from '../data/ai/types';
import React, { useState, useEffect ,useRef} from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../components/ui/hover-card';
import { Calendar, ExternalLink, User, Sparkles } from 'lucide-react';

export const SmallToolCard = ({ item, onOpenDetail }: { item: CardItem, onOpenDetail?: (item: CardItem) => void }) => {
  const popperRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    if (item.link) {
      window.open(item.link, '_blank');
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenDetail) {
      onOpenDetail(item);
    }
  };

  useEffect(() => {
    if (popperRef.current) {
      const popper = popperRef.current as any;
      popper.update();
    }
  }, [item]);
  
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div 
          className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 border border-gray-200/60 dark:border-gray-700/60 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 cursor-pointer"
          onClick={handleClick}
          onContextMenu={handleContextMenu}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* 悬浮时的光晕效果 */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* 顶部装饰条 */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          
          <div className="relative p-4 flex items-center gap-4">
            {/* 工具图标 - 增大尺寸 */}
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-gray-100 dark:ring-gray-700 group-hover:ring-primary/30 transition-all duration-300 transform group-hover:scale-105 shadow-sm">
                <CardImage 
                  src={item.image} 
                  alt={item.title}
                />
              </div>
              {/* 图标背景光晕 */}
              <div className="absolute inset-0 -z-10 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* 工具信息 */}
            <div className="flex-1 min-w-0 space-y-1">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors duration-300">
                {item.title_zh || item.title}
              </h2>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {item.description_zh || item.summary_zh || item.description}
              </p>
              
              {/* 标签/分类 */}
              {item.group && (
                <div className="pt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light">
                    {item.group}
                  </span>
                </div>
              )}
            </div>

            {/* 外部链接图标 */}
            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors duration-300" />
            </div>
          </div>

          {/* 底部阴影效果 */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
        </div>
      </HoverCardTrigger>
      
      <HoverCardContent 
        ref={popperRef}
        className="w-96 p-5 bg-white/95 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700 shadow-2xl backdrop-blur-lg rounded-2xl z-[10000]" 
        side="right"
      >
        <div className="space-y-4">
          {/* 卡片标题与分类 */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {item.title_zh || item.title}
              </h2>
              {item.category && (
                <span className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {item.category}
                </span>
              )}
            </div>
            {item.image && (
              <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-gray-100 dark:ring-gray-700 flex-shrink-0">
                <CardImage 
                  src={item.image} 
                  alt={item.title}
                />
              </div>
            )}
          </div>
          
          {/* 完整描述 */}
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {item.description_zh || item.summary_zh || item.description}
          </p>
          
          {/* 附加信息 */}
          {(item.author || item.date) && (
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
              {item.author && (
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>{item.author}</span>
                </div>
              )}
              {item.date && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </div>
              )}
            </div>
          )}
          
          {/* 访问链接 */}
          {item.link && (
            <div className="pt-3 space-y-2 border-t border-gray-100 dark:border-gray-700">
              <a 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors duration-200 text-sm font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                访问官网 
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                💡 提示：左键点击卡片直接访问
              </p>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
