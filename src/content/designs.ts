interface Design {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tools: string[];
  figmaUrl?: string;
  downloadUrl?: string;
  details: string;
}

export const designs: Design[] = [
  {
    id: 'modern-dashboard',
    title: '现代化仪表盘设计',
    description: '一套清新现代的数据可视化仪表盘UI设计，注重信息层级和用户体验。',
    thumbnail: '/placeholder.svg',
    tools: ['Figma', 'Auto Layout', 'Variables'],
    figmaUrl: 'https://figma.com/file/xxx/dashboard',
    details: '# 现代化仪表盘设计\n\n专注于数据可视化的现代UI设计，采用清晰的信息层级和直观的交互方式。\n\n## 设计特点\n\n- 清晰的信息层级\n- 模块化组件设计\n- 响应式布局\n- 主题定制支持'
  },
  {
    id: 'mobile-app-ui',
    title: '移动应用UI套件',
    description: '完整的移动应用UI组件库，包含常用的界面元素和交互模式。',
    thumbnail: '/placeholder.svg',
    tools: ['Figma', 'Variants', 'Interactive Components'],
    figmaUrl: 'https://figma.com/file/xxx/mobile-ui-kit',
    downloadUrl: '/downloads/mobile-ui-kit.fig',
    details: '# 移动应用UI套件\n\n一套完整的移动应用设计系统，提供丰富的UI组件和交互模式。\n\n## 包含内容\n\n- 基础UI组件\n- 常用页面模板\n- 交互原型\n- 设计规范'
  },
  {
    id: 'design-system',
    title: '企业级设计系统',
    description: '统一的企业级设计系统，包含完整的组件库、图标集和设计规范。',
    thumbnail: '/placeholder.svg',
    tools: ['Figma', 'Design System', 'Style Guide'],
    figmaUrl: 'https://figma.com/file/xxx/design-system',
    downloadUrl: '/downloads/design-system.zip',
    details: '# 企业级设计系统\n\n为企业应用打造的完整设计系统，确保设计的一致性和开发效率。\n\n## 系统组成\n\n- 设计原则\n- 组件库\n- 图标系统\n- 样式指南'
  }
];