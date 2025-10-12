import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAnnotations } from '@/app/hooks/useAnnotations';
import { StickyNote, Calendar, Search, Trash2, Download, Edit2, FileText } from 'lucide-react';
import { toast } from 'sonner';

const NotesManagement = () => {
  const { annotations, updateAnnotation, deleteAnnotation } = useAnnotations();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNote, setEditNote] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<string>('all');

  // 按文章分组
  const annotationsByArticle = useMemo(() => {
    const grouped: Record<string, typeof annotations> = {};
    annotations.forEach(anno => {
      if (!grouped[anno.articleId]) {
        grouped[anno.articleId] = [];
      }
      grouped[anno.articleId].push(anno);
    });
    return grouped;
  }, [annotations]);

  // 过滤笔记
  const filteredAnnotations = useMemo(() => {
    let filtered = annotations;
    
    // 按文章过滤
    if (selectedArticle !== 'all') {
      filtered = filtered.filter(anno => anno.articleId === selectedArticle);
    }
    
    // 按搜索关键词过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(anno => 
        anno.text.toLowerCase().includes(query) ||
        anno.noteContent?.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [annotations, selectedArticle, searchQuery]);

  const handleEdit = (id: string, currentNote: string) => {
    setEditingId(id);
    setEditNote(currentNote || '');
  };

  const handleSave = (id: string) => {
    updateAnnotation(id, editNote);
    setEditingId(null);
    setEditNote('');
    toast.success('笔记已更新');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这条笔记吗？')) {
      deleteAnnotation(id);
      toast.success('笔记已删除');
    }
  };

  // 导出所有笔记为Markdown
  const exportAllNotes = () => {
    if (annotations.length === 0) {
      toast.error('暂无笔记可导出');
      return;
    }

    let markdown = `# 我的笔记合集\n\n`;
    markdown += `> 导出时间：${new Date().toLocaleString('zh-CN')}\n`;
    markdown += `> 总计笔记数：${annotations.length}\n\n`;
    markdown += `---\n\n`;

    Object.entries(annotationsByArticle).forEach(([articleId, annos]) => {
      markdown += `## 文章：${articleId}\n\n`;
      annos.forEach((anno, index) => {
        markdown += `### 笔记 ${index + 1}\n\n`;
        markdown += `**高亮内容：**\n\n`;
        markdown += `> ${anno.text}\n\n`;
        
        if (anno.noteContent) {
          markdown += `**我的笔记：**\n\n`;
          markdown += `${anno.noteContent}\n\n`;
        }
        
        markdown += `*创建时间：${new Date(anno.createdAt).toLocaleString('zh-CN')}*\n\n`;
        markdown += `---\n\n`;
      });
    });

    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `全部笔记-${new Date().toLocaleDateString('zh-CN')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('笔记已导出');
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <StickyNote className="w-8 h-8 text-primary-600" />
            <h1 className="text-4xl font-bold">笔记管理中心</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            管理您在阅读文章时保存的所有笔记和高亮
          </p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">总笔记数</p>
                <p className="text-3xl font-bold text-primary-600">{annotations.length}</p>
              </div>
              <FileText className="w-12 h-12 text-primary-200 dark:text-primary-900" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">文章数</p>
                <p className="text-3xl font-bold text-blue-600">{Object.keys(annotationsByArticle).length}</p>
              </div>
              <Calendar className="w-12 h-12 text-blue-200 dark:text-blue-900" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">有笔记的高亮</p>
                <p className="text-3xl font-bold text-green-600">
                  {annotations.filter(a => a.noteContent).length}
                </p>
              </div>
              <Edit2 className="w-12 h-12 text-green-200 dark:text-green-900" />
            </div>
          </div>
        </div>

        {/* 工具栏 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow-md">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 搜索 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索笔记内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* 文章筛选 */}
            <select
              value={selectedArticle}
              onChange={(e) => setSelectedArticle(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">所有文章</option>
              {Object.keys(annotationsByArticle).map(articleId => (
                <option key={articleId} value={articleId}>
                  {articleId} ({annotationsByArticle[articleId].length})
                </option>
              ))}
            </select>

            {/* 导出按钮 */}
            <button
              onClick={exportAllNotes}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              disabled={annotations.length === 0}
            >
              <Download className="w-4 h-4" />
              导出全部
            </button>
          </div>
        </div>

        {/* 笔记列表 */}
        {filteredAnnotations.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <StickyNote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {searchQuery || selectedArticle !== 'all' ? '未找到相关笔记' : '暂无笔记'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchQuery || selectedArticle !== 'all' 
                ? '试试调整搜索条件或筛选器' 
                : '在阅读文章时选中文字即可创建笔记'}
            </p>
            <Link
              to="/blog"
              className="inline-block px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              去阅读文章
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAnnotations.map(anno => (
              <div
                key={anno.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                {/* 文章信息 */}
                <div className="mb-4">
                  <Link
                    to={`/blog/${anno.articleId}`}
                    className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    📄 {anno.articleId}
                  </Link>
                </div>

                {/* 高亮内容 */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">高亮内容</p>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-3 rounded">
                    <p className="text-gray-800 dark:text-gray-200">{anno.text}</p>
                  </div>
                </div>

                {/* 笔记内容 */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">我的笔记</p>
                  {editingId === anno.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                        placeholder="添加你的笔记..."
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={4}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(anno.id)}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                        >
                          保存
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
                        >
                          取消
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                      <p className="text-gray-700 dark:text-gray-300">
                        {anno.noteContent || <span className="text-gray-400 italic">暂无笔记</span>}
                      </p>
                    </div>
                  )}
                </div>

                {/* 操作按钮和时间 */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(anno.createdAt).toLocaleString('zh-CN')}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(anno.id, anno.noteContent || '')}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                      编辑
                    </button>
                    <button
                      onClick={() => handleDelete(anno.id)}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      删除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesManagement;
