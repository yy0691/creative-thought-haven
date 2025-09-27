import generated from './generated-ai-sections.json';
import type { CardItem } from './types';

export interface AISection {
  id: string;
  title: string;
  description?: string;
  items: CardItem[];
}

export const defaultAISections = generated as unknown as AISection[];
