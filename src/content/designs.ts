interface Design {
  [x: string]: any;
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tools: string[];
  figmaUrl?: string;
  figmaPreviewUrl?: string;
  downloadUrl?: string;
  details: string;
  images?: string[];
}

export const designs: Design[] = [
  {
    id: 'modern-dashboard',
    title: '建筑消防虚拟仿真实验原型',
    description: '。',
    thumbnail: 'https://raw.githubusercontent.com/yy0691/img-bed/main/Blog/建筑消防-cover.png',
    tools: ['Figma', 'Auto Layout', 'Variables'],
    figmaUrl: 'https://www.figma.com/proto/3B15Htl7rxlXAVBXcekpQt/%E5%BB%BA%E7%AD%91%E6%B6%88%E9%98%B2-Wb%E6%BC%94%E7%A4%BA?embed_host=share&kind=proto&node-id=1-4&page-id=0%3A1&scaling=contain&show-proto-sidebar=1&starting-point-node-id=1%3A4&t=wtEqwu0jPr7KtmNf-1',
    details: 'xx',
    images: [
      'https://raw.githubusercontent.com/yy0691/img-bed/main/Blog/建筑消防-内容.png',
    ]
  },
  {
    id: 'mobile-app-ui',
    title: 'Blog网站原型设计',
    description: '完整的Web应用UI组件库，包含常用的界面元素和交互模式。',
    thumbnail: 'https://raw.githubusercontent.com/yy0691/img-bed/main/Blog/博客.png',
    tools: ['Figma', 'Variants', 'Interactive Components'],
    figmaUrl: 'https://www.figma.com/embed/proto/jBTXxDQYlaq7FL43zwUbD6/Blog-UI',
    downloadUrl: '/downloads/mobile-ui-kit.fig',
    details: 'xx',
    images: [
      'https://raw.githubusercontent.com/yy0691/img-bed/main/Blog/Blog-内容.png',
    ]
  },
  {
    id: 'design-system',
    title: '宣传方案架构图',
    description: '。',
    thumbnail: 'http://st75yeaid.hb-bkt.clouddn.com/%E6%9E%B6%E6%9E%84%E5%9B%BE.png',
    tools: ['Figma', 'Design System', 'Style Guide'],
    figmaUrl: 'https://www.figma.com/design/qEnbcsR0taCcIT5yg2GJMY/%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88?node-id=212-544&t=UHrCsrE5CNtlX6mR-1',
    downloadUrl: '/downloads/design-system.zip',
    details: 'xxx',
    images: [
      'https://raw.githubusercontent.com/yy0691/img-bed/main/Blog/建设方案-1.png',
      'https://raw.githubusercontent.com/yy0691/img-bed/main/Blog/建设方案-2.png',
    ]
  }
]