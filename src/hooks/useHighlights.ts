import { useState, useEffect } from 'react';
import { emitStatsUpdate } from '../utils/statsEvents';

export interface Highlight {
  id: string;
  articleId: string;
  text: string;
  note?: string;
  color: string;
  position: {
    start: number;
    end: number;
  };
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'article_highlights';

export const useHighlights = (articleId: string) => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  useEffect(() => {
    loadHighlights();
  }, [articleId]);

  const loadHighlights = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const allHighlights = JSON.parse(stored) as Highlight[];
        const articleHighlights = allHighlights.filter(h => h.articleId === articleId);
        setHighlights(articleHighlights);
      }
    } catch (error) {
      console.error('Failed to load highlights:', error);
    }
  };

  const saveToStorage = (updatedHighlights: Highlight[]) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const allHighlights = stored ? JSON.parse(stored) as Highlight[] : [];
      
      const otherHighlights = allHighlights.filter(h => h.articleId !== articleId);
      const merged = [...otherHighlights, ...updatedHighlights];
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      setHighlights(updatedHighlights);
      
      // 触发统计更新事件
      emitStatsUpdate();
    } catch (error) {
      console.error('Failed to save highlights:', error);
    }
  };

  const addHighlight = (text: string, position: { start: number; end: number }, color = '#fef08a') => {
    const newHighlight: Highlight = {
      id: `${articleId}-${Date.now()}-${Math.random()}`,
      articleId,
      text,
      color,
      position,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [...highlights, newHighlight];
    saveToStorage(updated);
    return newHighlight.id;
  };

  const updateNote = (highlightId: string, note: string) => {
    const updated = highlights.map(h =>
      h.id === highlightId
        ? { ...h, note, updatedAt: new Date().toISOString() }
        : h
    );
    saveToStorage(updated);
  };

  const deleteHighlight = (highlightId: string) => {
    const updated = highlights.filter(h => h.id !== highlightId);
    saveToStorage(updated);
  };

  const changeColor = (highlightId: string, color: string) => {
    const updated = highlights.map(h =>
      h.id === highlightId
        ? { ...h, color, updatedAt: new Date().toISOString() }
        : h
    );
    saveToStorage(updated);
  };

  return {
    highlights,
    addHighlight,
    updateNote,
    deleteHighlight,
    changeColor
  };
};
