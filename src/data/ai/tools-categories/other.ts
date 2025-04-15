import { CardItem } from '../types';
import { AstrBot } from '../update0415/AstrBot';
import { DeepChat } from '../update0415/DeepChat';
import { OpenAICPOKevinWeil } from '../update0415/OpenAICPOKevin Weil';

export const otherTools: CardItem[] = [
  {
    id: 'other-0',
    title: 'AstrBot',
    description: 'AstrBot：一款强大的多平台 LLM 聊天机器人及开发框架',
    link: 'https://astrbot.app/',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/astrbot_logo.png',
    category: '其他',
    content: AstrBot
  },
  {
    id: 'other-1',
    title: 'DeepChat',
    description: '一个开源的跨平台桌面AI聊天应用几乎支持各种常用功能',
    link: 'https://deepchat.thinkinai.xyz/',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02la_88f38948-8841-48f6-8ea6-4b6093ec89ag.jpg',
    category: '其他',
    content: DeepChat
  },
  {
    id: 'other-2',
    title: 'OpenAI CPO Kevin Weil',
    description: 'OpenAI CPO Kevin Weil 谈AI创业',
    link: 'https://mp.weixin.qq.com/s/bceAVpQOBmsoB4Jsk0L0Jg',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02la_adddfffa-3c25-4f4f-a9c7-829db191040g.jpg',
    category: '其他',
    content: OpenAICPOKevinWeil
  },
  // 其他
  {
    id: 'other-99999',
    title: 'Zencoder',
    description: '集成、可定制和直观的编码代理',
    link: 'https://zencoder.ai/',
    image: 'https://ph-files.imgix.net/c79518eb-0b64-4e1a-aa3d-51bd2bd3ac9c.png?auto=format',
    category: '其他'
  },
  {
    id: 'other-99998',
    title: 'AI Renamer',
    description: '使用AI重命名文件',
    link: 'https://airenamer.app/',
    image: 'https://ph-files.imgix.net/350a8504-1c64-4e3b-9fe8-b7a3ed77c74e.jpeg?auto=format',
    category: '其他'
  },

]; 