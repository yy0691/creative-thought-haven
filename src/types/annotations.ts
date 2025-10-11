// 定义笔记和高亮的类型
export interface Annotation {
  id: string;
  articleId: string;
  text: string;
  startOffset: number;
  endOffset: number;
  type: 'highlight' | 'note';
  noteContent?: string;
  createdAt: string;
}
