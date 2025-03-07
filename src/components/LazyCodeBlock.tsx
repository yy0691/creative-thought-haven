import React, { lazy, Suspense } from 'react';

// 懒加载代码高亮组件
const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter/dist/esm/prism-light'));

interface CodeBlockProps {
  language: string;
  value: string;
}

const LazyCodeBlock = ({ language, value }: CodeBlockProps) => {
  return (
    <div className="rounded-md my-4 overflow-hidden">
      <Suspense fallback={<div className="p-4 bg-muted text-muted-foreground">加载代码...</div>}>
        <SyntaxHighlighter
          language={language}
          useInlineStyles={false}
          PreTag="div"
          className="text-sm p-4 overflow-auto"
        >
          {value}
        </SyntaxHighlighter>
      </Suspense>
    </div>
  );
};

export default LazyCodeBlock; 