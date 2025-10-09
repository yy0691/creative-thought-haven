import { useEffect, useState, useRef, ReactNode } from 'react';
import { HighlightMenu } from './HighlightMenu';

interface TextHighlighterProps {
  children: ReactNode;
  onHighlight: (text: string, position: { start: number; end: number }, color: string) => void;
  containerRef: React.RefObject<HTMLElement>;
}

export const TextHighlighter = ({ children, onHighlight, containerRef }: TextHighlighterProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<{ start: number; end: number } | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setShowMenu(false);
        return;
      }

      const text = selection.toString().trim();
      if (!text) {
        setShowMenu(false);
        return;
      }

      const container = containerRef.current;
      if (!container) return;

      const range = selection.getRangeAt(0);
      const containerText = container.textContent || '';
      
      const start = containerText.indexOf(text);
      if (start === -1) {
        setShowMenu(false);
        return;
      }

      setSelectedText(text);
      setSelectedPosition({ start, end: start + text.length });
      setShowMenu(true);
    };

    const handleMouseDown = (event: MouseEvent) => {
      // 只在点击菜单外部时关闭菜单
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [containerRef]);

  const handleHighlight = (color: string) => {
    if (selectedText && selectedPosition) {
      onHighlight(selectedText, selectedPosition, color);
      window.getSelection()?.removeAllRanges();
      setShowMenu(false);
    }
  };

  return (
    <>
      {children}
      {showMenu && (
        <div ref={menuRef}>
          <HighlightMenu 
            onHighlight={handleHighlight}
          />
        </div>
      )}
    </>
  );
};
