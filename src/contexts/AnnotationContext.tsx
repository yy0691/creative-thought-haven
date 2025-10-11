import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { Annotation } from '../types/annotations';

interface AnnotationContextType {
  annotations: Annotation[];
  addAnnotation: (annotation: Omit<Annotation, 'id' | 'createdAt'>) => void;
  updateAnnotation: (id: string, noteContent: string) => void;
  deleteAnnotation: (id: string) => void;
  getAnnotationsForArticle: (articleId: string) => Annotation[];
}

export const AnnotationContext = createContext<AnnotationContextType | undefined>(undefined);

interface AnnotationProviderProps {
  children: ReactNode;
}

export const AnnotationProvider: React.FC<AnnotationProviderProps> = ({ children }) => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  useEffect(() => {
    try {
      const storedAnnotations = localStorage.getItem('annotations');
      if (storedAnnotations) {
        setAnnotations(JSON.parse(storedAnnotations));
      }
    } catch (error) {
      console.error('Failed to load annotations from localStorage:', error);
    }
  }, []);

  const saveAnnotations = (newAnnotations: Annotation[]) => {
    try {
      setAnnotations(newAnnotations);
      localStorage.setItem('annotations', JSON.stringify(newAnnotations));
    } catch (error) {
      console.error('Failed to save annotations to localStorage:', error);
    }
  };

  const addAnnotation = (annotation: Omit<Annotation, 'id' | 'createdAt'>) => {
    const newAnnotation: Annotation = {
      ...annotation,
      id: `anno-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    saveAnnotations([...annotations, newAnnotation]);
  };

  const updateAnnotation = (id: string, noteContent: string) => {
    const newAnnotations = annotations.map(anno =>
      anno.id === id ? { ...anno, noteContent } : anno
    );
    saveAnnotations(newAnnotations);
  };

  const deleteAnnotation = (id: string) => {
    const newAnnotations = annotations.filter(anno => anno.id !== id);
    saveAnnotations(newAnnotations);
  };

  const getAnnotationsForArticle = (articleId: string) => {
    return annotations.filter(anno => anno.articleId === articleId).sort((a, b) => a.startOffset - b.startOffset);
  };

  const value = {
    annotations,
    addAnnotation,
    updateAnnotation,
    deleteAnnotation,
    getAnnotationsForArticle,
  };

  return (
    <AnnotationContext.Provider value={value}>
      {children}
    </AnnotationContext.Provider>
  );
};
