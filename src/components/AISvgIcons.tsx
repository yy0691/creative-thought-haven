import React from 'react';

// 写作主题SVG
export const WritingSvg = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 装饰性背景元素 */}
    <circle cx="50" cy="50" r="30" fill="currentColor" fillOpacity="0.03" />
    <circle cx="350" cy="250" r="40" fill="currentColor" fillOpacity="0.03" />
    
    {/* 主要内容 */}
    <g transform="translate(100, 100)">
      {/* 笔 */}
      <path
        d="M20,20 L40,40 L60,20 L40,0 Z"
        fill="currentColor"
        fillOpacity="0.8"
      />
      <path
        d="M40,0 L60,20 L80,0 L60,-20 Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      
      {/* 文字线条 */}
      <g transform="translate(100, 20)">
        <rect x="0" y="0" width="120" height="4" fill="currentColor" fillOpacity="0.6" />
        <rect x="0" y="20" width="100" height="4" fill="currentColor" fillOpacity="0.4" />
        <rect x="0" y="40" width="140" height="4" fill="currentColor" fillOpacity="0.3" />
      </g>
      
      {/* 装饰性元素 */}
      <circle cx="180" cy="40" r="8" fill="currentColor" fillOpacity="0.4" />
      <circle cx="200" cy="60" r="6" fill="currentColor" fillOpacity="0.3" />
    </g>
    
    {/* 装饰性边框 */}
    <rect
      x="10"
      y="10"
      width="380"
      height="280"
      stroke="currentColor"
      strokeWidth="2"
      strokeOpacity="0.1"
      fill="none"
    />
  </svg>
);

// 建模主题SVG
export const ModelingSvg = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 装饰性背景元素 */}
    <circle cx="350" cy="50" r="30" fill="currentColor" fillOpacity="0.03" />
    <circle cx="50" cy="250" r="40" fill="currentColor" fillOpacity="0.03" />
    
    {/* 主要内容 */}
    <g transform="translate(100, 100)">
      {/* 3D 模型 */}
      <path
        d="M40,40 L80,40 L60,0 Z"
        fill="currentColor"
        fillOpacity="0.8"
      />
      <path
        d="M40,40 L60,0 L20,0 Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <path
        d="M80,40 L60,0 L100,0 Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
      
      {/* 网格线 */}
      <g transform="translate(120, 20)">
        <rect x="0" y="0" width="40" height="40" stroke="currentColor" strokeOpacity="0.4" fill="none" />
        <rect x="40" y="0" width="40" height="40" stroke="currentColor" strokeOpacity="0.3" fill="none" />
        <rect x="0" y="40" width="40" height="40" stroke="currentColor" strokeOpacity="0.2" fill="none" />
      </g>
      
      {/* 装饰性元素 */}
      <circle cx="180" cy="40" r="8" fill="currentColor" fillOpacity="0.4" />
      <circle cx="200" cy="60" r="6" fill="currentColor" fillOpacity="0.3" />
    </g>
    
    {/* 装饰性边框 */}
    <rect
      x="10"
      y="10"
      width="380"
      height="280"
      stroke="currentColor"
      strokeWidth="2"
      strokeOpacity="0.1"
      fill="none"
    />
  </svg>
);

// 安全主题SVG
export const SecuritySvg = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 装饰性背景元素 */}
    <circle cx="50" cy="50" r="30" fill="currentColor" fillOpacity="0.03" />
    <circle cx="350" cy="250" r="40" fill="currentColor" fillOpacity="0.03" />
    
    {/* 主要内容 */}
    <g transform="translate(100, 100)">
      {/* 盾牌 */}
      <path
        d="M40,0 L80,20 L80,60 L40,80 L0,60 L0,20 Z"
        fill="currentColor"
        fillOpacity="0.8"
      />
      
      {/* 锁 */}
      <g transform="translate(120, 20)">
        <rect x="0" y="0" width="40" height="60" rx="4" fill="currentColor" fillOpacity="0.6" />
        <circle cx="20" cy="30" r="12" fill="currentColor" fillOpacity="0.4" />
        <rect x="18" y="0" width="4" height="20" fill="currentColor" fillOpacity="0.4" />
      </g>
      
      {/* 装饰性元素 */}
      <circle cx="180" cy="40" r="8" fill="currentColor" fillOpacity="0.4" />
      <circle cx="200" cy="60" r="6" fill="currentColor" fillOpacity="0.3" />
    </g>
    
    {/* 装饰性边框 */}
    <rect
      x="10"
      y="10"
      width="380"
      height="280"
      stroke="currentColor"
      strokeWidth="2"
      strokeOpacity="0.1"
      fill="none"
    />
  </svg>
);

