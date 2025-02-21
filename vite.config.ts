import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { mdxPlugin } from "./src/lib/mdx";
import { splitVendorChunkPlugin } from 'vite';

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
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-toast', '@radix-ui/react-dialog'],
          'mdx-vendor': ['@mdx-js/react', '@mdx-js/rollup']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: mode === 'development'
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
