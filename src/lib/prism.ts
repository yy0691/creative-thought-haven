import Prism from 'prismjs';

// 导入基本样式
import 'prismjs/themes/prism.css';

// 导入常用的语言支持
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';

// 导入插件
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

// 初始化 Prism
export function initPrism() {
  if (typeof window !== 'undefined') {
    Prism.highlightAll();
  }
}

// 高亮特定元素
export function highlightElement(element: Element) {
  Prism.highlightElement(element);
}

// 高亮字符串
export function highlightCode(code: string, language: string) {
  return Prism.highlight(code, Prism.languages[language], language);
}