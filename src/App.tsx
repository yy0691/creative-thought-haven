import React, { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/index";
import Blog from "./pages/Blog";
import Portfolio from "./pages/Portfolio";
import Designs from "./pages/Designs";
import About from "./pages/About";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import BlogPost from './pages/BlogPost';
import VideoDetails from './pages/VideoDetails';
import Videos from './pages/Videos';
import DesignDetails from './pages/DesignDetails';
import BlogManager from './pages/content/BlogManager';
import ProjectManager from './pages/content/ProjectManager';
import ContentManager from './pages/ContentManager';
import { ThemeProvider } from './components/ThemeProvider';
import Loading from './components/Loading';

const queryClient = new QueryClient();

// 将布局也懒加载以减小初始加载大小
const LayoutComponent = lazy(() => import('./components/Layout'));

// 懒加载所有页面
const Home = lazy(() => import('./pages/index'));
const AboutComponent = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Portfolio'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const Contact = lazy(() => import('./pages/Designs'));
const BlogComponent = lazy(() => import('./pages/Blog'));
const BlogPostComponent = lazy(() => import('./pages/BlogPost'));
const NotFoundComponent = lazy(() => import('./pages/NotFound'));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
                    <Route path="projects" element={
                      <Suspense fallback={<Loading />}>
                        <Projects />
                      </Suspense>
                    } />
                    <Route path="contact" element={
                      <Suspense fallback={<Loading />}>
                        <Contact />
                      </Suspense>
                    } />
                    <Route path="blog" element={
                      <Suspense fallback={<Loading />}>
                        <BlogComponent />
                      </Suspense>
                    } />
                    <Route path="blog/:slug" element={
                      <Suspense fallback={<Loading />}>
                        <BlogPostComponent />
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
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
