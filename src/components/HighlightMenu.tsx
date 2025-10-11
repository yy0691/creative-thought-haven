import { useState, useEffect, useRef } from 'react';
import { Highlighter, MessageSquare, Palette, Trash2 } from 'lucide-react';

interface HighlightMenuProps {
  position: { top: number; left: number };
  onHighlight: (color: string) => void;
  onAddNote: () => void;
  onDelete?: () => void;
  existingHighlight?: boolean;
}

const COLORS = [
  { name: '黄色', value: '#fef08a' },
  { name: '绿色', value: '#bbf7d0' },
  { name: '蓝色', value: '#bfdbfe' },
  { name: '粉色', value: '#fbcfe8' },
  { name: '紫色', value: '#e9d5ff' }
];

export const HighlightMenu = ({ position, onHighlight, onAddNote, onDelete, existingHighlight }: HighlightMenuProps) => {
    const [showColors, setShowColors] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  
  const handleHighlight = (color: string) => {
    onHighlight(color);
    setShowColors(false);
  };

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-1 flex gap-1"
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        transform: 'translate(-50%, -100%)'
      }}
    >
      {showColors ? (
        <div className="flex gap-1 px-1">
          {COLORS.map(color => (
            <button
              key={color.value}
              onClick={() => handleHighlight(color.value)}
              className="w-6 h-6 rounded hover:scale-110 transition-transform border border-gray-300 dark:border-gray-600"
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      ) : (
        <>
          <button
            onClick={() => setShowColors(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="高亮"
          >
            <Highlighter className="w-4 h-4" />
          </button>
          <button
            onClick={onAddNote}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="添加笔记"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          
          {existingHighlight && onDelete && (
            <button
              onClick={onDelete}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-red-500"
              title="删除高亮"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </>
      )}
    </div>
  );
};
