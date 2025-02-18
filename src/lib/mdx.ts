import { Plugin } from 'vite';
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import type { Options } from '@mdx-js/rollup';

export const mdxConfig: Options = {
  remarkPlugins: [
    remarkGfm,
    remarkFrontmatter,
    [remarkMdxFrontmatter, { name: 'metadata', exports: true }]
  ],
  rehypePlugins: [
    rehypeSlug,
    rehypeAutolinkHeadings
  ],
  providerImportSource: '@mdx-js/react'
};

export const mdxPlugin = () => mdx(mdxConfig) as Plugin;

export const configureMDX = () => {
  return defineConfig({
    plugins: [mdxPlugin()],
    optimizeDeps: {
      include: ['@mdx-js/react']
    }
  });
};