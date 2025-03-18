# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/6be767af-68e7-4de8-a0ee-f404b727827b

## Coze API 配置指南

本项目使用Coze API获取AI新闻。以下是配置步骤：

### 1. 创建Coze账号并获取Personal Access Token (PAT)

1. 访问 [Coze官网](https://www.coze.cn/) 并注册/登录账号
2. 点击右上角头像，选择"设置"
3. 选择"API访问"或"开发者设置"
4. 点击"生成新Token"按钮
5. 设置Token名称和有效期，然后创建
6. 复制生成的PAT（重要：此Token仅显示一次）

### 2. 创建智能体

1. 在Coze平台创建一个新的智能体
2. 添加一个能够返回新闻数据的功能
3. 确保智能体可以返回符合以下格式的数据：
```json
{
  "output": {
    "allnum": 1,
    "curpage": 1,
    "newslist": [
      {
        "ctime": "2025-03-16 10:00",
        "description": "新闻描述...",
        "id": "唯一ID",
        "picUrl": "图片URL",
        "source": "新闻来源",
        "title": "新闻标题",
        "url": "新闻链接"
      }
    ]
  }
}
```
4. 发布智能体并记录智能体ID

### 3. 配置环境变量

1. 在项目根目录创建 `.env.local` 文件
2. 添加以下内容：
```
# Coze API配置
VITE_COZE_PAT=your_personal_access_token_here
VITE_COZE_BOT_ID=your_bot_id_here
```
3. 将 `your_personal_access_token_here` 替换为你的PAT
4. 将 `your_bot_id_here` 替换为你的智能体ID

### 4. 测试API配置

运行以下命令测试配置是否正确：
```bash
npm run test:api
```

如果看到"API测试成功完成！"的消息，说明配置成功。

### 疑难解答

如果遇到"Login verification is invalid"错误：
1. 检查PAT是否已过期（Coze PAT通常有效期为7-90天）
2. 确认PAT格式正确，且是完整的Token
3. 尝试在Coze平台重新生成PAT

## Environment Variables

This project uses Coze API for fetching AI news. To make it work properly, you need to set up environment variables:

1. Create a `.env.local` file in the project root (or copy from `.env.example`)
2. Add the following variables:

```
# Coze API配置
VITE_COZE_PAT=your_personal_access_token_here
VITE_COZE_BOT_ID=your_bot_id_here
```

To get your Personal Access Token (PAT):
1. Log in to [Coze](https://www.coze.cn/)
2. Go to your account settings
3. Generate a new Personal Access Token
4. Copy the token and paste it in your `.env.local` file
