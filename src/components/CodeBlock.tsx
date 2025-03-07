import React, { useEffect, useState, lazy, Suspense } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';

// 基础语言只预加载js和jsx
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';

// 注册基础语言
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('javascript', javascript);

// 其他语言动态导入
const loadLanguage = async (language: string) => {
  if (language === 'jsx' || language === 'javascript') return;
  
  try {
    let langModule;
    switch (language) {
      case 'typescript':
      case 'ts':
        langModule = await import('react-syntax-highlighter/dist/esm/languages/prism/typescript');
        SyntaxHighlighter.registerLanguage('typescript', langModule.default);
        SyntaxHighlighter.registerLanguage('ts', langModule.default);
        break;
      case 'css':
        langModule = await import('react-syntax-highlighter/dist/esm/languages/prism/css');
        SyntaxHighlighter.registerLanguage('css', langModule.default);
        break;
      case 'json':
        langModule = await import('react-syntax-highlighter/dist/esm/languages/prism/json');
        SyntaxHighlighter.registerLanguage('json', langModule.default);
        break;
      // 添加其他你项目中需要的语言
    }
  } catch (e) {
    console.warn(`语言加载失败: ${language}`);
  }
};

interface CodeBlockProps {
  language: string;
  value: string;
}

const CodeBlock = ({ language, value }: CodeBlockProps) => {
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(
    language === 'jsx' || language === 'javascript'
  );

  useEffect(() => {
    if (!isLanguageLoaded) {
      loadLanguage(language).then(() => setIsLanguageLoaded(true));
    }
  }, [language, isLanguageLoaded]);

  if (!isLanguageLoaded) {
    return <div className="p-4 bg-muted text-sm">加载代码中...</div>;
  }

  return (
    <div className="rounded-md my-4 overflow-hidden">
      <SyntaxHighlighter
        language={language}
        useInlineStyles={false}
        PreTag="div"
        className="text-sm p-4 overflow-auto"
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock; 