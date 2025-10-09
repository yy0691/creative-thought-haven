// 定义卡片项类型
export interface CardItem {
  id: string;
  title: string;
  description: string;
  author?: string;
  date?: string;
  image?: string;
  link?: string;
  url?: string; // 兼容使用url字段而非link
  category?: string;
  categories?: string[]; // 支持多分类
  summary?: string; // 简短摘要
  tags?: string[]; // 标签数组
  content?: string; // 添加详细内容字段，用于Markdown格式的新闻内容
  isFromBlog?: boolean; // 标记是否来自博客的文章
  title_zh?: string; // 中文标题
  summary_zh?: string; // 中文摘要
  key_points?: string[]; // 关键要点
}

// 定义标签页类型
export interface TabItem {
  id: string;
  label: string;
  icon: string; // 图标名称,对应lucide-react库中的图标名
  category?: string;
}

// 定义新闻API接口响应类型
export interface NewsApiResponse {
  output: {
    allnum: number;
    curpage: number;
    newslist: {
      ctime: string;
      description: string;
      id: string;
      picUrl: string;
      source: string;
      title: string;
      url: string;
    }[];
  }
} 