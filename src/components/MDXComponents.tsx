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

// 为了处理字符串形式的style
type StyleProps = {
  style?: CSSProperties | string;
  [key: string]: unknown;
};

interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'style'> {
  width?: number;
  height?: number;
  priority?: boolean;
  style?: CSSProperties | string;
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

// 将字符串样式转换为对象
function processStyleString(style: string): CSSProperties {
  try {
    // 从字符串转换成对象
    return style.split(';').reduce<Record<string, string>>((acc, current) => {
      const [key, value] = current.split(':');
      if (key && value) {
        // 转换为驼峰式
        const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        acc[camelKey] = value.trim();
      }
      return acc;
    }, {}) as unknown as CSSProperties;
  } catch (e) {
    console.error("Error processing style string:", e);
    return {};
  }
}

// 处理可能是字符串的样式
function getSafeStyle(style?: string | CSSProperties): CSSProperties | undefined {
  if (!style) return undefined;
  return typeof style === 'string' ? processStyleString(style) : style;
}

// 处理组件props中的样式
function getSafeProps<T extends { style?: string | CSSProperties, [key: string]: unknown }>(props: T): Omit<T, 'style'> & { style?: CSSProperties } {
  const { style, ...rest } = props;
  return {
    ...rest,
    style: getSafeStyle(style)
  };
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

const components = {
  CenteredImage,
  img: (props: ImageProps) => {
    const { src, alt, width, height, style, ...rest } = props;
    if (!src) return null;
    const safeStyle = getSafeStyle(style);
    
    return (
      <ZoomableImage 
        src={src} 
        alt={alt || ""} 
        style={safeStyle}
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
    
    // 处理嵌套的p标签
    const content = props.children;
    if (React.isValidElement(content) && content.type === 'p') {
      return (
        <blockquote 
          className="!border-l-4 !border-primary !pl-4 !rounded-tr-sm !rounded-br-sm !bg-gray-50 dark:!bg-gray-800/30 !m-4 !mt-4 !mb-4"
          style={{ 
            display: 'flex', 
            flexDirection: 'column' 
          }}
        >
          {React.cloneElement(content as React.ReactElement<HTMLComponentProps>, {
            className: '!m-0 !p-0 !py-3 leading-7',
            style: { 
              margin: 0, 
              padding: '0.75rem 0', 
              lineHeight: 1.7,
              display: 'block' // 替换inline-block为block
            }
          })}
        </blockquote>
      );
    }
    
    // 直接内容的情况
    return (
      <blockquote
        className="!border-l-4 !border-primary !pl-4 !rounded-tr-sm !rounded-br-sm !bg-gray-50 dark:!bg-gray-800/30 !m-4 !mt-4 !mb-4"
        style={{ 
          display: 'flex', 
          flexDirection: 'column' 
        }}
      >
        <p 
          className="!m-0 !p-0 !py-3 leading-7" 
          style={{ 
            margin: 0, 
            padding: '0.75rem 0',
            lineHeight: 1.7,
            display: 'block' // 替换inline-block为block
          }}
        >
          {content}
        </p>
      </blockquote>
    );
  },
  pre: (props: HTMLComponentProps) => {
    const { style, ...otherProps } = props;
    return (
      <div className="my-6">
        <pre {...otherProps} className="rounded-lg p-4 bg-muted overflow-x-auto" style={style} />
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
  div: ({ className, children, style, ...props }: { className?: string; children: React.ReactNode; style?: CSSProperties | string; [key: string]: unknown }) => {
    const safeStyle = getSafeStyle(style);
    
    if (className?.includes('columns-')) {
      const columnCount = className.match(/columns-(\d+)/)?.[1] || '2';
      return (
        <div className={`grid grid-cols-${columnCount} gap-4 my-4`} style={safeStyle} {...props}>
          {children}
        </div>
      );
    }
    
    if (className?.includes('highlight-')) {
      const colorClass = className.match(/highlight-(yellow|red|green|blue|purple)/)?.[1] || 'yellow';
      const colors = {
        yellow: {
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          border: 'border-yellow-200 dark:border-yellow-800/50'
        },
        red: {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800/50'
        },
        green: {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800/50'
        },
        blue: {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800/50'
        },
        purple: {
          bg: 'bg-purple-50 dark:bg-purple-900/20',
          border: 'border-purple-200 dark:border-purple-800/50'
        }
      };
      
      // 提取内容，处理额外的嵌套
      let content = children;
      if (React.isValidElement(content) && content.type === 'p') {
        content = (content as React.ReactElement<{children: React.ReactNode}>).props.children;
      }
      
      return (
        <div 
          className={`border rounded-lg ${colors[colorClass].bg} ${colors[colorClass].border}`}
          style={{ 
            margin: '16px 0', // 固定上下外边距
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div 
            className="px-4 py-3"
            style={{ lineHeight: '1.7' }}
          >
            {content}
          </div>
        </div>
      );
    }
    
    return <div style={safeStyle} {...props}>{children}</div>;
  },
  span: (props: { style?: string | CSSProperties; [key: string]: unknown }) => {
    const safeProps = getSafeProps(props);
    return <span {...safeProps} />;
  },
  Link: ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => (
    <Link to={to} className={className}>
      {children}
    </Link>
  ),
  h1: (props: { style?: string | CSSProperties; [key: string]: unknown }) => {
    const safeProps = getSafeProps(props);
    return <h1 className="text-3xl font-bold mt-10 mb-6" {...safeProps} />;
  },
  h2: (props: { style?: string | CSSProperties; [key: string]: unknown }) => {
    const safeProps = getSafeProps(props);
    return <h2 className="text-2xl font-semibold mt-8 mb-4" {...safeProps} />;
  },
  h3: (props: { style?: string | CSSProperties; [key: string]: unknown }) => {
    const safeProps = getSafeProps(props);
    return <h3 className="text-xl font-semibold mt-6 mb-3" {...safeProps} />;
  },
  h4: (props: { style?: string | CSSProperties; [key: string]: unknown }) => {
    const safeProps = getSafeProps(props);
    return <h4 {...safeProps} />;
  },
  h5: (props: { style?: string | CSSProperties; [key: string]: unknown }) => {
    const safeProps = getSafeProps(props);
    return <h5 {...safeProps} />;
  },
  h6: (props: { style?: string | CSSProperties; [key: string]: unknown }) => {
    const safeProps = getSafeProps(props);
    return <h6 {...safeProps} />;
  },
  p: (props: { children?: ReactNode; className?: string; [key: string]: unknown }) => {
    const { children, className, ...rest } = props;
    
    const content = children?.toString() || '';
    
    // 检查是否包含数学公式 $...$
    if (typeof content === 'string' && (content.includes('$') && !content.includes('\\$'))) {
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
              return part;
            })}
          </p>
        );
      } catch (error) {
        console.error('LaTeX渲染错误:', error);
        return <p className={className || "mb-5 leading-7"} {...rest}>{children}</p>;
      }
    }
    
    // 使用默认类名，通过全局CSS控制在不同环境下的外观
    return <p className={className || "mb-5 leading-7"} {...rest}>{children}</p>;
  },
  ul: (props: { style?: string | CSSProperties; [key: string]: unknown }) => {
    const safeProps = getSafeProps(props);
    return <ul className="list-disc pl-6 my-4 space-y-2 dark:text-gray-200" {...safeProps} />;
  },
  li: (props: { style?: string | CSSProperties; [key: string]: unknown }) => {
    const safeProps = getSafeProps(props);
    return <li className="mb-2" {...safeProps} />;
  },
  ol: (props: { style?: string | CSSProperties; [key: string]: unknown }) => {
    const safeProps = getSafeProps(props);
    return <ol className="list-decimal pl-6 my-4 space-y-2 dark:text-gray-200" {...safeProps} />;
  },
  table: (props: { style?: string | CSSProperties; [key: string]: unknown }) => {
    const safeProps = getSafeProps(props);
    return (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse dark:text-gray-200" {...safeProps} />
      </div>
    );
  },
  th: (props: { style?: string | CSSProperties; [key: string]: unknown }) => {
    const safeProps = getSafeProps(props);
    return <th className="border border-border px-4 py-2 text-left font-bold dark:border-gray-700 dark:text-white" {...safeProps} />;
  },
  td: (props: { style?: string | CSSProperties; [key: string]: unknown }) => {
    const safeProps = getSafeProps(props);
    return <td className="border border-border px-4 py-2 dark:border-gray-700 dark:text-gray-200" {...safeProps} />;
  },
  mark: HighlightedMark,
  'colored-span': ColoredSpan,
  Warning: WarningText,
  Note: NoteText,
  Info: InfoText,
  ErrorBoundary,
};

export default components;