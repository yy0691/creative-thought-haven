
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
import NotFound from "./pages/NotFound";
import BlogPost from './pages/BlogPost';
import VideoDetails from './pages/VideoDetails';
import Videos from './pages/Videos';
import DesignDetails from './pages/DesignDetails';
import BlogManager from './pages/content/BlogManager';
import ProjectManager from './pages/content/ProjectManager';
import ContentManager from './pages/ContentManager';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main className="pt-20 container mx-auto px-4">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/designs" element={<Designs />} />
              <Route path="/designs/:id" element={<DesignDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/videos/:id" element={<VideoDetails />} />
              <Route path="/content" element={<ContentManager />} />
              <Route path="/content/blog" element={<BlogManager />} />
              <Route path="/content/projects" element={<ProjectManager />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
