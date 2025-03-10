import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm],
    }),
    react()
  ],
  build: {
    // 开启代码分割
    cssCodeSplit: true,
    // 设置打包代码大小警告阈值
    chunkSizeWarningLimit: 1000,
    // 启用压缩
    minify: 'terser',
    // 添加terser选项
    terserOptions: {
      compress: {
        drop_console: true,  // 删除console
        drop_debugger: true  // 删除debugger
      }
    },
    // 开启rollup优化
    rollupOptions: {
      output: {
        // 静态资源分类打包
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        // 拆分vendor包
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['./src/components/ui'],
          'katex': ['katex']
        }
      }
    }
  },
  // 配置CDN地址（如有）
  server: {
    hmr: true  // 热更新
  }
}); 