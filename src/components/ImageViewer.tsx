import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

// 定义图像查看器上下文类型
type ImageViewerContextType = {
  openImage: (src: string, alt?: string) => void;
  closeImage: () => void;
};

// 创建上下文
const ImageViewerContext = createContext<ImageViewerContextType | undefined>(undefined);

// 图像查看器提供者Props
interface ImageViewerProviderProps {
  children: ReactNode;
}

// 图像查看器组件
export const ImageViewerProvider: React.FC<ImageViewerProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [scale, setScale] = useState(1);
  
  // 打开图片
  const openImage = (src: string, alt?: string) => {
    setImageSrc(src);
    setImageAlt(alt || '图片');
    setIsOpen(true);
    setScale(1); // 重置缩放
    document.body.style.overflow = 'hidden'; // 防止滚动
  };
  
  // 关闭图片
  const closeImage = () => {
    setIsOpen(false);
    setScale(1);
    document.body.style.overflow = ''; // 恢复滚动
  };
  
  // 放大图片
  const zoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.5, 3));
  };
  
  // 缩小图片
  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.5, 0.5));
  };
  
  // 监听ESC键关闭图片
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);
  
  // 应用全局样式
  useEffect(() => {
    // 添加全局图片悬停样式
    const style = document.createElement('style');
    style.innerHTML = `
      img:not(.no-zoom) {
        cursor: zoom-in;
        transition: filter 0.2s;
      }
      img:not(.no-zoom):hover {
        filter: brightness(1.05);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <ImageViewerContext.Provider value={{ openImage, closeImage }}>
      {children}
      
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
              onClick={closeImage}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none"
            >
              <div className="relative max-w-[90vw] max-h-[90vh] pointer-events-auto">
                <motion.img
                  src={imageSrc}
                  alt={imageAlt}
                  style={{ 
                    transform: `scale(${scale})`,
                    objectFit: 'contain',
                    maxWidth: '100%',
                    maxHeight: '90vh',
                  }}
                  className="no-zoom select-none"
                  onClick={(e) => e.stopPropagation()}
                  transition={{ duration: 0.3 }}
                />
                
                {/* 控制按钮 */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={zoomIn}
                    className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    title="放大"
                  >
                    <ZoomIn size={20} />
                  </button>
                  <button
                    onClick={zoomOut}
                    className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    title="缩小"
                  >
                    <ZoomOut size={20} />
                  </button>
                  <button
                    onClick={closeImage}
                    className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    title="关闭"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ImageViewerContext.Provider>
  );
};

// 自定义Hook，用于在组件中使用图像查看器
export const useImageViewer = (): ImageViewerContextType => {
  const context = useContext(ImageViewerContext);
  if (!context) {
    throw new Error('useImageViewer must be used within an ImageViewerProvider');
  }
  return context;
};

// 图片包装组件，自动添加点击查看功能
interface ZoomableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  noZoom?: boolean;
}

export const ZoomableImage: React.FC<ZoomableImageProps> = ({ 
  src, 
  alt,
  noZoom,
  className,
  ...props 
}) => {
  const { openImage } = useImageViewer();
  
  if (noZoom) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={`no-zoom ${className || ''}`} 
        {...props}
      />
    );
  }
  
  const handleClick = () => {
    if (src) {
      openImage(src, alt);
    }
  };
  
  return (
    <img 
      src={src} 
      alt={alt} 
      onClick={handleClick}
      className={className || ''}
      {...props}
    />
  );
};