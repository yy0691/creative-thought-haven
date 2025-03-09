import { useParams } from 'react-router-dom';
import { videoMeta } from '../content/videos';
import { projects } from '../content/projects';
import { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';  // 添加这行

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

const VideoDetails = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  const meta = videoMeta[id || ''];
  const [comments, setComments] = useState<Comment[]>(meta?.comments || []);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');

  if (!project || !project.videoUrl) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-xl text-muted-foreground dark:text-gray-300">视频未找到</p>
      </div>
    );
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !author.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: author.trim(),
      content: newComment.trim(),
      date: new Date().toISOString(),
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  return (
    <div className="page-transition py-12 max-w-6xl mx-auto px-4">
      <div className="space-y-8">
        {/* 视频播放器 */}
        <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
          <VideoPlayer
            src={project.videoUrl}
            title={project.title}
            className="w-full h-full"
          />
        </div>

        {/* 视频信息 */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-primary dark:text-primary-foreground">{project.title}</h1>
          <div className="flex gap-4 text-sm text-muted-foreground dark:text-gray-300">
            <span>发布于 {new Date(project.publishDate).toLocaleDateString('zh-CN')}</span>
            <span>时长 {meta?.duration}</span>
          </div>
          <div className="flex gap-2">
            {meta?.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-sm bg-primary/5 text-primary dark:bg-primary/20 dark:text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="prose prose-primary max-w-none dark:prose-invert">
            {project.details.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>

        {/* 评论区 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold dark:text-primary-foreground">评论</h2>
          
          {/* 评论表单 */}
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="space-y-2">
              <input
                type="text"
                placeholder="您的昵称"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-primary/10 focus:outline-none focus:border-primary/30 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                required
              />
            </div>
            <div className="space-y-2">
              <textarea
                placeholder="写下您的评论..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-primary/10 focus:outline-none focus:border-primary/30 min-h-[100px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors dark:bg-primary/90 dark:hover:bg-primary"
            >
              发表评论
            </button>
          </form>

          {/* 评论列表 */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-muted-foreground dark:text-gray-400">暂无评论</p>
            ) : (
              comments.map(comment => (
                <div key={comment.id} className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold dark:text-gray-200">{comment.author}</span>
                    <span className="text-sm text-muted-foreground dark:text-gray-400">
                      {new Date(comment.date).toLocaleString('zh-CN')}
                    </span>
                  </div>
                  <p className="dark:text-gray-300">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;