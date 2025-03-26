// API健康检查端点
export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    message: 'API服务正常运行',
    timestamp: new Date().toISOString()
  });
} 