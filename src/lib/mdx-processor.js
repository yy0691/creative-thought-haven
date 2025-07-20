// 注释掉复杂的自定义MDX处理逻辑，直接使用react-markdown
// import { unified } from 'unified';
// import remarkParse from 'remark-parse';
// import remarkRehype from 'remark-rehype';
// import rehypeStringify from 'rehype-stringify';
// import remarkGfm from 'remark-gfm';
// import rehypeRaw from 'rehype-raw';
// import fs from 'fs';
// import { bundleMDX } from '@mdx-js/mdx';
// import { fixMdxStyles } from './mdx-style-fixer';

// 注释掉自定义插件：处理HTML标签中的style属性问题
// const styleAttributeFixer = () => {
//   return (tree) => {
//     const visit = (node) => {
//       // 处理HTML节点的style属性
//       if (node.type === 'element' && node.properties && node.properties.style) {
//         if (typeof node.properties.style === 'string') {
//           // 避免在预处理阶段删除style属性，只标记为已经检查过
//           node.properties.dataCheckedStyle = node.properties.style;
//         }
//       }
//       
//       // 处理表格内容
//       if (node.type === 'table') {
//         node.children.forEach(row => {
//           row.children.forEach(cell => {
//             if (cell.children && cell.children.length > 0) {
//               cell.children.forEach(textNode => {
//                 if (textNode.type === 'text' && textNode.value) {
//                   // 转义HTML标签中的尖括号，以防止渲染错误
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

// 注释掉复杂的预处理函数，直接使用react-markdown
// export async function preprocessMDX(content) {
//   try {
//     // 修复列表项格式
//     let fixedContent = content;
//     
//     // 修复连续的无序列表项（有空行），使其成为单个列表
//     fixedContent = fixedContent.replace(/^-\s+(.+?)$\s+^-\s+/gm, '- $1\n- ');
//     
//     // 确保列表项后有足够的空行，除非下一行也是列表项
//     fixedContent = fixedContent.replace(/^(- .+)$(?!\n- )/gm, '$1\n');
//     
//     // 处理带括号和链接的复杂列表项
//     fixedContent = fixedContent.replace(/^-\s+\[(.+?)\]\((.+?)\)(.+?)$/gm, 
//                                       '- [$1]($2)$3');
//     
//     const result = await unified()
//       .use(remarkParse)
//       .use(remarkGfm)
//       .use(remarkRehype, { allowDangerousHtml: true })
//       .use(rehypeRaw)
//       .use(styleAttributeFixer)
//       .use(rehypeStringify)
//       .process(fixedContent);
//     
//     return String(result);
//   } catch (error) {
//     console.error('MDX预处理错误:', error);
//     return content; // 如果处理失败，返回原始内容
//   }
// }

// 简化的导出，直接返回原始内容
export async function preprocessMDX(content) {
  // 直接返回原始内容，让react-markdown处理
  return content;
}

// 注释掉复杂的MDX处理逻辑
// export async function getBlogPost(slug) {
//   // ... 现有代码 ...
//   
//   const source = fs.readFileSync(filePath, 'utf8');
//   const preprocessedSource = await preprocessMDX(source);
//   
//   try {
//     const { code, frontmatter } = await bundleMDX({
//       source: preprocessedSource,
//       // ... 其他配置 ...
//     });
//     
//     return {
//       code,
//       frontmatter
//     };
//   } catch (error) {
//     console.error(`处理MDX文件时出错 (${slug}):`, error);
//     throw error; // 或者返回一个默认值
//   }
// }

// 注释掉复杂的文件处理函数
// async function processMdxFile(filePath) {
//   try {
//     // 读取文件内容
//     const source = await fs.promises.readFile(filePath, 'utf8');
//     
//     // 应用样式修复
//     const fixedSource = fixMdxStyles(source);
//     
//     // 继续正常处理
//     const { code, frontmatter } = await bundleMDX({
//       source: fixedSource,
//       // 其他配置...
//     });
//     
//     return { code, frontmatter };
//   } catch (error) {
//     console.error(`处理MDX文件时出错 (${filePath}):`, error);
//     throw error;
//   }
// } 