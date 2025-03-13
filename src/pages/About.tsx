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
        <p className="text-muted-foreground hover:text-primary transition-colors dark:text-gray-300">
          分享计算机、AI 与阅读的所见所想，用软件作品与文字构筑更广阔的思维空间。
        </p>
      </header>

      <div className="glass rounded-lg p-8 space-y-8 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/30 dark:bg-black/80 dark:border-white/10" style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', perspective: '1000px' }}>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">你好！</h2>
          <p className="text-muted-foreground leading-relaxed dark:text-gray-300">
            一位游走于机械工程严谨性与产品创新可能性之间的技术型产品经理。
            擅长将复杂技术转化为可落地的行业解决方案，专注AI科技领域。
            持续探索AI赋能垂直场景的实践路径……
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
              { name: "UI/UX 设计", type: "design" },
              { name: "Figma", type: "design" },
              { name: "Node.js", type: "backend" },
              { name: "Git", type: "tool" },
              { name: "响应式设计", type: "design" },
              { name: "性能优化", type: "performance" },
              { name: "Python", type: "frontend" },
              { name: "C++", type: "frontend" },
              { name: "组件开发", type: "frontend" }
            ].map((skill, index) => (
              <span
                key={skill.name}
                className={`px-3 py-1 rounded hover:scale-110 transition-all duration-300 cursor-default ${
                  skill.type === 'frontend' ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 hover:from-blue-500/20 hover:to-cyan-500/20 dark:text-blue-400' :
                  skill.type === 'design' ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 hover:from-purple-500/20 hover:to-pink-500/20 dark:text-purple-400' :
                  skill.type === 'backend' ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 hover:from-green-500/20 hover:to-emerald-500/20 dark:text-green-400' :
                  skill.type === 'tool' ? 'bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 hover:from-orange-500/20 hover:to-amber-500/20 dark:text-orange-400' :
                  'bg-gradient-to-r from-rose-500/10 to-red-500/10 text-rose-600 hover:from-rose-500/20 hover:to-red-500/20 dark:text-rose-400'
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
            <div className="group hover:bg-primary/5 p-4 rounded-lg transition-all duration-300 transform-gpu cursor-default hover:translate-y-[-8px] hover:shadow-lg dark:hover:bg-primary/20" style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', perspective: '1000px' }}>
              <h3 className="text-lg font-medium group-hover:text-primary transition-colors dark:text-gray-200">产品经理</h3>
              <p className="text-muted-foreground group-hover:text-primary/80 transition-colors dark:text-gray-300">负责企业级应用的前端架构设计和开发，优化用户体验和性能表现。</p>
            </div>
            <div className="group hover:bg-primary/5 p-4 rounded-lg transition-all duration-300 transform-gpu cursor-default hover:translate-y-[-8px] hover:shadow-lg dark:hover:bg-primary/20" style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', perspective: '1000px' }}>
              <h3 className="text-lg font-medium group-hover:text-primary transition-colors dark:text-gray-200">UI/UX 设计师</h3>
              <p className="text-muted-foreground group-hover:text-primary/80 transition-colors dark:text-gray-300">设计并实现富有创意的用户界面，确保最佳的用户体验。</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">联系方式</h2>
          <p className="text-muted-foreground dark:text-gray-300">
          我始终相信技术存在的意义是解决真实世界的难题，如果你正在:
            🔧 寻找虚拟仿真领域的解决方案  
            💡 探索AI+垂直行业的创新可能  
            🚀 构建高效可靠的技术产品团队  
          欢迎与我交流！
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:yuyuan3162021@163.com"
              className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 group w-full sm:w-auto"
            >
              <span className="group-hover:scale-110 transition-transform">📧</span>
              <span className="truncate">yuyuan3162021@163.com</span>
            </a>
            <button
              onClick={() => {
                // TODO: 实现微信二维码弹窗
                alert("微信号：yyflu-");
              }}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 group w-full sm:w-auto"
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
