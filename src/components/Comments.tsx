import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface CommentsProps {
  articleId: string;
  articleTitle: string;
}

export const Comments: React.FC<CommentsProps> = ({ articleId, articleTitle }) => {
  const commentsRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  // Giscus 配置 - 从环境变量读取
  const giscusConfig = {
    repo: import.meta.env.VITE_GISCUS_REPO || 'your-username/your-repo',
    repoId: import.meta.env.VITE_GISCUS_REPO_ID || '',
    category: import.meta.env.VITE_GISCUS_CATEGORY || 'General',
    categoryId: import.meta.env.VITE_GISCUS_CATEGORY_ID || '',
    mapping: 'pathname',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'top',
    theme: theme === 'dark' ? 'dark' : 'light',
    lang: 'zh-CN',
  };

  useEffect(() => {
    // 如果没有配置 Giscus，不加载评论
    if (!giscusConfig.repoId || !giscusConfig.categoryId) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', giscusConfig.repo);
    script.setAttribute('data-repo-id', giscusConfig.repoId);
    script.setAttribute('data-category', giscusConfig.category);
    script.setAttribute('data-category-id', giscusConfig.categoryId);
    script.setAttribute('data-mapping', giscusConfig.mapping);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', giscusConfig.reactionsEnabled);
    script.setAttribute('data-emit-metadata', giscusConfig.emitMetadata);
    script.setAttribute('data-input-position', giscusConfig.inputPosition);
    script.setAttribute('data-theme', giscusConfig.theme);
    script.setAttribute('data-lang', giscusConfig.lang);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    if (commentsRef.current) {
      commentsRef.current.appendChild(script);
    }

    return () => {
      if (commentsRef.current) {
        commentsRef.current.innerHTML = '';
      }
    };
  }, [articleId, giscusConfig.theme]);

  // 如果没有配置，显示配置提示
  if (!giscusConfig.repoId || !giscusConfig.categoryId) {
    return (
      <div className="mt-12 pt-8 border-t dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">评论</h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            评论系统需要配置
          </h3>
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            本博客使用 Giscus（基于 GitHub Discussions）作为评论系统。
          </p>
          <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
            <p className="font-medium">配置步骤：</p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>在您的 GitHub 仓库中启用 Discussions</li>
              <li>访问 <a href="https://giscus.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">giscus.app</a> 获取配置信息</li>
              <li>在 Replit Secrets 中添加以下环境变量：
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li><code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">VITE_GISCUS_REPO</code></li>
                  <li><code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">VITE_GISCUS_REPO_ID</code></li>
                  <li><code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">VITE_GISCUS_CATEGORY</code></li>
                  <li><code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">VITE_GISCUS_CATEGORY_ID</code></li>
                </ul>
              </li>
              <li>重启应用以加载新配置</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 pt-8 border-t dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">评论</h2>
      <div ref={commentsRef} className="giscus" />
    </div>
  );
};
