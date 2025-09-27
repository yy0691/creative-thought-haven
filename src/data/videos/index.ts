import generated from './generated-videos.json';

export const defaultVideos = generated as unknown as Array<{
  id: string;
  title: string;
  description: string;
  category: string;
  publishDate: string;
  videoUrl: string;
  coverImage?: string;
  content: string;
}>;
