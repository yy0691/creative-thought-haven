import React, { useState, useEffect } from 'react';
import { Skeleton } from './ui/skeleton';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  
  useEffect(() => {
    // 创建新图片对象进行预加载
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setIsLoaded(true);
    };
    img.onerror = () => {
      // 可以设置一个默认图片
      setImgSrc('/placeholder.png');
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <>
      {!isLoaded && <Skeleton className={`${className} min-h-[200px]`} />}
      <img 
        src={imgSrc} 
        alt={alt} 
        className={`${className} ${isLoaded ? 'block' : 'hidden'}`}
        loading="lazy"
      />
    </>
  );
};

export default LazyImage; 