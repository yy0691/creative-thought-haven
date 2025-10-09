import { GoogleGenAI } from '@google/genai';

class GeminiService {
  constructor() {
    this.apiKeys = [
      process.env.GEMINI_API_KEY_1,
      process.env.GEMINI_API_KEY_2,
      process.env.GEMINI_API_KEY_3
    ].filter(key => key && key.trim());
    
    if (this.apiKeys.length === 0) {
      throw new Error('No Gemini API keys found. Please set GEMINI_API_KEY_1, GEMINI_API_KEY_2, and/or GEMINI_API_KEY_3');
    }
    
    this.currentKeyIndex = 0;
    this.requestCounts = new Array(this.apiKeys.length).fill(0);
    this.modelName = 'gemini-2.0-flash-exp';
    
    console.log(`✅ Initialized GeminiService with ${this.apiKeys.length} API key(s)`);
  }

  getNextClient() {
    const apiKey = this.apiKeys[this.currentKeyIndex];
    this.requestCounts[this.currentKeyIndex]++;
    
    console.log(`🔑 Using API key #${this.currentKeyIndex + 1} (Request count: ${this.requestCounts[this.currentKeyIndex]})`);
    
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
    
    return new GoogleGenAI({ apiKey });
  }

  async translateToChineseWithSummary(title, description, content, retries = 3) {
    let lastError = null;
    
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        if (attempt > 0) {
          const waitTime = Math.min(1000 * Math.pow(2, attempt), 10000);
          console.log(`⏳ Waiting ${waitTime}ms before retry ${attempt + 1}/${retries}...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
        
        const ai = this.getNextClient();
        
        const fullText = `
标题: ${title}
描述: ${description}
内容: ${content || description}
      `.trim();

        const prompt = `你是一位专业的AI工具翻译专家。请对以下英文内容进行处理：

${fullText}

请提供以下内容（使用JSON格式回复）：
1. title_zh: 将标题翻译成简洁、专业的中文（保持原意，不要过度润色）
2. summary_zh: 用10-20个字简短描述这个工具的核心功能
3. key_points: 提取2-3个关键特点，用中文列出（数组格式）

要求：
- 翻译要准确、自然、符合中文表达习惯
- 描述要极度简洁，只说核心功能
- 关键要点要简短

请严格按照以下JSON格式返回：
{
  "title_zh": "中文标题",
  "summary_zh": "10-20字的简短描述",
  "key_points": ["特点1", "特点2"]
}`;

        const response = await ai.models.generateContent({
          model: this.modelName,
          contents: prompt,
        });

        const text = response.text;
        if (!text) {
          throw new Error('Empty response from Gemini API');
        }

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          console.warn('⚠️  Could not parse JSON from response, using fallback');
          return {
            title_zh: title,
            summary_zh: description.substring(0, 200),
            key_points: []
          };
        }

        const result = JSON.parse(jsonMatch[0]);
        
        console.log(`✅ Translated: "${title.substring(0, 50)}..." -> "${result.title_zh.substring(0, 50)}..."`);
        
        return {
          title_zh: result.title_zh || title,
          summary_zh: result.summary_zh || description,
          key_points: result.key_points || []
        };
        
      } catch (error) {
        lastError = error;
        const errorMsg = error.message || JSON.stringify(error);
        
        if (errorMsg.includes('503') || errorMsg.includes('UNAVAILABLE') || errorMsg.includes('overloaded')) {
          console.warn(`⚠️  API overloaded (attempt ${attempt + 1}/${retries}), will retry with different key...`);
          continue;
        } else {
          console.error(`❌ Translation error: ${errorMsg}`);
          break;
        }
      }
    }
    
    console.error(`❌ All translation attempts failed. Using fallback.`);
    return {
      title_zh: title,
      summary_zh: description.substring(0, 200),
      key_points: []
    };
  }

  async translateTitle(title) {
    try {
      const ai = this.getNextClient();
      
      const prompt = `请将以下英文标题翻译成简洁、专业的中文，保持原意：\n\n${title}\n\n只返回翻译后的中文标题，不要有其他内容。`;

      const response = await ai.models.generateContent({
        model: this.modelName,
        contents: prompt,
      });

      const result = response.text?.trim() || title;
      console.log(`✅ Quick translate: "${title.substring(0, 30)}..." -> "${result.substring(0, 30)}..."`);
      
      return result;
      
    } catch (error) {
      console.error(`❌ Quick translation error: ${error.message}`);
      return title;
    }
  }

  getStats() {
    return {
      totalKeys: this.apiKeys.length,
      requestCounts: this.requestCounts,
      totalRequests: this.requestCounts.reduce((a, b) => a + b, 0)
    };
  }
}

export default GeminiService;