// 其他主题SVG
export const OtherSvg = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 装饰性背景元素 */}
    <circle cx="350" cy="50" r="30" fill="currentColor" fillOpacity="0.03" />
    <circle cx="50" cy="250" r="40" fill="currentColor" fillOpacity="0.03" />
    
    {/* 主要内容 */}
    <g transform="translate(100, 100)">
      {/* 齿轮 */}
      <circle cx="40" cy="40" r="30" fill="currentColor" fillOpacity="0.8" />
      <circle cx="40" cy="40" r="20" fill="currentColor" fillOpacity="0.6" />
      <path
        d="M40,10 L50,40 L80,40 L50,50 L40,80 L30,50 L0,40 L30,40 Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
      
      {/* 连接线 */}
      <g transform="translate(120, 20)">
        <line x1="0" y1="0" x2="100" y2="0" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
        <line x1="0" y1="20" x2="80" y2="20" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
        <line x1="0" y1="40" x2="120" y2="40" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
      </g>
      
      {/* 装饰性元素 */}
      <circle cx="180" cy="40" r="8" fill="currentColor" fillOpacity="0.4" />
      <circle cx="200" cy="60" r="6" fill="currentColor" fillOpacity="0.3" />
    </g>
    
    {/* 装饰性边框 */}
    <rect
      x="10"
      y="10"
      width="380"
      height="280"
      stroke="currentColor"
      strokeWidth="2"
      strokeOpacity="0.1"
      fill="none"
    />
  </svg>
);

