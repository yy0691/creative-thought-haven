import React from 'react';
import { Link } from 'react-router-dom';
import Highlight from './Highlight';
import CenteredImage from './mdx/CenteredImage';
import LazyCodeBlock from './LazyCodeBlock';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt?: string;
  width?: string | number;
  height?: string | number;
  scale?: number;
}

const Image = ({ alt, src, width, height, scale = 1, ...props }: ImageProps) => {
  const [error, setError] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  // 处理图片路径
  const imageSrc = src?.startsWith('/')
    ? src
    : src?.startsWith('http')
    ? src
    : src?.startsWith('images/')
    ? src
    : `/images/${src}`;

  const imageStyle = {
    width: width || '100%',
    height: height || 'auto',
    objectFit: 'contain' as const,
    transform: `scale(${scale})`,
    transformOrigin: 'center center'
  };

  return (
    <div className="my-6 relative">
      {!loaded && !error && (
        <div className="w-full h-48 bg-gray-100 animate-pulse rounded-lg" />
      )}
      {error ? (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg">
          <p className="text-gray-500">图片加载失败</p>
        </div>
      ) : (
        <img
          {...props}
          src={imageSrc}
          alt={alt || ''}
          style={imageStyle}
          className={`rounded-lg shadow-md transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onError={() => setError(true)}
          onLoad={() => setLoaded(true)}
        />
      )}
      {alt && loaded && !error && (
        <p className="text-sm text-center text-muted-foreground mt-2">{alt}</p>
      )}
    </div>
  );
};

const components = {
  CenteredImage,
  img: Image,
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
        className="text-purple-500 hover:text-purple-800 hover:underline transition-colors"
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
      <blockquote className="border-l-4 border-primary pl-4 italic my-4 dark:border-primary-foreground dark:text-gray-300" {...props} />
    );
  },
  pre: (props: any) => (
    <div className="my-6">
      <pre {...props} className="rounded-lg p-4 bg-muted overflow-x-auto" />
    </div>
  ),
  code: ({ className, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return match ? (
      <LazyCodeBlock language={match[1]} value={props.children} />
    ) : (
      <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props} />
    );
  },
  div: ({ className, children, ...props }: { className?: string; children: React.ReactNode }) => {
    if (className?.includes('columns-')) {
      const columnCount = className.match(/columns-(\d+)/)?.[1] || '2';
      return (
        <div className={`grid grid-cols-${columnCount} gap-4 my-4`} {...props}>
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
        <div className={`p-4 rounded-lg border ${colors[colorClass]} my-4`} {...props}>
          {children}
        </div>
      );
    }
    return <div {...props}>{children}</div>;
  },
  span: ({ className, children, ...props }: { className?: string; children: React.ReactNode }) => {
    if (className?.includes('highlight')) {
      return <span className="bg-yellow-100 px-1 rounded-sm dark:bg-yellow-900/30 dark:text-yellow-100" {...props}>{children}</span>;
    }
    return <span {...props}>{children}</span>;
  },
  Link: ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => (
    <Link to={to} className={className}>
      {children}
    </Link>
  ),
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4 dark:text-white" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-6 mb-3 dark:text-white" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-4 mb-2 dark:text-white" {...props} />,
  h4: (props: any) => <h4 className="text-lg font-bold mt-3 mb-2 dark:text-white" {...props} />,
  p: (props: any) => <p className="my-4 dark:text-gray-200" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 my-4 space-y-2 dark:text-gray-200" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 my-4 space-y-2 dark:text-gray-200" {...props} />,
  li: (props: any) => <li className="pl-2 dark:text-gray-200" {...props} />,
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse dark:text-gray-200" {...props} />
    </div>
  ),
  th: (props: any) => <th className="border border-border px-4 py-2 text-left font-bold dark:border-gray-700 dark:text-white" {...props} />,
  td: (props: any) => <td className="border border-border px-4 py-2 dark:border-gray-700 dark:text-gray-200" {...props} />,
};

export default components;