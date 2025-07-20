import React from 'react';
import { useArticles, useCategories, useTags } from '../hooks/useContent';

const TestContent: React.FC = () => {
  const { articles, loading: articlesLoading, error: articlesError } = useArticles();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { tags, loading: tagsLoading, error: tagsError } = useTags();

  if (articlesLoading || categoriesLoading || tagsLoading) {
    return <div className="p-8">加载中...</div>;
  }

  if (articlesError || categoriesError || tagsError) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">错误</h1>
        {articlesError && <p className="text-red-500">文章加载错误: {articlesError}</p>}
        {categoriesError && <p className="text-red-500">分类加载错误: {categoriesError}</p>}
        {tagsError && <p className="text-red-500">标签加载错误: {tagsError}</p>}
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">内容数据测试页面</h1>
      
      {/* 文章统计 */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">文章统计</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-semibold">总文章数</h3>
            <p className="text-2xl font-bold text-blue-600">{articles.length}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-semibold">分类数</h3>
            <p className="text-2xl font-bold text-green-600">{Object.keys(categories).length}</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <h3 className="font-semibold">标签数</h3>
            <p className="text-2xl font-bold text-purple-600">{tags.length}</p>
          </div>
        </div>
      </div>

      {/* 分类列表 */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">分类列表</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(categories).map(([id, category]) => (
            <div key={id} className="border p-4 rounded-lg">
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{category.description}</p>
              <p className="text-sm">文章数: {category.articles.length}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 标签列表 */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">标签列表</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.name}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm"
            >
              {tag.name} ({tag.count})
            </span>
          ))}
        </div>
      </div>

      {/* 最新文章 */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">最新文章</h2>
        <div className="space-y-4">
          {articles.slice(0, 10).map((article) => (
            <div key={article.slug} className="border p-4 rounded-lg">
              <h3 className="font-semibold">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{article.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>分类: {article.category}</span>
                <span>日期: {article.date}</span>
                <span>标签: {article.tags?.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestContent; 