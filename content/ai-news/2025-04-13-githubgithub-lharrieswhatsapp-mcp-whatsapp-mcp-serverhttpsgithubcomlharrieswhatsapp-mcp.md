---
title: ElevenLabs MCP
description: levenLabs推出 ElevenLabs MCP 服务器
author: LuoYuan
date: Sun Apr 13 2025 00:00:00 GMT+0000 (Coordinated Universal Time)
image: ""
link: ""
category: ai-news
tags: []
featured: false
source: ""
---

GitHub：[GitHub - lharries/whatsapp-mcp: WhatsApp MCP server](https://github.com/lharries/whatsapp-mcp)


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

\