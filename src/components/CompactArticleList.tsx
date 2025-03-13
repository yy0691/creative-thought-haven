import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import { Badge } from "./ui/badge";

interface ArticleMetadata {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  category?: string;
  excerpt?: string;
}

interface CompactArticleListProps {
  articles: ArticleMetadata[];
}

const CompactArticleList: React.FC<CompactArticleListProps> = ({ articles }) => {
  return (
    <div className="compact-blog-container mx-auto" style={{ maxWidth: "700px" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
        {articles.map((article) => (
          <Link 
            key={article.slug} 
            to={`/blog/${article.slug}`} 
            className="compact-blog-item py-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[17px] font-medium truncate" style={{ lineHeight: "1.7" }}>
                {article.title}
              </h3>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 shrink-0 gap-2 whitespace-nowrap">
                <span>{new Date(article.date).toLocaleDateString('zh-CN')}</span>
                {article.tags && article.tags.length > 0 && (
                  <>
                    <span className="mx-1">·</span>
                    <div className="flex gap-1">
                      {article.tags.slice(0, 1).map(tag => (
                        <span key={tag} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-sm text-xs">
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 1 && (
                        <span className="text-xs text-gray-400">+{article.tags.length - 1}</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompactArticleList;
