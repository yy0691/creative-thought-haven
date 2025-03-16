import { useParams } from 'react-router-dom';
import { projects } from '../content/projects';
import { marked } from 'marked';
import VideoPlayer from '../components/VideoPlayer';
import FigmaEmbed from '../components/FigmaEmbed';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import MDXComponents from '../components/MDXComponents';
import remarkGfm from 'remark-gfm';

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);
  const [readmeError, setReadmeError] = useState<string | null>(null);

  // 配置marked选项，确保正确处理换行和其他Markdown特性
  useEffect(() => {
    marked.setOptions({
      breaks: true,        // 将换行符转换为<br>
      gfm: true,           // 使用GitHub风格的Markdown
    });
  }, []);

  // 尝试从GitHub仓库获取README.md内容
  useEffect(() => {
    const fetchReadmeFromGithub = async () => {
      if (!project?.githubUrl) return;
      
      try {
        setIsLoadingReadme(true);
        setReadmeError(null);
        
        // 从GitHub URL中提取用户名和仓库名
        const githubUrlPattern = /github\.com\/([^\/]+)\/([^\/]+)/;
        const match = project.githubUrl.match(githubUrlPattern);
        
        if (!match) {
          throw new Error('无法解析GitHub URL');
        }
        
        const [, username, repo] = match;
        
        // 使用GitHub API获取README内容
        const response = await axios.get(
          `https://api.github.com/repos/${username}/${repo}/readme`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3.raw'
            }
          }
        );
        
        // 确保获取到的内容是字符串
        const readmeText = typeof response.data === 'string' 
          ? response.data 
          : JSON.stringify(response.data);
        
        setReadmeContent(readmeText);
      } catch (error) {
        console.error('获取README失败:', error);
        setReadmeError('无法加载README文件。使用项目默认描述。');
        // 如果获取失败，使用项目的details字段作为备用
        setReadmeContent(project.details);
      } finally {
        setIsLoadingReadme(false);
      }
    };
    
    fetchReadmeFromGithub();
  }, [project]);

  // 处理项目详情内容，确保换行正确显示
  const formatDetails = (details: string) => {
    if (!details) return '';
    
    // 替换单个换行为<br>，保留Markdown格式
    return details.replace(/\n(?!\n)/g, '  \n');
  };

  // 渲染 Markdown 内容
  const renderMarkdown = (content: string) => {
    try {
      return (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={MDXComponents}
        >
          {content}
        </ReactMarkdown>
      );
    } catch (error) {
      console.error('Markdown 渲染错误:', error);
      return (
        <div className="text-red-500">
          <p>Markdown 渲染错误: {String(error)}</p>
          <pre className="bg-gray-100 p-4 rounded dark:bg-gray-800 overflow-auto">
            {content}
          </pre>
        </div>
      );
    }
  };

  if (!project) {
    return (
      <div className="page-transition py-12 text-center">
        <h1 className="text-2xl font-semibold text-primary">项目未找到</h1>
        <p className="text-muted-foreground mt-4 dark:text-gray-300">抱歉，您请求的项目不存在。</p>
      </div>
    );
  }

  return (
    <div className="page-transition py-12 max-w-6xl mx-auto px-4">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground dark:text-gray-300">{project.description}</p>
      </header>

      

      {(project.videoUrl || project.demoUrl) && (
        <div className="space-y-4 mt-8">
          <h2 className="text-2xl font-semibold text-primary dark:text-primary-foreground">项目演示</h2>
          <VideoPlayer 
            src={project.videoUrl || project.demoUrl || ''} 
            title={project.title}
          />
        </div>
      )}

      <div className="flex gap-4 mt-8">
        {project.githubUrl && (
          <a 
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors dark:bg-primary/90 dark:hover:bg-primary"
          >
            查看源码
          </a>
        )}
        {project.demoUrl && (
          <a 
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors dark:bg-primary/30 dark:text-primary-foreground dark:hover:bg-primary/40"
          >
            在线演示
          </a>
        )}
      </div>

      <div className="space-y-4 mt-8">
        <h2 className="text-2xl font-semibold text-primary dark:text-primary-foreground">技术栈</h2>
        <div className="flex gap-2 flex-wrap">
          {project.technologies.map((tech) => (
            <span 
              key={tech}
              className="text-sm bg-primary/5 text-primary px-4 py-2 rounded-full border border-primary/10 dark:bg-primary/20 dark:text-gray-200 dark:border-primary/30"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-primary dark:text-primary-foreground mb-4">项目详情</h2>
        
        {isLoadingReadme && (
          <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <span className="ml-3 text-primary dark:text-primary-foreground">加载README中...</span>
          </div>
        )}
        
        {readmeError && (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-200 rounded-lg mb-4">
            {readmeError}
          </div>
        )}
        
        <div className="prose prose-primary max-w-none dark:prose-invert">
          {!isLoadingReadme && (
            readmeContent ? (
              renderMarkdown(readmeContent)
            ) : (
              renderMarkdown(project.details)
            )
          )}
        </div>
      </div>

      {/* Figma 预览部分 */}
      {project.figmaUrl && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 dark:text-primary-foreground">设计原型</h2>
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