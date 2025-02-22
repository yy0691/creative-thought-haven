import React from 'react';

interface HighlightProps {
  children: React.ReactNode;
  type?: 'default' | 'info' | 'warning' | 'success' | 'error';
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

  return (
    <div className={`p-4 my-4 rounded-r-lg ${getHighlightStyle()}`}>
      {children}
    </div>
  );
};

export default Highlight;