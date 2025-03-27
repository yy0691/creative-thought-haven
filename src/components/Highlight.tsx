import React from 'react';

interface HighlightProps {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'success' | 'error' | 'default';
}

const Highlight: React.FC<HighlightProps> = ({ children, type = 'default' }) => {
  const getHighlightStyle = () => {
    switch (type) {
      case 'info':
        return 'bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500';
      case 'success':
        return 'bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500';
      case 'error':
        return 'bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500';
      default:
        return 'bg-gray-100 dark:bg-gray-800/50 border-l-4 border-gray-500';
    }
  };

  // 判断子元素是否为简单文本或复杂React元素
  const hasComplexChildren = React.Children.count(children) > 1 || 
    (React.isValidElement(children) && children.type !== 'p');
  
  // 如果只有一个段落，直接使用其内容
  const content = !hasComplexChildren && React.isValidElement(children) && children.type === 'p'
    ? children.props.children
    : children;

  return (
    <div 
      className={`flex flex-col rounded-tr-lg rounded-br-lg ${getHighlightStyle()}`}
      style={{ margin: '16px 0' }} // 使用固定的外边距，避免继承
    >
      <div 
        className="px-4 py-3 highlight-content" // 使用highlight-content类应用全局CSS
        style={{ lineHeight: '1.7' }}
      >
        {content}
      </div>
    </div>
  );
};

export default Highlight;