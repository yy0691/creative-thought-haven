
const Index = () => {
  return (
    <div className="page-transition space-y-12 py-12">
      <section className="text-center space-y-6">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-primary">Welcome to my portfolio</h4>
          <h1 className="text-4xl font-bold sm:text-5xl">Frontend Developer & Designer</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Creating beautiful and functional web experiences with modern technologies
          </p>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="glass rounded-lg p-6 card-hover space-y-4"
          >
            <h3 className="text-xl font-semibold">Featured Project {i}</h3>
            <p className="text-muted-foreground">
              A brief description of this featured project and its key features.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Index;
