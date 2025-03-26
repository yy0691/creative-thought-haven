// PAT验证工具
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import chalk from 'chalk';

// 获取当前文件目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 加载环境变量
dotenv.config({ path: resolve(__dirname, '.env.local') });

// 从环境变量中获取PAT
// const pat = process.env.VITE_COZE_PAT;

// 提取环境变量
const baseUrl = 'https://api.coze.cn';

// 打印状态信息函数
const log = {
  info: (msg) => console.log(chalk.blue('ℹ️ INFO: ') + msg),
  success: (msg) => console.log(chalk.green('✅ SUCCESS: ') + msg),
  error: (msg) => console.log(chalk.red('❌ ERROR: ') + msg),
  data: (msg) => console.log(chalk.yellow('📊 DATA: ') + JSON.stringify(msg, null, 2)),
  debug: (msg) => console.log(chalk.gray('🔍 DEBUG: ') + msg)
};

// 显示PAT模糊信息
function maskPAT(token) {
  if (!token) return 'undefined';
  if (token.length <= 8) return '******';
  return token.substring(0, 4) + '...' + token.substring(token.length - 4);
}

// 测试PAT是否有效并获取过期时间
async function testPAT() {
  log.info('开始验证PAT...');
  
  // if (!pat) {
  //   log.error('环境变量 VITE_COZE_PAT 未设置。请在 .env.local 文件中设置。');
  //   log.info('请确保 .env.local 文件存在并包含 VITE_COZE_PAT=your_token_here');
  //   return false;
  // }
  
  try {
    // PAT验证已禁用，直接返回
    log.info('PAT验证功能已禁用。');
    return false;
    
    /*
    // 请求访问令牌
    const response = await axios.post(
      `${baseUrl}/api/auth/v1/access_token`,
      {
        grant_type: 'client_credentials'
      },
      {
        headers: {
          'Authorization': `Bearer ${pat}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    // 检查响应
    if (response.data && response.data.access_token) {
      log.success('PAT验证成功! 可以使用该PAT访问Coze API。');
      
      // 尝试解析JWT令牌获取过期时间
      const tokenParts = response.data.access_token.split('.');
      if (tokenParts.length === 3) {
        try {
          const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
          if (payload.exp) {
            const expDate = new Date(payload.exp * 1000);
            log.info(`访问令牌有效期至: ${expDate.toLocaleString()}`);
            
            // 计算剩余有效天数
            const now = new Date();
            const daysRemaining = Math.ceil((expDate - now) / (1000 * 60 * 60 * 24));
            
            if (daysRemaining <= 5) {
              log.warn(`⚠️ 访问令牌将在 ${daysRemaining} 天后过期，建议尽快更新PAT。`);
            } else {
              log.info(`访问令牌剩余有效期: ${daysRemaining} 天`);
            }
          }
        } catch (e) {
          log.warn('无法解析令牌过期时间');
        }
      }
      
      return true;
    } else {
      log.error('PAT验证失败: 未能获取有效的访问令牌');
      return false;
    }
    */
  } catch (error) {
    log.error('PAT验证失败:', error.message);
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      if (status === 401) {
        log.error('认证失败: PAT无效或已过期');
      } else {
        log.error(`服务器返回错误 (${status}):`, data);
      }
    } else if (error.request) {
      log.error('无法连接到Coze API服务器，请检查网络连接');
    }
    
    return false;
  }
}

// 主函数
async function main() {
  log.info('PAT验证工具启动');
  const isValid = await testPAT();
  
  if (isValid) {
    log.success('验证完成: PAT有效');
    process.exit(0);
  } else {
    log.error('验证完成: PAT无效或已过期');
    process.exit(1);
  }
}

// 运行主函数
main(); 