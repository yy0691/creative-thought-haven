import axios from 'axios';
import { CardItem } from './types';
import { vercelAiSdkContent } from './news-content/vercel-ai-sdk';
import { deepSeekV3Content } from './news-content/deepseek-v3';
import { gpt5Content } from './news-content/gpt5';
import { deepmindContent } from './news-content/deepmind';
import { claudeThinkContent } from './news-content/claude-think';
import { qwen25omin } from './news-content/qwen-2.5omni';
import { GPT4oImg } from './news-content/GPT-4o-img';
import { CloudflareAutoRAGContent } from './update0410/Cloudflare-AutoRAG';
import { ElevenLabsContent } from './update0410/ElevenLabs';
import { FirebaseContent } from './update0410/Firebase';
import { GeospatialFoundationModelsContent } from './update0410/Geospatial Foundation Models';
import { GoogleAgentContent } from './update0410/Google-Agent';
import { OmiTalkerContent } from './update0410/OmiTalker';
import { list46 } from './update0411-1/46-AI-lists';
import { bytedanceResearch } from './update0411-1/bytedance-research';
import { runwayGen4 } from './update0411-1/RunwayGen-4';
import { chapterLlama } from './update0411-1/Chapter-Llama';
import { claudeForEducation } from './update0411-1/ClaudeforEducation';
import { superAgent } from './update0411-1/SuperAgent';
import { claudeThinking } from './update0411-1/CLAUDE-THINKING';
import { discoverSources } from './update0411-1/Discover Sources';
import { gpt45 } from './update0411-1/GPT-4.5';
import { lumaRay2 } from './update0411-1/Ray2';
import { PromptEngineering } from './updat0411-2/PromptEngineering';
import { BabelDOC,ChatgptMemoryUpdate, GoogleAgentBuilder, GoogleModelsUpdate, OrpheusTTS, WordPressAIWebsiteBuilder, xAIGrok3API } from './updat0411-2/News0412';
import { geminiLive,glmUpdate,gpt41Update } from './update0415';
// 默认新闻数据
export const defaultNewsItems: CardItem[] = [
  {
    id:'0415-new-1',
    title:'Google Gemini的"摄像头+屏幕共享"新体验',
    description:'Google Gemini Live 把你的手机变成了一个能“看你看到的”、“听你说的”的 AI 助手，支持摄像头、屏幕共享、实时互动，开启 AI 日常应用的全新体验。',
    author:'Google',
    date:'2025-04-15',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lb_9f8142f5-abd8-4a44-8e75-c9cc27852d4g.jpg',
    link:'https://support.google.com/gemini/answer/14579026?sjid=15917116769005255122-NA',
    category:'Gemini',
    content:geminiLive
  },  
  {
    id:'0415-new-2',
    title:'智谱发布新一代开源模型GLM系列',
    description:'GLM系列32B性能媲美671B的Deepseek R1 并宣布启动IPO',
    author:'GLM',
    date:'2025-04-15',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_f36c76d5-3388-4a63-9635-abff8b395f4g.jpg',   
    link:'https://www.glm.xyz/blog/glm-4-128k-release',
    category:'GLM',
    content:glmUpdate
  },
  {
    id:'0415-new-3',
    title:'OpenAI发布GPT-4.1',
    description:'OpenAI以API的形式发布了三个新模型:GPT-4.1、GPT-4.1 mini和GPT-4.1 nano',
    author:'OpenAI',
    date:'2025-04-15',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02lc_4f24f94e-264f-4f01-b1f6-b285c7f667dg.jpg)',
    link:'https://openai.com/api/2024-08-06/changelog',
    category:'GPT',
    content:gpt41Update
  },
  {
    id:'0412-new-2',
    title:'Chatgpt Memory Update',
    description:'Chatgpt 记忆功能重大升级:可以跨聊天对话记住与你相关的所有信息',
    author:'Chatgpt',
    date:'2025-04-12',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_46bba650-dd37-43d4-a2a7-c29cbf08388g.jpg',
    link:'https://x.com/gregisenberg/status/1906697683089101113',
    category:'Chatgpt',
    content:ChatgptMemoryUpdate
  },
  {
    id:'0412-new-3',
    title:'Google 公布了Vertex AI平台的多项新功能',
    description:'Google帮你搭建一个完整的"Agent工厂"平台可统一开发、部署、运行和监控你的Agent',
    author:'Google',
    date:'2025-04-12',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_f209ffcb-a4b9-4176-8148-05e87be1fdag.jpg',
    link:'https://cloud.google.com/blog/products/ai-machine-learning/build-and-manage-multi-system-agents-with-vertex-ai',
    category:'Agent',
    content:GoogleAgentBuilder
  },
  {
    id:'0412-new-4',
    title:'Google 的图像、视频、音乐、语音生成Al模型进行了全面升级',
    description:'Google 的图像、视频、音乐、语音生成Al模型进行了全面升级',
    author:'Google',
    date:'2025-04-12',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_c75524e7-7ce8-469c-95f1-c5586b8dd49g.jpg',
    link:'https://cloud.google.com/blog/products/ai-machine-learning/expanding-generative-media-for-enterprise-on-vertex-ai',
    category:'Agent',
    content:GoogleModelsUpdate
  },
  {
    id:'0412-new-5',
    title:'Orpheus-TTS:一个开源高质量语音TTS模型 在音调、节奏、情绪等方面超越现有商业模型',
    description:'Orpheus-TTS:一个开源高质量语音TTS模型 在音调、节奏、情绪等方面超越现有商业模型',
    author:'Orpheus-TTS',
    date:'2025-04-12',
    image:'https://canopylabs.ai/assets/images/architecture.png',
    link:' https://canopylabs.ai/model-releases',
    category:'TTS',
    content:OrpheusTTS
  },
  {
    id:'0412-new-6',
    title:'WordPress推出AI网站构建器',
    description:'WordPress推出了一个全新的AI网站构建器任何人都能快速创建并发布自己的网站',
    author:'WordPress',
    date:'2025-04-12',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_e5bf1097-d696-4bdd-a124-0cf67e4a24cg.jpg',
    link:'http://wordpress.com/',
    category:'Website',
    content:WordPressAIWebsiteBuilder
  },
  {
    id:'0412-new-7',
    title:'xAI发布Grok 3API提供多个版本的Grok模型,适配不同应用场景',
    description:'xAI发布Grok 3API提供多个版本的Grok模型,适配不同应用场景',
    author:'xAI',
    date:'2025-04-12',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02l8_21e845cf-f9ad-43e4-be75-a15b415195eg.jpg',
    link:'https://docs.x.ai/docs/models#models-and-pricing',
    category:'Grok',
    content:xAIGrok3API
  },
  {
    id:'0411-new-1',
    title:'AI趋势和创业洞察',
    description:'46条正在"让人夜不能寐"的AI趋势和创业洞察',
    author:'Greg Isenberg',
    date:'2025-04-11',
    image:'https://www.smartbusinessdaily.com/wp-content/uploads/2023/11/AI-In-Your-SEO-Strategy.webp',
    link:'https://x.com/gregisenberg/status/1906697683089101113',
    category:'Trends',
    content:list46
  },
  {
    id:'0411-new-2',
    title:'字节跳动最新研究',
    description:'大模型在大部分情况下只是"复读机"并非真正拥有推理能力只是在复述学习过的答案',
    author:'字节跳动',
    date:'2025-04-11',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_5e708637-aba6-42b7-9e59-a786bacb08bg.jpg',
    link:'https://arxiv.org/pdf/2504.00509',
    category:'LLM',
    content:bytedanceResearch
  },
  {
    id:'0411-new-3',
    title:'RunwayGen-4发布',
    description:'Runway发布RunwayGen-4可持续生成风格一致、角色连续、物体与场景稳定的视频内容',
    author:'Runway',
    date:'2025-04-11',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02ku_09042062-4eff-4bbf-af96-55d3ec56651g.jpg',
    link:'https://runwayml.com/research/introducing-runway-gen-4',
    category:'Video',
    content:runwayGen4
  },
  {
    id:'0411-new-4',
    title:'Chapter-Llama',
    description:'将小时级别的长视频自动划分为语义清晰的章节并生成简洁准确的标题',
    author:'Runway',
    date:'2025-04-11',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_e7ae5232-1708-461a-abdb-3f8845fb14cg.jpg',
    link:'https://imagine.enpc.fr/~lucas.ventura/chapter-llama/',
    category:'Video',
    content:chapterLlama
  },
  {
    id:'0411-new-5',
    title:'Anthropic推出ClaudeforEducation',
    description:'Anthropic 正式推出 **Claude for Education**，旨在帮助高校系统性地将 AI 技术融入：这是一个专门给大学用的 Claude 聊天 AI 版本，支持师生进行学术写作、批改作业、解决问题，还能帮助行政管理更高效。',
    author:'Anthropic',
    date:'2025-04-11',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_4b5e061a-d29b-492f-b442-edeed27e382g.jpg',
    link:'https://www.anthropic.com/news/claude-for-education',
    category:'Education',
    content:claudeForEducation
  },
  {
    id:'0411-new-6',
    title:'Genspark推出自动化Al代理:SuperAgent具备自主思考、规划、执行、调用工具的能力',
    description:'Genspark推出了一个自动化Al代理:SuperAgent具备自主思考、规划、执行、调用工具的能力',
    author:'Genspark',
    date:'2025-04-11',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_1debc3d7-f544-42cb-a668-396a0aff14eg.jpg',
    link:'https://www.genspark.ai/agents?id=055af920-62b7-4c50-b8f7-cc9b6d3d89fb',
    category:'Agent',
    content:superAgent
  },
  {
    id:'0411-new-7',
    title:'Anthropic探索AI模型的内部工作原理，他们看到Claude的思考过程',
    description:'Anthropic探索AI模型的内部工作原理，他们看到Claude的思考过程',
    author:'Anthropic',
    date:'2025-04-10',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_ce6dd3bb-f1f4-44a7-90d0-c429108b67eg.jpg',
    link:'https://www.anthropic.com/research/tracing-thoughts-language-model',
    category:'Claude',
    content:claudeThinking  
  },
  {
    id:'0411-new-8',
    title:'Google NotebookLM推出Discover Sources',
    description:'通过该功能，能够输入主题自动帮你查找相关文章和资料',
    author:'Google',
    date:'2025-04-11',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_9adc60e0-dc5e-49b1-8447-4db68f539a9g.jpg',
    link:'https://notebooklm.google.com/',
    category:'NotebookLM',
    content:discoverSources
  },
  {
    id:'0411-new-9',
    title:'GPT-4.5首次以"人格扮演"方式通过了标准图灵测试',
    description:'GPT-4.5首次以"人格扮演"方式通过了标准图灵测试,成为目前最具类人对话能力的AI(含完整提示词及方法)',
    author:'OpenAI',
    date:'2025-04-09',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_05c120f2-7ba8-4fa2-a3a8-8c098aa1186g.jpg',
    link:'https://turingtest.live/',
    category:'LLM',
    content:gpt45
  },
  {
    id:'0411-new-10',
    title:'Luma推出Ray2中的相机运动概念功能',
    description:'Luma推出Ray2中的相机运动概念功能20多种相机运动可以自由组合可实现电影级镜头运动',
    author:'Luma',
    date:'2025-04-11',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/img_v3_02ku_ee2c3e45-0abb-4a74-b43a-f9a61f0c0aeg.jpg',
    link:'https://www.luma.ai/blog/introducing-camera-motion-concepts-in-ray-2',
    category:'Video',
    content:lumaRay2
  },
  {
    id:'0411-new-11',
    title:'Prompt Engineering',
    description:'由Google团队成员联合编写的《Prompt Engineering》提示词工程白皮书',
    author:'Google',
    date:'2025-04-11',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l8_bf3b8157-5b8a-4e92-88f4-f5ddf901b49g.jpg',
    link:'https://www.promptingguide.ai/prompt-engineering',
    category:'Prompt Engineering',
    content:PromptEngineering
  },
  {
    id:'0410-new-1',
    title:'Cloudflare推出全托管的RAG系统AutoRAG',
    description:'Cloudflare推出了一个全托管的RAG系统:AutoRAG自动连接你的各种数据源',
    author:'Cloudflare',
    date:'2025-04-09',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l5_2b2de908-cd53-4e09-8944-963b1573f0bg.jpg',
    link:'https://blog.cloudflare.com/introducing-autorag-on-cloudflare/',
    category:'RAG',
    content:CloudflareAutoRAGContent
  },
  {
    id:'0410-new-2',
    title:'ElevenLabs推出MCP服务器可以让Al轻松使用ElevenLabs的语音技术如TTS、克隆声音、甚至打电话',
    description:'ElevenLabs推出了一个MCP服务器，可以让AI轻松使用ElevenLabs的语音技术如TTS、克隆声音、甚至打电话。',
    author:'ElevenLabs',
    date:'2025-04-08',  
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l5_06e9dc3d-843c-41c2-ad0b-7e29adbaa01g.jpg',
    link:'https://github.com/lharries/whatsapp-mcp',
    category:'MCP',
    content:ElevenLabsContent
  },
  {
    id:'0410-new-3',
    title:'Google发布基于浏览器的全栈Al应用开发环境Firebase',
    description:'Google发布了基于浏览器的全栈Al应用开发环境Firebase，可以让开发者轻松使用Firebase的AI技术如TTS、克隆声音、甚至打电话。',
    author:'TTS',
    date:'2025-04-10',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_1635c59b-2462-449c-9eba-77cb53a2d56g.jpg',
    link:'https://firebase.blog/posts/2025/04/cloud-next-announcements',
    category:'Firebase',
    content:FirebaseContent
  },
  {
    id:'0410-new-4',
    title:'Google发布基于多模态大模型和AI Agent的"地球Al大脑"系统',
    description:'Google发布了基于多模态大模型和AI Agent的"地球Al大脑"系统，可以让AI轻松使用Firebase的AI技术如TTS、克隆声音、甚至打电话。',
    author:'Agent',
    date:'2025-04-10',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_3adcde7c-4ede-4db9-b0bb-4cee7ddcb92g.jpg',
    link:'https://research.google/blog/geospatial-reasoning-unlocking-insights-with-generative-ai-and-multiple-foundation-models/',
    category:'Geospatial Foundation Models',
    content:GeospatialFoundationModelsContent
  },
  {
    id:'0410-new-5',
    title:'Google推出Agent2Agent协议(A2A)可让多个Agent跨平台互通并协作完成任务组成一个智能协同体',
    description:'Google推出了Agent2Agent协议(A2A)可让多个Agent跨平台互通并协作完成任务组成一个智能协同体。',
    author:'Google',
    date:'2025-04-10',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_5c80e6ec-4e0f-4ae1-a967-dcdf66acd69g.jpg',
    link:'https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/',
    category:'Agent',
    content:GoogleAgentContent
  },
  {
    id:'0410-new-6',
    title:'新的语音模型支持实时视觉对话',
    description:'Kyutai 发布了 MoshiVis，这是一种开放式视觉语音模型，允许用户对图像进行自然的语音对话，同时保持低延迟。',
    author:'Kyutai',
    date:'2025-04-10',
    image:'https://humanaigc.github.io/omnitalker/content/images/motivation-two-columns-V4.png',
    link:'https://humanaigc.github.io/omnitalker/',
    category:'MCP',
    content:OmiTalkerContent
  },
  {
    id:'new-3',
    title:'阿里云发布Qwen2.5Omni',
    description:'Qwen2.5-Omni是通义千问（Qwen）团队发布的最新旗舰多模态大模型，是一款端到端全模态感知与响应模型，是一个可以看、听、说、写、理解一切的 AI 模型。',
    author:'通义千问',
    date:'2025-03-27',
    image:'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02kp_ef7f8a2c-b785-4043-8cdb-25e4c52a443g.png',
    link:'https://chat.qwenlm.ai/',
    category:'LLM',
    content: qwen25omin
  },
  {
    id: 'new-1',
    title: 'Vercel发布AISDK4.2版本引入一系列重大更新支持推理模型、MCP、图像生成等',
    description: ' 加入了多模态（图像+文本）、支持开放模型上下文协议（MCP）、推理能力、搜索来源展示、Svelte 5 支持等众多新特性。',
    author: 'Anthropic',
    date: '2025-03-19',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02km_9f052d63-3541-488c-a56b-bed376ee7d5g.jpg',
    link: 'https://vercel.com/blog/ai-sdk-4-2',
    category: 'LLM',
    content: vercelAiSdkContent
  },
  {
    id: 'new-2',
    title: 'Claude发布新功能"think"工具',
    description: '"think"工具可以让AI在复杂任务解决过程中拥有专门的思考空间。',
    author: 'Anthropic',
    date: '2025-03-19',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/image-20250326230344704.png',
    link: 'https://www.anthropic.com/engineering/claude-think-tool',
    category: 'LLM',
    content: claudeThinkContent
  },
  // 自动更新的新闻将插入到这里
  {
    id: '1',
    title: 'DeepSeek-V3 正式发布',
    description: 'DeepSeek 的新 V3 在 aider 的多语言基准测试中得分为 55%，比上一版本有显著提升。它是排名第二的非思考/推理模型，仅次于 Sonnet 3.7。V3 与 R1 和 o3-mini 等思考模型相比具有竞争力。',
    author: 'Anthropic',
    date: '2025-03-19',
    image: 'https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02kn_f68891a8-627b-49fd-a86f-21ee8ecc0dbg.jpg',
    category: 'LLM',
    link: 'https://api-docs.deepseek.com/zh-cn/news/news1226',
    content: deepSeekV3Content
  },
  
  {
    id: '3',
    title: 'Google DeepMind发布量子计算突破性研究',
    description: '使用新型量子算法，在室温下实现了稳定的量子比特操作，为大规模量子计算机的实现铺平道路。',
    author: 'DeepMind',
    date: '2025-03-17',
    image: 'https://storage.googleapis.com/deepmind-live-cms/images/social_share_image.width-1100.png',
    category: '科研突破',
    link: 'https://deepmind.google/',
    content: deepmindContent
  },
  {
    id: '4',
    title: 'NVIDIA发布H500 AI超级芯片',
    description: 'H500提供比H200高出5倍的AI训练性能，采用4nm工艺，集成了新一代Tensor Core，功耗仅为前代的60%。',
    author: 'NVIDIA',
    date: '2025-03-16',
    image: 'https://www.nvidia.com/content/dam/en-zz/Solutions/about-nvidia/logo-and-brand/01-nvidia-logo-horiz-500x200-2c50-p@2x.png',
    category: '硬件',
    link: 'https://www.nvidia.com/'
  },
  {
    id: '5',
    title: 'Meta推出AR眼镜Meta Glass',
    description: 'Meta Glass采用突破性的全息投影技术，重量仅80克，续航8小时，支持全天候AR体验和AI助手集成。',
    author: 'Meta',
    date: '2025-03-15',
    image: 'https://about.fb.com/wp-content/uploads/2021/10/meta-logo.png',
    category: '硬件',
    link: 'https://about.meta.com/'
  },
  {
    id: '6',
    title: 'Stability AI推出实时AI视频生成引擎',
    description: '新一代AI视频生成技术支持实时渲染，可直接将文本描述转换为高质量视频，开创视频创作新范式。',
    author: 'Stability AI',
    date: '2025-03-14',
    image: 'https://stability.ai/assets/images/stability-ai-logo.svg',
    category: '视频生成',
    link: 'https://stability.ai/'
  },
  {
    id: '7',
    title: 'Anthropic推出企业级AI安全评估工具',
    description: '新工具可以全面评估AI模型的安全性、偏见和潜在风险，帮助企业更好地部署和管理AI系统。',
    author: 'Anthropic',
    date: '2025-03-13',
    image: 'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/smozbwxkmn5ksr1q9vl1',
    category: 'AI安全',
    link: 'https://www.anthropic.com/'
  },
  {
    id: '8',
    title: '微软发布新一代AI开发平台',
    description: '集成了代码生成、测试自动化和部署优化的一站式AI开发平台，大幅提升开发效率。',
    author: 'Microsoft',
    date: '2025-03-12',
    image: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
    category: '开发工具',
    link: 'https://microsoft.com/'
  },
  {
    id: '9',
    title: 'Midjourney推出3D场景生成功能',
    description: 'V8版本支持直接从文本生成完整的3D场景，可导出为多种3D格式，革新了3D内容创作流程。',
    author: 'Midjourney',
    date: '2025-03-11',
    image: 'https://seeklogo.com/images/M/midjourney-logo-431D36BAE4-seeklogo.com.png',
    category: '3D生成',
    link: 'https://www.midjourney.com/'
  },
  {
    id: '10',
    title: 'Cohere发布多语言理解新突破',
    description: '新模型可以同时理解和翻译100种语言，准确率达到人类水平，特别在低资源语言上有显著提升。',
    author: 'Cohere',
    date: '2025-03-10',
    image: 'https://assets-global.website-files.com/614a9edd8139f5def3897a73/61960dbb839ce5fefe853138_Cohere%20Logo%201.png',
    category: '自然语言处理',
    link: 'https://cohere.ai/'
  }
];

