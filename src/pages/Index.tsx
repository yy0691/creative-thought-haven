
import { Link } from "react-router-dom";
import { ArrowRight, Github, Twitter } from "lucide-react";

const Index = () => {
  return (
    <div className="page-transition space-y-16 py-12">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-primary">欢迎来到我的创意思维空间</h4>
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            前端开发者 & 设计师
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            专注于创造美观且实用的网络体验，结合现代技术与创新设计
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" 
             className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 hover:text-primary transition-colors">
            <Github size={20} />
            <span>GitHub</span>
          </a>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 hover:text-primary transition-colors">
            <Twitter size={20} />
            <span>Twitter</span>
          </a>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">最新文章</h2>
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline">
            查看全部 <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Link to={`/blog/post-${i}`} key={i} className="glass rounded-lg p-6 card-hover space-y-4">
              <div className="text-sm text-muted-foreground">2024-01-{i}</div>
              <h3 className="text-xl font-semibold">探索前端新技术</h3>
              <p className="text-muted-foreground line-clamp-2">
                深入探讨现代前端开发中的最新技术趋势和最佳实践，包括性能优化、用户体验设计等方面的见解。
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">精选项目</h2>
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-primary hover:underline">
            查看全部 <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Link to={`/portfolio/project-${i}`} key={i} className="glass rounded-lg p-6 card-hover space-y-4">
              <div className="aspect-video rounded-md bg-muted mb-4"></div>
              <h3 className="text-xl font-semibold">创新Web应用</h3>
              <p className="text-muted-foreground">
                基于React和TypeScript开发的现代化Web应用，注重性能优化和用户体验。
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
