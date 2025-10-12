import React, { ReactNode } from 'react';
import { Annotation } from '@/types/annotations';

interface AnnotatedContentProps {
  children: ReactNode;
  annotations: Annotation[];
  onAnnotationClick?: (annotation: Annotation) => void;
}

/**
 * AnnotatedContent - 包装文章内容并显示用户标注
 * 用于在文章中高亮显示用户的笔记和标注
 */
export const AnnotatedContent: React.FC<AnnotatedContentProps> = ({
  children,
  annotations,
  onAnnotationClick
}) => {
  // 目前先简单渲染children，后续可以添加标注高亮逻辑
  // 标注功能通过AnnotationWrapper在更高层级实现
  return (
    <div className="annotated-content relative">
      {children}
      
      {/* 如果需要在内容中显示标注标记，可以在这里添加 */}
      {annotations.length > 0 && (
        <div className="annotations-markers">
          {annotations.map((annotation) => (
            <span
              key={annotation.id}
              className="annotation-marker"
              onClick={() => onAnnotationClick?.(annotation)}
              style={{ display: 'none' }} // 暂时隐藏，通过AnnotationWrapper处理
            />
          ))}
        </div>
      )}
    </div>
  );
};
