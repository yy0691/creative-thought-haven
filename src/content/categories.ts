// 定义博客文章的分类结构
export interface Category {
  id: string;
  name: string;
  description: string;
  subcategories?: Category[];
}

// 博客文章分类配置
export const categories: Category[] = [
  {
    id: 'llm',
    name: '大语言模型',
    description: '大语言模型学习笔记和研究',
    subcategories: [
      {
        id: 'basics',
        name: '基础知识',
        description: '大语言模型基础概念和原理'
      },
      {
        id: 'applications',
        name: '应用实践',
        description: '大语言模型实际应用案例'
      }
    ]
  },
  {
    id: 'windows',
    name: 'Windows教程',
    description: 'Windows系统使用教程',
    subcategories: [
      {
        id: 'basics',
        name: '基础使用',
        description: 'Windows系统基础使用指南'
      },
      {
        id: 'advanced',
        name: '高级技巧',
        description: 'Windows系统高级使用技巧'
      }
    ]
  },
  {
    id: 'software',
    name: '软件工具',
    description: '软件和工具推荐',
    subcategories: [
      {
        id: 'productivity',
        name: '效率工具',
        description: '提升工作效率的软件工具'
      },
      {
        id: 'development',
        name: '开发工具',
        description: '开发相关的软件工具'
      }
    ]
  },
  {
    id: 'automation',
    name: '自动化办公',
    description: '自动化办公技巧和工具',
    subcategories: [
      {
        id: 'office',
        name: 'Office自动化',
        description: 'Office套件自动化方案'
      },
      {
        id: 'workflow',
        name: '工作流自动化',
        description: '工作流程自动化方案'
      }
    ]
  },
  {
    id: 'study',
    name: '学习笔记',
    description: '各类学习笔记和总结',
    subcategories: [
      {
        id: 'tech',
        name: '技术学习',
        description: '技术相关的学习笔记'
      },
      {
        id: 'general',
        name: '通用学习',
        description: '通用知识学习笔记'
      }
    ]
  },
  {
    id: 'reading',
    name: '阅读笔记',
    description: '读书笔记和心得',
    subcategories: [
      {
        id: 'tech',
        name: '技术书籍',
        description: '技术类书籍阅读笔记'
      },
      {
        id: 'general',
        name: '通用书籍',
        description: '通用类书籍阅读笔记'
      }
    ]
  }
];