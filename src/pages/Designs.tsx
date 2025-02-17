
const Designs = () => {
  return (
    <div className="page-transition space-y-8 py-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Designs</h1>
        <p className="text-muted-foreground">UI/UX and graphic design work</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass rounded-lg overflow-hidden card-hover">
            <div className="aspect-square bg-muted" />
            <div className="p-6">
              <h3 className="text-xl font-semibold">Design {i}</h3>
              <p className="text-muted-foreground mt-2">
                A brief description of the design project and its context.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Designs;
