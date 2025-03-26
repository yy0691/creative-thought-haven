import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';

interface ImageDisplayProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ src, alt, style }) => {
  const [imgError, setImgError] = useState(false);
  
  // 确保src有值
  if (!src) {
    console.warn('图片源地址为空');
    return (
      <div className="w-full h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
        <div className="flex flex-col items-center text-gray-400">
          <LucideIcons.ImageOff size={24} />
          <span className="text-xs mt-2">无图片</span>
        </div>
      </div>
    );
  }
  
  // 处理图片URL
  let imageUrl = src;
  
  // 对于远程URL，使用代理
  if (src.startsWith('http')) {
    // 在生产环境使用代理
    const isProduction = import.meta.env.PROD;
    if (isProduction) {
      const encodedUrl = encodeURIComponent(src);
      imageUrl = `/api/image-proxy?url=${encodedUrl}`;
    } else {
      // 开发环境直接使用原始URL
      imageUrl = src;
    }
  } else if (src.startsWith('/')) {
    // 如果是相对路径，不做修改
    imageUrl = src;
  } else {
    // 如果不是相对路径，假设是本地图片
    imageUrl = `/images/ai/${src}`;
  }
  
  const handleError = () => {
    console.error('图片加载失败:', imageUrl);
    setImgError(true);
  };
  
  if (imgError) {
    // 显示备用图像或占位符
    return (
      <div className="w-full h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
        <div className="flex flex-col items-center text-gray-400">
          <LucideIcons.ImageOff size={24} />
          <span className="text-xs mt-2">{alt}</span>
        </div>
      </div>
    );
  }
  
  return (
    <img 
      src={imageUrl}
      alt={alt} 
      className="w-full h-full object-cover"
      style={style}
      onError={handleError}
      loading="lazy"
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
  );
};

export default ImageDisplay; 