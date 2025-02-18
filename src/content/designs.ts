interface Design {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tools: string[];
  figmaUrl?: string;
  figmaPreviewUrl?: string;
  downloadUrl?: string;
  details: string;
}

export const designs: Design[] = [
  {
    id: 'modern-dashboard',
    title: '建筑消防虚拟仿真实验',
    description: '一套清新现代的数据可视化仪表盘UI设计，注重信息层级和用户体验。',
    thumbnail: 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/3B15Htl7rxlXAVBXcekpQt/%E5%BB%BA%E7%AD%91%E6%B6%88%E9%98%B2-Wb%E6%BC%94%E7%A4%BA?embed_host=share&kind=proto&node-id=1-4&page-id=0%3A1&scaling=contain&show-proto-sidebar=1&starting-point-node-id=1%3A4&t=wtEqwu0jPr7KtmNf-1',
    tools: ['Figma', 'Auto Layout', 'Variables'],
    figmaUrl: 'https://www.figma.com/proto/3B15Htl7rxlXAVBXcekpQt/%E5%BB%BA%E7%AD%91%E6%B6%88%E9%98%B2-Wb%E6%BC%94%E7%A4%BA?embed_host=share&kind=proto&node-id=1-4&page-id=0%3A1&scaling=contain&show-proto-sidebar=1&starting-point-node-id=1%3A4&t=wtEqwu0jPr7KtmNf-1',
    details: '# 现代化仪表盘设计\n\n专注于数据可视化的现代UI设计，采用清晰的信息层级和直观的交互方式。\n\n## 设计特点\n\n- 清晰的信息层级\n- 模块化组件设计\n- 响应式布局\n- 主题定制支持'
  },
  {
    id: 'mobile-app-ui',
    title: 'Web应用UI设计',
    description: '完整的Web应用UI组件库，包含常用的界面元素和交互模式。',
    thumbnail: 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/jBTXxDQYlaq7FL43zwUbD6/Blog-UI?node-id=4-145&p=f&t=qAtwcmfTMlARiPS4-0&scaling=min-zoom&content-scaling=fixed&page-id=4%3A144&starting-point-node-id=4%3A145',
    tools: ['Figma', 'Variants', 'Interactive Components'],
    figmaUrl: 'https://www.figma.com/embed/proto/jBTXxDQYlaq7FL43zwUbD6/Blog-UI',
    downloadUrl: '/downloads/mobile-ui-kit.fig',
    details: '# 移动应用UI套件\n\n一套完整的移动应用设计系统，提供丰富的UI组件和交互模式。\n\n## 包含内容\n\n- 基础UI组件\n- 常用页面模板\n- 交互原型\n- 设计规范'
  },
  {
    id: 'design-system',
    title: 'XXX实验原型图',
    description: '统一的企业级设计系统，包含完整的组件库、图标集和设计规范。',
    thumbnail: 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/egxOwxzHBaxpJ8N3MzRz5e/%E8%AE%BE%E8%AE%A1%E5%B8%88%E4%BD%9C%E5%93%81%E9%9B%86%E6%A8%A1%E7%89%88%E3%80%8C%E8%91%AD%E8%8E%A9%E7%81%B0%E3%80%8D-(Community)?node-id=11-6&t=SDHT5mBJE4xKQcSL-1',
    tools: ['Figma', 'Design System', 'Style Guide'],
    figmaUrl: 'https://www.figma.com/embed/design/egxOwxzHBaxpJ8N3MzRz5e',
    downloadUrl: '/downloads/design-system.zip',
    details: '# 企业级设计系统\n\n为企业应用打造的完整设计系统，确保设计的一致性和开发效率。\n\n## 系统组成\n\n- 设计原则\n- 组件库\n- 图标系统\n- 样式指南'
  }
]