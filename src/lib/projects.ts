import { defaultProjects as projects } from '../data/projects';

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  publishDate?: string;
  isRecommended?: boolean;
  coverImage?: string;
}

export function getAllProjects(): Project[] {
  // 直接返回 projects 数组，按需可以添加排序逻辑
  return projects as unknown as Project[];
}