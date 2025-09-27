import { useParams } from 'react-router-dom';
import { useProjects } from '../hooks/useContent';

// import { marked } from 'marked'; // 注释掉marked，使用react-markdown
import VideoPlayer from '../components/VideoPlayer';
import FigmaEmbed from '../components/FigmaEmbed';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import MDXComponents from '../components/MDXComponents';
import remarkGfm from 'remark-gfm';

const ProjectDetails = () => {
  const { id } = useParams();
  const { projects } = useProjects();
  const project = projects.find(p => p.id === id);

  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);
  const [readmeError, setReadmeError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchReadmeFromGithub = async () => {
      if (!project?.githubUrl) return;
      try {
        setIsLoadingReadme(true);
        setReadmeError(null);

        const githubUrlPattern = /github\.com\/([^\/]+)\/([^\/]+)/;
        const match = project.githubUrl.match(githubUrlPattern);
        if (!match) {
          throw new Error('无法解析GitHub URL');
        }
        const [, username, repo] = match;

        const response = await axios.get(
          `https://api.github.com/repos/${username}/${repo}/readme`,
          { headers: { Accept: 'application/vnd.github.v3.raw' } }
        );
        const readmeText = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
        setReadmeContent(readmeText);
      } catch (error) {
        console.error('获取README失败:', error);
        setReadmeError('无法加载README文件。使用项目默认描述。');
        setReadmeContent(project?.content || project?.description || '');
      } finally {
        setIsLoadingReadme(false);
      }
    };

    fetchReadmeFromGithub();
  }, [project]);

  const renderMarkdown = (content: string) => (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={MDXComponents}>
      {content}
    </ReactMarkdown>
  );

  return (
    <div className="page-transition py-12 max-w-6xl mx-auto px-4">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
          {project?.title}
        </h1>
        <p className="text-lg text-muted-foreground dark:text-gray-300">{project?.description}</p>
      </header>

      {(project?.videoUrl || project?.demoUrl) && (
        <div className="space-y-4 mt-8">
          <h2 className="text-2xl font-semibold text-primary dark:text-primary-foreground">项目演示</h2>
          <VideoPlayer src={project?.videoUrl || project?.demoUrl || ''} title={project?.title || ''} />
        </div>
      )}

      <div className="prose prose-primary max-w-none dark:prose-invert mt-8">
        {isLoadingReadme ? null : renderMarkdown(readmeContent || project?.content || project?.description || '')}
      </div>

      {project?.figmaUrl && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 dark:text-primary-foreground">设计原型</h2>
          <FigmaEmbed url={project.figmaUrl} title={`${project.title} - 设计原型`} className="shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;