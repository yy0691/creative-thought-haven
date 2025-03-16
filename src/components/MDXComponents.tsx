import React from 'react';
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

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt?: string;
  width?: string | number;
  height?: string | number;
  scale?: number;
}

const Image = ({ alt, src, width, height, scale = 1, ...props }: ImageProps) => {
  const [error, setError] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  const imageStyle = {
    width: width || '100%',
    height: height || 'auto',
    objectFit: 'contain' as const,
    transform: `scale(${scale})`,
    transformOrigin: 'center center'
  };

  // 使用 span 替代 div，因为 span 是行内元素，可以放在 p 标签内
  return (
    <span className="block my-6 relative">
      {!loaded && !error && (
        <span className="block w-full h-48 bg-gray-100 animate-pulse rounded-lg" />
      )}
      {error ? (
        <span className="block w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg">
          <span className="text-gray-500">图片加载失败</span>
        </span>
      ) : (
        <img
          {...props}
          src={src}
          alt={alt || ''}
          style={imageStyle}
          className={`rounded-lg shadow-md transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onError={() => setError(true)}
          onLoad={() => setLoaded(true)}
        />
      )}
      {alt && loaded && !error && (
        <span className="block text-sm text-center text-muted-foreground mt-2">{alt}</span>
      )}
    </span>
  );
};

// 懒加载代码块组件
const CodeBlock = lazy(() => import('./CodeBlock'));

const LazyCodeBlock = (props) => (
  <Suspense fallback={<div className="bg-muted p-4 rounded-lg">加载代码块...</div>}>
    <CodeBlock {...props} />
  </Suspense>
);

// 安全处理样式属性的辅助函数
const processStyleString = (styleString) => {
  if (!styleString) return {};
  
  try {
    // 尝试处理旧格式的样式字符串
    const styleObj = {};
    styleString.split(';').forEach(item => {
      const [key, value] = item.split(':').map(s => s?.trim());
      if (key && value) {
        // 转换CSS属性为驼峰命名
        const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        styleObj[camelKey] = value;
      }
    });
    return styleObj;
  } catch (e) {
    console.error('样式处理错误:', e);
    return {};
  }
};

// 安全包装HTML元素的函数
const withSafeProps = (Component) => {
  return (props) => {
    const safeProps = {...props};
    
    // 处理样式属性
    if (typeof props.style === 'string') {
      safeProps.style = processStyleString(props.style);
    }
    
    return <Component {...safeProps} />;
  };
};

const components = {
  CenteredImage,
  img: ({ src, alt, style, ...props }) => {
    if (!src) return null;
    const safeStyle = typeof style === 'string' ? processStyleString(style) : style;
    return <LazyImage 
      src={src} 
      alt={alt || ""} 
      {...props} 
    />;
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
  blockquote: (props: any) => {
    // 如果是Highlight组件的用法
    if (props.children && typeof props.children === 'object') {
      return <Highlight type="info">{props.children}</Highlight>;
    }
    // 否则使用普通的blockquote样式
    return (
      <blockquote className="border-l-4 border-primary pl-4 italic my-2 dark:border-primary-foreground dark:text-gray-300" {...props} />
    );
  },
  pre: (props: any) => (
    <div className="my-6">
      <pre {...props} className="rounded-lg p-4 bg-muted overflow-x-auto" />
    </div>
  ),
  code: ({ className, children, ...props }) => {
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
        <LazyCodeBlock language={match[1]} value={children} />
      </ErrorBoundary>
    ) : (
      <code className="text-sm bg-muted px-1 py-0.5 rounded dark:bg-gray-800" {...props}>
        {children}
      </code>
    );
  },
  div: ({ className, children, style, ...props }: { className?: string; children: React.ReactNode; style?: React.CSSProperties }) => {
    const safeStyle = typeof style === 'string' ? processStyleString(style) : style;
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
        yellow: 'bg-yellow-100 border-yellow-200',
        red: 'bg-red-100 border-red-200',
        green: 'bg-green-100 border-green-200',
        blue: 'bg-blue-100 border-blue-200',
        purple: 'bg-purple-100 border-purple-200'
      };
      return (
        <div className={`p-4 rounded-lg border ${colors[colorClass]} my-4`}>
          <p className="mb-5 last:mb-0 leading-7">{children}</p>
        </div>
      );
    }
    return <div style={safeStyle} {...props}>{children}</div>;
  },
  span: withSafeProps((props) => <span {...props} />),
  Link: ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => (
    <Link to={to} className={className}>
      {children}
    </Link>
  ),
  h1: withSafeProps(props => <h1 className="text-3xl font-bold mt-10 mb-6" {...props} />),
  h2: withSafeProps(props => <h2 className="text-2xl font-semibold mt-8 mb-4" {...props} />),
  h3: withSafeProps(props => <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />),
  h4: withSafeProps(props => <h4 {...props} />),
  h5: withSafeProps(props => <h5 {...props} />),
  h6: withSafeProps(props => <h6 {...props} />),
  p: props => {
    const { children, className, ...rest } = props;
    
    const content = children?.toString() || '';
    
    // 检查是否包含数学公式 $...$
    if (typeof content === 'string' && (content.includes('$') && !content.includes('\\$'))) {
      try {
        const parts = content.split(/(\$[^$]+\$)/g);
        
        return (
          <p className="mb-5 leading-7" {...rest}>
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
        return <p className="mb-5 leading-7" {...rest}>{children}</p>;
      }
    }
    
    return <p className="mb-5 leading-7" {...rest}>{children}</p>;
  },
  ul: withSafeProps(props => (
    <ul className="list-disc pl-6 my-4 space-y-2 dark:text-gray-200" {...props} />
  )),
  li: withSafeProps(props => (
    <li className="mb-2" {...props} />
  )),
  ol: (props: any) => <ol className="list-decimal pl-6 my-4 space-y-2 dark:text-gray-200" {...props} />,
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse dark:text-gray-200" {...props} />
    </div>
  ),
  th: (props: any) => <th className="border border-border px-4 py-2 text-left font-bold dark:border-gray-700 dark:text-white" {...props} />,
  td: (props: any) => <td className="border border-border px-4 py-2 dark:border-gray-700 dark:text-gray-200" {...props} />,
  mark: withSafeProps((props) => <mark {...props} />),
  ColoredSpan,
  HighlightedMark,
  WarningText,
  NoteText,
  InfoText,
};

export default components;