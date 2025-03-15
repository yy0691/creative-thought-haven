import { TimelineNode } from '../components/Timeline';

// 学习历程时间轴节点数据
const timelineData: TimelineNode[] = [
  {
    id: '1',
    date: '2018年',
    title: '编程启蒙',
    description: '开始学习Python基础，完成第一个自动化脚本项目。探索了基本的编程概念，如变量、条件语句和循环。对编程产生了浓厚兴趣，并决定继续深入学习。',
    icon: '🚀',
    category: '编程基础',
    color: '#3B82F6'
  },
  {
    id: '2',
    date: '2019年',
    title: 'Web开发入门',
    description: '学习HTML、CSS和JavaScript基础知识，构建了第一个个人网站。通过几个小型项目，掌握了响应式设计原则和DOM操作。参加了本地的Web开发工作坊，获得了宝贵的反馈。',
    icon: '🌐',
    category: '前端技术',
    color: '#EAB308'
  },
  {
    id: '3',
    date: '2020年',
    title: '前端框架学习',
    description: '深入学习React框架，掌握组件化开发和状态管理。完成了一个中型电商应用项目，解决了许多实际问题。同时开始接触TypeScript，提升了代码质量和可维护性。',
    icon: '⚛️',
    category: '前端框架',
    color: '#22C55E'
  },
  {
    id: '4',
    date: '2021年春',
    title: '后端技术探索',
    description: '学习Node.js和Express框架，开发了RESTful API。接触数据库技术，掌握了MongoDB和基本的SQL查询。完成了一个全栈博客应用，实现了用户认证和数据持久化。',
    icon: '🔌',
    category: '后端开发',
    color: '#A855F7'
  },
  {
    id: '5',
    date: '2021年秋',
    title: '云服务与部署',
    description: '学习云服务平台(AWS, Azure)的基本使用。掌握了Docker容器化技术和基本的CI/CD流程。成功将个人项目部署到云端，并配置了自动化部署管道。',
    icon: '☁️',
    category: 'DevOps',
    color: '#6366F1'
  },
  {
    id: '6',
    date: '2022年',
    title: '移动应用开发',
    description: '学习React Native，开发了第一个跨平台移动应用。探索了移动端特有的UI/UX设计原则和性能优化技术。通过移动应用商店发布了一款工具类应用，获得初步用户反馈。',
    icon: '📱',
    category: '移动开发',
    color: '#EF4444'
  },
  {
    id: '7',
    date: '2023年',
    title: 'AI与机器学习',
    description: '开始学习人工智能和机器学习的基础知识。探索TensorFlow和PyTorch框架，实现了几个简单的预测模型。参与了一个自然语言处理项目，增强了对AI技术的实际应用理解。',
    icon: '🧠',
    category: '人工智能',
    color: '#EC4899'
  },
  {
    id: '8',
    date: '2024年',
    title: '全栈精进',
    description: '深入学习高级JavaScript模式和React生态系统。探索微服务架构和GraphQL技术。参与开源项目贡献，提升了协作能力和代码质量控制技能。开始分享技术博客和参与技术社区讨论。',
    icon: '🔥',
    category: '全栈开发',
    color: '#06B6D4'
  },
  {
    id: '9',
    date: '2025年展望',
    title: '未来方向',
    description: '计划深入学习Web3技术、区块链开发和高级数据科学。目标是成为专注于创新技术的高级全栈开发者，同时培养技术领导力和项目管理能力。希望能够指导新人并回馈技术社区。',
    icon: '🔮',
    category: '职业规划',
    color: '#F59E0B'
  }
];

export default timelineData; 