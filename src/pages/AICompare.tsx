import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, X, ArrowLeft, Search, Plus, Minus } from 'lucide-react';
import aiToolsData from '../data/AI_tools.json';
import { toast } from 'sonner';

interface RawTool {
  id: string;
  title: string;
  description: string;
  category: string;
  link?: string;
  image?: string;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  price?: string;
  features?: string[];
  pros?: string[];
  cons?: string[];
  website?: string;
  image?: string;
}

const AICompare = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTools, setSelectedTools] = useState<string[]>(() => {
    const ids = searchParams.get('ids')?.split(',') || [];
    return ids.slice(0, 3); // 最多3个
  });
  const [searchQuery, setSearchQuery] = useState('');

  // 转换数据结构
  const tools: Tool[] = (aiToolsData as RawTool[]).map(tool => ({
    id: tool.id,
    name: tool.title,
    description: tool.description,
    category: tool.category,
    website: tool.link,
    image: tool.image,
    price: '查看官网',
    features: [],
    pros: ['功能强大', '界面友好', '性价比高'],
    cons: ['需要学习成本']
  }));

  // 过滤工具
  const filteredTools = useMemo(() => {
    if (!searchQuery) return tools;
    const query = searchQuery.toLowerCase();
    return tools.filter(tool => 
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query)
    );
  }, [searchQuery, tools]);

  // 选中的工具详情
  const selectedToolsData = useMemo(() => {
    return selectedTools.map(id => tools.find(t => t.id === id)).filter(Boolean) as Tool[];
  }, [selectedTools, tools]);

  // 添加工具到对比
  const addTool = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      toast.error('该工具已在对比列表中');
      return;
    }
    if (selectedTools.length >= 3) {
      toast.error('最多只能对比3个工具');
      return;
    }
    const newSelected = [...selectedTools, toolId];
    setSelectedTools(newSelected);
    setSearchParams({ ids: newSelected.join(',') });
    toast.success('已添加到对比列表');
  };

  // 移除工具
  const removeTool = (toolId: string) => {
    const newSelected = selectedTools.filter(id => id !== toolId);
    setSelectedTools(newSelected);
    if (newSelected.length > 0) {
      setSearchParams({ ids: newSelected.join(',') });
    } else {
      setSearchParams({});
    }
  };

  // 查找替代品
  const findAlternatives = (tool: Tool) => {
    return tools.filter(t => 
      t.id !== tool.id && 
      t.category === tool.category
    ).slice(0, 5);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/ai" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            返回AI工具
          </Link>
          <h1 className="text-4xl font-bold mb-4">AI工具对比</h1>
          <p className="text-gray-600 dark:text-gray-400">
            选择最多3个工具进行详细对比，找到最适合你的AI助手
          </p>
        </div>

        {/* 搜索和选择区域 */}
        {selectedTools.length < 3 && (
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">选择要对比的工具</h2>
            
            {/* 搜索框 */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索AI工具..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* 工具列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {filteredTools.map(tool => (
                <div
                  key={tool.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedTools.includes(tool.id)
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                  }`}
                  onClick={() => !selectedTools.includes(tool.id) && addTool(tool.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{tool.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {tool.description}
                      </p>
                      <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                        {tool.category}
                      </span>
                    </div>
                    {selectedTools.includes(tool.id) && (
                      <Check className="w-5 h-5 text-primary-600 flex-shrink-0 ml-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 对比表格 */}
        {selectedToolsData.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white sticky left-0 bg-gray-50 dark:bg-gray-700">
                      对比项
                    </th>
                    {selectedToolsData.map(tool => (
                      <th key={tool.id} className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                          <button
                            onClick={() => removeTool(tool.id)}
                            className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                          >
                            <Minus className="w-3 h-3" />
                            移除
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {/* 基本信息 */}
                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-800">
                      简介
                    </td>
                    {selectedToolsData.map(tool => (
                      <td key={tool.id} className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {tool.description}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-800">
                      分类
                    </td>
                    {selectedToolsData.map(tool => (
                      <td key={tool.id} className="px-6 py-4 text-center">
                        <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                          {tool.category}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-800">
                      价格
                    </td>
                    {selectedToolsData.map(tool => (
                      <td key={tool.id} className="px-6 py-4 text-center text-sm">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {tool.price || '免费'}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* 优点 */}
                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-800">
                      优点
                    </td>
                    {selectedToolsData.map(tool => (
                      <td key={tool.id} className="px-6 py-4">
                        <ul className="space-y-2 text-sm">
                          {(tool.pros || ['功能强大', '易于使用', '性价比高']).map((pro, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 dark:text-gray-300">{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* 缺点 */}
                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-800">
                      缺点
                    </td>
                    {selectedToolsData.map(tool => (
                      <td key={tool.id} className="px-6 py-4">
                        <ul className="space-y-2 text-sm">
                          {(tool.cons || ['需要学习成本']).map((con, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 dark:text-gray-300">{con}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* 操作 */}
                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-800">
                      操作
                    </td>
                    {selectedToolsData.map(tool => (
                      <td key={tool.id} className="px-6 py-4 text-center">
                        <div className="flex flex-col gap-2">
                          <Link
                            to={`/ai/tools/${tool.id}`}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                          >
                            查看详情
                          </Link>
                          {tool.website && (
                            <a
                              href={tool.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                            >
                              访问官网
                            </a>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 替代品推荐 */}
        {selectedToolsData.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">相似工具推荐</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedToolsData.map(tool => {
                const alternatives = findAlternatives(tool);
                if (alternatives.length === 0) return null;
                
                return (
                  <div key={tool.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                    <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                      {tool.name} 的替代品
                    </h3>
                    <ul className="space-y-2">
                      {alternatives.map(alt => (
                        <li key={alt.id}>
                          <button
                            onClick={() => {
                              removeTool(tool.id);
                              addTool(alt.id);
                            }}
                            className="text-sm text-primary-600 hover:text-primary-700 hover:underline text-left"
                          >
                            {alt.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 空状态 */}
        {selectedToolsData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">开始对比AI工具</h3>
            <p className="text-gray-600 dark:text-gray-400">
              从上方搜索框选择最多3个工具进行对比
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICompare;
