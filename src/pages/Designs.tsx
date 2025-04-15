import { designs } from "../content/designs";
import { Link } from "react-router-dom";
import SplashCursor from '../components/cursor';
import { useEffect } from 'react';

const Designs = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.className = 'mouse-ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="space-y-8 py-12 animate-fadeIn">
      {/* 添加流体效果 */}
      
      <header className="text-center space-y-4 animate-slideDown">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent hover:scale-105 transition-transform cursor-default">
          设计作品
        </h1>
        <p className="text-muted-foreground hover:text-primary transition-colors dark:text-gray-300">UI/UX 和平面设计作品展示</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {designs.map((design) => (
          <Link 
            key={design.id} 
            to={`/designs/${design.id}`}
            className="glass rounded-lg overflow-hidden border border-white/20 dark:border-gray-700/70 shadow-lg transition-all duration-300 transform-gpu hover:translate-y-[-8px] hover:shadow-xl hover:border-primary/30 dark:hover:border-primary/40 group dark:shadow-lg dark:shadow-black/20 dark:bg-gray-900/80" 
            style={{
              background: `linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,255,255,0.6))`,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            <div className="aspect-video bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 relative overflow-hidden">
              <img 
                src={design.thumbnail} 
                alt={design.title}
                className="w-full h-full object-cover transition-all duration-300 group-hover:rotate-2 group-hover:opacity-90"
              />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-primary dark:text-primary">{design.title}</h3>
              <p className="text-muted-foreground dark:text-gray-300">{design.description}</p>
              <div className="flex flex-wrap gap-2">
                {design.tools.map((tool) => (
                  <span 
                    key={tool} 
                    className="text-xs bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary-foreground px-3 py-1 rounded-full border border-primary/10 dark:border-primary/20 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 pt-2">
                {design.figmaUrl && (
                  <button
                    onClick={() => window.open(design.figmaUrl, '_blank', 'noopener,noreferrer')}
                    className="text-sm text-primary hover:underline dark:text-primary"
                  >
                    在 Figma 中查看
                  </button>
                )}
                {design.downloadUrl && (
                  <button
                    onClick={() => window.open(design.downloadUrl, '_blank')}
                    className="text-sm text-primary hover:underline dark:text-primary"
                  >
                    下载设计文件
                  </button>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Designs;
