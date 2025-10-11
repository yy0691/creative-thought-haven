import React, { useState, useRef, useCallback, ReactNode } from 'react';
import { useAnnotations } from '@/app/hooks/useAnnotations';
import { HighlightMenu } from './HighlightMenu';

interface AnnotationWrapperProps {
  children: ReactNode;
  articleId: string;
}

export const AnnotationWrapper: React.FC<AnnotationWrapperProps> = ({ children, articleId }) => {
  const [menu, setMenu] = useState<{ top: number; left: number; selection: Selection } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { addAnnotation } = useAnnotations();

  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const contentRect = contentRef.current?.getBoundingClientRect();

      if (contentRect && contentRef.current?.contains(range.commonAncestorContainer)) {
        setMenu({
          top: rect.top - contentRect.top,
          left: rect.left - contentRect.left + rect.width / 2,
          selection: selection,
        });
      } else {
        setMenu(null);
      }
    } else {
      setMenu(null);
    }
  }, []);

  const handleHighlight = (color: string) => {
    if (menu) {
      const { selection } = menu;
      const range = selection.getRangeAt(0);
      addAnnotation({
        articleId,
        text: range.toString(),
        startOffset: range.startOffset,
        endOffset: range.endOffset,
        type: 'highlight',
      });
      setMenu(null);
    }
  };

  const handleAddNote = () => {
    if (menu) {
      const { selection } = menu;
      const range = selection.getRangeAt(0);
      const noteContent = prompt('Enter your note:');
      if (noteContent) {
        addAnnotation({
          articleId,
          text: range.toString(),
          startOffset: range.startOffset,
          endOffset: range.endOffset,
          type: 'note',
          noteContent,
        });
      }
      setMenu(null);
    }
  };

  return (
    <div ref={contentRef} onMouseUp={handleMouseUp} style={{ position: 'relative' }}>
      {children}
      {menu && (
        <HighlightMenu
          position={{ top: menu.top, left: menu.left }}
          onHighlight={() => handleHighlight('#fef08a')} // Default color, can be enhanced
          onAddNote={handleAddNote}
        />
      )}
    </div>
  );
};
