import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { splitVendorChunkPlugin } from 'vite';
import { defineConfig } from 'vite';

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
  providerImportSource: '@mdx-js/react'
} as import('@mdx-js/rollup').Options;

const mdxPlugin = () => mdx(mdxConfig);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    cssMinify: true,
    cssCodeSplit: true,
    outDir: 'dist',
    chunkSizeWarningLimit: 400,
    sourcemap: mode === 'development',
    commonjsOptions: {
      ignoreTryCatch: id => id !== 'stream'
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // 分割React相关库
          'react-vendor': ['react', 'react-dom'],
          // 分割路由相关库
          'router-vendor': ['react-router-dom', 'react-router'],
          // 将语法高亮库分成多个块
          'highlight-core': ['react-syntax-highlighter/dist/esm/styles/prism'],
          'highlight-langs': ['refractor/lang/javascript', 'refractor/lang/typescript', 'refractor/lang/jsx', 'refractor/lang/css'],
          // UI组件库
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    }
  },
  plugins: [
    mdxPlugin(),
    react(),
    mode === 'development' &&
    componentTagger(),
    {
      name: 'image-loader',
      enforce: 'pre' as 'pre',
      load(id: string) {
        if (/\.(png|jpe?g|gif|svg)$/.test(id)) {
          return `export default ${JSON.stringify(id)}`;
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
