import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadMarkdownById } from '../app/utils/markdownLoader';
import { CardItem } from '../data/ai/types';
import ReactMarkdown from 'react-markdown';
import { CircularProgress, Container, Typography, Box, Divider, Chip } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import ImageDisplay from '../components/ImageDisplay';

// 简单的日期格式化函数
const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (error) {
    console.error('日期格式化错误:', error);
    return dateString;
  }
};

const ToolPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tool, setTool] = useState<CardItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTool = async () => {
      if (!id) {
        setError('未提供工具ID');
        setLoading(false);
        return;
      }

      try {
        const toolData = await loadMarkdownById('/content/ai/tools', id);
        
        if (!toolData) {
          setError(`找不到ID为 ${id} 的工具`);
          setLoading(false);
          return;
        }

        setTool(toolData);
      } catch (err) {
        console.error('加载工具数据时出错:', err);
        setError('加载工具数据时出错');
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !tool) {
    return (
      <Container>
        <Typography variant="h4" component="h1" color="error" sx={{ mt: 4 }}>
          {error || '未找到工具'}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ position: 'relative', height: { xs: 200, md: 400 }, mb: 4, borderRadius: 2, overflow: 'hidden' }}>
          <ImageDisplay 
            src={tool.image} 
            alt={tool.title} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              borderRadius: 8
            }} 
          />
        </Box>
        
        <Typography variant="h3" component="h1" gutterBottom>
          {tool.title}
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">{tool.author}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">{formatDate(tool.date)}</Typography>
          </Box>
          
          {tool.category && (
            <Chip 
              label={tool.category} 
              size="small" 
              color="primary" 
              variant="outlined" 
            />
          )}
        </Box>
        
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          {tool.description}
        </Typography>
        
        {tool.link && (
          <Typography variant="body2" mb={2}>
            <strong>官方链接：</strong> <a href={tool.link} target="_blank" rel="noopener noreferrer">{tool.link}</a>
          </Typography>
        )}
      </Box>
      
      <Divider sx={{ mb: 4 }} />
      
      <Box className="markdown-content" sx={{ '& img': { maxWidth: '100%', borderRadius: 1 } }}>
        <ReactMarkdown>
          {tool.content}
        </ReactMarkdown>
      </Box>
    </Container>
  );
};

export default ToolPage; 