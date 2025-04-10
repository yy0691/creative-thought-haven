export const tripoMcp = `
# 🧩 为什么要用 Tripo 插件？

在使用Blender进行3D建模时，使用Tripo 插件 + AI 帮助设计师更快地工作，更有效地管理复杂任务，通过将 Blender 与外部服务如 Cursor 链接，可以减少重复工作量，并专注于灵感创意。

通过 Tripo 的 Blender AI 插件，你可以：

- 自动处理重复性任务
- 接入外部 AI 工具（如 Cursor）
- 更快生成复杂的 3D 模型和场景



# 📦 全流程步骤拆解

## 🚀 Step 1：安装 Tripo 插件（在 Blender 中）

1. 下载插件 [ZIP 文件](https://drive.google.com/drive/u/0/folders/1uYL-LPaeThGSfvhcf0v2LS3EHIvba-wL)
2. 打开 Blender > Edit > Preferences > Add-ons

![img_v3_02km_3a40c2ae-d32a-4b01-a308-11789326c95g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02km_3a40c2ae-d32a-4b01-a308-11789326c95g.jpg)

3. 点击 Install 安装插件 ZIP

![img_v3_02km_fd582c74-1294-44c7-99a8-65e91b6198dg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02km_fd582c74-1294-44c7-99a8-65e91b6198dg.jpg)

4. 勾选启用插件 ✅

![img_v3_02km_aa29131b-54b6-4a7f-888a-8cf0b210a7bg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02km_aa29131b-54b6-4a7f-888a-8cf0b210a7bg.jpg)

5. 插件成功后，Blender 右侧面板会出现 “Tripo” 标签



## 🔑 Step 2：获取 API Key（用于授权 Tripo 服务）

1. 前往 [Tripo Developer Portal](https://tripo3d.ai/)
2. 注册 / 登录

![img_v3_02km_1c14f563-0184-4766-b666-b80de82fdc0g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02km_1c14f563-0184-4766-b666-b80de82fdc0g.jpg)

3. 进入 API Keys 页面，创建新密钥

![img_v3_02km_8c0453d6-0bf9-4e27-93f1-9efd03f7acbg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02km_8c0453d6-0bf9-4e27-93f1-9efd03f7acbg.png)

4. 命名并复制该 API Key（后续配置用）

![img_v3_02km_0ac37328-a22d-489a-b16c-0052691e4cbg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02km_0ac37328-a22d-489a-b16c-0052691e4cbg.png)



## **⚙️ Step 3：在 Blender 中配置 Tripo + 启动 MCP**

1. 按下 N 键，在 3D 视图右侧面板找到 Tripo 插件
2. 粘贴 API Key
3. 点击 “Start MCP Server” 按钮（此为本地服务）

![img_v3_02km_671c651e-8461-42d0-b2ee-ab28ca0c3f7g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02km_671c651e-8461-42d0-b2ee-ab28ca0c3f7g.jpg)

## **🔗 Step 4：手动运行 MCP Server（命令行方式）**

MCP 是一个“中间通信协议”，让 Blender 能和其他 AI 工具（如 Cursor）实时交互。

1. 打开命令行（Win+R 输入 cmd）

![img_v3_02km_9a2709b6-f0d7-4fa2-b52c-523263d5be3g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02km_9a2709b6-f0d7-4fa2-b52c-523263d5be3g.jpg)

2. 进入 tripo-mcp 文件夹路径：

\`\`\`
cd "C:\path\to\tripo-mcp"
\`\`\`

3. 安装依赖：

\`\`\`
pip install -r requirements.txt
\`\`\`

4. 运行主脚本：

\`\`\`
python main.py
\`\`\`

📌 可选安装方式：也支持通过 pip install mcp 快速部署

\`\`\`
uv add mcp[cli]
\`\`\`

or  或者

\`\`\`
pip install mcp
\`\`\`

![img_v3_02km_d13afa19-2740-4854-acd1-3e38b2ce3bag](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02km_d13afa19-2740-4854-acd1-3e38b2ce3bag.jpg)

执行成功后，将包含 [main.py](http://main.py/) 的文件夹拖到命令窗口中，以自动填充路径

![img_v3_02km_f45ee6e1-0b1f-4365-b320-2a63ecba708g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02km_f45ee6e1-0b1f-4365-b320-2a63ecba708g.jpg)

## **💡 Step 5：连接 Cursor（AI 编程工具）**

Cursor 是一个内置大模型能力的代码编辑器，支持通过 MCP 接入 Tripo，进行 AI 生成和优化。

配置步骤：

1. 打开 Cursor > Settings > MCP Configuration

![img_v3_02km_42c89753-242b-4a8c-a125-16ffb157fe3g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02km_42c89753-242b-4a8c-a125-16ffb157fe3g.png)

2. 添加新 Endpoint：

- 名称：Tripo_MCP
- 类型：SSE

3. 地址：http://127.0.0.1:8392/sse

![img_v3_02km_023bacd6-6e4f-4cb9-b092-cda69964cd9g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02km_023bacd6-6e4f-4cb9-b092-cda69964cd9g.png)



4. 启用此 Endpoint（绿色状态代表连接成功）

![img_v3_02km_8dc9ff57-ba55-4e98-857f-761dd10cf3ag](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02km_8dc9ff57-ba55-4e98-857f-761dd10cf3ag.jpg)

连接成功后，你可以在 Cursor 中使用 MCP 的工具列表（如生成 3D 模型、分析场景等）。

# 🧠 如何使用：在 Cursor 中调用 Tripo 做 3D AI 任务

## 步骤

设置完 MCP 服务器和 Cursor 后，您就可以开始在 Cursor 中使用 Tripo 了。 **为获得最佳效果，请将 Agent 切换为 claude-3.7-sonnet**

![img_v3_02km_f71370aa-b286-4fc5-8395-b2dc535ad5fg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02km_f71370aa-b286-4fc5-8395-b2dc535ad5fg.jpg)

1. 新建一个对话（Chat）
2. 输入设计需求（Prompt）

![img_v3_02km_7384ac24-3fb7-4703-9195-76059418ceeg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02km_7384ac24-3fb7-4703-9195-76059418ceeg.png)

## 提示类型

- 简洁要求但期待详细设计：

> "我的需求很简短，但你足够聪明，可以设计出完整的专业方案。"

- 自主推理、分析优化型：

> "分析项目限制，优化视觉层次结构，自主提出方案并实现一个世界级项目。"

✨ 你可以通过这些 Prompt 控制 Tripo+Cursor 生成 3D 空间、布局建议、建模计划等。

当您安装 Tripo 插件、获取 API 密钥、配置 Blender、设置 MCP 服务器、连接到 Cursor 并使用战略提示时，您可以显著提升 3D 设计工作流程。这种集成减少了繁琐的工作，确保工具之间的通信更加顺畅，并释放您的创造力以完成更高价值的任务。

Tripo MCP：[GitHub - VAST-AI-Research/tripo-mcp: MCP server for Tripo](https://github.com/VAST-AI-Research/tripo-mcp)


`