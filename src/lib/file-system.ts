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
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('保存文章失败:', error);
    return false;
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