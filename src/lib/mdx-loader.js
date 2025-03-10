import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import { customRemarkPlugin } from './mdx-config';

// 添加缓存
const contentCache = new Map();
const MAX_CACHE_SIZE = 50; // 缓存最多50篇文章

export async function getBlogPost(slug) {
  // 检查缓存
  if (contentCache.has(slug)) {
    return contentCache.get(slug);
  }

  // 文件路径处理
  const filePath = path.join(process.cwd(), 'src/content', `${slug}.mdx`);
  
  // 文件不存在则返回null
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const source = fs.readFileSync(filePath, 'utf8');
  
  try {
    const { code, frontmatter } = await bundleMDX({
      source,
      mdxOptions(options) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          remarkGfm,
          customRemarkPlugin
        ];
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          rehypeRaw,
          rehypePrism
        ];
        return options;
      },
    });
    
    // 处理frontmatter
    const result = { code, frontmatter };
    
    // 管理缓存大小
    if (contentCache.size >= MAX_CACHE_SIZE) {
      const firstKey = contentCache.keys().next().value;
      contentCache.delete(firstKey);
    }
    
    // 添加到缓存
    contentCache.set(slug, result);
    
    return result;
  } catch (error) {
    console.error(`Error processing MDX for ${slug}:`, error);
    return null;
  }
} 