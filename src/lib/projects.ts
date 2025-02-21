import { projects } from '../content/projects';

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
}

export async function getAllProjects(): Promise<Project[]> {
  // 直接返回 projects 数组，按需可以添加排序逻辑
  return projects;
}