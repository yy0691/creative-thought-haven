import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { componentTagger } from "lovable-tagger";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { splitVendorChunkPlugin } from 'vite';

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
  providerImportSource: '@mdx-js/react'
} as import('@mdx-js/rollup').Options;

// 支持 .md 和 .mdx 文件
const mdxPlugin = () => mdx({
  ...mdxConfig,
  mdExtensions: ['.md']  // 添加 .md 扩展名支持
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
  server: {
    host: "::",
    port: 8080,
  },
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled', '@mui/material', '@mui/icons-material'],
    esbuildOptions: {
      jsx: 'automatic',
    }
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    cssMinify: true,
    cssCodeSplit: true,
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    commonjsOptions: {
      ignoreTryCatch: id => id !== 'stream'
    },
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('refractor')) {
            if (id.includes('/lang/')) {
              const langName = id.split('/lang/')[1].split('.')[0];
              return `syntax-lang-${langName}`;
            }
            return 'syntax-core';
          }
          
          if (id.includes('/src/content/')) {
            if (id.includes('/blog/')) {
              const postName = id.split('/blog/')[1].split('.')[0];
              return `blog-post-${postName}`;
            }
            return 'content-base';
          }
          
          if (id.includes('node_modules')) {
            if (id.includes('react-dom')) {
              if (id.includes('client')) return 'vendor-react-dom-client';
              if (id.includes('server')) return 'vendor-react-dom-server';
              return 'vendor-react-dom-core';
            }
            if (id.includes('react-router')) return 'vendor-react-router';
            if (id.includes('react-syntax-highlighter')) {
              if (id.includes('prism-light')) return 'vendor-syntax-light';
              if (id.includes('prism')) return 'vendor-syntax-prism';
              return 'vendor-syntax-core';
            }
            if (id.includes('@radix-ui')) {
              const componentPath = id.toString().split('@radix-ui/')[1];
              const componentName = componentPath.split('/')[0];
              return `vendor-radix-${componentName}`;
            }
            
            const packageName = id.toString().split('node_modules/')[1].split('/')[0];
            return `vendor-${packageName}`;
          }
          
          if (id.includes('/src/pages/')) {
            const pageName = id.toString().split('/pages/')[1].split('.')[0].split('/')[0];
            return `page-${pageName}`;
          }
          
          if (id.includes('/src/components/')) {
            const componentPath = id.toString().split('/components/')[1];
            if (componentPath) {
              const componentName = componentPath.split('/')[0].split('.')[0];
              return `component-${componentName}`;
            }
            return 'components-misc';
          }
          
          if (id.includes('/src/lib/')) {
            return 'lib';
          }
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
    },
    {
      name: 'vercel-env',
      transform(code: string, id: string) {
        if (id.endsWith('.ts') || id.endsWith('.tsx') || id.endsWith('.js')) {
          return {
            code: code.replace(/process\.env\.(\w+)/g, (_: string, prop: string) => {
              return `import.meta.env.${prop}`;
            }),
            map: null
          };
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@emotion/react": path.resolve(__dirname, "./node_modules/@emotion/react"),
      "@emotion/styled": path.resolve(__dirname, "./node_modules/@emotion/styled"),
    },
  },
}));
