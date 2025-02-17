
const Blog = () => {
  return (
    <div className="page-transition space-y-8 py-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-muted-foreground">Thoughts, tutorials and insights</p>
      </header>
      
      <div className="grid gap-8 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <article key={i} className="glass rounded-lg p-6 card-hover">
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">March {i}, 2024</div>
              <h2 className="text-xl font-semibold">Blog Post Title {i}</h2>
              <p className="text-muted-foreground">
                A preview of the blog post content that gives readers an idea of what
                to expect when they click through to read more.
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
