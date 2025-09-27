export const OmniSVG = `
OmniSVG 是一个用于生成高质量、可扩展矢量图形（SVG）的统一框架，基于预训练的视觉-语言模型（Vision-Language Model, VLM），旨在解决传统 SVG 生成方法在结构复杂性、计算成本和多模态支持上的局限。该项目由复旦大学和 StepFun 团队开发

也就是它是一个能把**文字或图片转换成高质量 SVG 矢量图**的 AI 模型，既适合生成简单图标，也能做出复杂的动漫角色。

SVG 是一种常见的图像格式，优点是：

- 不管放大多少倍都不会模糊（**无限缩放不失真**）；
- 很容易修改（**设计师友好**）；
- 常用于图标、插画、卡通人物等。

OmniSVG 就像是一个“**会画图的 AI 设计师**”，你告诉它一段文字或给它一张图片，它就能“画”出一张高质量、可编辑的 SVG 图像。

- 支持生成 **插画级别的复杂图形**，不仅仅是简单图标；
- 可应用于 **角色设计、动漫人物、装饰图案** 等更复杂视觉场景；
- 输出的 SVG 文件 **结构逻辑清晰、可编辑**，方便设计师使用。



**它有哪些功能和亮点？**

![img_v3_02la_c0fcea5c-6fe6-4e75-a84a-54ca2b0ec81g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02la_c0fcea5c-6fe6-4e75-a84a-54ca2b0ec81g.jpg)

![img_v3_02la_65b4f49e-971e-4205-ac4e-482f721dc5eg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02la_65b4f49e-971e-4205-ac4e-482f721dc5eg.jpg)

1. **文本到 SVG 生成（Text-to-SVG）**

- 根据自然语言描述生成 SVG 图形。
- 示例：输入“一个蓝色五角星”可生成对应的矢量五角星，支持颜色、形状和复杂结构描述。
- 适用场景：快速生成图标、标志或简单插图。

![img_v3_02la_0b9a4366-530a-4721-87cd-1f3a93153b1g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02la_0b9a4366-530a-4721-87cd-1f3a93153b1g.jpg)

1. **图像到 SVG 生成（Image-to-SVG）**

- 将普通图像（如 PNG、JPG）转化为可编辑的矢量 SVG。
- 特点：保留图像细节，支持多层次结构和颜色信息。
- 适用场景：将手绘草图或现有图像转换为矢量格式，便于编辑和缩放。

![img_v3_02la_d8a11d0f-c234-48ba-99d4-29e38c46f87g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02la_d8a11d0f-c234-48ba-99d4-29e38c46f87g.jpg)

1. **角色参考 SVG 生成（Character-Reference SVG）**

- 基于参考图像或文本描述生成复杂的 SVG 角色，如动漫人物或卡通形象。
- 特点：能捕捉角色细节（如表情、服饰），生成多层次、色彩丰富的矢量图形。
- 适用场景：游戏设计、动画制作、个性化角色创作。

![img_v3_02la_f188f593-8dbb-4e10-83cd-2528998365eg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02la_f188f593-8dbb-4e10-83cd-2528998365eg.jpg)

1. **高质量与多样性**

- 支持从单色简单图标到多色复杂插图的广泛复杂度范围。
- 生成的 SVG 具有**分辨率无关性**（可无限缩放不失真）和**可编辑性**（易于修改路径、颜色等）。
- 相比传统方法，生成的图形结构更紧凑、细节更生动。

1. **高效生成**

- 端到端生成速度快，适合实时应用，优于需要大量路径优化的方法（如 DiffVG）。
- 支持渐进式生成，逐步构建复杂图形，确保输出可控。

1. **支持专业设计流程**

- 输出的 SVG 是 **规范的、结构分层清楚** 的；
- 可直接在 **设计软件**（如 Figma、Adobe Illustrator）中打开和编辑；
- 能无缝集成进图形设计、UI 设计、AIGC 平台等 **专业工作流**。

1. **多模态数据集支持（MMSVG-2M）**

- OmniSVG 使用了一个它们自建的大型数据集 **MMSVG-2M**，包含了 **200 万个 SVG 图像+描述/图片对**，主要分为：
  - **图标类（Icon）**：常见UI图标。
  - **插画类（Illustration）**：色彩丰富的卡通图。
  - **角色类（Character）**：动漫人物、游戏角色。
- 支持多模态训练和评估，推动 SVG 生成技术的研究和应用。

**用了什么方法？**

![img_v3_02la_06fff069-5646-4724-b7a8-4a0e57377fag](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02la_06fff069-5646-4724-b7a8-4a0e57377fag.jpg)

OmniSVG 的创新之处在于将预训练的视觉语言模型（ Qwen-VL）与自研的 SVG 编码器相结合，把复杂图形“翻译”成 AI 能理解的语言。

**OmniSVG 采用了三大关键技术：**

**1. 视觉语言模型（VLM）**

OmniSVG 用了一个叫 **Qwen-VL** 的 AI 模型，这种模型擅长理解“图+文”组合的信息。它能看懂图片，也能读懂文字，还能把两者结合起来理解。

2. **SVG Tokenizer（矢量图编码器）**

SVG 图像其实是一连串“指令”（比如：画线、画圆、设置颜色），OmniSVG 会把这些变成 AI 可以理解的小单位（叫 **token**），方便它学习和生成新的 SVG 图。

📝 类比：就像学钢琴之前要学乐谱一样，OmniSVG 给 SVG 图设计了一种“专属乐谱”，AI 读懂了之后就能“谱写新乐章”。

3. **多模态输入能力**

它可以理解多种输入方式，支持：

- **文字生成 SVG**（输入 “一只卡通狐狸”，输出相应图形）；
- **图片转 SVG**（输入照片或图像，输出矢量图版本）；
- **角色风格参考生成**（输入一个角色样图，再让它生成风格一致的新图）。

**实验与表现**

- **生成质量**：OmniSVG 在生成复杂图形（如动漫角色）的视觉效果和细节保留上表现出色，优于传统方法（如 DiffVG、DeepSVG）。
- **多样性**：支持从单色图标到彩色插图的广泛复杂度范围，生成的 SVG 结构清晰、层次分明。
- **效率**：与需要大量路径优化的方法（如 LIVE，生成单个 SVG 需 10 分钟）相比，OmniSVG 的端到端生成速度更快，适合实时应用。
- **用户反馈**：设计师和研究人员对 OmniSVG 的高质量输出表示认可，认为其重新定义了 SVG 生成的标准。

![img_v3_02la_58bb4ed0-c4b2-4a22-9689-a977db6872bg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02la_58bb4ed0-c4b2-4a22-9689-a977db6872bg.jpg)

**适合哪些人？**

OmniSVG 的设计使其在以下领域具有广泛的应用潜力：

1. **图形设计**：设计师可通过文本或图像快速生成可编辑的 SVG，加速创意流程。
2. **网页开发**：生成轻量级、高分辨率的矢量图形，优化网页加载速度和视觉效果。
3. **游戏与动画**：支持复杂角色和场景的 SVG 生成，适用于 2D 游戏或动画制作。
4. **自动化工作流**：与专业设计软件集成，简化从草图到矢量图的转换过程。

其生成的 SVG 具有**分辨率无关性**（Resolution Independence）和**可编辑性**（Editability），非常适合需要高质量视觉效果的场景。

**Hugging Face**：https://huggingface.co/OmniSVG 

项目地址：https://omnisvg.github.io/

论文：https://arxiv.org/pdf/2504.06263

GitHub：https://github.com/OmniSVG/OmniSVG
`