import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MDXComponents from './MDXComponents';

interface MDXContentProps {
  content: string;
  className?: string;
}

export const MDXContent: React.FC<MDXContentProps> = ({ content, className }) => {
  return (
    <div className={className}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={MDXComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}; 