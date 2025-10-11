import fs from 'fs';
import path from 'path';
import RSS from 'rss';
import { globSync } from 'glob';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateRssFeed() {
  const feed = new RSS({
    title: 'Creative Thought Haven',
    description: 'A personal blog for creative thoughts and technical explorations.',
    feed_url: 'https://your-domain.com/rss.xml', // TODO: Replace with actual domain
    site_url: 'https://your-domain.com', // TODO: Replace with actual domain
    language: 'en',
  });

  const postPaths = globSync('content/articles/**/*.{md,mdx}');

  for (const postPath of postPaths) {
    const fileContents = fs.readFileSync(postPath, 'utf8');
    const { data: metadata } = matter(fileContents);
    const slug = postPath
      .replace('content/', '')
      .replace(/\.(mdx|md)$/, '');
      
    const url = `https://your-domain.com/${slug}`; // TODO: Replace with actual domain

    feed.item({
      title: metadata.title,
      description: metadata.excerpt,
      url: url,
      guid: url, // Use the full URL as a permanent GUID
      date: metadata.date,
    });
  }

  const rss = feed.xml({ indent: true });
  fs.writeFileSync(path.resolve(__dirname, '../public/rss.xml'), rss);
  console.log('RSS feed generated successfully!');
}

generateRssFeed();

