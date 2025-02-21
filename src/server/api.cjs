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
    if (!slug || !content) {
      return res.status(400).json({ success: false, message: '缺少必要的参数' });
    }

    const filePath = path.join(__dirname, '..', 'content', `${slug}.mdx`);
    const dirPath = path.dirname(filePath);

    // 确保目录存在
    await fs.mkdir(dirPath, { recursive: true });

    // 写入文件
    await fs.writeFile(filePath, content, 'utf8');
    res.json({ success: true });
  } catch (error) {
    console.error('保存文章失败:', error);
    res.status(500).json({ success: false, message: error.message || '保存文章失败' });
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

// 获取文章内容
app.get('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    // 对中文标题进行 URL 编码
    const encodedSlug = encodeURIComponent(slug);
    const filePath = path.join(__dirname, '..', 'content', `${encodedSlug}.mdx`);
    
    const content = await fs.readFile(filePath, 'utf-8');
    res.json({ success: true, content });
  } catch (error) {
    console.error('获取文章失败:', error);
    res.status(500).json({ 
      success: false, 
      message: '获取文章失败: ' + error.message 
    });
  }
});

// 更新文章
app.put('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { content } = req.body;
    
    // 添加参数验证
    if (!content) {
      return res.status(400).json({ success: false, message: '缺少必要的参数' });
    }

    // 对中文标题进行 URL 编码
    const encodedSlug = encodeURIComponent(slug);
    const filePath = path.join(__dirname, '..', 'content', `${encodedSlug}.mdx`);
    
    try {
      // 写入文件
      await fs.writeFile(filePath, content, 'utf8');
      res.json({ success: true });
    } catch (error) {
      console.error('写入文件失败:', error);
      res.status(500).json({ 
        success: false, 
        message: '写入文件失败: ' + error.message 
      });
    }
  } catch (error) {
    console.error('更新文章失败:', error);
    res.status(500).json({ 
      success: false, 
      message: '更新文章失败: ' + error.message 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API 服务器运行在端口 ${PORT}`);
});