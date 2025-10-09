import React from 'react';
import { Heart, Share2, Twitter, Facebook, Link as LinkIcon, MessageCircle } from 'lucide-react';
import { useLikes } from '../hooks/useLikes';
import { toast } from 'sonner';

interface ArticleActionsProps {
  articleId: string;
  articleTitle: string;
  articleUrl?: string;
}

export const ArticleActions: React.FC<ArticleActionsProps> = ({ 
  articleId, 
  articleTitle,
  articleUrl 
}) => {
  const { count, liked, toggleLike } = useLikes(articleId);
  const currentUrl = articleUrl || window.location.href;

  const handleShare = (platform: string) => {
    const encodedTitle = encodeURIComponent(articleTitle);
    const encodedUrl = encodeURIComponent(currentUrl);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'wechat':
        // 微信分享需要二维码，这里先复制链接
        copyToClipboard();
        toast.success('链接已复制！请在微信中粘贴分享');
        return;
      case 'copy':
        copyToClipboard();
        return;
      default:
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success('链接已复制到剪贴板！');
    } catch (err) {
      // 备用方案：使用旧方法
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        toast.success('链接已复制到剪贴板！');
      } catch (e) {
        toast.error('复制失败，请手动复制链接');
      }
      
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="flex items-center gap-6 py-6 border-y border-gray-200 dark:border-gray-700">
      {/* 点赞按钮 */}
      <button
        onClick={toggleLike}
        className={`flex items-center gap-2 transition-all duration-300 ${
          liked 
            ? 'text-red-500 scale-110' 
            : 'text-gray-600 dark:text-gray-400 hover:text-red-500 hover:scale-105'
        }`}
        aria-label="点赞文章"
      >
        <Heart 
          size={22} 
          fill={liked ? 'currentColor' : 'none'} 
          className="transition-transform duration-300"
        />
        <span className="text-sm font-medium">{count > 0 ? count : '点赞'}</span>
      </button>

      {/* 分享按钮 */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleShare('twitter')}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
          aria-label="分享到Twitter"
          title="分享到Twitter"
        >
          <Twitter size={20} />
        </button>
        
        <button
          onClick={() => handleShare('facebook')}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
          aria-label="分享到Facebook"
          title="分享到Facebook"
        >
          <Facebook size={20} />
        </button>
        
        <button
          onClick={() => handleShare('wechat')}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200"
          aria-label="分享到微信"
          title="分享到微信"
        >
          <MessageCircle size={20} />
        </button>
        
        <button
          onClick={() => handleShare('copy')}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
          aria-label="复制链接"
          title="复制链接"
        >
          <LinkIcon size={20} />
        </button>
      </div>
    </div>
  );
};
