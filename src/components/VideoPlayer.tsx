import React, { useState } from 'react';

interface VideoPlayerProps {
  url: string;
  title?: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title, className = '' }) => {
  const [isLoading, setIsLoading] = useState(true);  // 添加这行
  
  // 判断是否为第三方视频链接
  const isExternalVideo = url.includes('youtube.com') || 
                         url.includes('bilibili.com') || 
                         url.includes('pan.quark.cn');  // 添加夸克网盘判断

  // 处理第三方视频链接
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com')) {
      const videoId = url.split('v=')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('bilibili.com')) {
      // 从URL中提取视频ID
      const bvid = url.split('BV')[1]?.split('?')[0];
      return `https://player.bilibili.com/player.html?bvid=BV${bvid}&high_quality=1&danmaku=0`;
    }
    if (url.includes('pan.quark.cn')) {
      // 夸克网盘视频链接格式：https://pan.quark.cn/s/********?preview=video
      const shareId = url.split('/s/')[1]?.split('?')[0];
      return `https://pan.quark.cn/s/${shareId}?preview=video&embed=true`;
    }
    return url;
  };

  return (
    <div className={`video-player w-full relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {isExternalVideo ? (
        <iframe
          src={getEmbedUrl(url)}
          title={title || '视频播放器'}
          className="w-full aspect-video rounded-lg"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <video
          src={url}
          controls
          className="w-full rounded-lg"
          title={title || '视频播放器'}
          onLoadedData={() => setIsLoading(false)}
        />
      )}
    </div>
  );
};

export default VideoPlayer;