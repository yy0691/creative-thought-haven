import React, { useState } from 'react';

interface FigmaEmbedProps {
  url: string;
  title?: string;
  className?: string;
}

const FigmaEmbed: React.FC<FigmaEmbedProps> = ({ url, title, className = '' }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 处理 Figma URL，确保是嵌入链接
  const getEmbedUrl = (url: string) => {
    // 处理原型链接
    if (url.includes('figma.com/proto')) {
      const baseUrl = url.split('?')[0];
      const params = new URLSearchParams({
        'node-id': '1:4',
        'scaling': 'contain',
        'mode': 'design',
        'hide-ui': '1',
        'embed_host': 'share'
      });
      return `${baseUrl}?${params.toString()}&embed=1`;
    }
    // 处理文件链接
    if (url.includes('figma.com/file')) {
      return url.replace('figma.com/file', 'figma.com/embed');
    }
    // 处理设计链接
    if (url.includes('figma.com/design')) {
      return url.replace('figma.com/design', 'figma.com/embed');
    }
    return url;
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`figma-embed relative ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''} ${className}`}>
      {/* 全屏切换按钮 */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
        title={isFullscreen ? '退出全屏' : '全屏显示'}
      >
        {isFullscreen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1"/>
          </svg>
        )}
      </button>

      {/* Figma 嵌入框架 */}
      <iframe
        className={`w-full ${isFullscreen ? 'h-screen' : 'aspect-video'} border-0 rounded-lg`}
        src={getEmbedUrl(url)}
        allowFullScreen
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title={title || 'Figma 设计稿'}
      />
    </div>
  );
};

export default FigmaEmbed;
