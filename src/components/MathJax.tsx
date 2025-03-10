import React, { useEffect, useRef, memo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathProps {
  inline?: boolean;
  children: string;
}

// 使用memo优化组件重渲染
export const Math = memo(({ inline = false, children }: MathProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(children, ref.current, {
          throwOnError: false,
          displayMode: !inline,
          trust: true,
          strict: false
        });
      } catch (error) {
        console.error('KaTeX rendering error:', error);
        ref.current.textContent = children;
      }
    }
  }, [children, inline]);

  return <span ref={ref} className={inline ? 'inline-math' : 'block-math'} />;
});

const MathProcessor = memo(({ children }: { children: string }) => {
  // 优化正则表达式以减少回溯
  const processedText = children
    .replace(/\$([^$\n]+?)\$/g, (_, math) => {
      return `<span class="inline-math">${math}</span>`;
    })
    .replace(/\$\$([^$]+?)\$\$/g, (_, math) => {
      return `<span class="display-math">${math}</span>`;
    });

  return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
});

export default MathProcessor; 