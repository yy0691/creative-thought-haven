import { useState, useEffect } from 'react';
import { defaultNewsItems } from '../data/ai/news';
import { defaultAISections } from '../data/ai';
import { defaultProjects } from '../data/projects';
import { defaultDesigns } from '../data/designs';
import { defaultVideos } from '../data/videos';

interface Article {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  content: string;
  author?: string;
  toc?: boolean;
  draft?: boolean;
  featured?: boolean;
  cover?: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  articles: Article[];
  subcategories?: Category[];
}

interface Tag {
  name: string;
  count: number;
  articles: Article[];
}

interface Project {
  id: string;
  slug?: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  thumbnail?: string;
  publishDate: string;
  category: string;
  isRecommended: boolean;
  isHighlight: boolean;
  coverImage?: string;
  content?: string;
  figmaUrl?: string;
}

interface Design {
  id: string;
  title: string;
  description: string;
  category: string;
  publishDate: string;
  coverImage?: string;
  // legacy UI optional fields
  thumbnail?: string;
  tools?: string[];
  figmaUrl?: string;
  downloadUrl?: string;
  images?: string[];
}

interface Video {
  title: string;
  description: string;
  category: string;
  publishDate: string;
  videoUrl: string;
  coverImage?: string;
}

interface AISectionItem {
  id: string;
  title: string;
  description?: string;
  link?: string;
  url?: string;
}

interface AISection {
  id: string;
  title: string;
  description?: string;
  items: AISectionItem[];
}

// 这个 News 类型现在应该与 `defaultNewsItems` 的结构匹配
// 我会从 `src/data/ai/news.ts` 导入 CardItem 类型来确保一致
import { CardItem as News } from '../data/ai/types';

export const useNews = () => {
  // 直接使用导入的数据，不再需要异步加载
  const news: News[] = defaultNewsItems;
  const loading = false;
  const error = null;

  return { news, loading, error };
};

export const useProjects = () => {
  const projects: Project[] = defaultProjects;
  const loading = false;
  const error = null;

  return { projects, loading, error };
};

export const useDesigns = () => {
  const designs: Design[] = defaultDesigns;
  const loading = false;
  const error = null;

  return { designs, loading, error };
};

export const useVideos = () => {
  const videos: Video[] = defaultVideos;
  const loading = false;
  const error = null;

  return { videos, loading, error };
};

export const useAISections = () => {
  const sections: AISection[] = defaultAISections as unknown as AISection[];
  const loading = false;
  const error = null;

  return { sections, loading, error };
};
