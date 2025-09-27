export const GoogleVeoContent = `
0407

**Google开放其视频模型Veo 2API可以通过Gemini API使用支持文字+图像+风格描述生成高质量短视频**

https://ai.google.dev/gemini-api/docs/video?hl=zh-cn

![img_v3_02l7_d18149dc-373e-4df5-b045-1e09fbdf791g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_d18149dc-373e-4df5-b045-1e09fbdf791g.jpg)

**Veo** 是 Google 旗下最强大的视频生成模型（由 DeepMind 开发），支持通过 Gemini API 使用。

你可以用它实现：

- 📄 文本转视频（Text-to-Video）
- 🖼️ 图片转视频（Image-to-Video）
- 🤖 多模态提示（文字 + 图像 +风格描述）生成高质量短视频



**价格**

每秒是0.35美金，视频时长范围为 **5 ~ 8 秒**

• 因此，每次调用的价格在：

• **$1.75 ~ $2.80 美元 / 次调用**

![img_v3_02l7_1f022654-733a-492d-9d5b-92ca43c68afg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_1f022654-733a-492d-9d5b-92ca43c68afg.jpg)



**怎么调用？支持哪些语言？**

你可以用 Gemini API + Gen AI SDK 发起调用，目前支持：

- ✅ Python ≥ 1.10.0
- ✅ JavaScript / TypeScript ≥ 0.8.0
- ✅ Go ≥ 1.0.0

调用方式包括：

- 使用文本提示生成视频
- 先用 Imagen 生成图片，再作为起始帧生成视频

**请求参数详解（可调选项）**

![img_v3_02l7_03951c2d-59cb-41f8-96af-f63c1248193g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l7_03951c2d-59cb-41f8-96af-f63c1248193g.jpg)



**如何使用？开发流程一览**

**✅ 1. 安装环境 & SDK 要求**

需安装 Google Gen AI SDK，并配置 Gemini API Key：

语言SDK 要求Python>= v1.10.0JS / TS>= v0.8.0Go>= v1.0.0

**✅ 2. 文本转视频代码结构（Python 示例）：**

\`\`\`
import time
from google import genai
from google.genai import types

client = genai.Client()  # read API key from GOOGLE_API_KEY

operation = client.models.generate_videos(
    model="veo-2.0-generate-001",
    prompt="Panning wide shot of a calico kitten sleeping in the sunshine",
    config=types.GenerateVideosConfig(
        person_generation="dont_allow",  # "dont_allow" or "allow_adult"
        aspect_ratio="16:9",  # "16:9" or "9:16"
    ),
)

while not operation.done:
    time.sleep(20)
    operation = client.operations.get(operation)

for n, generated_video in enumerate(operation.response.generated_videos):
    client.files.download(file=generated_video.video)
    generated_video.video.save(f"video{n}.mp4")  # save the video
\`\`\`

此代码大约需要 2-3 分钟才能运行完毕，但如果资源受限，则可能需要更长时间。

如果您看到错误消息，而不是视频，则表示资源有限，您的请求无法完成。在这种情况下，请再次运行代码。

生成的视频会在服务器上存储 2 天，之后就会被移除。如果您想保存生成的视频的本地副本，则必须在生成后的 2 天内运行 result() 和 save()。

**✅ 3. 图片转视频方式（Image-to-Video）**

您还可以使用图片生成视频。以下代码使用 Imagen 生成图片，然后使用生成的图片作为生成的视频的起始帧。

首先，使用 [Imagen](https://ai.google.dev/gemini-api/docs/image-generation?hl=zh-cn#imagen) 生成图片：

\`\`\`
prompt="Panning wide shot of a calico kitten sleeping in the sunshine",

imagen = client.models.generate_images(
    model="imagen-3.0-generate-002",
    prompt=prompt,
    config=types.GenerateImagesConfig(
      aspect_ratio="16:9",
      number_of_images=1
    )
)

images[0]
\`\`\`

然后，使用生成的图片作为第一帧生成视频：

\`\`\`
operation = client.models.generate_videos(
    model="veo-2.0-generate-001",
    prompt=prompt,
    image = images[0],
    config=types.GenerateVideosConfig(
      # person_generation only accepts "dont_allow" for image-to-video
      aspect_ratio="16:9",  # "16:9" or "9:16"
      number_of_videos=2
    ),
)

# Wait for videos to generate
 while not operation.done:
  time.sleep(20)
  operation = client.operations.get(operation)

for n, video in enumerate(operation.response.generated_videos):
    fname = f'with_image_input{n}.mp4'
    print(fname)
    video.save(fname)
\`\`\`

⚠️ 注意：**图片转视频不支持人物生成功能**（person_generation="dont_allow"）

**提示词写法建议（Prompt Engineering）**

Veo 可以理解非常复杂的电影语言，包括：

**推荐提示结构：**

\`\`\`
[主题] + [背景] + [动作] + [风格] + [相机运动] + [构图] + [氛围]
\`\`\`

写好提示是生成好视频的关键！你可以参考以下结构：

1. **主题（Subject）**：谁在画面中？（人、动物、物体）
2. **背景（Background）**：在哪发生？（城市、森林、室内…）
3. **动作（Action）**：在做什么？（跑步、打电话、跳舞…）
4. **风格（Style）**：动画、电影感、卡通、复古…
5. **相机运动（Camera）**：跟拍、航拍、摇臂、推近…
6. **构图（Composition）**：广角、特写、近景…
7. **氛围（Ambiance）**：冷暖色调、日落、梦幻、悲伤等

**✅ 示例 Prompt：**

> 一位穿绿色风衣的男子，在夜晚下雨的街头用旋转电话打电话。镜头推近他的脸部，霓虹灯光晃动，画面风格像黑色电影，气氛悲伤，采用浅景深与特写镜头。



**否定提示（Negative Prompt）注意事项**

用于明确你**不想出现的元素**。

**✅ 正确写法：**

\`\`\`
negativePrompt="城市背景, 建筑物, 黑暗, 威胁氛围"
\`\`\`

**❌ 不推荐写法：**

- “不要有房子”
- “不能出现人脸” （错误点：含否定语或命令式语言）



**构图与宽高比：控制画面呈现风格**

参数场景适用描述aspectRatio="16:9"横屏（风景、电影感）aspectRatio="9:16"竖屏（短视频、人物特写）

你还可以通过 prompt 控制：

- 📸 相机运动：推拉、航拍、平移、摇臂
- 🎥 构图方式：特写镜头、广角、俯拍
- 🌈 色调氛围：冷色调、暖阳、柔和光线等



**视频生成机制 & 限制说明**

✅ 执行机制：

- 使用异步任务 operation 轮询获取状态
- 每个生成视频在服务器上 **仅保留 2 天**，需尽早保存

⚠️ 注意事项：

- 每次生成最多 2 个视频版本
- 文本必须为英文，生成速度可能波动
- 上传图像的尺寸和质量会影响视频效果

详细内容：https://ai.google.dev/gemini-api/docs/video?hl=zh-cn
`