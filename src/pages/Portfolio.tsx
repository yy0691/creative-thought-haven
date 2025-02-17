
const Portfolio = () => {
  return (
    <div className="page-transition space-y-8 py-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
          Portfolio
        </h1>
        <p className="text-muted-foreground">Selected works and projects</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i} 
            className="glass rounded-lg overflow-hidden card-hover border border-white/20 shadow-lg"
            style={{
              background: `linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,255,255,0.6))`,
            }}
          >
            <div className="aspect-video bg-gradient-to-br from-primary/5 to-primary/10" />
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-primary">Project {i}</h3>
              <p className="text-muted-foreground">
                A brief description of the project, technologies used, and key features.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-primary/5 text-primary px-3 py-1 rounded-full border border-primary/10 hover:bg-primary/10 transition-colors">
                  React
                </span>
                <span className="text-xs bg-primary/5 text-primary px-3 py-1 rounded-full border border-primary/10 hover:bg-primary/10 transition-colors">
                  TypeScript
                </span>
                <span className="text-xs bg-primary/5 text-primary px-3 py-1 rounded-full border border-primary/10 hover:bg-primary/10 transition-colors">
                  Tailwind
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
