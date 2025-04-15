import { CardItem } from '../types';
import { tripoMcp } from '../tools-models-content/tripo-mcp';

export const modelingTools: CardItem[] = [
  // AI建模
  {
    id: 'modeling-1',
    title: 'Tripo+MCP',
    description: '使用Tripo MCP插件 + Cursor 实现 Al 驱动的 3D 设计生成',
    link: 'https://github.com/VAST-AI-Research/tripo-mcp',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02km_346b7c0c-6631-4bb4-82c8-d799b3570bag.jpg',
    category: 'AI建模',
    content: tripoMcp
  },
  {
    id: 'modeling-3',
    title: 'TripoAl',
    description: 'TripoAl 是一个 AI 驱动的 3D 设计生成工具，它使用自然语言来生成 3D 设计。',
    link: 'https://www.tripo3d.ai/',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/tripo.jpg',
    category: 'AI建模'
  },
  {
    id: 'modeling-2',
    title: '混元3D',
    description: '开源、完整度高',
    link: 'https://3d.hunyuan.tencent.com/',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/hunyuan.png',
    category: 'AI建模'
  }
]; 