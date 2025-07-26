import SplashCursor from '../components/cursor';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const About = () => {
  const [showQRCode, setShowQRCode] = useState(false);

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
    <div className="page-transition py-12 max-w-4xl mx-auto px-4 sm:px-6">
      <header className="text-center space-y-6 animate-slideDown mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent hover:scale-105 transition-transform cursor-default">
          关于我
        </h1>
        <p className="text-base md:text-lg text-muted-foreground hover:text-primary transition-colors dark:text-gray-300 max-w-2xl mx-auto">
          分享计算机、AI 与阅读的所见所想，用软件作品与文字构筑更广阔的思维空间。
        </p>
      </header>

      <div className="glass rounded-xl p-6 md:p-10 space-y-10 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/30 dark:bg-black/80 dark:border-white/10" style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', perspective: '1000px' }}>
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">你好！</h2>
          <p className="text-base text-muted-foreground leading-relaxed dark:text-gray-300">
            👨‍💻 热爱把技术转化为实用工具的产品经理<br />
            🐍 擅长用Python打造自动化工具，提升工作效率<br />
            🔍 关注技术如何解决实际业务问题
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">专业技能</h2>
          <div className="space-y-6">
            {[
              {
                title: "后端开发",
                skills: [
                  { name: "Python", type: "backend" },
                  { name: "C/C++", type: "backend" },
                  { name: "C#", type: "backend" },
                  { name: "Node.js", type: "backend" }
                ]
              },
              {
                title: "前端开发",
                skills: [
                  { name: "HTML/CSS", type: "frontend" },
                  { name: "响应式设计", type: "frontend" }
                ]
              },
              {
                title: "设计工具",
                skills: [
                  { name: "UI/UX 设计", type: "design" },
                  { name: "Figma", type: "design" },
                  { name: "Photoshop", type: "design" },
                  { name: "Premiere Pro", type: "design" }
                ]
              },
              {
                title: "开发工具",
                skills: [
                  { name: "Git", type: "tool" }
                ]
              },
              {
                title: "其他技术",
                skills: [
                  { name: "UE4", type: "tech" },
                  { name: "网络安全", type: "tech" }
                ]
              }
            ].map((category, categoryIndex) => (
              <div key={category.title} className="space-y-3">
                <h3 className="text-lg font-medium text-muted-foreground dark:text-gray-300">
                  {category.title}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {category.skills.map((skill, index) => (
                    <span
                      key={skill.name}
                      className={`px-3 py-1.5 rounded-full hover:scale-105 transition-all duration-300 cursor-default text-xs md:text-sm ${
                        skill.type === 'frontend' ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 hover:from-blue-500/20 hover:to-cyan-500/20 dark:text-blue-400' :
                        skill.type === 'design' ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 hover:from-purple-500/20 hover:to-pink-500/20 dark:text-purple-400' :
                        skill.type === 'backend' ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 hover:from-green-500/20 hover:to-emerald-500/20 dark:text-green-400' :
                        skill.type === 'tool' ? 'bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 hover:from-orange-500/20 hover:to-amber-500/20 dark:text-orange-400' :
                        'bg-gradient-to-r from-rose-500/10 to-red-500/10 text-rose-600 hover:from-rose-500/20 hover:to-red-500/20 dark:text-rose-400'
                      }`}
                      style={{
                        animationDelay: `${(categoryIndex * 100) + (index * 50)}ms`,
                        animation: 'fadeInUp 0.5s ease-out forwards'
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">最近在做什么？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group hover:bg-primary/5 p-6 rounded-xl transition-all duration-300 transform-gpu cursor-default hover:translate-y-[-8px] hover:shadow-lg dark:hover:bg-primary/20 border border-transparent hover:border-primary/20 dark:hover:border-primary/30" style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', perspective: '1000px' }}>
              <h3 className="text-xl font-medium group-hover:text-primary transition-colors dark:text-gray-200 mb-3">产品经理</h3>
              <p className="text-sm text-muted-foreground group-hover:text-primary/80 transition-colors dark:text-gray-300">🎮 ToB产品经理，负责产品规划、设计、开发、运营等全生命周期管理。</p>
            </div>
            <div className="group hover:bg-primary/5 p-6 rounded-xl transition-all duration-300 transform-gpu cursor-default hover:translate-y-[-8px] hover:shadow-lg dark:hover:bg-primary/20 border border-transparent hover:border-primary/20 dark:hover:border-primary/30" style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', perspective: '1000px' }}>
              <h3 className="text-xl font-medium group-hover:text-primary transition-colors dark:text-gray-200 mb-3">技术学习</h3>
              <p className="text-sm text-muted-foreground group-hover:text-primary/80 transition-colors dark:text-gray-300">📚 研究自动化工具开发，探索如何将新技术应用到实际工作中，提高团队协作效率。</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">联系方式</h2>
          <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 p-6 rounded-xl dark:from-primary/10 dark:to-blue-500/10">
            <p className="text-muted-foreground dark:text-gray-300 text-base mb-6">
              我相信技术的价值在于解决现实问题，如果你正在:<br />
                 🛠️ 寻找提升工作效率的实用方法<br />
                 🌱 探索技术在行业中的创新应用<br />
                 🤝 构建高效团队，打造出色产品<br />
              欢迎与我交流！
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:yuyuan3162021@163.com"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 group w-full sm:w-auto"
              >
                <span className="group-hover:scale-110 transition-transform">📧</span>
                <span className="truncate">yuyuan3162021@163.com</span>
              </a>
              <button
                onClick={() => setShowQRCode(true)}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 group w-full sm:w-auto"
              >
                <span className="group-hover:scale-110 transition-transform">💬</span>
                <span>添加微信</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* 微信二维码弹窗 */}
      <AnimatePresence>
        {showQRCode && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowQRCode(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl max-w-sm w-full dark:border dark:border-gray-700 pointer-events-auto"
              >
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">扫码添加微信</h3>
                  <div className="mb-4 flex justify-center">
                    <img 
                      src="https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_News微信二维码.png" 
                      alt="微信二维码" 
                      className="rounded-xl w-64 h-64 object-cover bg-white shadow-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        console.error("二维码图片加载失败");
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='12' text-anchor='middle' alignment-baseline='middle' fill='%23999'%3E微信二维码%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                    扫一扫上面的二维码图案，加我为朋友。
                  </p>
                  <button
                    onClick={() => setShowQRCode(false)}
                    className="w-full py-2.5 px-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                  >
                    关闭
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

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

        .mouse-ripple {
          position: fixed;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(var(--primary-rgb), 0.5);
          pointer-events: none;
          transform: translate(-50%, -50%);
          animation: ripple 1s linear;
        }

        @keyframes ripple {
          0% {
            width: 0px;
            height: 0px;
            opacity: 0.5;
          }
          100% {
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
