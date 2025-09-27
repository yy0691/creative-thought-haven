import { CardItem } from '../types';
import { midjourneyAnc } from '../../../../content/news/待整理/update0411-1/Midjourney-anc';
import { midjourneyLight } from '../../../../content/news/待整理/update0411-1/Midjourney-light';
import { midjourneySerfs } from '../../../../content/news/待整理/update0411-1/Midjourney-serfs';
import { midjourney21Styles105Prompt } from '../../../../content/news/待整理/update0411-1/prompt-Midjourney';
import { floraContent } from '../tools-draws-content/flora';
import { OmniSVG } from '../../../../content/news/待整理/update0415/OmniSVG';
export const paintingTools: CardItem[] = [
  // AI绘画
  {
    id: 'svg-1',
    title: 'OmniSVG', 
    description: '能把文字或图片转换成高质量SVG矢量图的Al模型',
    link: 'https://omnisvg.github.io/',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02la_de73c692-2ae1-4d08-bae9-c13748b2767g.jpg',
    category: 'AI绘画',
    content: OmniSVG
  },
  {
    id: 'painting-4',
    title: '即梦AI',
    description: '直出中文文字，支持多种绘画风格，包括油画、水彩、素描等。',
    link: 'https://jimeng.jianying.com',
    image: 'https://image.uisdc.com/wp-content/uploads/2024/02/hao-nav-Dreamina-2.jpg',
    category: 'AI绘画'
  },
  {
    id: 'painting-5',
    title: '可画',
    description: '亚洲人像质量高，AI换衣功能',
    link: 'https://www.canva.cn/',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/可画.jpg',
    category: 'AI绘画'
  },
  {
    id: 'painting-6',
    title: 'Midjourney',
    description: '海外产品，审美在线，支持多种绘画风格，包括油画、水彩、素描等。',
    link: 'https://www.midjourney.com/',
    image: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.4SXxQvRCgK9twLMSubJKJAHaE8?rs=1&pid=ImgDetMain',
    category: 'AI绘画'
  },
  {
    id:'midjourney-0',
    title:'Midjourney不同相机角度的教程',
    description:'Anima Labs 提供了一个关于如何在图像提示中掌握不同相机角度的使用的教程，以增强您的摄影控制力和效果。',
    link:'https://twitter.com/Anima_Labs/status/1785007888332636501',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_83360c55-7e0f-4fec-93c1-83937785ca6g.jpg',
    category:'AI绘画',
    content:midjourneyAnc
  },
  {
    id:'midjourney-1',
    title:'Midjourney中的摄影灯光照明技巧',
    description:'全面了解和掌握Midjourney中的各种摄影灯光照明技巧',
    link:'https://twitter.com/doganuraldesign/status/1780355517937852779',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_ae37acd9-747b-4ce2-9ba8-833be2a915cg.jpg',
    category:'AI绘画',
    content:midjourneyLight
  },
  {
    id:'midjourney-2',
    title:'如何在Midjourney中通过混合srefs创建双重色彩图像效果',
    description:'在这篇教程中，我们将介绍如何使用Midjourney中的srefs（样式参考）创建不同的图像效果，并通过调整srefs的权重和文本提示来优化结果。',
    link:'https://midjourney-serfs.com/',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_f002066d-fdcf-4d8d-829e-bddc96c353cg.jpg',
    category:'AI绘画',
    content:midjourneySerfs
  },
  {
    id:'midjourney-3',
    title:'21种不同的艺术风格以及105个提示词文档',
    description:'Midjourney 21-styles 105-prompt 包含了21种不同的艺术风格以及105个提示词文档',
    link:'https://github.com/yy0691/img-bed/blob/main/Blog/Midjourney_·_21-styles_105-prompt.2025.2.24-压缩.pdf',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_0538729a-cb09-4eba-b3e4-df86c597117g.jpg',
    category:'AI绘画',
    content:midjourney21Styles105Prompt
  },
  {
    id: 'painting-0',
    title: 'Ideogram 3.0',
    description: '应对GPT4oldeogram发布全新升级的图像生成模型Ideogram3.0将图像真实感、创意设计和风格一致性统一',
    link: 'https://about.ideogram.ai/3.0 ',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/ideogram_ai_logo.jpg',
    category: 'AI绘画'
  },
  {
    id: 'painting-1',
    title: 'illustration.app',
    description: '在几秒钟内创建自定义矢量插图',
    link: 'https://www.illustration.app/',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/PixPin_2025-04-14_18-15-05.png',
    category: 'AI绘画'
  },
  {
    id: 'painting-2',
    title: 'Pacdora',
    description: "利用人工智能添加背景，打造工作室品质的产品视觉效果",
    link: 'https://www.pacdora.com/tools/ai-background-generator',
    image: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.dzfz0Po3435mO_8gzCjKXwAAAA?rs=1&pid=ImgDetMain',
    category: 'AI绘画'
  },
  {
    id: 'painting-3',
    title: 'FLORA',
    description: '一个集合了所有类型顶级AI模型的无限画布创意工具',
    link: 'https://florafauna.ai/',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/image-20250326193502188.png',
    category: 'AI绘画',
    content: floraContent
  },
  {
    id: 'painting-7',
    title: 'Liblibor',
    description: 'SD生态网站，在线LORA训练',
    link: 'https://www.liblib.art/',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/libili.png',
    category: 'AI绘画'
  }
];