// scripts/manage-news.js
import fs from 'fs';
import path from 'path';

class NewsManager {
  createNews(title, description, author, category = 'AI新闻') {
    const date = new Date().toISOString().split('T')[0];
    const filename = `${date}-${title.replace(/[^a-zA-Z0-9]/g, '-')}.md`;
    
    const frontmatter = `---
title: "${title}"
description: "${description}"
author: "${author}"
date: ${date}
image: ""
link: ""
category: "${category}"
tags: ["${category}"]
featured: false
---

# ${title}

${description}

## 详细内容

在这里添加详细内容...
`;

    fs.writeFileSync(
      path.join('content/news/ai-news', filename),
      frontmatter
    );
    
    console.log(`创建新闻文件: ${filename}`);
  }
}

// 使用示例
const manager = new NewsManager();
manager.createNews(
  "OpenAI发布GPT-5",
  "OpenAI正式发布了GPT-5模型，性能大幅提升",
  "OpenAI"
);
