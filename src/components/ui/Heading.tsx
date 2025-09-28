import React from 'react';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
    as?: 'p' | 'span' | 'div';
}

const headingClasses = {
    // 页面主标题（如页面顶部大标题）
    h1: 'text-3xl md:text-4xl font-bold mt-10 mb-6 text-primary dark:text-primary-foreground',
    // 区块主标题（如"AI新闻"、"热门工具"等大区块标题）
    h2: 'text-2xl md:text-3xl font-bold mt-8 mb-4 text-primary dark:text-primary-foreground',
    // 子区块标题（如分组内的小标题、卡片标题）
    h3: 'text-xl md:text-2xl font-bold mt-6 mb-3 text-primary dark:text-primary-foreground',
    // 内容卡片主标题（如工具名称、新闻标题）
    h4: 'text-lg md:text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100',
    // 次要标题（如卡片内的子标题、分类标签）
    h5: 'text-base font-semibold mt-3 mb-1.5 text-gray-800 dark:text-gray-200',
    // 辅助标题（如备注说明、小标签）
    h6: 'text-sm font-medium mt-2 mb-1 text-gray-700 dark:text-gray-300',
  };
  
// 补充常用正文文本样式（方便统一管理）
const textClasses = {
    // 主要正文（如描述、内容详情）
    body: 'text-base text-gray-700 dark:text-gray-300 leading-relaxed',
    // 短文本（如卡片简介、摘要）
    short: 'text-sm text-gray-600 dark:text-gray-400 leading-snug',
    // 辅助文本（如时间、来源、小提示）
    auxiliary: 'text-xs text-gray-500 dark:text-gray-500',
    // 强调文本（如高亮关键词）
    emphasis: 'text-base font-medium text-primary dark:text-primary-foreground',
};

const Heading = ({ children, as: Tag = 'h1', className, ...props }: HeadingProps) => {
  return (
    <Tag className={`${headingClasses[Tag]} ${className || ''}`} {...props}>
      {children}
    </Tag>
  );
};

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
    as?: 'p' | 'span' | 'div';
}

const Text = ({ children, as: Tag = 'p', className, ...props }: TextProps) => {
    return (
        <Tag className={`${textClasses[Tag]} ${className || ''}`} {...props}>
            {children}
        </Tag>
    );
};

export const H1 = (props: Omit<HeadingProps, 'as'>) => <Heading {...props} as="h1" />;
export const H2 = (props: Omit<HeadingProps, 'as'>) => <Heading {...props} as="h2" />;
export const H3 = (props: Omit<HeadingProps, 'as'>) => <Heading {...props} as="h3" />;
export const H4 = (props: Omit<HeadingProps, 'as'>) => <Heading {...props} as="h4" />;
export const H5 = (props: Omit<HeadingProps, 'as'>) => <Heading {...props} as="h5" />;
export const H6 = (props: Omit<HeadingProps, 'as'>) => <Heading {...props} as="h6" />;

export const P = (props: Omit<TextProps, 'as'>) => <Text {...props} as="p" />;
export default Heading;
