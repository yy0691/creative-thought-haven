import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ContentSection {
  id: string;
  title: string;
  description: string;
  path: string;
}

const ContentManager = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  const contentSections: ContentSection[] = [
    {
      id: 'blog',
      title: '博客文章管理',
      description: '创建、编辑和管理博客文章内容',
      path: '/content/blog'
    },
    {
      id: 'projects',
      title: '项目展示管理',
      description: '更新和维护项目展示信息',
      path: '/content/projects'
    },
    {
      id: 'videos',
      title: '视频内容管理',
      description: '上传和管理视频内容',
      path: '/content/videos'
    },
    {
      id: 'designs',
      title: '设计作品管理',
      description: '管理设计作品和原型展示',
      path: '/content/designs'
    },
    {
      id: 'ai-tools',
      title: 'AI工具管理',
      description: '管理AI工具分类和条目信息',
      path: '/content/ai-tools'
    }
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">内容管理系统</h1>
          <p className="text-lg text-gray-600">便捷地管理和维护网站各类内容</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {contentSections.map((section) => (
            <Link
              key={section.id}
              to={section.path}
              className={`p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${activeSection === section.id ? 'bg-white shadow-lg border-2 border-primary' : 'bg-white/80 shadow hover:shadow-xl border border-gray-200'}`}
              onMouseEnter={() => setActiveSection(section.id)}
              onMouseLeave={() => setActiveSection('')}
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
                <p className="text-gray-600">{section.description}</p>
                <div className="flex items-center text-primary">
                  <span>开始管理</span>
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentManager;