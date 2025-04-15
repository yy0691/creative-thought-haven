// src/components/FullscreenDetailModal.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MDXComponents from './MDXComponents';

interface FullscreenDetailModalProps {
  isOpen: boolean;
  item: {
    title: string;
    content?: string;
    description?: string;
    link?: string;
  };
  onClose: () => void;
}

export const FullscreenDetailModal: React.FC<FullscreenDetailModalProps> = ({
  isOpen,
  item,
  onClose
}) => {
  if (!isOpen || !item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white dark:bg-gray-900 z-[60] overflow-y-auto"
        >
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* 返回按钮 */}
            <div className="mb-8 flex justify-between items-center">
              <button
                onClick={onClose}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground transition-colors"
              >
                <LucideIcons.ArrowLeft size={20} className="mr-2" />
                <span>返回</span>
              </button>
              
              {item.link && (
                <a 
                  href={item.link} 
                  className="flex items-center text-primary hover:text-primary-dark transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>访问官网</span>
                  <LucideIcons.ExternalLink size={18} className="ml-2" />
                </a>
              )}
            </div>
            
            {/* 文章内容 */}
            <div className="prose prose-blue dark:prose-invert max-w-none">
              <h1>{item.title}</h1>
              
              {item.content ? (
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={MDXComponents as React.ComponentProps<typeof ReactMarkdown>['components']}
                >
                  {item.content}
                </ReactMarkdown>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 text-lg">{item.description}</p>
              )}
              
              {item.link && (
                <div className="mt-8 flex justify-center">
                  <a 
                    href={item.link} 
                    className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300 flex items-center"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    查看原文 <LucideIcons.ExternalLink size={16} className="ml-2" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};