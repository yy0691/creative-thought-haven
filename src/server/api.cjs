const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 保存文章
app.post('/api/posts', async (req, res) => {
  try {
    const { slug, content } = req.body;
    const filePath = path.join(process.cwd(), 'src', 'content', `${slug}.mdx`);
    await fs.writeFile(filePath, content, 'utf-8');
    res.json({ success: true });
  } catch (error) {
    console.error('保存文章失败:', error);
    res.status(500).json({ success: false, error: '保存文章失败' });
  }
});

// 删除文章
app.delete('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const filePath = path.join(process.cwd(), 'src', 'content', `${slug}.mdx`);
    await fs.unlink(filePath);
    res.json({ success: true });
  } catch (error) {
    console.error('删除文章失败:', error);
    res.status(500).json({ success: false, error: '删除文章失败' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API 服务器运行在端口 ${PORT}`);
});