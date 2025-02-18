
import { designs } from "../content/designs";

const Designs = () => {
  return (
    <div className="page-transition space-y-8 py-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold">设计作品</h1>
        <p className="text-muted-foreground">UI/UX 和平面设计作品展示</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {designs.map((design) => (
          <div key={design.id} className="glass rounded-lg overflow-hidden card-hover group">
            <div className="aspect-square bg-muted relative overflow-hidden">
              <img 
                src={design.thumbnail} 
                alt={design.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">{design.title}</h3>
              <p className="text-muted-foreground">{design.description}</p>
              <div className="flex flex-wrap gap-2">
                {design.tools.map((tool) => (
                  <span key={tool} className="px-2 py-1 text-sm bg-muted rounded-md">
                    {tool}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 pt-2">
                {design.figmaUrl && (
                  <a
                    href={design.figmaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    在 Figma 中查看
                  </a>
                )}
                {design.downloadUrl && (
                  <a
                    href={design.downloadUrl}
                    className="text-sm text-primary hover:underline"
                  >
                    下载设计文件
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Designs;
