import remarkGfm from 'remark-gfm';
// import rehypeRaw from 'rehype-raw';
// import rehypeStringify from 'rehype-stringify';
// import remarkParse from 'remark-parse';
// import remarkRehype from 'remark-rehype';

// 注释掉自定义处理器，用于处理 < 和 > 符号
// const customRemarkPlugin = () => {
//   return (tree) => {
//     // 这个函数遍历Markdown抽象语法树
//     // 并将表格中的 < 和 > 符号替换为 &lt; 和 &gt;
//     const visit = (node) => {
//       if (node.type === 'table') {
//         // 处理表格内容
//         node.children.forEach(row => {
//           row.children.forEach(cell => {
//             if (cell.children && cell.children.length > 0) {
//               cell.children.forEach(textNode => {
//                 if (textNode.type === 'text' && textNode.value) {
//                   // 在不影响代码块和特殊语法的情况下替换尖括号
//                   textNode.value = textNode.value
//                     .replace(/</g, '&lt;')
//                     .replace(/>/g, '&gt;');
//                 }
//               });
//             }
//           });
//         });
//       }
//       
//       // 递归处理所有子节点
//       if (node.children) {
//         node.children.forEach(visit);
//       }
//     };
//     
//     visit(tree);
//   };
// };

// 简化的MDX配置，直接使用react-markdown
export const mdxOptions = {
  remarkPlugins: [
    remarkGfm,  // 支持GitHub风格的Markdown
    // customRemarkPlugin, // 注释掉自定义处理器
  ],
  // rehypePlugins: [
  //   rehypeRaw,  // 允许在MDX中使用HTML
  //   [rehypeStringify, { allowDangerousHtml: true }]
  // ],
  providerImportSource: "@mdx-js/react",
}; 