import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import { ThemeProvider } from './components/ThemeProvider';
import Loading from './components/Loading';
import SplashCursor from "./components/SplashCursor";
import { CursorProvider } from './contexts/CursorContext';
import ErrorBoundary from './components/ErrorBoundary';
import titleManager from './app/utils/titleManager';

const queryClient = new QueryClient();

// 将布局也懒加载以减小初始加载大小
const LayoutComponent = lazy(() => import('./components/Layout'));

// 懒加载所有页面
const Home = lazy(() => import('./pages/index'));
const AboutComponent = lazy(() => import('./pages/About'));
const PortfolioComponent = lazy(() => import('./pages/Portfolio'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const DesignsComponent = lazy(() => import('./pages/Designs'));
const AIComponent = lazy(() => import('./pages/AI'));
const BlogComponent = lazy(() => import('./pages/Blog'));
const BlogPostComponent = lazy(() => import('./pages/BlogPost'));
const NotFoundComponent = lazy(() => import('./pages/NotFound'));
const VideoDetailsComponent = lazy(() => import('./pages/VideoDetails'));
const DesignDetailsComponent = lazy(() => import('./pages/DesignDetails'));
const ToolPageComponent = lazy(() => import('./pages/Tool'));
const ContentManagerComponent = lazy(() => import('./pages/ContentManager'));
const BlogManagerComponent = lazy(() => import('./pages/content/BlogManager'));
const ProjectManagerComponent = lazy(() => import('./pages/content/ProjectManager'));
const AIToolsManagerComponent = lazy(() => import('./pages/content/AIToolsManager'));

// 光标组件包装器 - 根据路由决定是否显示
const CursorWrapper = () => {
  const location = useLocation();
  // 只在首页和About页面显示光标特效
  const shouldShowCursor = location.pathname === '/' || location.pathname === '/about';
  
  return shouldShowCursor ? <SplashCursor /> : null;
};

const App = () => {
  // 初始化标题管理器
  useEffect(() => {
    titleManager.initTitleManager();
  }, []);

  return (
    <ErrorBoundary fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-700 mb-4">应用程序错误</h1>
          <p className="mb-4">应用程序遇到了意外错误。请尝试刷新页面或稍后再试。</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            刷新页面
          </button>
        </div>
      </div>
    }>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <CursorProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <CursorWrapper />
                <div className="min-h-screen bg-background">
                  <Navigation />
                  <main className="pt-20 container mx-auto px-4">
                    <Suspense fallback={<Loading />}>
                      <Routes>
                        <Route element={<LayoutComponent />}>
                          <Route index element={
                            <Suspense fallback={<Loading />}>
                              <Home />
                            </Suspense>
                          } />
                          <Route path="about" element={
                            <Suspense fallback={<Loading />}>
                              <AboutComponent />
                            </Suspense>
                          } />
                          <Route path="portfolio" element={
                            <Suspense fallback={<Loading />}>
                              <PortfolioComponent />
                            </Suspense>
                          } />
                          <Route path="portfolio/:id" element={
                            <Suspense fallback={<Loading />}>
                              <ProjectDetails />
                            </Suspense>
                          } />
                          <Route path="designs" element={
                            <Suspense fallback={<Loading />}>
                              <DesignsComponent />
                            </Suspense>
                          } />
                          <Route path="designs/:id" element={
                            <Suspense fallback={<Loading />}>
                              <DesignDetailsComponent />
                            </Suspense>
                          } />
                          <Route path="ai" element={
                            <Suspense fallback={<Loading />}>
                              <AIComponent />
                            </Suspense>
                          } />
                          <Route path="ai/tools/:id" element={
                            <Suspense fallback={<Loading />}>
                              <ToolPageComponent />
                            </Suspense>
                          } />
                          <Route path="blog" element={
                            <Suspense fallback={<Loading />}>
                              <BlogComponent />
                            </Suspense>
                          } />
                          <Route path="blog/*" element={
                            <Suspense fallback={<Loading />}>
                              <BlogPostComponent />
                            </Suspense>
                          } />
                          <Route path="videos/:id" element={
                            <Suspense fallback={<Loading />}>
                              <VideoDetailsComponent />
                            </Suspense>
                          } />
                          <Route path="content" element={
                            <Suspense fallback={<Loading />}>
                              <ContentManagerComponent />
                            </Suspense>
                          } />
                          <Route path="content/blog" element={
                            <Suspense fallback={<Loading />}>
                              <BlogManagerComponent />
                            </Suspense>
                          } />
                          <Route path="content/projects" element={
                            <Suspense fallback={<Loading />}>
                              <ProjectManagerComponent />
                            </Suspense>
                          } />
                          <Route path="content/ai-tools" element={
                            <Suspense fallback={<Loading />}>
                              <AIToolsManagerComponent />
                            </Suspense>
                          } />
                          <Route path="*" element={
                            <Suspense fallback={<Loading />}>
                              <NotFoundComponent />
                            </Suspense>
                          } />
                        </Route>
                      </Routes>
                    </Suspense>
                  </main>
                </div>
              </BrowserRouter>
            </TooltipProvider>
     </CursorProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);
};

export default App;
