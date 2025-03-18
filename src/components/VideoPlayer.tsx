import React, { useState } from 'react';
import Loader from './Loader';

interface VideoPlayerProps {
  src: string;
  title?: string;
  poster?: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title, poster }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const handleLoadedData = () => {
    setIsLoading(false);
    setIsReady(true);
  };

  // 判断是否为B站视频链接
  const isBilibiliVideo = (url: string) => {
    return url.includes('bilibili.com');
  };

  // 判断是否为七牛云视频链接
  const isQiniuVideo = (url: string) => {
    return url.includes('hb-bkt.clouddn.com');
  };

  // 从B站链接中提取视频ID
  const getBilibiliVideoId = (url: string) => {
    const match = url.match(/BV[\w]+/);
    return match ? match[0] : '';
  };

  // 渲染B站视频嵌入播放器
  const renderBilibiliPlayer = (videoId: string) => {
    const embedUrl = `https://player.bilibili.com/player.html?bvid=${videoId}&high_quality=1&danmaku=0`;
    return (
      <div className="relative w-full h-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-[100]">
            <Loader />
          </div>
        )}
        <iframe
          src={embedUrl}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    );
  };

  // 如果是B站视频，使用嵌入播放器
  if (isBilibiliVideo(src)) {
    const videoId = getBilibiliVideoId(src);
    return (
      <div className="relative w-full aspect-video bg-black/10 rounded-lg overflow-hidden">
        {videoId ? renderBilibiliPlayer(videoId) : (
          <div className="flex items-center justify-center h-full text-primary">
            无效的B站视频链接
          </div>
        )}
      </div>
    );
  }

  // 如果是七牛云视频，使用原生video标签
  if (isQiniuVideo(src)) {
    return (
      <div className="relative w-full aspect-video">
        {(!isReady || isLoading) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-[100]">
            <Loader />
          </div>
        )}
        <div className="relative w-full h-full bg-black/10 rounded-lg overflow-hidden">
          <video
            className={`w-full h-full object-contain transition-opacity duration-300 ${isReady ? 'opacity-100' : 'opacity-0'}`}
            controls
            poster={poster}
            onLoadedData={handleLoadedData}
            onLoadStart={() => setIsLoading(true)}
            onError={() => {
              setIsLoading(false);
              setIsReady(true);
            }}
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => setIsLoading(false)}
          >
            <source src={src} type="video/mp4" />
            {title && <track kind="captions" label={title} />}
            您的浏览器不支持视频播放。
          </video>
        </div>
      </div>
    );
  }

  // 本地视频播放
  return (
    <div className="relative w-full aspect-video">
      {(!isReady || isLoading) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-[100]">
          <Loader />
        </div>
      )}
      <div className="relative w-full h-full bg-black/10 rounded-lg overflow-hidden">
        <video
          className={`w-full h-full object-contain transition-opacity duration-300 ${isReady ? 'opacity-100' : 'opacity-0'}`}
          controls
          poster={poster}
          onLoadedData={handleLoadedData}
          onLoadStart={() => setIsLoading(true)}
          onError={() => {
            setIsLoading(false);
            setIsReady(true);
          }}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => setIsLoading(false)}
        >
          <source src={src} type="video/mp4" />
          {title && <track kind="captions" label={title} />}
          您的浏览器不支持视频播放。
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
