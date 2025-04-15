import { CardImage } from './CardImage';
import { CardItem } from '../data/ai/types';
import React, { useState, useEffect ,useRef} from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../components/ui/hover-card';
import { Calendar, ExternalLink, User } from 'lucide-react';

export const SmallToolCard = ({ item, onOpenDetail }: { item: CardItem, onOpenDetail?: (item: CardItem) => void }) => {
  const popperRef = useRef(null);
  // 分离左键点击和右键点击处理函数
  const handleClick = () => {
    // 左键点击，直接跳转到工具链接
    if (item.link) {
      window.open(item.link, '_blank');
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    // 右键点击，打开详情面板
    e.preventDefault(); // 阻止默认右键菜单
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
          className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-200 dark:border-gray-700"
          onClick={handleClick}
          onContextMenu={handleContextMenu}
        >
          {/* 工具图标 */}
          <div className="w-10 h-10 flex-shrink-0 mr-3 rounded-full overflow-hidden">
            <CardImage 
              src={item.image} 
              alt={item.title}
            />
          </div>
          {/* 工具信息 */}
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.title}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{item.description}</p>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent 
        ref={popperRef}
        className="w-80 p-4 bg-white/95 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700 shadow-lg backdrop-blur-md  z-[10000] " 
        side="right"
      >
        <div className="space-y-3">
          {/* 卡片标题 */}
          <div className="flex justify-between">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</h2>
            {item.category && (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                {item.category}
              </span>
            )}
          </div>
          
          {/* 卡片图片 */}
          {/* {item.image && (
            <div className="h-24 w-full overflow-hidden rounded-md">
              <CardImage 
                src={item.image} 
                alt={item.title}
              />
            </div>
          )} */}
          
          {/* 完整描述 */}
          <p className="text-sm text-gray-700 dark:text-gray-300">{item.description}</p>
          
          {/* 附加信息 */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            {item.author && (
              <div className="flex items-center">
                <User className="mr-1 h-3.5 w-3.5" />
                <span>{item.author}</span>
              </div>
            )}
            {item.date && (
              <div className="flex items-center">
                <Calendar className="mr-1 h-3.5 w-3.5" />
                <span>{item.date}</span>
              </div>
            )}
          </div>
          
          {/* 访问链接 */}
          {item.link && (
            <div className="pt-2">
              <a 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-medium text-primary hover:text-primary-dark"
                onClick={(e) => e.stopPropagation()}
              >
                访问官网 <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </a>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                左键点击直接访问，右键点击查看详情
              </p>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};