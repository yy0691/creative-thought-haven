import generated from './generated-projects.json';
export const defaultProjects = generated as unknown as Array<{
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  publishDate: string;
  category: string;
  isRecommended: boolean;
  isHighlight: boolean;
  coverImage?: string;
  content: string;
}>;
