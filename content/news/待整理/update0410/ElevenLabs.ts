export const ElevenLabsContent = `

GitHub：[GitHub - lharries/whatsapp-mcp: WhatsApp MCP server](https://github.com/lharries/whatsapp-mcp)

ElevenLabs推出 ElevenLabs MCP 服务器

通过简单的文本提示，可以让 AI 助手（比如 Claude、Cursor、Windsurf 等）直接访问整个 ElevenLabs AI 音频平台。

简单来说，它就像一个桥梁，把 ElevenLabs 的文字转语音、语音克隆等技术，连接到你常用的 AI 工具里，让它们能“说话”或处理声音。

它提供统一、可扩展的语音服务接口，简化了 API 的调用流程。

你甚至可以启动语音代理来为你执行外拨电话——例如点披萨。

<video data-key="file_v3_00l5_afd2ac26-4c9f-4fc7-a260-9dbaee944f1g" data-middle-image="{&quot;key&quot;:&quot;middle:img_v3_02l5_fb98a44f-ec3c-4136-85af-9223591645fg&quot;,&quot;urls&quot;:[],&quot;width&quot;:960,&quot;height&quot;:720,&quot;type&quot;:2,&quot;exifOrientation&quot;:0,&quot;crypto&quot;:&quot;CAESMgogkB7dRpwU29QwOn2ekv5MhXZ8xORkSAcBqMNONwZQ6oYSDCHDaKkVokxz+MLVGBoA&quot;,&quot;fsUnit&quot;:&quot;eu_nc-cdn&quot;}" data-crypto-token="img_v3_02l5_fb98a44f-ec3c-4136-85af-9223591645fg" data-duration="114300" data-copy-id="7400356674370256898" data-lark-video-uri="imkey://file_v3_00l5_afd2ac26-4c9f-4fc7-a260-9dbaee944f1g?visit_info=%7B%22entityId%22%3A%227490893909217214492%22%2C%22sceneType%22%3A1%7D" data-lark-video-duration="114300" data-lark-video-height="720" data-lark-video-mime="video/mp4" data-lark-video-name="1b2f51c5-ded7-4818-8a7a-0070394bf23d.mp4" data-lark-video-size="5751272" data-lark-video-width="960"></video>



**提供的功能包括：**

- **文字转语音**：将书面内容转换为语音或创建有声书。
- **语音转文字**：将音频和视频转录为文字。
- **克隆声音（Voice Cloning）**
- **多说话人识别和再合成**
- **语音设计师**：创建自定义的AI语音。
- **会话式AI**：高度自定义语音交互代理生成，构建能够执行任务的动态语音代理，例如拨打外拨电话。



**功能详解与数据流**

ElevenLabs MCP 的主要功能包括：

1. **文本转语音（Text to Speech）**

- 输入：字符串文字（如"Hello world"）
- 输出：合成的语音文件（.mp3 / .wav）
- 使用：调用 ElevenLabs 的 tts API。
- **语音克隆（Voice Cloning）**

- 输入：目标语音样本
- 输出：合成出的模仿声音
- 用法示例：“让 AI 说话像一个龙族智者” 的语音风格创建。
- **语音转文字（Speech to Text / Transcription）**

- 输入：音频（.wav、.mp3 等）
- 输出：文本内容（支持说话人识别）
- 可选支持转成不同角色的声音后输出语音
- **语音再合成**

- 场景：一个输入音频中有多个说话人，转录并重新以不同声音角色合成返回。
- **音景生成（Soundscape）**

- 输入：描述（prompt），如“热带雨林雷暴”
- 输出：合成自然环境音效

✅ 请求处理逻辑简述（伪数据流）：

\`\`\`
MCP 客户端 (如 Claude) --> MCP Server (elevenlabs-mcp)
   --> 收到请求指令（如 TTS）
   --> 提取配置与 API Key
   --> 调用 ElevenLabs API（如 tts 端点）
   --> 返回音频内容给客户端
\`\`\`

**怎么用它？**

用起来很简单，主要分几步：

1. **获取 API 密钥**：

- 去 ElevenLabs 官网注册账号，拿一个 API 密钥（免费版每月有 10,000 个字符额度）。

1. **安装服务器**：

- 用 Python 工具（比如 uv）安装 ElevenLabs MCP 服务器。
- 比如在终端输入：uvx elevenlabs-mcp。

1. **配置客户端**：

- 在你的 AI 工具（比如 Claude Desktop）里加几行代码，告诉它怎么找这个服务器。

\`\`\`
示例配置：


{
  "mcpServers": {
    "ElevenLabs": {
      "command": "uvx",
      "args": ["elevenlabs-mcp"],
      "env": {
        "ELEVENLABS_API_KEY": "你的密钥"
      }
    }
  }
}
\`\`\`

1. **开始用**：

- 配置好后，你的 AI 工具就能直接调用 ElevenLabs 的功能了。

**注意**：Windows 用户可能需要在工具里开“开发者模式”。

GitHub：https://github.com/elevenlabs/elevenlabs-mcp 

**通过与WhatsApp 的 MCP 服务器连接 WhatsApp可以收发语音**

WhatsApp 的 MCP 服务器现在可以发送和接收图片、视频以及语音信息。通过将它与新的 ElevenLabs MCP 服务器结合使用，你可以增强其功能——利用 AI 技术转录语音信息，并且可以使用超过 3000种不同的语音发送语音消息。推文中还提供了相关的链接和视频演示。

- WhatsApp MCP 服务器增加了对图片、视频和语音信息的支持。
- 与 ElevenLabs MCP 服务器结合后，你可以让 AI 自动转录语音信息并发送多种语音的音频消息。

WhatsApp MCP是一个将 WhatsApp 与 LLM（如 Claude）集成的 Model Context Protocol (MCP) 服务器。该服务使 LLM 具备如下能力：

![img_v3_02l5_b5f6d896-c8d7-4000-8326-1f291e33c93g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l5_b5f6d896-c8d7-4000-8326-1f291e33c93g.jpg)

- 读取 WhatsApp 聊天记录（包括文字、图片、视频、音频、文档）
- 搜索联系人和聊天内容
- 发送消息或文件给个人或群组
- 下载并使用多媒体内容
- 支持 Claude Desktop、Cursor 等 MCP 客户端

它能让 Claude 这种 AI 跟你的 WhatsApp 联系人对话

- 可以搜聊天、转发消息、发图、发音频，甚至从对话中提取上下文
- 你自己掌控哪些消息可以发给 AI，它不会自动上传云端
- 不联网时仍可离线查看记录（保存在你电脑的数据库中）


`