import SplashCursor from '../components/cursor';
import { useEffect } from 'react';

const About = () => {
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
    <div className="page-transition space-y-12 py-12 max-w-4xl mx-auto">
      {/* 添加流体效果 */}
      <SplashCursor 
        SPLAT_RADIUS={0.15}
        DYE_RESOLUTION={512}
        SPLAT_FORCE={3000}
        DENSITY_DISSIPATION={4}
        VELOCITY_DISSIPATION={2.5}
        COLOR_UPDATE_SPEED={10}
        BACK_COLOR={{ r: 0, g: 0, b: 0 }}
      />
      <header className="text-center space-y-4 animate-slideDown">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent hover:scale-105 transition-transform cursor-default">
          关于我
        </h1>
        <p className="text-muted-foreground hover:text-primary transition-colors">
          分享计算机、AI 与阅读的所见所想，用软件作品与文字构筑更广阔的思维空间。
        </p>
      </header>

      <div className="glass rounded-lg p-8 space-y-8 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/30" style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', perspective: '1000px' }}>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">你好！</h2>
          <p className="text-muted-foreground leading-relaxed">
            我是一名充满激情的前端开发者和设计师，专注于创造美观且实用的网络体验。
            在技术领域有多年经验的我，擅长运用 React、TypeScript 等现代网络技术，
            将创意转化为现实。我相信优秀的用户界面不仅要美观，还要具有良好的交互体验。
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">专业技能</h2>
          <div className="flex gap-2 flex-wrap">
            {[
              { name: "React", type: "frontend" },
              { name: "TypeScript", type: "frontend" },
              { name: "JavaScript", type: "frontend" },
              { name: "HTML/CSS", type: "frontend" },
              { name: "Tailwind", type: "frontend" },
              { name: "UI/UX 设计", type: "design" },
              { name: "Figma", type: "design" },
              { name: "Node.js", type: "backend" },
              { name: "Git", type: "tool" },
              { name: "响应式设计", type: "design" },
              { name: "性能优化", type: "performance" },
              { name: "组件开发", type: "frontend" }
            ].map((skill, index) => (
              <span
                key={skill.name}
                className={`px-3 py-1 rounded hover:scale-110 transition-all duration-300 cursor-default ${
                  skill.type === 'frontend' ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 hover:from-blue-500/20 hover:to-cyan-500/20' :
                  skill.type === 'design' ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 hover:from-purple-500/20 hover:to-pink-500/20' :
                  skill.type === 'backend' ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 hover:from-green-500/20 hover:to-emerald-500/20' :
                  skill.type === 'tool' ? 'bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 hover:from-orange-500/20 hover:to-amber-500/20' :
                  'bg-gradient-to-r from-rose-500/10 to-red-500/10 text-rose-600 hover:from-rose-500/20 hover:to-red-500/20'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.5s ease-out forwards'
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">工作经历</h2>
          <div className="space-y-6">
            <div 
              className="glass rounded-lg p-8 space-y-8 transition-all duration-300 border border-transparent hover:border-primary/30 hover:shadow-2xl hover:translate-y-[-8px]" 
              style={{ 
                transformStyle: 'preserve-3d', 
                backfaceVisibility: 'hidden', 
                perspective: '1000px'
              }}>
              <div className="relative transition-all duration-300">
                {/* 内容保持不变 */}
              </div>
            </div>
            <div className="group hover:bg-primary/5 p-4 rounded-lg transition-all duration-300 transform-gpu cursor-default hover:translate-y-[-8px] hover:shadow-lg" style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', perspective: '1000px' }}>
              <h3 className="text-lg font-medium group-hover:text-primary transition-colors">高级前端开发工程师</h3>
              <p className="text-muted-foreground group-hover:text-primary/80 transition-colors">负责企业级应用的前端架构设计和开发，优化用户体验和性能表现。</p>
            </div>
            <div className="group hover:bg-primary/5 p-4 rounded-lg transition-all duration-300 transform-gpu cursor-default hover:translate-y-[-8px] hover:shadow-lg" style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', perspective: '1000px' }}>
              <h3 className="text-lg font-medium group-hover:text-primary transition-colors">UI/UX 设计师</h3>
              <p className="text-muted-foreground group-hover:text-primary/80 transition-colors">设计并实现富有创意的用户界面，确保最佳的用户体验。</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">联系方式</h2>
          <p className="text-muted-foreground">
            如果您对合作感兴趣，或者只是想打个招呼，随时欢迎联系我！
          </p>
          <div className="flex gap-4">
            <a
              href="mailto:contact@example.com"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 group"
            >
              <span className="group-hover:scale-110 transition-transform">📧</span>
              <span>contact@example.com</span>
            </a>
            <button
              onClick={() => {
                // TODO: 实现微信二维码弹窗
                alert('微信二维码即将上线');
              }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 group"
            >
              <span className="group-hover:scale-110 transition-transform">💬</span>
              <span>添加微信</span>
            </button>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default About;
