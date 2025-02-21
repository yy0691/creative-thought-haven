import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects } from '../../lib/projects';
import { toast } from '@/components/ui/use-toast';

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  status?: string;
  techStack: string[];
  imageUrl: string;
}

const projectCategories = [
  { id: 'custom', name: '自制作品', description: '个人开发的原创软件作品' },
  { id: 'common', name: '常用软件', description: '精选的高效实用软件推荐' },
  { id: 'automation', name: '自动化工具', description: '提升工作效率的自动化解决方案' },
];

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState<Project>({
    id: '',
    title: '',
    category: 'custom',
    description: '',
    status: 'active',
    techStack: [],
    technologies: [],
    thumbnail: '',
    imageUrl: '',
    slug: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      setFormData(selectedProject);
    } else {
      setFormData({
        id: '',
        title: '',
        category: 'custom',
        description: '',
        status: 'active',
        techStack: [],
        technologies: [],
        thumbnail: '',
        imageUrl: '',
        slug: ''
      });
    }
  }, [selectedProject]);

  const loadProjects = async () => {
    try {
      const allProjects = await getAllProjects();
      const convertedProjects = allProjects.map(project => ({
        ...project,
        status: 'active',
        techStack: project.technologies,
        imageUrl: project.thumbnail
      }));
      setProjects(convertedProjects);
    } catch (error) {
      console.error('加载项目失败:', error);
      toast({
        title: '错误',
        description: '加载项目列表失败',
        variant: 'destructive',
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = '标题不能为空';
    }
    if (!formData.description.trim()) {
      newErrors.description = '描述不能为空';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof Project, value: string) => {
    if (field === 'techStack') {
      setFormData(prev => ({
        ...prev,
        techStack: value.split(',').map(tech => tech.trim()).filter(Boolean)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
        slug: field === 'title' ? value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : prev.slug
      }));
    }
  };

  const handleSave = async () => {
    try {
      // 这里将实现保存项目的逻辑
      // 1. 更新 projects.ts 文件
      // 2. 重新加载项目列表
      toast({
        title: '成功',
        description: '项目保存成功',
      });
      await loadProjects();
      setIsEditing(false);
    } catch (error) {
      console.error('保存项目失败:', error);
      toast({
        title: '错误',
        description: '保存项目失败',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">项目展示管理</h1>
            <p className="text-gray-600 mt-2">创建、编辑和管理项目展示</p>
          </div>
          <button
            onClick={() => {
              setSelectedProject(null);
              setIsEditing(true);
            }}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            新建项目
          </button>
        </header>

        <div className="grid grid-cols-12 gap-8">
          {/* 左侧项目列表 */}
          <div className="col-span-4 bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              {/* 搜索框 */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索项目..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* 分类筛选 */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`px-3 py-1 rounded-full text-sm ${!selectedCategory ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  全部
                </button>
                {projectCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 rounded-full text-sm ${selectedCategory === category.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* 项目列表 */}
              <div className="space-y-4 mt-6">
                {projects
                  .filter(project => 
                    (!selectedCategory || project.category === selectedCategory) &&
                    (!searchTerm || 
                      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      project.description.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                  )
                  .map((project) => (
                    <div
                      key={project.slug}
                      onClick={() => {
                        setSelectedProject(project);
                        setIsEditing(true);
                      }}
                      className="p-4 border border-gray-200 rounded-lg hover:border-primary/50 cursor-pointer transition-colors"
                    >
                      <h3 className="font-medium text-gray-900">{project.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{project.category}</p>
                      <div className="flex gap-2 mt-2">
                        {project.technologies?.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* 右侧编辑区域 */}
          <div className="col-span-8 bg-white rounded-xl shadow-lg p-6">
            {isEditing ? (
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="项目标题"
                  className="w-full px-4 py-2 text-xl font-medium border-b border-gray-200 focus:outline-none focus:border-primary"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                    >
                      {projectCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option value="active">开发中</option>
                      <option value="completed">已完成</option>
                      <option value="planned">计划中</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">技术栈</label>
                  <input
                    type="text"
                    placeholder="输入技术栈，用逗号分隔"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="请输入项目描述"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">演示链接</label>
                    <input
                      type="url"
                      placeholder="https://"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub 链接</label>
                    <input
                      type="url"
                      placeholder="https://github.com/"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">项目图片</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none"
                        >
                          <span>上传图片</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" />
                        </label>
                        <p className="pl-1">或拖放图片到此处</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF 格式，最大 10MB</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    取消
                  </button>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    保存
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V6a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="mt-4">选择一个项目进行编辑，或创建新项目</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectManager;