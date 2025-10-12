import { useState } from 'react';
import { X, Edit2, Trash2, StickyNote, Download, FileText } from 'lucide-react';
import { Highlight } from '../hooks/useHighlights';
import { toast } from 'sonner';

interface NotesSidebarProps {
  highlights: Highlight[];
  onUpdateNote: (id: string, note: string) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
  articleTitle?: string;
}

export const NotesSidebar = ({ highlights, onUpdateNote, onDelete, onClose, articleTitle = '文章' }: NotesSidebarProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNote, setEditNote] = useState('');

  const handleEdit = (highlight: Highlight) => {
    setEditingId(highlight.id);
    setEditNote(highlight.note || '');
  };

  const handleSave = (id: string) => {
    onUpdateNote(id, editNote);
    setEditingId(null);
    setEditNote('');
  };

  // 导出笔记为Markdown
  const exportToMarkdown = () => {
    if (highlights.length === 0) {
      toast.error('暂无笔记可导出');
      return;
    }

    const markdown = generateMarkdown(highlights, articleTitle);
    
    // 创建Blob并下载
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${articleTitle}-笔记-${new Date().toLocaleDateString('zh-CN')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('笔记已导出为Markdown文件');
  };

  // 生成Markdown格式
  const generateMarkdown = (highlights: Highlight[], title: string) => {
    let markdown = `# ${title} - 笔记\n\n`;
    markdown += `> 导出时间：${new Date().toLocaleString('zh-CN')}\n\n`;
    markdown += `---\n\n`;
    
    highlights.forEach((highlight, index) => {
      markdown += `## 笔记 ${index + 1}\n\n`;
      markdown += `**高亮内容：**\n\n`;
      markdown += `> ${highlight.text}\n\n`;
      
      if (highlight.note) {
        markdown += `**我的笔记：**\n\n`;
        markdown += `${highlight.note}\n\n`;
      }
      
      markdown += `*创建时间：${new Date(highlight.createdAt).toLocaleString('zh-CN')}*\n\n`;
      markdown += `---\n\n`;
    });
    
    return markdown;
  };

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl z-40 overflow-y-auto">
      <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <StickyNote className="w-5 h-5 text-primary-600" />
            <h3 className="font-semibold">我的笔记</h3>
            <span className="text-xs text-gray-500">({highlights.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {highlights.length > 0 && (
          <button
            onClick={exportToMarkdown}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            导出为Markdown
          </button>
        )}
      </div>

      <div className="p-4 space-y-4">
        {highlights.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">暂无笔记和高亮</p>
        ) : (
          highlights.map(highlight => (
            <div
              key={highlight.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 space-y-2"
            >
              <div
                className="text-sm px-2 py-1 rounded"
                style={{ backgroundColor: highlight.color }}
              >
                "{highlight.text}"
              </div>

              {editingId === highlight.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                    placeholder="添加笔记..."
                    className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 resize-none"
                    rows={3}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(highlight.id)}
                      className="text-xs px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
                    >
                      保存
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      取消
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {highlight.note && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{highlight.note}</p>
                  )}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleEdit(highlight)}
                      className="text-xs text-gray-500 hover:text-primary-600 flex items-center gap-1 transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                      {highlight.note ? '编辑' : '添加笔记'}
                    </button>
                    <button
                      onClick={() => onDelete(highlight.id)}
                      className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      删除
                    </button>
                  </div>
                </>
              )}

              <div className="text-xs text-gray-400">
                {new Date(highlight.createdAt).toLocaleDateString('zh-CN')}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