// 教程主题 - 升级版
export const TutorialSvg = () => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="tutorialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3"/>
            </linearGradient>
            <filter id="tutorialShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
              <feOffset dx="2" dy="2" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.2"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* 装饰图形 */}
          <circle cx="25" cy="25" r="40" fill="currentColor" fillOpacity="0.05"/>
          <circle cx="175" cy="135" r="50" fill="currentColor" fillOpacity="0.07"/>
          
          {/* 主要图形 */}
          <g transform="translate(60, 25)" filter="url(#tutorialShadow)">
            <rect x="0" y="0" width="80" height="110" rx="4" fill="white" fillOpacity="0.95" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="10" y="10" width="60" height="8" rx="2" fill="currentColor" fillOpacity="0.4"/>
            <rect x="10" y="26" width="60" height="6" rx="2" fill="currentColor" fillOpacity="0.3"/>
            <rect x="10" y="38" width="50" height="6" rx="2" fill="currentColor" fillOpacity="0.3"/>
            <rect x="10" y="50" width="55" height="6" rx="2" fill="currentColor" fillOpacity="0.3"/>
            <rect x="10" y="62" width="45" height="6" rx="2" fill="currentColor" fillOpacity="0.3"/>
            <rect x="10" y="74" width="60" height="6" rx="2" fill="currentColor" fillOpacity="0.3"/>
            <rect x="10" y="86" width="40" height="6" rx="2" fill="currentColor" fillOpacity="0.3"/>
            
            {/* 书页折角 */}
            <path d="M80,0 L80,15 L65,0 Z" fill="white" fillOpacity="0.6"/>
          </g>
        </svg>
)

 // 深度学习/神经网络主题 - 升级版
 export const DeepLearningSvg = () => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3"/>
            </linearGradient>
            <filter id="neuralGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>
          
          {/* 背景图形 */}
          <circle cx="30" cy="30" r="60" fill="currentColor" fillOpacity="0.05"/>
          <circle cx="170" cy="130" r="70" fill="currentColor" fillOpacity="0.07"/>
          
          {/* 神经网络 */}
          <g transform="translate(20, 0)" filter="url(#neuralGlow)">
            {/* 节点 */}
            <circle cx="40" cy="40" r="6" fill="white" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="140" cy="40" r="6" fill="white" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="40" cy="80" r="6" fill="white" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="140" cy="80" r="6" fill="white" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="40" cy="120" r="6" fill="white" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="140" cy="120" r="6" fill="white" stroke="currentColor" strokeWidth="1.5"/>
            
            <circle cx="90" cy="30" r="6" fill="white" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="90" cy="70" r="6" fill="white" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="90" cy="110" r="6" fill="white" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="90" cy="150" r="6" fill="white" stroke="currentColor" strokeWidth="1.5"/>
            
            {/* 连接线 */}
            <path d="M40,40 L90,30 M40,40 L90,70 M40,40 L90,110 
                     M40,80 L90,30 M40,80 L90,70 M40,80 L90,110 
                     M40,120 L90,70 M40,120 L90,110 M40,120 L90,150
                     M140,40 L90,30 M140,40 L90,70 M140,40 L90,110
                     M140,80 L90,30 M140,80 L90,70 M140,80 L90,110
                     M140,120 L90,70 M140,120 L90,110 M140,120 L90,150" 
                  stroke="currentColor" strokeWidth="1" strokeOpacity="0.6"/>
            
            {/* 激活节点 */}
            <circle cx="90" cy="70" r="8" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5">
              <animate attributeName="r" values="6;8;6" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="fill-opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite"/>
            </circle>
          </g>
        </svg>
)
// 绘画/图像生成主题 - 升级版
export const PaintingSvg = () => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="imageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.2"/>
            </linearGradient>
            <filter id="imageShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="currentColor" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          {/* 装饰元素 */}
          <circle cx="25" cy="35" r="40" fill="currentColor" fillOpacity="0.05"/>
          <circle cx="175" cy="125" r="50" fill="currentColor" fillOpacity="0.07"/>
          
          {/* 图像框 */}
          <g transform="translate(50, 30)" filter="url(#imageShadow)">
            <rect x="0" y="0" width="100" height="80" rx="4" fill="white" fillOpacity="0.95" stroke="currentColor" strokeWidth="1.5"/>
            
            {/* 图像内容 */}
            <circle cx="35" cy="30" r="15" fill="currentColor" fillOpacity="0.6"/>
            <path d="M15,65 L35,40 L50,55 L85,25 L85,65 L15,65 Z" fill="url(#imageGradient)" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8"/>
            
            {/* 调色板 */}
            <g transform="translate(75, 15) scale(0.6)">
              <path d="M0,0 C-5,10 -5,20 0,25 C5,30 15,30 20,25 C25,20 25,10 20,0 Z" fill="currentColor" fillOpacity="0.8"/>
              <circle cx="10" cy="12" r="4" fill="white" fillOpacity="0.8"/>
            </g>
          </g>
          
          {/* 画笔 */}
          <path d="M30,120 L45,110 L50,115 L35,125 Z" fill="currentColor" fillOpacity="0.6" stroke="currentColor" strokeWidth="1"/>
          <path d="M50,115 L110,55 L115,60 L55,120 Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1"/>
          <path d="M110,55 L116,61 L120,45 L104,49 Z" fill="currentColor" fillOpacity="0.8" stroke="currentColor" strokeWidth="1"/>
        </svg>
)
// 提示词工程主题 - 升级版
export const PromptSvg = () => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="promptGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3"/>
            </linearGradient>
            <filter id="promptShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="currentColor" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          {/* 装饰元素 */}
          <circle cx="30" cy="40" r="50" fill="currentColor" fillOpacity="0.05"/>
          <circle cx="170" cy="120" r="60" fill="currentColor" fillOpacity="0.07"/>
          
          {/* 对话气泡 - AI */}
          <g transform="translate(20, 35)" filter="url(#promptShadow)">
            <rect x="0" y="0" width="70" height="40" rx="16" fill="white" fillOpacity="0.95" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10,40 L5,50 L15,40 Z" fill="white" fillOpacity="0.95" stroke="currentColor" strokeWidth="1.5"/>
            
            <rect x="10" y="12" width="50" height="5" rx="2" fill="currentColor" fillOpacity="0.5"/>
            <rect x="10" y="23" width="40" height="5" rx="2" fill="currentColor" fillOpacity="0.3"/>
          </g>
          
          {/* 对话气泡 - 用户 */}
          <g transform="translate(110, 85)" filter="url(#promptShadow)">
            <rect x="0" y="0" width="70" height="40" rx="16" fill="white" fillOpacity="0.95" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M60,40 L65,50 L55,40 Z" fill="white" fillOpacity="0.95" stroke="currentColor" strokeWidth="1.5"/>
            
            <rect x="10" y="12" width="50" height="5" rx="2" fill="currentColor" fillOpacity="0.5"/>
            <rect x="10" y="23" width="30" height="5" rx="2" fill="currentColor" fillOpacity="0.3"/>
          </g>
          
          {/* 光标 */}
          <rect x="120" y="95" width="2" height="10" fill="currentColor">
            <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite"/>
          </rect>
        </svg>
)
 // AI工具主题 - 升级版
