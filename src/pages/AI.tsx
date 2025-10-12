import React, { useState, useEffect, useMemo, useRef } from 'react';
import SEO from '../components/SEO';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MDXComponents from '../components/MDXComponents';
import { Sheet, SheetContent } from '../components/ui/sheet';
import { aiMenuEventBus } from '../components/Navigation';

// 从URL中提取域名
export function extractDomain(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.startsWith('www.') ? domain.substring(4) : domain;
  } catch (error) {
    return '';
  }
}

// 从文章链接动态获取首图URL
export async function getArticleImage(url: string): Promise<string | null> {
  try {
    // 由于浏览器安全限制，我们无法直接访问跨域网页内容
    // 这里模拟获取图片的逻辑，可以替换为真实的API调用
    if (!url) return null;
    
    // 使用域名作为图片的简单标识，实际应用中应使用专门的服务获取网页首图
    const domain = extractDomain(url);
    if (!domain) return null;
    
    // 使用免费的第三方服务获取网页缩略图
    // 注意：在实际项目中，可能需要配置自己的代理服务或API
    return `https://picsum.photos/seed/${domain}/800/450`;
  } catch (error) {
    console.error('Failed to get article image:', error);
    return null;
  }
}

// Data Imports
import generatedSections from '../data/ai/generated-ai-sections.json';
import generatedNews from '../data/ai/generated-news.json';
import { H1, H2, H3, H4, H5, H6 } from '../components/ui/Heading';

// --- Type Definition ---
interface CardItem {
  id: string;
  title: string;
  title_zh?: string; // 中文标题
  description: string;
  summary_zh?: string; // 中文摘要
  link: string;
  group?: string;
  date?: string;
  image?: string;
  author?: string;
  content?: string;
  key_points?: string[]; // 关键要点
  scene?: string; // 新增：场景标签（如"职场效率"、"创作辅助"）
  [key: string]: any;
}

