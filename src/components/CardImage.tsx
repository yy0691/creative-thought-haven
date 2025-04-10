import React, { useState, useEffect } from 'react';
import { TutorialSvg, DeepLearningSvg, PaintingSvg, PromptSvg, ToolSvg, VoiceSvg, VideoSvg, DefaultSvg } from './AISvgIcons';

// 图片组件
export const CardImage = ({ src, alt, style }: { src: string, alt: string, style?: React.CSSProperties }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  
  // 处理图片URL
  let imageUrl = !src ? '' : src;
  
  // 尝试预加载图片来验证URL有效性
  useEffect(() => {
    if (!imageUrl) return;
    
    console.log(`处理图片URL: ${imageUrl}`);
    
    // 对于远程URL，使用代理
    if (imageUrl.startsWith('http')) {
      // 在生产环境使用代理
      const isProduction = import.meta.env.PROD;
      if (isProduction) {
        const encodedUrl = encodeURIComponent(imageUrl);
        imageUrl = `/api/image-proxy?url=${encodedUrl}`;
        console.log(`生产环境下使用代理: ${imageUrl}`);
      } else {
        // 开发环境直接使用原始URL
        console.log(`开发环境直接使用原URL: ${imageUrl}`);
      }
    } else if (imageUrl.startsWith('/')) {
      // 如果是相对路径，不做修改
      console.log(`使用相对路径: ${imageUrl}`);
    } else {
      // 如果不是相对路径，假设是本地图片
      imageUrl = `/images/ai/${imageUrl}`;
      console.log(`使用本地图片路径: ${imageUrl}`);
    }
    
    const img = new Image();
    img.onload = () => {
      console.log(`图片预加载成功: ${imageUrl}, 大小: ${img.width}x${img.height}`);
      setImgError(false);
    };
    img.onerror = () => {
      console.error(`图片预加载失败: ${imageUrl}`);
      setImgError(true);
    };
    img.src = imageUrl;
  }, [imageUrl]);
  
  // 为不同类别的卡片生成主题SVG图案
  const renderPlaceholderSvg = () => {
    // 从alt或标题中提取可能的主题关键词
    const topic = alt.toLowerCase();
    
    const svgWrapper = (svgContent: React.ReactNode) => (
      <div className="w-full h-full flex items-center justify-center bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-400">
        {svgContent}
      </div>
    );
    
    // 根据主题选择不同的SVG图案
    if (topic.includes('教程') || topic.includes('学习') || topic.includes('指南') || topic.includes('课程')) {
      // 教程/学习主题
      return svgWrapper(TutorialSvg());
    } else if (topic.includes('深度学习') || topic.includes('神经网络') || topic.includes('模型') || topic.includes('机器学习')) {
      // 深度学习/神经网络主题
      return svgWrapper(DeepLearningSvg());
    } else if (topic.includes('绘画') || topic.includes('图像') || topic.includes('设计') || topic.includes('midjourney') || topic.includes('stable diffusion')) {
      // 绘画/图像生成主题
      return svgWrapper(PaintingSvg());
    } else if (topic.includes('提示词') || topic.includes('prompt') || topic.includes('工程') || topic.includes('对话') || topic.includes('大模型')) {
      // 提示词工程主题
      return svgWrapper(PromptSvg());
    } else if (topic.includes('工具') || topic.includes('应用') || topic.includes('软件') || topic.includes('chatgpt') || topic.includes('工具箱')) {
      // AI工具主题
      return svgWrapper(ToolSvg());
    } else if (topic.includes('语音') || topic.includes('声音') || topic.includes('音频') || topic.includes('朗读')) {
      // 语音/音频主题
      return svgWrapper(VoiceSvg());
    } else if (topic.includes('视频') || topic.includes('影片') || topic.includes('电影') || topic.includes('动画')) {
      // 视频主题
      return svgWrapper(VideoSvg());
    } else {
      // 默认AI主题
      return svgWrapper(DefaultSvg());
    }
  };
  
  // 确保src有值
  if (!src) {
    console.warn('图片源地址为空');
    return renderPlaceholderSvg();
  }
  
  const handleError = () => {
    console.error('图片加载失败:', imageUrl);
    setImgError(true);
  };
  
  const handleLoad = () => {
    console.log(`图片加载成功: ${imageUrl}`);
    setImgLoaded(true);
  };
  
  if (imgError) {
    // 显示主题SVG占位图
    return renderPlaceholderSvg();
  }
  
  return (
    <div className="w-full h-full bg-white dark:bg-gray-800">
      {!imgLoaded && !imgError && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
          <span className="text-gray-400">Loading...</span>
        </div>
      )}
      <img 
        src={imageUrl}
        alt={alt} 
        className={`w-full h-full object-cover ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        style={{
          transition: 'opacity 0.3s ease-in-out',
          ...style
        }}
      />
    </div>
  );
};

export default CardImage; 