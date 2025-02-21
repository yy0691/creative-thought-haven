import { promises as fs } from 'fs';
import path from 'path';

export async function savePost(slug: string, content: string) {
  try {
    const response = await fetch('http://localhost:3001/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug, content }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '保存文章失败');
    }
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('保存文章失败:', error);
    throw error; // 向上传递错误，以便 UI 组件可以显示具体错误信息
  }
}

export async function deletePost(slug: string) {
  try {
    const response = await fetch(`http://localhost:3001/api/posts/${slug}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('删除文章失败:', error);
    return false;
  }
}