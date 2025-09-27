import React, { ReactNode, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Highlight from './Highlight';
import CenteredImage from './mdx/CenteredImage';
import { MDXProvider } from '@mdx-js/react';
import { Math } from './MathJax';
import 'katex/dist/katex.min.css';
import LazyImage from './LazyImage';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { ColoredSpan, HighlightedMark, WarningText, NoteText, InfoText } from './StyledElements';
import { ZoomableImage } from './ImageViewer';

// 简化样式处理
type StyleProps = {
  style?: CSSProperties;
  [key: string]: unknown;
};

interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'style'> {
  width?: number;
  height?: number;
  priority?: boolean;
  style?: CSSProperties;
}

interface HTMLComponentProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

interface BlockquoteProps {
  children: ReactNode;
  [key: string]: unknown;
}

// 懒加载代码块组件
const CodeBlock = lazy(() => import('./CodeBlock'));

interface CodeBlockProps {
  language: string;
  value: string;
  [key: string]: unknown;
}

const LazyCodeBlock = (props: CodeBlockProps) => (
  <Suspense fallback={<div className="bg-muted p-4 rounded-lg">加载代码块...</div>}>
    <CodeBlock {...props} />
  </Suspense>
);

// 简化的组件配置
const components = {
  CenteredImage,
  img: (props: ImageProps) => {
    const { src, alt, width, height, style, ...rest } = props;
    if (!src) return null;
    
    return (
      <ZoomableImage 
        src={src} 
        alt={alt || ""} 
        style={style}
        className="rounded-md max-w-full h-auto"
        {...rest} 
      />
    );
  },
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => {
    const isInternal = href?.startsWith('/');
    if (isInternal) {
      return <Link to={href} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">{children}</Link>;
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
      >
        {children}
      </a>
    );
  },
  blockquote: (props: BlockquoteProps) => {
    // 判断是否为Highlight用法
    if (props.children && typeof props.children === 'object' && !React.isValidElement(props.children)) {
      return <Highlight type="info">{props.children}</Highlight>;
    }
    
    return (
      <blockquote className="border-l-4 border-primary pl-4 rounded-tr-sm rounded-br-sm bg-gray-50 dark:bg-gray-800/30 m-4">
        {props.children}
      </blockquote>
    );
  },
  pre: (props: HTMLComponentProps) => {
    return (
      <div className="my-6">
        <pre {...props} className="rounded-lg p-4 bg-muted overflow-x-auto" />
      </div>
    );
  },
  code: ({ className, children, ...props }: { className?: string; children: ReactNode; [key: string]: unknown }) => {
    const match = /language-(\w+)/.exec(className || '');
    
    if (match && match[1] === 'math') {
      return (
        <ErrorBoundary>
          <Math inline={false}>{children as string}</Math>
        </ErrorBoundary>
      );
    }
    
    if (match && match[1] === 'inline-math') {
      return (
        <ErrorBoundary>
          <Math inline={true}>{children as string}</Math>
        </ErrorBoundary>
      );
    }
    
    return match ? (
      <ErrorBoundary>
        <LazyCodeBlock language={match[1]} value={children as string} />
      </ErrorBoundary>
    ) : (
      <code className="text-sm bg-muted px-1 py-0.5 rounded dark:bg-gray-800" {...props}>
        {children}
      </code>
    );
  },
  h1: (props: HTMLComponentProps) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 text-primary dark:text-primary-foreground" {...props} />
  ),
  h2: (props: HTMLComponentProps) => (
    <h2 className="text-2xl font-bold mt-6 mb-3 text-primary dark:text-primary-foreground" {...props} />
  ),
  h3: (props: HTMLComponentProps) => (
    <h3 className="text-xl font-bold mt-4 mb-2 text-primary dark:text-primary-foreground" {...props} />
  ),
  h4: (props: HTMLComponentProps) => (
    <h4 className="text-lg font-bold mt-3 mb-2 text-primary dark:text-primary-foreground" {...props} />
  ),
  h5: (props: HTMLComponentProps) => (
    <h5 className="text-base font-bold mt-2 mb-1 text-primary dark:text-primary-foreground" {...props} />
  ),
  h6: (props: HTMLComponentProps) => (
    <h6 className="text-sm font-bold mt-2 mb-1 text-primary dark:text-primary-foreground" {...props} />
  ),
  p: (props: HTMLComponentProps) => {
    const { children, className, ...rest } = props;

    // Only attempt inline math splitting when the paragraph contains a single string child
    const kids = React.Children.toArray(children);
    if (kids.length === 1 && typeof kids[0] === 'string') {
      const content = kids[0] as string;

      // 检查是否包含数学公式 $...$
      if (content.includes('$') && !content.includes('\\$')) {
        try {
          const parts = content.split(/(\$[^$]+\$)/g);

          return (
            <p className={className || "mb-5 leading-7"} {...rest}>
              {parts.map((part, i) => {
                if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
                  const formula = part.slice(1, -1);
                  return (
                    <ErrorBoundary key={i} fallback={`$${formula}$`}>
                      <Math inline={true}>{formula}</Math>
                    </ErrorBoundary>
                  );
                }
                return <React.Fragment key={i}>{part}</React.Fragment>;
              })}
            </p>
          );
        } catch (error) {
          console.error('LaTeX渲染错误:', error);
          return <p className={className || "mb-5 leading-7"} {...rest}>{children}</p>;
        }
      }

      // No math markers, render as-is
      return <p className={className || "mb-5 leading-7"} {...rest}>{children}</p>;
    }

    // Mixed or non-string children (may include JSX like <mark/>) — render unchanged
    return <p className={className || "mb-5 leading-7"} {...rest}>{children}</p>;
  },
  ul: (props: HTMLComponentProps) => (
    <ul className="list-disc pl-6 my-4 space-y-2 dark:text-gray-200" {...props} />
  ),
  li: (props: HTMLComponentProps) => (
    <li className="mb-2" {...props} />
  ),
  ol: (props: HTMLComponentProps) => (
    <ol className="list-decimal pl-6 my-4 space-y-2 dark:text-gray-200" {...props} />
  ),
  table: (props: HTMLComponentProps) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse dark:text-gray-200" {...props} />
    </div>
  ),
  th: (props: HTMLComponentProps) => (
    <th className="border border-border px-4 py-2 text-left font-bold dark:border-gray-700 dark:text-white" {...props} />
  ),
  td: (props: HTMLComponentProps) => (
    <td className="border border-border px-4 py-2 dark:border-gray-700 dark:text-gray-200" {...props} />
  ),
  mark: (props: HTMLComponentProps) => {
    const { style, children, ...rest } = props;
    return (
      <mark 
        style={style} 
        className="px-1 py-0.5 rounded-sm" 
        {...rest}
      >
        {children}
      </mark>
    );
  },
  span: (props: HTMLComponentProps) => {
    const { style, className, children, ...rest } = props;
    return (
      <span 
        style={style} 
        className={className} 
        {...rest}
      >
        {children}
      </span>
    );
  },
  div: (props: HTMLComponentProps) => {
    const { style, className, children, ...rest } = props;
    return (
      <div 
        style={style} 
        className={className} 
        {...rest}
      >
        {children}
      </div>
    );
  },
  'colored-span': ColoredSpan,
  Warning: WarningText,
  Note: NoteText,
  Info: InfoText,
  ErrorBoundary,
};

export default components;