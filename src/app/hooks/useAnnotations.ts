import { useContext } from 'react';
import { AnnotationContext } from '../../contexts/AnnotationContext';

export const useAnnotations = () => {
  const context = useContext(AnnotationContext);
  if (!context) {
    throw new Error('useAnnotations must be used within an AnnotationProvider');
  }
  return context;
};
