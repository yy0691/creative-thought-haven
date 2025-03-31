export const qwen25omin = `
**阿里云发布Qwen2.5Omni端到端全模态感知与响应模型支持看、听、说、写、做**


## 简介

**Qwen2.5-Omni**是通义千问（Qwen）团队发布的最新旗舰多模态大模型，是一款**端到端全模态感知与响应模型，是一个可以==“看、听、说、写、理解一切”==的 AI 模型。**

- 它不仅能处理文本，还能理解图片、语音、视频；
- 它可以像人一样边听边说，实时对话，语音很自然；
- 无论是让它听你说话，还是给它视频、图片，它都能理解并做出回应；
- 在多种任务测试中都表现非常出色，比很多同类 AI 更强大；
- 它适合做语音助手、多模态 AI 对话、视频理解等各种智能应用；
- 未来还会加入更多能力，真正做到“全模态统一”。

## **主要特性**

1. **Omni 架构与新颖设计**
- 引入 **Thinker-Talker 架构**：
    - **Thinker**：类似人脑，负责处理文本、音频和视频等输入，生成高层语义表示和文本。
    - **Talker**：类似人嘴，接收 Thinker 的表示，流式生成自然语音。
- 创新 **时间对齐位置编码（TMRoPE）**：实现视频与音频时间同步。

2. **实时语音与视频交互能力**
- 结构设计支持实时输入和即时输出，适用于语音对话等应用场景。
3. **自然且强健的语音合成**
- 在语音自然性与稳定性方面，优于多种流式与非流式语音生成模型。
4. **跨模态性能卓越**
- 在同尺寸模型中表现优异，音频能力超越 Qwen2-Audio，与 Qwen2.5-VL-7B 在图像处理能力上相当。

5. **端到端语音指令跟随能力出色**
- 在语音指令跟随方面与文本指令同样强大，基准测试（如 MMLU 和 GSM8K）表明其效果显著。

## 架构设计

![架构设计详解：Thinker-Talker 架构](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02kp_b2732eb4-0f15-47a2-bd47-197d0496898g.png)

Qwen2.5-Omni 的核心架构采用了创新的 **“Thinker-Talker”**架构，目的是实现真正的 **端到端多模态建模与生成**。

![img_v3_02kp_12832544-a45f-4cd0-9963-cfbec5b80d9g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02kp_12832544-a45f-4cd0-9963-cfbec5b80d9g.png)

它分为两个主要模块：

### **🧠 Thinker：理解与表达生成模块**

✅ 角色：

- 类似“大脑”，负责多模态信息的处理与高层次语义理解。

✅ 功能：

- 接收来自 **文本、图像、音频、视频**的输入。
- 将它们转换为统一的 **高维语义表示**。
- 生成中间文本信息，作为 Talker 的输入。

✅ 技术细节：

- 基于 **Transformer 解码器**。
- 配有专门的 **图像与音频编码器**：
- 图像编码器提取视觉特征；
- 音频编码器将语音转换为语义向量。
- 支持时间对齐的嵌入机制：
- 使用 **TMRoPE（Time-aligned Multimodal RoPE）**，对齐视频帧和音频时间戳。

### **👄 Talker：流式语音输出模块**

✅ 角色：

- 类似“嘴巴”，负责将 Thinker 输出的语义信息转换为自然语音响应。

✅ 功能：

- **流式生成语音**，边处理边输出，不需等待全部输入完成。
- 输出语音以离散语音 token 形式，最终合成为自然语音。

✅ 技术细节：

- **双轨自回归 Transformer 解码器**：
- 一个轨道处理语义 token；
- 另一个轨道处理语音 token。
- **共享上下文机制**：
- Talker 完全继承 Thinker 的历史上下文信息。
- 确保对话流畅，响应连贯。

### **🔄 端到端训练与推理**

- Thinker 和 Talker 并不是两个独立模型，而是作为一个整体联合训练。
- **训练与推理皆为端到端流程**，无需中间模型或模块连接。
- 好处包括：
- 模型更紧密协同；
- 延迟更低；
- 语音与文本响应更自然一致。

### **📊 全模态性能领先**

- 在多个模态任务中表现卓越：
- **音频理解性能**优于同等规模的 Qwen2-Audio
- 与 Qwen2.5-VL-7B 在视觉语言任务中表现相当

![img_v3_02kp_7ad37769-ef10-40b3-ad27-e8d7443e4fag](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02kp_7ad37769-ef10-40b3-ad27-e8d7443e4fag.png)

**Qwen2.5-Omni在包括图像，音频，音视频等各种模态下的表现都优于类似大小的单模态模型以及封闭源模型，例如Qwen2.5-VL-7B、Qwen2-Audio和Gemini-1.5-pro。**

**在多模态任务OmniBench，Qwen2.5-Omni达到了SOTA的表现。**

**此外，在单模态任务中，Qwen2.5-Omni在多个领域中表现优异，包括语音识别（Common Voice）、翻译（CoVoST2）、音频理解（MMAU）、图像推理（MMMU、MMStar）、视频理解（MVBench）以及语音生成（Seed-tts-eval和主观自然听感）。**

![img_v3_02kp_5bde2e89-c5da-4035-b412-f9caba6c69dg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/AiNews/img_v3_02kp_5bde2e89-c5da-4035-b412-f9caba6c69dg.jpg)

访问 [Qwen Chat](https://chat.qwenlm.ai/) 并选择Qwen2.5-Omni-7B体验。

该模型现已在 [Hugging Face](https://huggingface.co/Qwen/Qwen2.5-Omni-7B)、[ModelScope](https://modelscope.cn/models/Qwen/Qwen2.5-Omni-7B)、[DashScope](https://help.aliyun.com/zh/model-studio/user-guide/qwen-omni)和 [GitHub](https://github.com/QwenLM/Qwen2.5-Omni)上开放，技术文档请查阅我们的[论文](https://github.com/QwenLM/Qwen2.5-Omni/assets/Qwen2.5_Omni.pdf)。

`