// 获取Coze访问令牌
/*
export const getCozeAccessToken = async () => {
  try {
    // Coze API服务地址
    const baseUrl = 'https://api.coze.cn';
    
    // 从环境变量获取Personal Access Token(PAT)
    const pat = import.meta.env.VITE_COZE_PAT || process.env.VITE_COZE_PAT;
    
    if (!pat) {
      console.error('未找到Coze PAT环境变量，请设置VITE_COZE_PAT环境变量');
      return null;
    }
    
    // 请求访问令牌
    const response = await axios.post(
      `${baseUrl}/api/auth/v1/access_token`, 
      {
        grant_type: 'client_credentials'
      },
      {
        headers: {
          'Authorization': `Bearer ${pat}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.data && response.data.access_token) {
      return response.data.access_token;
    }
    
    return null;
  } catch (error) {
    console.error('获取Coze访问令牌失败:', error);
    return null;
  }
};
*/

// 从Coze智能体API获取最新新闻
export const fetchLatestNews = async (): Promise<CardItem[]> => {
  // 返回默认新闻数据，不再调用Coze API
  const sortedNews = [...defaultNewsItems].sort((a, b) => {
    // 将日期字符串转换为Date对象进行比较
    const dateA = new Date(a.date.replace(/-/g, '/'));
    const dateB = new Date(b.date.replace(/-/g, '/'));
    // 降序排序（从新到旧）
    return dateB.getTime() - dateA.getTime();
  });
  
  return sortedNews;
  
  /*
  try {
    // Coze API地址
    const baseUrl = 'https://api.coze.cn';
    
    // 智能体ID - 从环境变量中获取
    const botId = import.meta.env.VITE_COZE_BOT_ID || process.env.VITE_COZE_BOT_ID || '7433632883987939380';
    
    // 获取访问令牌
    const accessToken = await getCozeAccessToken();
    
    if (!accessToken) {
      throw new Error('无法获取Coze访问令牌');
    }
    
    // 设置请求头
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };
    
    // 调用Coze API
    const response = await axios.post(
      `${baseUrl}/api/bot/v1/chat/completions`,
      {
        bot_id: botId,
        messages: [
          {
            role: 'user',
            content: '请提供最新的AI新闻资讯'
          }
        ],
        stream: false
      },
      { headers }
    );
    
    // 处理响应数据
    if (response.data && response.data.output && response.data.output.newslist) {
      // 将API响应格式转换为CardItem格式
      return response.data.output.newslist.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        author: item.source,
        date: item.ctime.split(' ')[0], // 提取日期部分
        image: item.picUrl, // 直接使用API返回的图片URL
        link: item.url,
        category: 'AI新闻'
      }));
    }
    
    return [];
  } catch (error) {
    console.error('获取新闻数据失败:', error);
    return [];
  }
  */
}; 