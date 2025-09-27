import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mdxConfig = {
  remarkPlugins: [
    remarkGfm,
    remarkFrontmatter,
    [remarkMdxFrontmatter, { name: 'metadata', exports: true }]
  ],
  rehypePlugins: [
    rehypeSlug,
    rehypeAutolinkHeadings
  ],
  providerImportSource: '@mdx-js/react',
  // 允许HTML标签渲染
  format: 'mdx'
} as import('@mdx-js/rollup').Options;

// 支持 .mdx 文件
const mdxPlugin = () => mdx({
  ...mdxConfig,
  include: /\.mdx$/,  // 只支持 .mdx 文件
});

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui': ['@radix-ui/react-slot', 'lucide-react'],
          'markdown': ['marked', 'gray-matter'],
        }
      }
    }
  },
  plugins: [
    mdxPlugin(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});