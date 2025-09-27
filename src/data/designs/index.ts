import generated from './generated-designs.json';

export const defaultDesigns = generated as unknown as Array<{
  id: string;
  title: string;
  description: string;
  category: string;
  publishDate: string;
  coverImage?: string;
  content: string;
}>;
