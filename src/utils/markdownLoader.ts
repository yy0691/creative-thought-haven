import { CardItem } from '../data/ai/types';
import matter from 'gray-matter';

/**
 * 从Markdown文件中加载内容
 * @param filepath Markdown文件的路径
 * @returns Promise<CardItem | null> 解析出的卡片数据，如果文件不存在则返回null
 */
export async function loadMarkdownContent(filepath: string): Promise<CardItem | null> {
  try {
    const response = await fetch(filepath);
    
    if (!response.ok) {
      console.error(`无法加载文件: ${filepath}，状态码: ${response.status}`);
      return null;
    }
    
    const markdown = await response.text();
    const { data, content } = matter(markdown);
    
    // 将frontmatter数据转换为CardItem
    const cardItem: CardItem = {
      id: data.id || '',
      title: data.title || '',
      description: data.description || '',
      author: data.author,
      date: data.date,
      image: data.image,
      category: data.category,
      link: data.link,
      content: content.trim() // 正文内容
    };
    
    return cardItem;
  } catch (error) {
    console.error(`加载Markdown内容时出错: ${filepath}`, error);
    return null;
  }
}

/**
 * 从目录加载所有Markdown文件
 * @param directory 目录路径
 * @returns Promise<CardItem[]> 加载的卡片数据数组
 */
export async function loadMarkdownDirectory(directory: string): Promise<CardItem[]> {
  try {
    const indexResponse = await fetch(`${directory}/index.json`);
    
    if (!indexResponse.ok) {
      console.error(`无法加载索引文件: ${directory}/index.json`);
      return [];
    }
    
    const index = await indexResponse.json();
    const files = index.files || [];
    
    const cardItems: CardItem[] = [];
    
    for (const file of files) {
      const cardItem = await loadMarkdownContent(`${directory}/${file}`);
      if (cardItem) {
        cardItems.push(cardItem);
      }
    }
    
    return cardItems;
  } catch (error) {
    console.error(`加载Markdown目录时出错: ${directory}`, error);
    
    // 作为备用方案，尝试直接加载目录中的.md文件
    try {
      const items: CardItem[] = [];
      // 这里无法列出目录，但我们可以尝试加载前5个示例文件，实际应用中应当有更好的方式
      for (let i = 1; i <= 5; i++) {
        const cardItem = await loadMarkdownContent(`${directory}/${i}.md`);
        if (cardItem) {
          items.push(cardItem);
        }
      }
      return items;
    } catch (fallbackError) {
      console.error('备用加载方法也失败了', fallbackError);
      return [];
    }
  }
}

/**
 * 根据ID加载特定的Markdown文件
 * @param directory 目录路径
 * @param id 卡片ID
 * @returns Promise<CardItem | null> 加载的卡片数据，如果不存在则返回null
 */
export async function loadMarkdownById(directory: string, id: string): Promise<CardItem | null> {
  try {
    return await loadMarkdownContent(`${directory}/${id}.md`);
  } catch (error) {
    console.error(`根据ID加载Markdown内容时出错: ${id}`, error);
    return null;
  }
} 