export const ToolSvg = () => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="toolGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3"/>
            </linearGradient>
            <filter id="toolShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="currentColor" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          {/* 装饰元素 */}
          <circle cx="20" cy="20" r="40" fill="currentColor" fillOpacity="0.05"/>
          <circle cx="180" cy="140" r="50" fill="currentColor" fillOpacity="0.07"/>
          
          {/* 工具箱 */}
          <g transform="translate(65, 40)" filter="url(#toolShadow)">
            <rect x="0" y="0" width="70" height="50" rx="4" fill="white" fillOpacity="0.95" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M20,0 L20,-15 A10,10 0 0,1 30,-15 L40,-15 A10,10 0 0,1 50,-15 L50,0" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            
            {/* 工具内部 */}
            <rect x="10" y="15" width="50" height="25" rx="2" fill="currentColor" fillOpacity="0.5"/>
            
            {/* 小齿轮 - 带动画 */}
            <g transform="translate(35, 27.5)">
              <circle cx="0" cy="0" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M0,-15 L0,-10 M0,10 L0,15 M-15,0 L-10,0 M10,0 L15,0 M-10,-10 L-7,-7 M-10,10 L-7,7 M10,-10 L7,-7 M10,10 L7,7" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="0" cy="0" r="4" fill="currentColor" fillOpacity="0.8">
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="10s" repeatCount="indefinite"/>
              </circle>
            </g>
          </g>
          
          {/* 小工具图标 */}
          <g transform="translate(45, 105)">
            <circle cx="0" cy="0" r="10" fill="white" fillOpacity="0.95" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M-5,-5 L5,5 M-5,5 L5,-5" stroke="currentColor" strokeWidth="1.5"/>
          </g>
          
          <g transform="translate(125, 105)">
            <circle cx="0" cy="0" r="10" fill="white" fillOpacity="0.95" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M-5,0 L5,0 M0,-5 L0,5" stroke="currentColor" strokeWidth="1.5"/>
          </g>
        </svg>
)
// 语音/音频主题 - 升级版
export const VoiceSvg = () => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="voiceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3"/>
            </linearGradient>
            <filter id="voiceShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="currentColor" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          {/* 装饰元素 */}
          <circle cx="40" cy="30" r="50" fill="currentColor" fillOpacity="0.05"/>
          <circle cx="160" cy="130" r="60" fill="currentColor" fillOpacity="0.07"/>
          
          {/* 麦克风 */}
          <g transform="translate(85, 40)" filter="url(#voiceShadow)">
            <rect x="0" y="0" width="30" height="60" rx="15" fill="white" fillOpacity="0.95" stroke="currentColor" strokeWidth="1.5"/>
            
            {/* 麦克风底座 */}
            <path d="M15,60 L15,75 M0,75 L30,75" stroke="currentColor" strokeWidth="1.5"/>
            
            {/* 声波 */}
            <g transform="translate(15, 30)">
              <circle cx="0" cy="0" r="8" fill="currentColor" fillOpacity="0.5"/>
              <path d="M-25,0 A25,25 0 0,1 25,0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2">
                <animate attributeName="stroke-dashoffset" values="0;4" dur="3s" repeatCount="indefinite"/>
              </path>
              <path d="M-40,0 A40,40 0 0,1 40,0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2">
                <animate attributeName="stroke-dashoffset" values="0;4" dur="3s" repeatCount="indefinite"/>
              </path>
              <path d="M-55,0 A55,55 0 0,1 55,0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2">
                <animate attributeName="stroke-dashoffset" values="0;4" dur="3s" repeatCount="indefinite"/>
              </path>
            </g>
          </g>
          
          {/* 音频控制 */}
          <g transform="translate(50, 120)">
            <rect x="0" y="0" width="100" height="10" rx="5" fill="white" fillOpacity="0.95" stroke="currentColor" strokeWidth="1"/>
            <rect x="0" y="0" width="65" height="10" rx="5" fill="currentColor" fillOpacity="0.5"/>
            <circle cx="65" cy="5" r="6" fill="white" stroke="currentColor" strokeWidth="1.5"/>
          </g>
        </svg>
)
// 视频主题 - 升级版
export const VideoSvg = () => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="videoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3"/>
            </linearGradient>
            <filter id="videoShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="currentColor" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          {/* 装饰元素 */}
          <circle cx="30" cy="30" r="50" fill="currentColor" fillOpacity="0.05"/>
          <circle cx="170" cy="130" r="60" fill="currentColor" fillOpacity="0.07"/>
          
          {/* 视频屏幕 */}
          <g transform="translate(40, 30)" filter="url(#videoShadow)">
            <rect x="0" y="0" width="120" height="70" rx="4" fill="white" fillOpacity="0.95" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="5" y="5" width="110" height="60" rx="2" fill="currentColor" fillOpacity="0.4"/>
            
            {/* 播放按钮 */}
            <circle cx="60" cy="35" r="15" fill="white" fillOpacity="0.9" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M55,25 L70,35 L55,45 Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
          </g>
          
          {/* 电影条 */}
          <g transform="translate(40, 110)">
            <rect x="0" y="0" width="120" height="15" fill="white" fillOpacity="0.95" stroke="currentColor" strokeWidth="1"/>
            <path d="M0,0 V15 M10,0 V15 M20,0 V15 M30,0 V15 M40,0 V15 M50,0 V15 M60,0 V15 M70,0 V15 M80,0 V15 M90,0 V15 M100,0 V15 M110,0 V15 M120,0 V15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
          </g>
          
          {/* 相机 */}
          <g transform="translate(145, 45)">
            <rect x="0" y="0" width="25" height="20" rx="2" fill="white" fillOpacity="0.95" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="12.5" cy="10" r="7" fill="currentColor" fillOpacity="0.7" stroke="currentColor" strokeWidth="1"/>
            <circle cx="12.5" cy="10" r="3" fill="white" fillOpacity="0.9"/>
            <rect x="25" y="5" width="10" height="10" rx="1" fill="white" fillOpacity="0.95" stroke="currentColor" strokeWidth="1.5"/>
          </g>
        </svg>
)   
// 默认AI主题 - 升级版
export const DefaultSvg = () => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3"/>
            </linearGradient>
            <filter id="aiShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="currentColor" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          {/* 装饰元素 */}
          <circle cx="30" cy="30" r="50" fill="currentColor" fillOpacity="0.05"/>
          <circle cx="170" cy="130" r="60" fill="currentColor" fillOpacity="0.07"/>
          
          {/* AI芯片 */}
          <g transform="translate(70, 40)" filter="url(#aiShadow)">
            <path d="M0,30 L30,0 L60,30 L30,60 Z" fill="white" fillOpacity="0.95" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="30" cy="30" r="15" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1"/>
            
            <path d="M30,0 L30,15 M60,30 L45,30 M30,60 L30,45 M0,30 L15,30" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8"/>
            
            <circle cx="30" cy="30" r="5" fill="currentColor" fillOpacity="0.6">
              <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="fill-opacity" values="0.6;0.8;0.6" dur="3s" repeatCount="indefinite"/>
            </circle>
          </g>
          
          {/* 电路图案 */}
          <g transform="translate(30, 40)" strokeLinecap="round">
            <path d="M0,30 L20,30" stroke="currentColor" strokeWidth="1"/>
            <path d="M140,30 L160,30" stroke="currentColor" strokeWidth="1"/>
            <path d="M70,0 L70,20" stroke="currentColor" strokeWidth="1"/>
            <path d="M70,60 L70,80" stroke="currentColor" strokeWidth="1"/>
            
            <path d="M30,10 C40,10 40,30 50,30" stroke="currentColor" strokeWidth="1" fill="none"/>
            <path d="M10,50 C20,50 20,70 30,70" stroke="currentColor" strokeWidth="1" fill="none"/>
            <path d="M110,10 C100,10 100,30 90,30" stroke="currentColor" strokeWidth="1" fill="none"/>
            <path d="M130,50 C120,50 120,70 110,70" stroke="currentColor" strokeWidth="1" fill="none"/>
            
            <circle cx="10" cy="30" r="2" fill="currentColor"/>
            <circle cx="150" cy="30" r="2" fill="currentColor"/>
            <circle cx="70" cy="10" r="2" fill="currentColor"/>
            <circle cx="70" cy="70" r="2" fill="currentColor"/>
            <circle cx="30" cy="10" r="2" fill="currentColor"/>
            <circle cx="10" cy="50" r="2" fill="currentColor"/>
            <circle cx="110" cy="10" r="2" fill="currentColor"/>
            <circle cx="130" cy="50" r="2" fill="currentColor"/>
          </g>
          
          {/* 二进制数据流 */}
          <g transform="translate(45, 120)" fill="currentColor" fontSize="8">
            <text x="0" y="0" opacity="0.7">01100101</text>
            <text x="50" y="0" opacity="0.8">10101110</text>
            <text x="100" y="0" opacity="0.7">01001010</text>
          </g>
        </svg>
)

