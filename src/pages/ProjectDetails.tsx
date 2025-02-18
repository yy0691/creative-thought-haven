import { useParams } from 'react-router-dom';
import { projects } from '../content/projects';
import { marked } from 'marked';
import VideoPlayer from '../components/VideoPlayer';
import FigmaEmbed from '../components/FigmaEmbed';  // 添加这行

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="page-transition py-12 text-center">
        <h1 className="text-2xl font-semibold text-primary">项目未找到</h1>
        <p className="text-muted-foreground mt-4">抱歉，您请求的项目不存在。</p>
      </div>
    );
  }

  return (
    <div className="page-transition py-12 max-w-6xl mx-auto px-4">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground">{project.description}</p>
      </header>

      <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {(project.videoUrl || project.demoUrl) && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">项目演示</h2>
          <VideoPlayer 
            url={project.videoUrl || project.demoUrl || ''} 
            title={project.title}
          />
        </div>
      )}

      <div className="flex gap-4">
        {project.githubUrl && (
          <a 
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
          >
            查看源码
          </a>
        )}
        {project.demoUrl && (
          <a 
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
          >
            在线演示
          </a>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">技术栈</h2>
        <div className="flex gap-2 flex-wrap">
          {project.technologies.map((tech) => (
            <span 
              key={tech}
              className="text-sm bg-primary/5 text-primary px-4 py-2 rounded-full border border-primary/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="prose prose-primary max-w-none">
        <div dangerouslySetInnerHTML={{ __html: marked(project.details) }} />
      </div>

      {/* Figma 预览部分 */}
      {project.figmaUrl && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">设计原型</h2>
          <FigmaEmbed 
            url={project.figmaUrl} 
            title={`${project.title} - 设计原型`}
            className="shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;