import { useState } from 'react';
import { videos } from '../content/videos';

type Category = 'all' | 'tutorial' | 'demo' | 'showcase';

const Videos = () => {
  const [category, setCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = videos.filter(video => {
    const matchesCategory = category === 'all' || video.category === category;
    const matchesSearch = 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="page-transition space-y-8 py-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
          视频
        </h1>
        <p className="text-muted-foreground">项目演示、教程和技术分享</p>
      </header>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            {(['all', 'tutorial', 'demo', 'showcase'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${category === cat ? 'bg-primary text-white' : 'bg-primary/5 text-primary hover:bg-primary/10'}`}
              >
                {{
                  all: '全部',
                  tutorial: '教程',
                  demo: '演示',
                  showcase: '作品展示'
                }[cat]}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="搜索视频..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-full bg-white/50 border border-primary/10 focus:outline-none focus:border-primary/30 transition-colors"
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {filteredVideos.map((video) => (
            <div 
              key={video.id} 
              className="glass rounded-lg overflow-hidden card-hover border border-white/20 shadow-lg"
              style={{
                background: `linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,255,255,0.6))`,
              }}
            >
              <div className="aspect-video bg-gradient-to-br from-primary/5 to-primary/10 relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-primary">{video.title}</h3>
                <p className="text-muted-foreground">{video.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {video.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs bg-primary/5 text-primary px-3 py-1 rounded-full border border-primary/10 hover:bg-primary/10 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-muted-foreground">
                    {new Date(video.publishDate).toLocaleDateString('zh-CN')}
                  </span>
                  <a 
                    href={`/videos/${video.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    观看视频
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;