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
    chunkSizeWarningLimit: 200,
    sourcemap: false,
    commonjsOptions: {
      ignoreTryCatch: id => id !== 'stream'
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom')) {
              if (id.includes('client')) return 'vendor-react-dom-client';
              if (id.includes('server')) return 'vendor-react-dom-server';
              return 'vendor-react-dom-core';
            }
            if (id.includes('react-router')) return 'vendor-react-router';
            if (id.includes('react-syntax-highlighter')) return 'vendor-syntax-highlighter';
            if (id.includes('@radix-ui')) return 'vendor-radix-ui';
            if (id.includes('sonner')) return 'vendor-sonner';
            if (id.includes('tailwind-merge')) return 'vendor-tailwind-merge';
            if (id.includes('@tanstack')) return 'vendor-tanstack';
            if (id.includes('react-helmet')) return 'vendor-react-helmet';
            
            const packageName = id.toString().split('node_modules/')[1].split('/')[0];
            return `vendor-${packageName}`;
          }
          
          if (id.includes('/src/pages/')) {
            const pageName = id.toString().split('/pages/')[1].split('.')[0].split('/')[0];
            return `page-${pageName}`;
          }
          
          if (id.includes('/src/components/')) {
            return 'components';
          }
          
          if (id.includes('/src/lib/')) {
            return 'lib';
          }
          
          if (id.includes('/src/content/')) {
            return 'content';
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
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
