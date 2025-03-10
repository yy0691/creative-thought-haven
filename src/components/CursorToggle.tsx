import React from 'react';
import { useCursor } from '../contexts/CursorContext';
import { Button } from './ui/button';

export default function CursorToggle() {
  const { showCursor, toggleCursor } = useCursor();
  
  return (
    <Button
      variant="outline"
      size="sm"
      className="fixed bottom-4 right-4 z-50 rounded-full w-10 h-10 p-0 flex items-center justify-center bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10"
      onClick={toggleCursor}
      title={showCursor ? "关闭鼠标特效" : "开启鼠标特效"}
    >
      {showCursor ? (
        // 开启状态 - 带波纹效果的鼠标指针
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
          <circle cx="13" cy="13" r="3" strokeDasharray="2" />
          <circle cx="13" cy="13" r="6" strokeDasharray="2" />
        </svg>
      ) : (
        // 关闭状态 - 普通鼠标指针
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        </svg>
      )}
    </Button>
  );
} 