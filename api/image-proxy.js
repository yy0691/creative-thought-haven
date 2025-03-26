export default async function handler(req, res) {
  try {
    // 从请求中获取图片URL
    const url = req.query.url;
    
    if (!url) {
      return res.status(400).send('URL参数缺失');
    }
    
    // 解码URL
    const decodedUrl = decodeURIComponent(url);
    
    // 获取图片
    const response = await fetch(decodedUrl);
    
    if (!response.ok) {
      return res.status(response.status).send(`代理请求失败: ${response.statusText}`);
    }
    
    // 获取原始图片的内容类型
    const contentType = response.headers.get('content-type');
    
    // 设置适当的内容类型
    res.setHeader('Content-Type', contentType || 'image/jpeg');
    
    // 设置跨域头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    // 设置缓存
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    
    // 将图像数据转发给客户端
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return res.status(200).send(buffer);
    
  } catch (error) {
    console.error('图片代理错误:', error);
    return res.status(500).send('代理服务器错误');
  }
} 