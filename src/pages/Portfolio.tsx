
import { Link } from 'react-router-dom';
import { projects } from '../content/projects';

const Portfolio = () => {
  return (
    <div className="page-transition space-y-8 py-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
          Portfolio
        </h1>
        <p className="text-muted-foreground">Selected works and projects</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="glass rounded-lg overflow-hidden card-hover border border-white/20 shadow-lg"
            style={{
              background: `linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,255,255,0.6))`,
            }}
          >
            <div className="aspect-video bg-gradient-to-br from-primary/5 to-primary/10">
              <img 
                src={project.thumbnail} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-primary">{project.title}</h3>
              <p className="text-muted-foreground">
                {project.description}
              </p>
              <div className="flex gap-2 flex-wrap">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="text-xs bg-primary/5 text-primary px-3 py-1 rounded-full border border-primary/10 hover:bg-primary/10 transition-colors"
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
                    className="text-sm text-primary hover:underline"
                  >
                    GitHub
                  </a>
                )}
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Live Demo
                  </a>
                )}
                {project.videoUrl && (
                  <Link 
                    to={`/videos/${project.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    观看视频
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
