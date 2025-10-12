import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Target, Lightbulb, Rocket, Brain, 
  TrendingUp, Handshake, Mail, MessageCircle,
  Award, Code, Building2, Bot, Zap, Orbit,
  CheckCircle2, Briefcase, Database, GitBranch, Github, ExternalLink, Globe
} from 'lucide-react';
import { H1,H6 } from '@/components/ui/Heading';

const About = () => {
  const [showQRCode, setShowQRCode] = useState(false);

  return (
    <div className="page-transition py-10 md:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* --- 核心价值主张 (Hero Section) --- */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 md:space-y-8 mb-10 md:mb-14"
      >
        {/* 名字与热情 */}
        <div className="relative inline-block">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <H6 className="text-4xl md:text-6xl lg:text-7xl font-extrabold 
                           bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 
                           dark:from-white dark:via-gray-300 dark:to-gray-500 
                           bg-clip-text text-transparent inline-flex items-center gap-3">
              Y
              {/* Replaced emoji ✨ with Sparkles icon */}
              <motion.span
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block text-4xl md:text-6xl origin-bottom"
              >
                <Sparkles className="text-primary" />
              </motion.span>
            </H6>
          </motion.div>
          {/* 视觉点缀 */}
          <motion.div 
            className="absolute -top-4 -right-4 md:-top-6 md:-right-6 text-primary opacity-70"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeOut" }
            }}
          >
            <Sparkles className="w-7 h-7 md:w-10 md:h-10" />
          </motion.div>
        </div>
        
        {/* 核心价值陈述 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30">
            <Building2 className="w-4 h-4" />
            <span>ToB AI 产品经理 · 教育科技 & 行业仿真</span>
          </div>
          
          {/* 核心数据卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">15+</div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">项目交付</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg border border-green-200 dark:border-green-700">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">100%</div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">准时交付</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-700">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">+40%</div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">学习效率</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">50+</div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">解决方案</div>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* --- 主内容区域: "我的方法论" & "核心能力" —*/}
      <div className="rounded-xl md:rounded-2xl p-6 md:p-10 space-y-12 lg:space-y-16 hover:border-gray-200 dark:hover:border-gray-800 dark:border-gray-800 dark:bg-gray-900/70 backdrop-blur-lg shadow-sm">
        
        {/* --- 核心竞争力 (Core Strengths) --- */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <Rocket className="w-6 h-6 text-primary" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              核心竞争力
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-5 rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/30 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-base text-gray-900 dark:text-white">端到端交付</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                需求→方案→开发→上线→迭代的全链路管理能力
              </p>
              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                交付周期 -20% · 缺陷率 -15%
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-5 rounded-xl border border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/30 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <Bot className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h3 className="font-semibold text-base text-gray-900 dark:text-white">AI实战能力</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                LLM/Agent/RAG的产品化落地与业务场景适配
              </p>
              <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                人均通过率 +18% · 错误率 -22%
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-5 rounded-xl border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/30 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h3 className="font-semibold text-base text-gray-900 dark:text-white">数据驱动决策</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                搭建评测集与AB实验，用量化指标验证产品假设
              </p>
              <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                方案复用率 +40% · 检索效率 +60%
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* --- 代表性项目 (Featured Projects) --- */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-primary" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              代表性项目
            </h2>
          </div>
          
          <div className="space-y-4">
            {/* 项目1: CAR-T细胞实验 */}
            <motion.div 
              whileHover={{ x: 4 }}
              className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-base text-gray-900 dark:text-white">CAR-T细胞实验 AI 赋能</h3>
                    <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 rounded-full">进行中</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    负责人 · 集成NLP对话系统与任务知识图谱，实现智能化医学指导
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded">NLP对话</span>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded">知识图谱</span>
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 rounded">学习效率+40%</span>
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 rounded">医学AI应用</span>
              </div>
            </motion.div>

            {/* 项目2: 建筑施工AI */}
            <motion.div 
              whileHover={{ x: 4 }}
              className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-base text-gray-900 dark:text-white">建筑施工 AI 实验</h3>
                    <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded-full">已交付</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    负责人 · 运用NLP和Agent技术，实现AI实时指导与自动画像
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded">Agent技术</span>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded">实时指导</span>
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 rounded">实操技能+40%</span>
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 rounded">自动画像</span>
              </div>
            </motion.div>

            {/* 项目3: 桥梁数字孪生 */}
            <motion.div 
              whileHover={{ x: 4 }}
              className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-base text-gray-900 dark:text-white">桥梁健康监测数字孪生</h3>
                    <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded-full">已交付</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    负责人 · 传感器数据接入、数字孪生可视化、异常识别AI模型集成
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 rounded">数字孪生</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 rounded">实时监测</span>
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 rounded">配置时间-50%</span>
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 rounded">识别准确率+15%</span>
              </div>
            </motion.div>

            {/* 项目3 */}
            <motion.div 
              whileHover={{ x: 4 }}
              className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-base text-gray-900 dark:text-white">成品库资料体系重构</h3>
                    <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded-full">已上线</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    主导 · 240+成品资料重构，搭建多维关联的产品数据中心（10类字段）
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 rounded">信息架构</span>
                <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 rounded">知识管理</span>
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 rounded">检索效率+60%</span>
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 rounded">复用率+40%</span>
              </div>
            </motion.div>
          </div>

          <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              更多成果：50+售前解决方案、AI工具集（Prompt工程工具、自动化测试）、AR/3D大屏项目矩阵
            </p>
          </div>
        </motion.section>

        {/* --- 个人项目 (Personal Projects) --- */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <Code className="w-6 h-6 text-primary" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              个人项目
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 项目1: AI虚拟咨询室 */}
            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-2">AI虚拟咨询室 MVP</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                    基于BERT意图识别的病患智能对话系统，验证AI在医疗咨询场景的商业可行性
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded">BERT</span>
                    <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded">意图识别</span>
                    <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded">对话系统</span>
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 rounded">医疗AI</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://github.com/yy0691/ai-dialogue-smba" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors group"
                >
                  <Github className="w-4 h-4" />
                  <span>源码</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <a 
                  href="https://medtalk.luoyuanai.cn/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors group"
                >
                  <Globe className="w-4 h-4" />
                  <span>网站</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </motion.div>

            {/* 项目2: AI工程效率工具集 */}
            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-green-50 to-cyan-50 dark:from-green-900/20 dark:to-cyan-900/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-2">AI工程效率工具集</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                    Prompt工程工具（版本管理+效果追踪）、自动化测试脚本、WPF智能检索应用
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 rounded">Python</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 rounded">ChatGPT</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 rounded">自动化</span>
                    <span className="text-xs px-2 py-1 bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300 rounded">WPF</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://github.com/yy0691/PromptMate" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors group"
                >
                  <Github className="w-4 h-4" />
                  <span>源码</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <a 
                  href="https://promptmateluo.lovable.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors group"
                >
                  <Globe className="w-4 h-4" />
                  <span>网站</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </motion.div>
          </div>

          <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              💡 所有项目代码开源，欢迎查看和交流
            </p>
          </div>
        </motion.section>

        {/* --- AI技术栈 & 产品能力 (Tech Stack & Skills) --- */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <Code className="w-6 h-6 text-primary" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              AI技术栈 & 产品能力
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* AI核心技术 */}
            <div className="p-5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/20">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-semibold text-base text-gray-900 dark:text-white">AI核心技术</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full">Agent编排</span>
                <span className="px-2.5 py-1 text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full">RAG架构</span>
                <span className="px-2.5 py-1 text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full">NLP对话系统</span>
                <span className="px-2.5 py-1 text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full">知识图谱</span>
                <span className="px-2.5 py-1 text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full">意图识别</span>
                <span className="px-2.5 py-1 text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full">计算机视觉</span>
                <span className="px-2.5 py-1 text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full">时序分析</span>
              </div>
            </div>

            {/* 模型与平台 */}
            <div className="p-5 rounded-xl border border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20">
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="font-semibold text-base text-gray-900 dark:text-white">模型与平台</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 rounded-full">BERT/GPT系列</span>
                <span className="px-2.5 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 rounded-full">Cursor/Claude</span>
                <span className="px-2.5 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 rounded-full">Python/JS</span>
                <span className="px-2.5 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 rounded-full">IoT数据接入</span>
              </div>
            </div>

            {/* 商业转化 */}
            <div className="p-5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/20">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="font-semibold text-base text-gray-900 dark:text-white">商业转化</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 rounded-full">市场调研</span>
                <span className="px-2.5 py-1 text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 rounded-full">售前方案</span>
                <span className="px-2.5 py-1 text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 rounded-full">需求挖掘</span>
                <span className="px-2.5 py-1 text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 rounded-full">Figma/Axure</span>
              </div>
            </div>

            {/* 项目管理 */}
            <div className="p-5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20">
              <div className="flex items-center gap-2 mb-3">
                <GitBranch className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-base text-gray-900 dark:text-white">项目管理</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-full">敏捷开发Scrum</span>
                <span className="px-2.5 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-full">DevOps流程</span>
                <span className="px-2.5 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-full">跨职能协调</span>
                <span className="px-2.5 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-full">A/B测试</span>
              </div>
            </div>
          </div>
        </motion.section>
        {/* --- 建立联系 (Let's Connect) --- */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <Handshake className="w-6 h-6 text-primary" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              聊聊？
            </h2>
          </div>
          
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-4">
              对<span className="text-primary font-semibold">产品、AI技术</span>感兴趣？欢迎交流
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:yuyuan3162021@163.com"
                className="inline-flex items-center justify-center gap-2 px-2 py-1 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <Mail className="w-4 h-4" />
                <span>邮件</span>
              </a>
              <button
                onClick={() => setShowQRCode(true)}
                className="inline-flex items-center justify-center gap-2 px-2 py-1 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span>微信</span>
              </button>
            </div>
          </div>
        </motion.section>
      </div>

      {/* 微信二维码弹窗 (保持不变 - 独立功能) */}
      <AnimatePresence>
        {showQRCode && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowQRCode(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-3 dark:border dark:border-gray-700 pointer-events-auto"
              >
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">扫码添加微信</h3>
                  <div className="mb-4 flex justify-center">
                    <img 
                      src="https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_News微信二维码.png" 
                      alt="微信二维码" 
                      className="rounded-xl w-64 h-64 object-cover bg-white shadow-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        console.error("二维码图片加载失败");
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='12' text-anchor='middle' alignment-baseline='middle' fill='%23999'%3E二维码加载失败%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                    扫一扫，期待与您的交流！
                  </p>
                  <button
                    onClick={() => setShowQRCode(false)}
                    className="w-full py-3 px-4 bg-primary text-white text-base rounded-full hover:bg-primary/90 transition-colors"
                  >
                    关闭
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;
