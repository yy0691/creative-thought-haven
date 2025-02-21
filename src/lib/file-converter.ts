import mammoth from 'mammoth';
import pdfjs from 'pdfjs-dist';

export interface ConversionResult {
  content: string;
  error?: string;
}

export class FileConverter {
  static async convertWordToHtml(buffer: ArrayBuffer): Promise<ConversionResult> {
    try {
      const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
      return {
        content: result.value,
        error: result.messages.length > 0 ? result.messages[0].message : undefined
      };
    } catch (error) {
      return {
        content: '',
        error: error instanceof Error ? error.message : '转换Word文件失败'
      };
    }
  }

  static async convertPdfToText(buffer: ArrayBuffer): Promise<ConversionResult> {
    try {
      const pdf = await pdfjs.getDocument({ data: buffer }).promise;
      let content = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        content += textContent.items
          .map((item: any) => item.str)
          .join(' ') + '\n\n';
      }

      return { content };
    } catch (error) {
      return {
        content: '',
        error: error instanceof Error ? error.message : '转换PDF文件失败'
      };
    }
  }

  static async convertToMarkdown(html: string): Promise<string> {
    // 可以使用 turndown 或其他库将 HTML 转换为 Markdown
    // 这里暂时返回原始 HTML
    return html;
  }
}