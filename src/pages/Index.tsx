import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { getAllPosts } from '../lib/blog';
import { getAllProjects } from '../lib/projects';
import SplashCursor from '../components/cursor';

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const recentPosts = await getAllPosts();
      const recentProjects = await getAllProjects();
      setPosts(recentPosts.slice(0, 3));
      setProjects(recentProjects.slice(0, 3));
    };
    fetchData();
  
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowContent(scrollPosition > windowHeight * 0.5);
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen relative overflow-hidden overflow-y-scroll">
      <SplashCursor 
        SPLAT_RADIUS={0.2}
        DYE_RESOLUTION={512}
        SPLAT_FORCE={300}
        DENSITY_DISSIPATION={2}
        VELOCITY_DISSIPATION={2}
        COLOR_UPDATE_SPEED={2}
      />
      <div className="ripple-background absolute inset-0 z-0"></div>
      
      <div className="relative z-10">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
          <h1 className="text-8xl font-bold mb-9 gradient-text hover:scale-105 transition-transform duration-500 cursor-default">
            ENDLESS
          </h1>
            <p className="text-2xl mb-12 text-gray-600 animate-fade-in-delay max-w-2xl mx-auto hover:text-gray-800 transition-colors duration-300">
              AI 与阅读的所见所想，用软件作品与文字构筑更广阔的思维空间。
            </p>
          </div>
        </div>
  
        {/* 最新内容展示 */}
        <div className="max-w-screen-2xl mx-auto px-4 pb-16 mt-32 transition-all duration-1000 transform ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}">
          <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-12">
            {/* 最新文章 */}
            <div 
              className="w-full md:w-[600px] group backdrop-blur-md bg-white/80 p-8 rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                position: 'relative',
                borderRadius: '1rem',
                transform: 'perspective(1000px)',
                transition: 'transform 0.3s ease-out'
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 50;
                const rotateY = (centerX - x) / 50;
  
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                e.currentTarget.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))`;
                e.currentTarget.style.setProperty('--gradient-position', `${x}px ${y}px`);
                e.currentTarget.style.boxShadow = `
                  ${(x - centerX) / 25}px 
                  ${(y - centerY) / 25}px 
                  20px rgba(0, 0, 0, 0.1)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                e.currentTarget.style.setProperty('--gradient-position', '0 0');
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">最新文章</h2>
              <ul className="space-y-6">
                {posts.map((post) => (
                  <li key={post.slug} className="transform transition-all duration-300">
                    <a href={`/blog/${post.slug}`} className="block p-4 rounded-xl hover:bg-gray-200/80 transition-all duration-300">
                      <h3 className="font-medium text-lg mb-2 text-gray-800">{post.title}</h3>
                      <p className="text-sm text-gray-600">{post.date}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* 最新项目 */}
            <div 
              className="w-full md:w-[600px] group backdrop-blur-md bg-white/80 p-8 rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                position: 'relative',
                borderRadius: '1rem',
                transform: 'perspective(1000px)',
                transition: 'transform 0.3s ease-out'
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 50;
                const rotateY = (centerX - x) / 50;
  
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                e.currentTarget.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))`;
                e.currentTarget.style.setProperty('--gradient-position', `${x}px ${y}px`);
                e.currentTarget.style.boxShadow = `
                  ${(x - centerX) / 25}px 
                  ${(y - centerY) / 25}px 
                  20px rgba(0, 0, 0, 0.1)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                e.currentTarget.style.setProperty('--gradient-position', '0 0');
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">最新项目</h2>
              <ul className="space-y-6">
                {projects.map((project) => (
                  <li key={project.slug} className="transform transition-all duration-300">
                    <a href={`/projects/${project.slug}`} className="block p-4 rounded-xl hover:bg-gray-200/80 transition-all duration-300">
                      <h3 className="font-medium text-lg mb-2 text-gray-800">{project.title}</h3>
                      <p className="text-sm text-gray-600">{project.description}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

