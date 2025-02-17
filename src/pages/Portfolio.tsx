
const Portfolio = () => {
  return (
    <div className="page-transition space-y-8 py-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Portfolio</h1>
        <p className="text-muted-foreground">Selected works and projects</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass rounded-lg overflow-hidden card-hover">
            <div className="aspect-video bg-muted" />
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">Project {i}</h3>
              <p className="text-muted-foreground">
                A brief description of the project, technologies used, and key features.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  React
                </span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  TypeScript
                </span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
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