// --- 自定义Hooks：用户行为管理 ---
const useUserBehavior = () => {
  // 浏览历史（最多10条）
  const [history, setHistory] = useState<CardItem[]>(() => {
    const stored = localStorage.getItem('aiBrowseHistory');
    return stored ? JSON.parse(stored) : [];
  });

  // 收藏列表
  const [favorites, setFavorites] = useState<CardItem[]>(() => {
    const stored = localStorage.getItem('aiFavorites');
    return stored ? JSON.parse(stored) : [];
  });

  // 稍后读列表
  const [laterRead, setLaterRead] = useState<CardItem[]>(() => {
    const stored = localStorage.getItem('aiLaterRead');
    return stored ? JSON.parse(stored) : [];
  });

  // 保存浏览记录
  const addToHistory = (item: CardItem) => {
    setHistory(prev => {
      // 去重并保持最新在前
      const newHistory = [item, ...prev.filter(i => i.id !== item.id)].slice(0, 10);
      localStorage.setItem('aiBrowseHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  // 切换收藏状态
  const toggleFavorite = (item: CardItem) => {
    setFavorites(prev => {
      const isFavorite = prev.some(i => i.id === item.id);
      const newFavorites = isFavorite 
        ? prev.filter(i => i.id !== item.id)
        : [item, ...prev];
      localStorage.setItem('aiFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // 切换稍后读状态
  const toggleLaterRead = (item: CardItem) => {
    setLaterRead(prev => {
      const exists = prev.some(i => i.id === item.id);
      const next = exists ? prev.filter(i => i.id !== item.id) : [item, ...prev];
      localStorage.setItem('aiLaterRead', JSON.stringify(next));
      return next;
    });
  };

  return { history, favorites, laterRead, addToHistory, toggleFavorite, toggleLaterRead };
};

// --- Data Hooks ---
const useNews = () => {
  const newsData = useMemo(() => {
    return generatedNews.map((item) => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('en-CA'),
      scene: "行业动态" // 为新闻添加默认场景
    }));
  }, []);
  return { newsData };
};

const useAISections = () => {
  // 为AI工具添加场景分类
  const aiSections = useMemo(() => {
    return (generatedSections as unknown as CardItem[]).map(section => {
      // 场景映射：根据工具类型自动分配场景
      const sceneMap: Record<string, string> = {
        "写作": "创作辅助",
        "图像": "设计创作",
        "数据分析": "职场效率",
        "学习": "学习提升",
        "编程": "开发工具"
      };
      return {
        ...section,
        items: (section as any).items.map((item: CardItem) => ({
          ...item,
          scene: sceneMap[section.title] || "综合工具"
        }))
      };
    });
  }, []);
  return { aiSections };
};

// --- Helper Functions ---
// 获取网站图标，支持多个备选源以确保国内外都能访问
// 策略：本地缓存 → 网站自身 → 国际服务 → 占位图
const getFaviconSources = (url?: string): string[] => {
  // SVG 占位图（在所有远程源失败后使用）
  const placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect width="64" height="64" fill="%23e5e7eb"/%3E%3Ctext x="32" y="40" text-anchor="middle" font-size="32" fill="%239ca3af"%3E%3F%3C/text%3E%3C/svg%3E';
  
  if (!url) return [placeholder];
  
  try {
    const host = new URL(url).hostname;
    
    // 域名到本地文件名的映射（用于本地缓存）
    const localFaviconMap: Record<string, string> = {
      'chat.openai.com': 'chatgpt',
      'gemini.google.com': 'gemini',
      'claude.ai': 'claude',
      'poe.com': 'poe',
      'kimi.moonshot.cn': 'kimi',
      'yiyan.baidu.com': 'yiyan',
      'www.doubao.com': 'doubao',
      'tongyi.aliyun.com': 'tongyi',
      'www.midjourney.com': 'midjourney',
      'stability.ai': 'stable-diffusion',
      'leonardo.ai': 'leonardo',
      'ideogram.ai': 'ideogram',
      'github.com': 'github',
      'cursor.sh': 'cursor',
      'codeium.com': 'codeium',
      'replit.com': 'replit',
      'www.deeplearning.ai': 'deeplearning-ai',
      'www.coursera.org': 'coursera',
      'www.fast.ai': 'fast-ai',
      'huggingface.co': 'huggingface',
      'd2l.ai': 'd2l',
      'www.kaggle.com': 'kaggle',
      'www.jiqizhixin.com': 'jiqizhixin',
      'www.qbitai.com': 'qbitai',
      'aibydoing.com': 'aibydoing',
    };
    
    // 本地缓存的favicon路径
    const localName = localFaviconMap[host];
    const localPaths = localName ? [
      `/favicons/${localName}.png`,
      `/favicons/${localName}.ico`,
    ] : [];
    
    // 针对已知中文网站的特殊路径优化
    const chineseSitesFavicons: Record<string, string[]> = {
      'yiyan.baidu.com': ['https://yiyan.baidu.com/favicon.ico'],
      'www.doubao.com': ['https://www.doubao.com/favicon.ico'],
      'tongyi.aliyun.com': ['https://tongyi.aliyun.com/favicon.ico'],
      'kimi.moonshot.cn': ['https://kimi.moonshot.cn/favicon.ico'],
      'www.jiqizhixin.com': ['https://www.jiqizhixin.com/favicon.ico'],
      'www.qbitai.com': ['https://www.qbitai.com/favicon.ico'],
      'aibydoing.com': ['https://aibydoing.com/favicon.ico'],
    };
    
    // 如果是已知的中文网站，优先使用特殊路径
    const customPaths = chineseSitesFavicons[host] || [];
    
    // 优先使用本地缓存 → 网站自身 → 国际服务
    const allSources = [
      ...localPaths, // 最优先：本地缓存（无网络请求，速度最快）
      ...customPaths, // 特殊站点的自定义路径
      `https://${host}/favicon.ico`, // 标准路径1（最常用）
      `https://${host}/favicon.png`, // 标准路径2（很多中文网站用PNG）
      `https://${host}/static/favicon.ico`, // 常见路径3
      `https://${host}/assets/favicon.ico`, // 常见路径4
      `https://${host}/img/favicon.ico`, // 常见路径5
      `https://${host}/public/favicon.ico`, // 常见路径6
      `https://icon.horse/icon/${host}`, // icon.horse（国际，稳定）
      `https://icons.duckduckgo.com/ip3/${host}.ico`, // DuckDuckGo（相对可访问）
      `https://www.google.com/s2/favicons?sz=64&domain=${host}`, // Google（备选）
      placeholder, // 兜底占位图
    ];
    
    // 去重（避免重复路径）
    return [...new Set(allSources)];
  } catch {
    return [placeholder];
  }
};

// 图标加载组件
const FaviconImage = ({ url, alt, className }: { url?: string; alt: string; className: string }) => {
  const [currentSourceIndex, setCurrentSourceIndex] = React.useState(0);
  const sources = React.useMemo(() => getFaviconSources(url), [url]);

  // 当 URL 改变时重置索引
  React.useEffect(() => {
    setCurrentSourceIndex(0);
  }, [url]);

  // 监听状态变化（调试）
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development' && currentSourceIndex > 0) {
      console.debug(`[Favicon] Switched to source ${currentSourceIndex} for ${url}`);
    }
  }, [currentSourceIndex, url]);

  const handleError = React.useCallback(() => {
    // 使用函数式更新避免闭包问题
    setCurrentSourceIndex(prevIndex => {
      const nextIndex = prevIndex + 1;
      // 如果当前图标加载失败，尝试下一个源
      if (prevIndex < sources.length - 1) {
        // 调试日志：记录失败的图标源
        if (process.env.NODE_ENV === 'development') {
          console.debug(`[Favicon] Failed source ${prevIndex}, trying source ${nextIndex}: ${sources[nextIndex]}`);
        }
        return nextIndex;
      } else {
        // 所有源都失败，使用占位图
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[Favicon] All sources failed for ${url}, using placeholder`);
        }
        return prevIndex; // 保持在占位图
      }
    });
  }, [sources, url]);

  return (
    <img
      loading="lazy"
      src={sources[currentSourceIndex]}
      alt={alt}
      className={`${className} object-contain bg-white dark:bg-gray-700`}
      onError={handleError}
      style={{ imageRendering: 'crisp-edges' }}
    />
  );
};

// ✨ Badge helpers
const isNew = (item: CardItem) => {
  if (!item.date) return false;
  const now = new Date();
  const d = new Date(item.date);
  const diff = (now.getTime() - d.getTime()) / (1000 * 3600 * 24);
  return !isNaN(d.getTime()) && diff <= 7;
};

const isTrending = (item: CardItem, history: CardItem[], favorites: CardItem[]) => {
  const inFav = favorites.some(f => f.id === item.id);
  const inHist = history.some(h => h.id === item.id);
  const veryRecent = (() => {
    if (!item.date) return false;
    const d = new Date(item.date);
    const diff = (Date.now() - d.getTime()) / (1000 * 3600 * 24);
    return !isNaN(d.getTime()) && diff <= 3;
  })();
  return inFav || (inHist && veryRecent) || veryRecent;
};

// 筛选相关推荐内容（改为打分排序）
const getRecommendedItems = (history: CardItem[], allItems: CardItem[], favorites: CardItem[], interests: string[]): CardItem[] => {
  if (history.length === 0 && favorites.length === 0) return [];
  const historyScenes = new Set(history.map(i => i.scene));
  const favoriteScenes = new Set(favorites.map(i => i.scene));
  const interestScenes = new Set((interests || []).filter(Boolean));

  const scored = allItems
    .filter(item => !history.some(h => h.id === item.id))
    .map(item => {
      let score = 0;
      if (historyScenes.has(item.scene)) score += 2;
      if (favoriteScenes.has(item.scene)) score += 2.5;
      if (interestScenes.has(item.scene)) score += 2;
      if (favorites.some(f => f.id === item.id)) score += 3;
      if (item.date) {
        const d = new Date(item.date);
        if (!isNaN(d.getTime())) {
          const days = (Date.now() - d.getTime()) / (1000 * 3600 * 24);
          score += Math.max(0, 3 - days * 0.5); // 越新分越高
        }
      }
      return { item, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(s => s.item);

  return scored;
};

// 获取热门内容
const getHotItems = (allItems: CardItem[]): CardItem[] => {
  // 简单模拟热门排序（可替换为真实热度数据）
  return [...allItems].sort(() => Math.random() - 0.5).slice(0, 4);
};

// ✨ NEW: Helper function to create URL-friendly IDs for anchor links
// 修复：支持中文字符，使用 encodeURIComponent 确保所有字符都能正确处理
const slugify = (text: string) => {
  return text
    .trim()
    .replace(/\s+/g, '-')  // 空格替换为连字符
    .replace(/[\/\\:*?"<>|]/g, ''); // 只移除文件系统不允许的特殊字符
};


// --- UI Components ---
const SmallCard = ({ 
  item, 
  onClick, 
  favorites, 
  toggleFavorite,
  history,
  showBadges,
  compact
}: { 
  item: CardItem, 
  onClick?: () => void,
  favorites: CardItem[],
  toggleFavorite: (item: CardItem) => void,
  history: CardItem[],
  showBadges?: boolean,
  compact?: boolean
}) => {
  const isFavorite = favorites.some(f => f.id === item.id);
  
  // 小卡片直接跳转，不显示弹窗
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(item.link, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <a 
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group relative block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/40 dark:hover:border-primary/40 transition-all duration-200 cursor-pointer hover:shadow-md"
    >
      <div className={`${compact ? 'p-2.5' : 'p-3'} flex items-start gap-3`}>
        {/* 工具图标 - 高清尺寸 */}
        <div className="flex-shrink-0">
          <FaviconImage
            url={item.link}
            alt={`${item.title} favicon`}
            className={`${compact ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg shadow-sm border border-gray-200 dark:border-gray-600`}
          />
        </div>
        
        {/* 工具信息 */}
        <div className="flex-1 min-w-0">
          <h3 className={`${compact ? 'text-sm' : 'text-base'} font-medium text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors mb-1`}>
            {(item as any).title_zh || item.title}
          </h3>
          
          <p 
            className={`${compact ? 'text-xs' : 'text-sm'} text-gray-600 dark:text-gray-400 line-clamp-1 leading-relaxed mb-1.5 group-hover:line-clamp-none transition-all`}
            title={(item as any).description_zh || (item as any).summary_zh || item.description}
          >
            {(item as any).description_zh || (item as any).summary_zh || item.description}
          </p>
          
          <div className="flex items-center gap-2 flex-wrap">
            {showBadges && (
              <>
                {isNew(item) && (
                  <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    New
                  </span>
                )}
                {isTrending(item, history, favorites) && (
                  <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                    Hot
                  </span>
                )}
              </>
            )}
            {item.scene && (
              <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                {item.scene}
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

// 大卡片
const LargeCard = ({ 
  item, 
  onClick, 
  favorites, 
  toggleFavorite,
  history,
  showBadges,
  compact,
  dynamicImages = {}
}: { 
  item: CardItem, 
  onClick: () => void,
  favorites: CardItem[],
  toggleFavorite: (item: CardItem) => void,
  history: CardItem[],
  showBadges?: boolean,
  compact?: boolean,
  dynamicImages?: Record<string, string>
}) => {
  const isFavorite = favorites.some(f => f.id === item.id);
  const imageUrl = item.image || dynamicImages[item.id];
  
  return (
    <div 
      onClick={onClick} 
      className="card rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700 h-full cursor-pointer flex flex-col transform hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.99]"
    >
      {imageUrl && (
        <div className="relative aspect-[16/9] w-full">
          <img loading="lazy" src={imageUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
          {showBadges && (
            <div className="absolute top-2 left-2 flex gap-1">
              {isNew(item) && <span className="px-2 py-0.5 text-xs rounded bg-green-100 text-green-700">New</span>}
              {isTrending(item, history, favorites) && <span className="px-2 py-0.5 text-xs rounded bg-red-100 text-red-700">Hot</span>}
            </div>
          )}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(item);
            }}
            className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 p-1.5 rounded-full text-gray-400 hover:text-yellow-500 transition-transform transition-colors active:scale-90 backdrop-blur-sm"
          >
            {isFavorite ? <LucideIcons.Star size={18} fill="currentColor" /> : <LucideIcons.Star size={18} />}
          </button>
        </div>
      )}
      <div className={`${compact ? 'p-2.5' : 'p-3'} flex flex-col flex-grow`}>
        <H6 className={`${compact ? 'mb-1' : 'mb-1.5'} font-semibold line-clamp-2`}>
          {(item as any).title_zh || item.title}
        </H6>
        <p className={`line-clamp-2 flex-grow ${compact ? 'text-[10px] sm:text-[12px]' : 'text-[12px] sm:text-[14px]'}`}>
          {(item as any).summary_zh || item.description}
        </p>
        {/* <span className="inline-block mt-2 text-[10px] sm:text-[12px] px-2 py-0.5 bg-primary/10 text-primary rounded-full">
          {item.scene}
        </span> */}
        <div className={`${compact ? 'pt-2 mt-2.5' : 'pt-2.5 mt-3'} border-t border-gray-100 dark:border-gray-700/50 w-full flex justify-between items-center text-xs text-gray-500`}>
          <span>{item.author}</span>
          <span>{item.date}</span>
        </div>
      </div>
    </div>
  );
};

// 标签图标
const TabIcon = ({ iconName }: { iconName: string }) => {
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
  return <IconComponent size={16} />;
};

// Skeletons
const SkeletonBar = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
);

const SkeletonSmallCard = () => (
  <div className="p-4 border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg">
    <div className="flex items-start gap-4">
      <SkeletonBar className="w-8 h-8 rounded" />
      <div className="flex-1 min-w-0">
        <SkeletonBar className="h-4 w-3/4 mb-2" />
        <SkeletonBar className="h-3 w-full mb-1" />
        <SkeletonBar className="h-3 w-5/6" />
      </div>
    </div>
  </div>
);

const SkeletonLargeCard = () => (
  <div className="card rounded-xl shadow-sm bg-white dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700 h-full">
    <SkeletonBar className="w-full h-40" />
    <div className="p-4">
      <SkeletonBar className="h-5 w-4/5 mb-2" />
      <SkeletonBar className="h-4 w-full mb-1" />
      <SkeletonBar className="h-4 w-5/6" />
      <div className="pt-3 mt-4 border-t border-gray-100 dark:border-gray-700/50 w-full flex justify-between items-center">
        <SkeletonBar className="h-3 w-20" />
        <SkeletonBar className="h-3 w-16" />
      </div>
    </div>
  </div>
);

// 详情模态
const DetailModal = ({ 
  item, 
  onClose,
  toggleFavorite,
  isFavorite,
  toggleLaterRead,
  inLaterRead,
  addToCollection
}: { 
  item: CardItem | null, 
  onClose: () => void,
  toggleFavorite: (item: CardItem) => void,
  isFavorite: boolean,
  toggleLaterRead: (item: CardItem) => void,
  inLaterRead: boolean,
  addToCollection: (item: CardItem) => void
}) => (
  <AnimatePresence>
    {item && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col"
        >
          <header className="p-4 border-b dark:border-gray-700 flex justify-between items-center flex-shrink-0">
            <H4>{item.title}</H4>
            <div className="flex gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item);
                }}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-yellow-500"
              >
                {isFavorite ? <LucideIcons.Star size={20} fill="currentColor" /> : <LucideIcons.Star size={20} />}
              </button>
              <button 
                onClick={onClose} 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LucideIcons.X size={20} />
              </button>
            </div>
          </header>
          <main className="p-6 overflow-y-auto">
            {item.image && (
              <img 
                loading="lazy"
                src={item.image} 
                alt={item.title} 
                className="w-full h-64 object-cover rounded-lg mb-6" 
              />
            )}
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={MDXComponents as any}>
                {item.content || item.description}
              </ReactMarkdown>
            </div>
          </main>
          <footer className="p-4 border-t dark:border-gray-700 flex justify-end gap-2 flex-shrink-0">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(item.link);
                alert('链接已复制');
              }}
              className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              复制链接 
              <LucideIcons.Clipboard size={14} className="ml-1.5" />
            </button>
            <button
              onClick={() => {
                const shareData = { title: item.title, text: item.description || item.title, url: item.link };
                if (navigator.share) {
                  navigator.share(shareData).catch(() => {/* no-op */});
                } else {
                  const text = encodeURIComponent(`${item.title} - ${item.link}`);
                  window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
                }
              }}
              className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              分享 <LucideIcons.Share2 size={14} className="ml-1.5" />
            </button>
            <button 
              onClick={() => toggleLaterRead(item)}
              className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm"
            >
              {inLaterRead ? '移出稍后读' : '稍后读'} <LucideIcons.Bookmark size={14} className="ml-1.5" />
            </button>
            <button 
              onClick={() => addToCollection(item)}
              className="inline-flex items-center px-2 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors text-sm"
            >
              加入合集 <LucideIcons.FolderPlus size={14} className="ml-1.5" />
            </button>
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
            >
              原文 <LucideIcons.ExternalLink size={14} className="ml-1.5" />
            </a>
          </footer>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// 轮播组件（多卡 per view）
const Carousel = ({ items, renderItem }: { items: CardItem[], renderItem: (item: CardItem) => React.ReactNode }) => {
  const [itemsPerView, setItemsPerView] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // 根据容器宽度动态计算 itemsPerView（更强自适应）
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const MIN_CARD_WIDTH = 320; // 目标卡片宽度（含左右间距），可按需微调
    const ro = new (window as any).ResizeObserver((entries: any[]) => {
      const width = entries[0]?.contentRect?.width || el.clientWidth || 0;
      if (!width) return;
      const per = Math.max(1, Math.min(5, Math.floor(width / MIN_CARD_WIDTH)));
      setItemsPerView(per);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // 自动翻页（按页）并在 itemsPerView 变化时重置页码合法范围
  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(items.length / itemsPerView));
    setCurrentPage(prev => (prev >= totalPages ? 0 : prev));
    const t = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(t);
  }, [items.length, itemsPerView]);

  if (items.length === 0) return null;

  // 分页
  const pages: CardItem[][] = [];
  for (let i = 0; i < items.length; i += itemsPerView) {
    pages.push(items.slice(i, i + itemsPerView));
  }
  const totalPages = Math.max(1, pages.length);

  return (
    <div className="relative overflow-hidden rounded-xl" ref={ref}>
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentPage * 100}%)` }}
      >
        {pages.map((pageItems, pi) => (
          <div key={pi} className="min-w-full px-1">
            <div className="flex -mx-1">
              {pageItems.map((item) => (
                <div key={item.id} className="px-1" style={{ flexBasis: `${100 / itemsPerView}%` }}>
                  {renderItem(item)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* 指示器 */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentPage ? 'bg-white w-8' : 'bg-white/50'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Main AI Component ---
const AI = () => {
  const [activeTab, setActiveTab] = useState('news'); // ✨ MODIFIED: Default to news tab
  const [selectedItem, setSelectedItem] = useState<CardItem | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const { history, favorites, laterRead, addToHistory, toggleFavorite, toggleLaterRead } = useUserBehavior();
  const { newsData } = useNews();
  const { aiSections } = useAISections();
  
  // ✨ NEW: State for search and mobile menu
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // Density (comfortable|compact)
  const [density, setDensity] = useState<'comfortable'|'compact'>(() => (localStorage.getItem('aiDensity') as any) || 'compact');
  // Filters
  const [filterScene, setFilterScene] = useState<string>('all');
  const [filterTime, setFilterTime] = useState<'all'|'7d'|'30d'>('all');
  // Interests onboarding
  const [interests, setInterests] = useState<string[]>(() => {
    const s = localStorage.getItem('aiInterests');
    return s ? JSON.parse(s) : [];
  });
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  // Collections
  type Collection = { name: string; items: CardItem[] };
  const [collections, setCollections] = useState<Collection[]>(() => {
    const s = localStorage.getItem('aiCollections');
    return s ? JSON.parse(s) : [];
  });
  // 动态图片缓存
  const [dynamicImages, setDynamicImages] = useState<Record<string, string>>({});

  // Add to collection (prompt-based minimal UX)
  const addToCollection = (item: CardItem) => {
    const existingNames = collections.map(c => c.name);
    const name = prompt(`加入到哪个合集？\n已有：${existingNames.join(', ') || '无'}\n直接输入名称（新建或追加）`, existingNames[0] || '我的收藏夹');
    const finalName = (name || '').trim();
    if (!finalName) return;
    setCollections(prev => {
      const idx = prev.findIndex(c => c.name === finalName);
      if (idx >= 0) {
        const exists = prev[idx].items.some(i => i.id === item.id);
        if (exists) return prev; // no duplicates
        const updated = [...prev];
        updated[idx] = { ...updated[idx], items: [item, ...updated[idx].items] };
        localStorage.setItem('aiCollections', JSON.stringify(updated));
        return updated;
      } else {
        const updated = [{ name: finalName, items: [item] }, ...prev];
        localStorage.setItem('aiCollections', JSON.stringify(updated));
        return updated;
      }
    });
  };

  // Persist collections on change (safety)
  useEffect(() => {
    localStorage.setItem('aiCollections', JSON.stringify(collections));
  }, [collections]);

  // 监听全局AI菜单事件
  useEffect(() => {
    const unsubscribe = aiMenuEventBus.subscribe(() => {
      setIsMobileMenuOpen(prev => !prev);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // 为新闻项目动态获取图片
  useEffect(() => {
    const loadDynamicImages = async () => {
      if (activeTab !== 'news') return;

      const imagesToLoad = newsData
        .filter(item => item.link && !dynamicImages[item.id] && !item.image)
        .slice(0, 20); // 增加同时加载的图片数量到20张

      const promises = imagesToLoad.map(async (item) => {
        const imgUrl = await getArticleImage(item.link);
        if (imgUrl) {
          setDynamicImages(prev => ({
            ...prev,
            [item.id]: imgUrl
          }));
        }
      });

      await Promise.allSettled(promises);
    };

    loadDynamicImages();
  }, [activeTab, newsData, dynamicImages]);


  // 所有可推荐的内容池
  const allContentItems = useMemo(() => {
    return [...newsData, ...aiSections.flatMap(section => (section as any).items)];
  }, [newsData, aiSections]);

  // 推荐内容
  const recommendedItems = useMemo(() => {
    const recs = getRecommendedItems(history, allContentItems, favorites, interests);
    return recs.length > 0 ? recs : getHotItems(allContentItems);
  }, [history, favorites, allContentItems, interests]);

  // 场景化导航配置
  const tabCategories = useMemo(() => {
    const iconMap: { [key: string]: string } = {
      learning: 'GraduationCap', 
      tools: 'Telescope', 
      prompts: 'Terminal', 
      resources: 'Library',
      favorites: 'Star',
      history: 'Clock'
    };

    const scenes = Array.from(new Set(allContentItems.map(item => item.scene).filter(Boolean)));

    return [
      { 
        id: 'main', 
        title: '主要', 
        tabs: [
          { id: 'news', label: '前沿动态', icon: 'Newspaper' },
          { id: 'favorites', label: '我的收藏', icon: 'Star' },
          { id: 'collections', label: '我的合集', icon: 'Folder' },
          { id: 'later', label: '稍后读', icon: 'Bookmark' },
          { id: 'history', label: '最近浏览', icon: 'Clock' }
        ]
      },
      { id: 'content', title: '资源分类', tabs: aiSections.map(s => ({ 
        id: s.id, 
        label: s.title, 
        icon: iconMap[s.id] || 'HelpCircle' 
      }))}
    ];
  }, [allContentItems, aiSections]);
  
  // 初次进入展示骨架屏
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    localStorage.setItem('aiDensity', density);
  }, [density]);

  // Interests Onboarding: show once if empty and user visited news
  useEffect(() => {
    if (activeTab === 'news' && interests.length === 0) {
      const visited = localStorage.getItem('aiInterestsVisited');
      if (!visited) {
        setShowInterestsModal(true);
        localStorage.setItem('aiInterestsVisited', '1');
      }
    }
  }, [activeTab, interests.length]);

  // ✨ MODIFIED: Reset search term when tab changes，并短暂显示骨架屏
  useEffect(() => {
    setSearchTerm('');
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 250);
    return () => clearTimeout(t);
  }, [activeTab]);


  const renderTabContent = () => {
    const getBaseTabContent = (): CardItem[] => {
      // ... (This function is the same as your original `getTabContent`)
       switch (activeTab) {
        case 'news':
          return newsData.map(item => ({ ...item, group: '最新动态' }));
        case 'favorites':
          return favorites.length > 0 
            ? favorites.map(item => ({ ...item, group: '我的收藏' }))
            : [{ id: 'empty-fav', title: '暂无收藏', description: '点击卡片上的星星图标添加收藏', group: '提示', link: '#' } as CardItem];
        case 'later':
          return laterRead.length > 0
            ? laterRead.map(item => ({ ...item, group: '稍后读' }))
            : [{ id: 'empty-later', title: '暂无稍后读', description: '在详情里点“稍后读”即可加入', group: '提示', link: '#' } as CardItem];
        case 'collections': {
          if (collections.length === 0) {
            return [{ id: 'empty-collections', title: '暂无合集', description: '在详情中点击“加入合集”创建并添加内容', group: '提示', link: '#' } as CardItem];
          }
          // Flatten collections into items, group by collection name
          const flat: CardItem[] = [];
          collections.forEach(col => {
            col.items.forEach(it => flat.push({ ...it, group: col.name }));
          });
          return flat;
        }
        case 'history':
          return history.length > 0
            ? history.map(item => ({ ...item, group: '最近浏览' }))
            : [{ id: 'empty-hist', title: '暂无浏览记录', description: '浏览内容后会显示在这里', group: '提示', link: '#' } as CardItem];
        default:
          if (activeTab.startsWith('scene-')) {
            const scene = activeTab.replace('scene-', '');
            return allContentItems
              .filter(item => item.scene === scene)
              .map(item => ({ ...item, group: scene }));
          }
          const section = aiSections.find(s => s.id === activeTab);
          return section ? (section as any).items : [];
      }
    };

    // ✨ NEW: Filter items based on search term
    const filteredItems = useMemo(() => {
      const baseItems = getBaseTabContent();
      if (!searchTerm) {
        // apply filters even if no search
        return baseItems.filter(item => {
          // scene filter
          if (filterScene !== 'all' && item.scene !== filterScene) return false;
          // time filter
          if (filterTime !== 'all' && item.date) {
            const days = (Date.now() - new Date(item.date).getTime()) / (1000*3600*24);
            if (filterTime === '7d' && days > 7) return false;
            if (filterTime === '30d' && days > 30) return false;
          }
          return true;
        });
      }
      const s = searchTerm.toLowerCase();
      return baseItems
        .filter(item =>
          item.title.toLowerCase().includes(s) ||
          item.description.toLowerCase().includes(s)
        )
        .filter(item => {
          if (filterScene !== 'all' && item.scene !== filterScene) return false;
          if (filterTime !== 'all' && item.date) {
            const days = (Date.now() - new Date(item.date).getTime()) / (1000*3600*24);
            if (filterTime === '7d' && days > 7) return false;
            if (filterTime === '30d' && days > 30) return false;
          }
          return true;
        });
    }, [activeTab, searchTerm, newsData, favorites, history, aiSections, filterScene, filterTime]);
    
    if (filteredItems.length === 0 && !searchTerm) return <div className="text-center py-20 text-gray-500">此分类下暂无内容</div>;

    const groupedItems = filteredItems.reduce((acc, item) => {
      const group = item.group || '综合内容';
      (acc[group] = acc[group] || []).push(item);
      return acc;
    }, {} as Record<string, CardItem[]>);

    const groupTitles = Object.keys(groupedItems);
    
    // ✨ MODIFIED: Initialize accordion state to be open by default
    useEffect(() => {
      const initialExpandedState = groupTitles.reduce((acc, title) => {
        acc[title] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setExpandedGroups(initialExpandedState);
    }, [activeTab, groupTitles.join('-')]); // 动态监听 groupTitles 变化

    const toggleGroup = (groupTitle: string) => {
      setExpandedGroups(prev => ({
        ...prev,
        [groupTitle]: !prev[groupTitle]
      }));
    };
    
    const isNewsTab = activeTab === 'news';
    const isCompact = density === 'compact';
    const gridTemplateClass = isCompact 
      ? '[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]'
      : '[grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]';

    // Skeleton during loading
    if (isLoading) {
      return (
        <div className="space-y-10">
          {isNewsTab && (
            <section className="mt-2">
              <H3 className="text-gray-900 dark:text-white mb-4">为你推荐</H3>
              <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonLargeCard key={`sk-rec-${i}`} />
                ))}
              </div>
            </section>
          )}
          <section>
            <H3 className="text-gray-900 dark:text-white mb-4">加载中...</H3>
            <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                (isNewsTab || activeTab.startsWith('scene-'))
                  ? <SkeletonLargeCard key={`sk-lg-${i}`} />
                  : <SkeletonSmallCard key={`sk-sm-${i}`} />
              ))}
            </div>
          </section>
        </div>
      );
    }

    return (
      <div className="space-y-10">
        {/* ✨ MODIFIED: Recommendation Carousel now ONLY shows on the News tab */}
        {isNewsTab && recommendedItems.length > 0 && (
          <section className="mt-2">
            {/* Subscription CTA + RSS */}
            {/* <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20"> */}
              {/* <div className="text-sm text-gray-700 dark:text-gray-300">
                订阅每周精选，获取优质 AI 资讯（占位，本地保存邮箱）。
                <a href="#" className="ml-2 text-primary underline">RSS</a>
              </div>
              <div className="flex gap-2">
                <input id="ai-sub-email" placeholder="输入邮箱" className="px-2 py-1 rounded border dark:bg-gray-800" />
                <button
                  onClick={() => {
                    const el = document.getElementById('ai-sub-email') as HTMLInputElement | null;
                    const val = el?.value?.trim();
                    if (val) { localStorage.setItem('aiSubscriberEmail', val); alert('已订阅（本地存储）'); }
                  }}
                  className="px-3 py-1 rounded bg-primary text-white text-sm"
                >订阅</button>
              </div>
            </div> */}
            <H3 className="text-gray-900 dark:text-white mb-4">{history.length > 0 ? '为你推荐' : '热门推荐'}</H3>
            <Carousel 
              items={recommendedItems}
              renderItem={(item) => (
                <LargeCard 
                  item={item} 
                  onClick={() => { setSelectedItem(item); addToHistory(item); }}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  history={history}
                  showBadges
                />
              )}
            />
          </section>
        )}

        {/* ✨ 优化：快速跳转 + 密度切换 */}
        {groupTitles.length > 1 ? (
          <div className="sticky top-0 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm py-3 z-10 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-1 flex-wrap">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <LucideIcons.Navigation size={14} />
                  快速跳转
                </span>
                {groupTitles.map(title => (
                  <button 
                    key={title} 
                    onClick={(e) => {
                      e.preventDefault();
                      // 先展开目标分组
                      setExpandedGroups(prev => ({
                        ...prev,
                        [title]: true
                      }));
                      // 延迟滚动，等待DOM更新
                      setTimeout(() => {
                        const element = document.getElementById(slugify(title));
                        if (element) {
                          const yOffset = -100; // 偏移量，避免被sticky header遮挡
                          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                    className="px-3 py-1 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full hover:border-primary hover:text-primary hover:shadow-sm transition-all duration-200 active:scale-95"
                  >
                    {title}
                  </button>
                ))}
              </div>
              
              {/* 灵动的密度切换 */}
              <div className="relative flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full p-1 border border-gray-200 dark:border-gray-700 shadow-sm">
                <button 
                  onClick={() => setDensity('comfortable')}
                  className={`relative z-10 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    density === 'comfortable' 
                      ? 'text-white' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                  title="舒适模式"
                >
                  <LucideIcons.Maximize2 size={14} className="inline" />
                </button>
                <button 
                  onClick={() => setDensity('compact')}
                  className={`relative z-10 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    density === 'compact' 
                      ? 'text-white' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                  title="紧凑模式"
                >
                  <LucideIcons.Minimize2 size={14} className="inline" />
                </button>
                {/* 滑动背景 */}
                <div 
                  className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-full transition-all duration-300 ease-out"
                  style={{ 
                    left: density === 'comfortable' ? '4px' : 'calc(50% + 0px)',
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}
        
        {filteredItems.length === 0 && searchTerm && (
           <div className="text-center py-20 text-gray-500">
             <p>未找到与 "{searchTerm}" 相关的内容。</p>
             <button onClick={() => setSearchTerm('')} className="mt-2 text-primary hover:underline">清空搜索</button>
           </div>
        )}

        {/* 分组内容 */}
        {Object.entries(groupedItems).map(([groupTitle, groupItems]) => {
          // 统一使用全局密度设置
          const sectionCompact = density === 'compact';
          return (
            // ✨ MODIFIED: Added id for quick jump linking
            <section key={groupTitle} id={slugify(groupTitle)} className="animate-fadeIn scroll-mt-24">
              <div 
                className="flex items-center justify-between cursor-pointer group"
                onClick={() => toggleGroup(groupTitle)}
              >
                <H5 className="text-gray-900 dark:text-white mb-4 pb-2 border-b-2 border-primary flex items-center">
                  {groupTitle}
                  <span className="ml-2 text-sm font-normal bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                    {groupItems.length}
                  </span>
                </H5>
                <div className="flex items-center gap-2">
                  {/* 已移除分组级别的密度控制按钮，统一使用全局控制 */}
                  <LucideIcons.ChevronDown 
                    size={20} 
                    className={`transition-transform text-gray-500 group-hover:text-gray-800 dark:group-hover:text-gray-200 ${expandedGroups[groupTitle] ? 'rotate-180' : ''}`} 
                  />
                </div>
              </div>
              
              <div className={`grid ${sectionCompact ? 'gap-3' : 'gap-4'} ${sectionCompact ? '[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]' : '[grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]'} overflow-hidden transition-all duration-300 ease-in-out ${
                !expandedGroups[groupTitle]
                  ? 'max-h-0 opacity-0 invisible' 
                  : 'max-h-none opacity-100 visible'
              }`}>
                {groupItems.map(item => (
                  (isNewsTab || activeTab.startsWith('scene-'))
                    ? <LargeCard 
                        key={item.id} item={item} 
                        onClick={() => { setSelectedItem(item); addToHistory(item); }}
                        favorites={favorites} toggleFavorite={toggleFavorite}
                        history={history} showBadges compact={sectionCompact}
                      />
                    : <SmallCard 
                        key={item.id} item={item}
                        favorites={favorites} toggleFavorite={toggleFavorite}
                        history={history} showBadges compact={sectionCompact}
                      />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex relative">
      <SEO title="资源中心" description="AI前沿新闻、工具、提示词库、学习资料和相关链接" />
      
      {/* 侧边栏 - 桌面版 */}
      <aside className="hidden lg:block w-[200px] min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="pl-4 p-2 border-b dark:border-gray-700">
          <H5 className="text-gray-900 dark:text-white flex items-center">
            <LucideIcons.Brain size={20} className="mr-2 text-primary" />
            资源中心
          </H5>
        </div>
        <nav className="py-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {tabCategories.map(cat => (
            <div key={cat.id} className="mb-4">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{cat.title}</div>
              <ul>
                {cat.tabs.map(tab => (
                  <li key={tab.id}>
                    <button 
                      onClick={() => setActiveTab(tab.id)} 
                      className={`flex items-center w-full px-4 py-2.5 text-sm transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-primary/10 text-primary font-medium' 
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      <TabIcon iconName={tab.icon} /><span className="ml-3">{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* 移动端背景遮罩 */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 移动端菜单按钮 */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-40 bg-primary text-white p-3 rounded-full shadow-lg"
      >
        {isMobileMenuOpen ? <LucideIcons.X size={24} /> : <LucideIcons.Menu size={24} />}
      </button>

      {/* 移动端侧边栏 */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent
          className="w-[18rem] bg-white dark:bg-gray-800 p-0 border-r border-gray-200 dark:border-gray-700 [&>button]:hidden"
          side="left"
        >
          <div className="p-4 border-b dark:border-gray-700">
            <H4 className="text-gray-900 dark:text-white flex items-center">
              <LucideIcons.Brain size={20} className="mr-2 text-primary" />
              AI 资源中心
            </H4>
          </div>
          <nav className="py-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
            {tabCategories.map(cat => (
              <div key={cat.id} className="mb-4">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{cat.title}</div>
                <ul>
                  {cat.tabs.map(tab => (
                    <li key={tab.id}>
                      <button 
                        onClick={() => {setActiveTab(tab.id); setIsMobileMenuOpen(false);}}
                        className={`flex items-center w-full px-4 py-2.5 text-sm transition-colors ${activeTab === tab.id ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                      >
                        <TabIcon iconName={tab.icon} /><span className="ml-3">{tab.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {renderTabContent()}
      </main>

      <DetailModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)}
        toggleFavorite={toggleFavorite}
        isFavorite={selectedItem ? favorites.some(f => f.id === selectedItem.id) : false}
        toggleLaterRead={toggleLaterRead}
        inLaterRead={selectedItem ? laterRead.some(i => i.id === selectedItem.id) : false}
        addToCollection={addToCollection}
      />

      {/* Interests Onboarding Modal */}
      <AnimatePresence>
        {showInterestsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowInterestsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-xl"
            >
              <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
                <H4>选择你感兴趣的场景</H4>
                <button onClick={() => setShowInterestsModal(false)} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"><LucideIcons.X size={18} /></button>
              </div>
              <div className="p-4 space-y-3 max-h-[60vh] overflow-auto">
                <div className="text-sm text-gray-600 dark:text-gray-300">我们将优先推荐你喜欢的内容（可随时更改）。</div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(allContentItems.map(i => i.scene).filter(Boolean))).map(scene => (
                    <label key={scene} className={`px-3 py-1 rounded-full border cursor-pointer text-sm ${interests.includes(scene) ? 'bg-primary text-white border-primary' : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'}`}
                      onClick={() => {
                        setInterests(prev => prev.includes(scene) ? prev.filter(s => s !== scene) : [...prev, scene]);
                      }}
                    >
                      {scene}
                    </label>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t dark:border-gray-700 flex justify-end gap-2">
                <button onClick={() => setShowInterestsModal(false)} className="px-3 py-2 rounded bg-gray-100 dark:bg-gray-700">稍后</button>
                <button 
                  onClick={() => { localStorage.setItem('aiInterests', JSON.stringify(interests)); setShowInterestsModal(false); }}
                  className="px-3 py-2 rounded bg-primary text-white"
                >完成</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AI;