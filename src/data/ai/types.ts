// 定义卡片项类型
export interface CardItem {
  id: string;
  title: string;
  description: string;
  author?: string;
  date?: string;
  image?: string;
  link?: string;
  category?: string;
  content?: string; // 添加详细内容字段，用于Markdown格式的新闻内容
  isFromBlog?: boolean; // 标记是否来自博客的文章
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