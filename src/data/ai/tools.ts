import { CardItem } from './types';
import { tripoMcp } from './tools-models-content/tripo-mcp';
import { midjourneyAnc } from '../../../content/news/待整理/update0411-1/Midjourney-anc';
import { midjourneyLight } from '../../../content/news/待整理/update0411-1/Midjourney-light';
import { midjourneySerfs } from '../../../content/news/待整理/update0411-1/Midjourney-serfs';
import { midjourney21Styles105Prompt } from '../../../content/news/待整理/update0411-1/prompt-Midjourney';
import { floraContent } from './tools-draws-content/flora';

// 导入各类别工具数据
import { generalCnTools } from './tools-categories/general-cn';
import { generalOverseasTools } from './tools-categories/general-overseas';
import { paintingTools } from './tools-categories/painting';
import { codingTools } from './tools-categories/coding';
import { voiceTools } from './tools-categories/voice';
import { videoTools } from './tools-categories/video';
import { modelingTools } from './tools-categories/modeling';
import { securityTools } from './tools-categories/security';
import { otherTools } from './tools-categories/other';
import { agentTools } from './tools-categories/agent';

// 将所有工具数据合并到一个数组中
export const toolsItems: CardItem[] = [
  ...generalCnTools,
  ...generalOverseasTools,
  ...paintingTools,
  ...codingTools,
  ...voiceTools,
  ...videoTools,
  ...modelingTools,
  ...securityTools,
  ...otherTools,
  ...agentTools
]; 