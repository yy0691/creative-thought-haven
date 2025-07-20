// 注释掉复杂的unified配置，直接使用react-markdown
// import { unified } from 'unified';
// import remarkParse from 'remark-parse';
// import remarkGfm from 'remark-gfm';
// import remarkMath from 'remark-math';
// import remarkRehype from 'remark-rehype';
// import rehypeStringify from 'rehype-stringify';
// import rehypeKatex from 'rehype-katex';
// import rehypeSlug from 'rehype-slug';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// import remarkToc from 'remark-toc';

// 注释掉统一的MDX处理器
// export const createMdxProcessor = () => {
//   return unified()
//     .use(remarkParse)
//     .use(remarkGfm) // 支持表格、脚注等GitHub风格Markdown
//     .use(remarkMath) // 支持数学公式
//     .use(remarkToc, { tight: true, ordered: false }) // 自动生成目录
//     .use(remarkRehype, { allowDangerousHtml: true }) // 转换为HTML，保留原始HTML
//     .use(rehypeKatex) // 渲染数学公式
//     .use(rehypeSlug) // 为标题添加ID
//     .use(rehypeAutolinkHeadings) // 为标题添加链接
//     .use(rehypeStringify, { allowDangerousHtml: true }); // 输出HTML
// };

// 注释掉复杂的MDX格式修复
// export const fixMdxContent = (content) => {
//   // 1. 确保标题前后有空行
//   let fixed = content.replace(/([^\n])(#{1,6}\s)/g, '$1\n\n$2');
//   fixed = fixed.replace(/(#{1,6}[^\n]+)(\n[^#\n])/g, '$1\n\n$2');
//   
//   // 2. 修复列表项格式
//   fixed = fixed.replace(/([^\n])(\n[*-]\s)/g, '$1\n\n$2');
//   
//   // 3. 确保段落之间有足够空行
//   fixed = fixed.replace(/(\w+[.!?])\n([A-Z])/g, '$1\n\n$2');
//   
//   // 4. 修复内联样式（保留原有功能）
//   fixed = fixInlineStyles(fixed);
//   
//   return fixed;
// };

// 注释掉内联样式修复
// function fixInlineStyles(content) {
//   // 修复 style="property: value" 为 style={{property: value}}
//   return content.replace(/<(\w+)\s+style="([^"]+)"/g, (match, tag, styleString) => {
//     // 解析样式字符串
//     const styleProperties = styleString.split(';').filter(prop => prop.trim());
//     const styleObject = {};
//     
//     styleProperties.forEach(prop => {
//       const [key, value] = prop.split(':').map(s => s.trim());
//       if (key && value) {
//         const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
//         styleObject[camelKey] = value;
//       }
//     });
//     
//     const styleObjectString = Object.entries(styleObject)
//       .map(([k, v]) => `"${k}": "${v}"`)
//       .join(', ');
//     
//     return `<${tag} style={{${styleObjectString}}}`;
//   });
// }

// 简化的导出，直接返回原始内容
export const createMdxProcessor = () => {
  return {
    process: async (content) => ({ toString: () => content })
  };
};

export const fixMdxContent = (content) => {
  // 直接返回原始内容，让react-markdown处理
  return content;
}; 