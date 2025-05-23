import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../content/projects';
import SplashCursor from '../components/cursor';
const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = [
    { id: '', label: '全部' },
    { id: 'original', label: '自制作品' },
    { id: 'software', label: '常用软件' },
    { id: 'automation', label: '自动化工具' }
  ];

  const filteredProjects = selectedCategory
    ? projects.filter(project => project.category === selectedCategory)
    : projects;

  return (
    <div className="page-transition space-y-8 py-12">
      {/* 添加流体效果 */}
      
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
          Portfolio
        </h1>
        <p className="text-muted-foreground dark:text-gray-300">Selected works and projects</p>
      </header>

      <div className="flex justify-center gap-4 flex-wrap">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`
              px-4 py-2 rounded-full transition-all duration-500
              relative overflow-hidden
              ${selectedCategory === category.id
                ? 'bg-gradient-to-r from-primary/90 to-primary text-white dark:text-gray-900 shadow-lg before:absolute before:inset-0 before:bg-white/20 dark:before:bg-black/20 before:animate-pulse'
                : 'bg-white/60 dark:bg-black/40 hover:bg-white/80 dark:hover:bg-black/60 text-primary dark:text-gray-200 border border-transparent hover:border-primary/30 dark:hover:border-primary/40 backdrop-blur-sm'}
              before:opacity-0 hover:before:opacity-100 before:transition-opacity
              after:absolute after:inset-0 after:rounded-full after:border after:border-primary/30 after:scale-[1.02] after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-500
            `}
          >
            <span className="relative z-10 transition-transform duration-300 hover:scale-105">
              {category.label}
            </span>
          </button>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Link 
            key={project.id} 
            to={`/portfolio/${project.id}`}
            className="glass dark:bg-gray-900/80 rounded-lg overflow-hidden border border-white/20 dark:border-gray-700/70 shadow-lg transition-all duration-300 transform-gpu hover:-translate-y-2 hover:shadow-xl hover:border-primary/30 dark:hover:border-primary/40 group no-underline"
            style={{
              background: `linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,255,255,0.6))`,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            <div className="aspect-video bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
              <img 
                src={project.thumbnail} 
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:opacity-90"
              />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-primary dark:text-primary">{project.title}</h3>
              <p className="text-muted-foreground dark:text-gray-300 group-hover:text-primary/80 transition-colors">
                {project.description}
              </p>
              <div className="flex gap-2 flex-wrap">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="text-xs bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary-foreground px-3 py-1 rounded-full border border-primary/10 dark:border-primary/20 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 pt-2">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline dark:text-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub
                  </a>
                )}
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline dark:text-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Demo
                  </a>
                )}
                {project.videoUrl && (
                  <Link 
                    to={`/videos/${project.id}`}
                    className="text-sm text-primary hover:underline dark:text-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    演示视频
                  </Link>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
