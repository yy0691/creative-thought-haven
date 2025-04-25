// vite.config.ts
import { defineConfig } from "file:///F:/Blog2025/creative-thought-haven/node_modules/vite/dist/node/index.js";
import react from "file:///F:/Blog2025/creative-thought-haven/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { componentTagger } from "file:///F:/Blog2025/creative-thought-haven/node_modules/lovable-tagger/dist/index.js";
import mdx from "file:///F:/Blog2025/creative-thought-haven/node_modules/@mdx-js/rollup/index.js";
import remarkGfm from "file:///F:/Blog2025/creative-thought-haven/node_modules/remark-gfm/index.js";
import remarkFrontmatter from "file:///F:/Blog2025/creative-thought-haven/node_modules/remark-frontmatter/index.js";
import remarkMdxFrontmatter from "file:///F:/Blog2025/creative-thought-haven/node_modules/remark-mdx-frontmatter/dist/remark-mdx-frontmatter.js";
import rehypeSlug from "file:///F:/Blog2025/creative-thought-haven/node_modules/rehype-slug/index.js";
import rehypeAutolinkHeadings from "file:///F:/Blog2025/creative-thought-haven/node_modules/rehype-autolink-headings/index.js";
var __vite_injected_original_import_meta_url = "file:///F:/Blog2025/creative-thought-haven/vite.config.ts";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = dirname(__filename);
var mdxConfig = {
  remarkPlugins: [
    remarkGfm,
    remarkFrontmatter,
    [remarkMdxFrontmatter, { name: "metadata", exports: true }]
  ],
  rehypePlugins: [
    rehypeSlug,
    rehypeAutolinkHeadings
  ],
  providerImportSource: "@mdx-js/react"
};
var mdxPlugin = () => mdx(mdxConfig);
var vite_config_default = defineConfig(({ mode }) => ({
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif"],
  server: {
    host: "::",
    port: 8080
  },
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled", "@mui/material", "@mui/icons-material"],
    esbuildOptions: {
      jsx: "automatic"
    }
  },
  build: {
    target: "es2015",
    minify: "terser",
    cssMinify: true,
    cssCodeSplit: true,
    outDir: "dist",
    chunkSizeWarningLimit: 1e3,
    sourcemap: false,
    commonjsOptions: {
      ignoreTryCatch: (id) => id !== "stream"
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
          if (id.includes("refractor")) {
            if (id.includes("/lang/")) {
              const langName = id.split("/lang/")[1].split(".")[0];
              return `syntax-lang-${langName}`;
            }
            return "syntax-core";
          }
          if (id.includes("/src/content/")) {
            if (id.includes("/blog/")) {
              const postName = id.split("/blog/")[1].split(".")[0];
              return `blog-post-${postName}`;
            }
            return "content-base";
          }
          if (id.includes("node_modules")) {
            if (id.includes("react-dom")) {
              if (id.includes("client")) return "vendor-react-dom-client";
              if (id.includes("server")) return "vendor-react-dom-server";
              return "vendor-react-dom-core";
            }
            if (id.includes("react-router")) return "vendor-react-router";
            if (id.includes("react-syntax-highlighter")) {
              if (id.includes("prism-light")) return "vendor-syntax-light";
              if (id.includes("prism")) return "vendor-syntax-prism";
              return "vendor-syntax-core";
            }
            if (id.includes("@radix-ui")) {
              const componentPath = id.toString().split("@radix-ui/")[1];
              const componentName = componentPath.split("/")[0];
              return `vendor-radix-${componentName}`;
            }
            const packageName = id.toString().split("node_modules/")[1].split("/")[0];
            return `vendor-${packageName}`;
          }
          if (id.includes("/src/pages/")) {
            const pageName = id.toString().split("/pages/")[1].split(".")[0].split("/")[0];
            return `page-${pageName}`;
          }
          if (id.includes("/src/components/")) {
            const componentPath = id.toString().split("/components/")[1];
            if (componentPath) {
              const componentName = componentPath.split("/")[0].split(".")[0];
              return `component-${componentName}`;
            }
            return "components-misc";
          }
          if (id.includes("/src/lib/")) {
            return "lib";
          }
        }
      }
    }
  },
  plugins: [
    mdxPlugin(),
    react(),
    mode === "development" && componentTagger(),
    {
      name: "image-loader",
      enforce: "pre",
      load(id) {
        if (/\.(png|jpe?g|gif|svg)$/.test(id)) {
          return `export default ${JSON.stringify(id)}`;
        }
      }
    },
    {
      name: "vercel-env",
      transform(code, id) {
        if (id.endsWith(".ts") || id.endsWith(".tsx") || id.endsWith(".js")) {
          return {
            code: code.replace(/process\.env\.(\w+)/g, (_, prop) => {
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
      "@emotion/styled": path.resolve(__dirname, "./node_modules/@emotion/styled")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxCbG9nMjAyNVxcXFxjcmVhdGl2ZS10aG91Z2h0LWhhdmVuXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxCbG9nMjAyNVxcXFxjcmVhdGl2ZS10aG91Z2h0LWhhdmVuXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9CbG9nMjAyNS9jcmVhdGl2ZS10aG91Z2h0LWhhdmVuL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCc7XHJcbmltcG9ydCB7IGRpcm5hbWUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XHJcbmltcG9ydCBtZHggZnJvbSBcIkBtZHgtanMvcm9sbHVwXCI7XHJcbmltcG9ydCByZW1hcmtHZm0gZnJvbSBcInJlbWFyay1nZm1cIjtcclxuaW1wb3J0IHJlbWFya0Zyb250bWF0dGVyIGZyb20gXCJyZW1hcmstZnJvbnRtYXR0ZXJcIjtcclxuaW1wb3J0IHJlbWFya01keEZyb250bWF0dGVyIGZyb20gXCJyZW1hcmstbWR4LWZyb250bWF0dGVyXCI7XHJcbmltcG9ydCByZWh5cGVTbHVnIGZyb20gXCJyZWh5cGUtc2x1Z1wiO1xyXG5pbXBvcnQgcmVoeXBlQXV0b2xpbmtIZWFkaW5ncyBmcm9tIFwicmVoeXBlLWF1dG9saW5rLWhlYWRpbmdzXCI7XHJcbmltcG9ydCB7IHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4gfSBmcm9tICd2aXRlJztcclxuXHJcbmNvbnN0IF9fZmlsZW5hbWUgPSBmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCk7XHJcbmNvbnN0IF9fZGlybmFtZSA9IGRpcm5hbWUoX19maWxlbmFtZSk7XHJcblxyXG5jb25zdCBtZHhDb25maWcgPSB7XHJcbiAgcmVtYXJrUGx1Z2luczogW1xyXG4gICAgcmVtYXJrR2ZtLFxyXG4gICAgcmVtYXJrRnJvbnRtYXR0ZXIsXHJcbiAgICBbcmVtYXJrTWR4RnJvbnRtYXR0ZXIsIHsgbmFtZTogJ21ldGFkYXRhJywgZXhwb3J0czogdHJ1ZSB9XVxyXG4gIF0sXHJcbiAgcmVoeXBlUGx1Z2luczogW1xyXG4gICAgcmVoeXBlU2x1ZyxcclxuICAgIHJlaHlwZUF1dG9saW5rSGVhZGluZ3NcclxuICBdLFxyXG4gIHByb3ZpZGVySW1wb3J0U291cmNlOiAnQG1keC1qcy9yZWFjdCdcclxufSBhcyBpbXBvcnQoJ0BtZHgtanMvcm9sbHVwJykuT3B0aW9ucztcclxuXHJcbmNvbnN0IG1keFBsdWdpbiA9ICgpID0+IG1keChtZHhDb25maWcpO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcclxuICBhc3NldHNJbmNsdWRlOiBbJyoqLyoucG5nJywgJyoqLyouanBnJywgJyoqLyouanBlZycsICcqKi8qLmdpZiddLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogXCI6OlwiLFxyXG4gICAgcG9ydDogODA4MCxcclxuICB9LFxyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgaW5jbHVkZTogWydAZW1vdGlvbi9yZWFjdCcsICdAZW1vdGlvbi9zdHlsZWQnLCAnQG11aS9tYXRlcmlhbCcsICdAbXVpL2ljb25zLW1hdGVyaWFsJ10sXHJcbiAgICBlc2J1aWxkT3B0aW9uczoge1xyXG4gICAgICBqc3g6ICdhdXRvbWF0aWMnLFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIHRhcmdldDogJ2VzMjAxNScsXHJcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxyXG4gICAgY3NzTWluaWZ5OiB0cnVlLFxyXG4gICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxyXG4gICAgb3V0RGlyOiAnZGlzdCcsXHJcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAsXHJcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxyXG4gICAgY29tbW9uanNPcHRpb25zOiB7XHJcbiAgICAgIGlnbm9yZVRyeUNhdGNoOiBpZCA9PiBpZCAhPT0gJ3N0cmVhbSdcclxuICAgIH0sXHJcbiAgICB0ZXJzZXJPcHRpb25zOiB7XHJcbiAgICAgIGNvbXByZXNzOiB7XHJcbiAgICAgICAgZHJvcF9jb25zb2xlOiBmYWxzZSxcclxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdyZWZyYWN0b3InKSkge1xyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJy9sYW5nLycpKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgbGFuZ05hbWUgPSBpZC5zcGxpdCgnL2xhbmcvJylbMV0uc3BsaXQoJy4nKVswXTtcclxuICAgICAgICAgICAgICByZXR1cm4gYHN5bnRheC1sYW5nLSR7bGFuZ05hbWV9YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJ3N5bnRheC1jb3JlJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCcvc3JjL2NvbnRlbnQvJykpIHtcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCcvYmxvZy8nKSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHBvc3ROYW1lID0gaWQuc3BsaXQoJy9ibG9nLycpWzFdLnNwbGl0KCcuJylbMF07XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGBibG9nLXBvc3QtJHtwb3N0TmFtZX1gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAnY29udGVudC1iYXNlJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3JlYWN0LWRvbScpKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdjbGllbnQnKSkgcmV0dXJuICd2ZW5kb3ItcmVhY3QtZG9tLWNsaWVudCc7XHJcbiAgICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdzZXJ2ZXInKSkgcmV0dXJuICd2ZW5kb3ItcmVhY3QtZG9tLXNlcnZlcic7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3ItcmVhY3QtZG9tLWNvcmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygncmVhY3Qtcm91dGVyJykpIHJldHVybiAndmVuZG9yLXJlYWN0LXJvdXRlcic7XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygncmVhY3Qtc3ludGF4LWhpZ2hsaWdodGVyJykpIHtcclxuICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3ByaXNtLWxpZ2h0JykpIHJldHVybiAndmVuZG9yLXN5bnRheC1saWdodCc7XHJcbiAgICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdwcmlzbScpKSByZXR1cm4gJ3ZlbmRvci1zeW50YXgtcHJpc20nO1xyXG4gICAgICAgICAgICAgIHJldHVybiAndmVuZG9yLXN5bnRheC1jb3JlJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ0ByYWRpeC11aScpKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50UGF0aCA9IGlkLnRvU3RyaW5nKCkuc3BsaXQoJ0ByYWRpeC11aS8nKVsxXTtcclxuICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnROYW1lID0gY29tcG9uZW50UGF0aC5zcGxpdCgnLycpWzBdO1xyXG4gICAgICAgICAgICAgIHJldHVybiBgdmVuZG9yLXJhZGl4LSR7Y29tcG9uZW50TmFtZX1gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBwYWNrYWdlTmFtZSA9IGlkLnRvU3RyaW5nKCkuc3BsaXQoJ25vZGVfbW9kdWxlcy8nKVsxXS5zcGxpdCgnLycpWzBdO1xyXG4gICAgICAgICAgICByZXR1cm4gYHZlbmRvci0ke3BhY2thZ2VOYW1lfWA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnL3NyYy9wYWdlcy8nKSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYWdlTmFtZSA9IGlkLnRvU3RyaW5nKCkuc3BsaXQoJy9wYWdlcy8nKVsxXS5zcGxpdCgnLicpWzBdLnNwbGl0KCcvJylbMF07XHJcbiAgICAgICAgICAgIHJldHVybiBgcGFnZS0ke3BhZ2VOYW1lfWA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnL3NyYy9jb21wb25lbnRzLycpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudFBhdGggPSBpZC50b1N0cmluZygpLnNwbGl0KCcvY29tcG9uZW50cy8nKVsxXTtcclxuICAgICAgICAgICAgaWYgKGNvbXBvbmVudFBhdGgpIHtcclxuICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnROYW1lID0gY29tcG9uZW50UGF0aC5zcGxpdCgnLycpWzBdLnNwbGl0KCcuJylbMF07XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGBjb21wb25lbnQtJHtjb21wb25lbnROYW1lfWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICdjb21wb25lbnRzLW1pc2MnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJy9zcmMvbGliLycpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnbGliJztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIG1keFBsdWdpbigpLFxyXG4gICAgcmVhY3QoKSxcclxuICAgIG1vZGUgPT09ICdkZXZlbG9wbWVudCcgJiZcclxuICAgIGNvbXBvbmVudFRhZ2dlcigpLFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAnaW1hZ2UtbG9hZGVyJyxcclxuICAgICAgZW5mb3JjZTogJ3ByZScgYXMgJ3ByZScsXHJcbiAgICAgIGxvYWQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGlmICgvXFwuKHBuZ3xqcGU/Z3xnaWZ8c3ZnKSQvLnRlc3QoaWQpKSB7XHJcbiAgICAgICAgICByZXR1cm4gYGV4cG9ydCBkZWZhdWx0ICR7SlNPTi5zdHJpbmdpZnkoaWQpfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAndmVyY2VsLWVudicsXHJcbiAgICAgIHRyYW5zZm9ybShjb2RlOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoaWQuZW5kc1dpdGgoJy50cycpIHx8IGlkLmVuZHNXaXRoKCcudHN4JykgfHwgaWQuZW5kc1dpdGgoJy5qcycpKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2RlOiBjb2RlLnJlcGxhY2UoL3Byb2Nlc3NcXC5lbnZcXC4oXFx3KykvZywgKF86IHN0cmluZywgcHJvcDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGBpbXBvcnQubWV0YS5lbnYuJHtwcm9wfWA7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBtYXA6IG51bGxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXS5maWx0ZXIoQm9vbGVhbiksXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICAgIFwiQGVtb3Rpb24vcmVhY3RcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9yZWFjdFwiKSxcclxuICAgICAgXCJAZW1vdGlvbi9zdHlsZWRcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9zdHlsZWRcIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pKTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4UixTQUFTLG9CQUFvQjtBQUMzVCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsZUFBZTtBQUN4QixTQUFTLHVCQUF1QjtBQUNoQyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sdUJBQXVCO0FBQzlCLE9BQU8sMEJBQTBCO0FBQ2pDLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sNEJBQTRCO0FBWDhJLElBQU0sMkNBQTJDO0FBY2xPLElBQU0sYUFBYSxjQUFjLHdDQUFlO0FBQ2hELElBQU0sWUFBWSxRQUFRLFVBQVU7QUFFcEMsSUFBTSxZQUFZO0FBQUEsRUFDaEIsZUFBZTtBQUFBLElBQ2I7QUFBQSxJQUNBO0FBQUEsSUFDQSxDQUFDLHNCQUFzQixFQUFFLE1BQU0sWUFBWSxTQUFTLEtBQUssQ0FBQztB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
