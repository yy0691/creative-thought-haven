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
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react-core': ['react', 'react-dom'],
          'vendor-react-router': ['react-router-dom'],
          'vendor-ui-core': ['@radix-ui/react-dropdown-menu', '@radix-ui/react-tooltip'],
          'vendor-ui-icons': ['lucide-react'],
          'vendor-markdown': ['remark-gfm', 'rehype-slug', 'rehype-autolink-headings'],
          'vendor-utils': ['date-fns', 'clsx', 'class-variance-authority'],
          'vendor-animations': ['framer-motion', 'tailwindcss-animate'],
        }
      }
    },
    chunkSizeWarningLimit: 1500,
    sourcemap: mode === 'development',
    commonjsOptions: {
      ignoreTryCatch: id => id !== 'stream'
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
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
