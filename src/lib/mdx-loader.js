// 注释掉复杂的MDX加载器，直接使用react-markdown
// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import { bundleMDX } from 'mdx-bundler';
// import rehypeRaw from 'rehype-raw';
// import remarkGfm from 'remark-gfm';
// import rehypePrism from 'rehype-prism-plus';
// import { customRemarkPlugin } from './mdx-config';

// 添加缓存
// const contentCache = new Map();
// const MAX_CACHE_SIZE = 50; // 缓存最多50篇文章

// 注释掉复杂的MDX加载逻辑
// export async function getBlogPost(slug) {
//   // 检查缓存
//   if (contentCache.has(slug)) {
//     return contentCache.get(slug);
//   }

//   // 文件路径处理
//   const filePath = path.join(process.cwd(), 'src/content', `${slug}.mdx`);
//   
//   // 文件不存在则返回null
//   if (!fs.existsSync(filePath)) {
//     return null;
//   }
//   
//   const source = fs.readFileSync(filePath, 'utf8');
//   
//   try {
//     const { code, frontmatter } = await bundleMDX({
//       source,
//       mdxOptions(options) {
//         options.remarkPlugins = [
//           ...(options.remarkPlugins ?? []),
//           remarkGfm,
//           customRemarkPlugin
//         ];
//         options.rehypePlugins = [
//           ...(options.rehypePlugins ?? []),
//           rehypeRaw,
//           rehypePrism
//         ];
//         return options;
//       },
//     });
//     
//     // 处理frontmatter
//     const result = { code, frontmatter };
//     
//     // 管理缓存大小
//     if (contentCache.size >= MAX_CACHE_SIZE) {
//       const firstKey = contentCache.keys().next().value;
//       contentCache.delete(firstKey);
//     }
//     
//     // 添加到缓存
//     contentCache.set(slug, result);
//     
//     return result;
//   } catch (error) {
//     console.error(`Error processing MDX for ${slug}:`, error);
//     return null;
//   }
// }

// 简化的MDX加载器，直接返回原始内容
export async function getBlogPost(slug) {
  try {
    // 这里可以添加简单的文件读取逻辑
    // 或者直接返回null，让调用方使用react-markdown处理
    console.log(`简化MDX加载器: ${slug}`);
    return null;
  } catch (error) {
    console.error(`简化MDX加载器错误: ${slug}`, error);
    return null;
  }
} 