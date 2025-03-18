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

// 提取环境变量
const pat = process.env.VITE_COZE_PAT;
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

// 验证PAT
async function verifyPAT() {
  log.info('开始验证PAT...');
  
  if (!pat) {
    log.error('环境变量 VITE_COZE_PAT 未设置。请在 .env.local 文件中设置。');
    log.info('请确保 .env.local 文件存在并包含 VITE_COZE_PAT=your_token_here');
    return false;
  }
  
  try {
    log.info(`使用PAT: ${maskPAT(pat)}`);
    
    const response = await axios.post(
      `${baseUrl}/api/auth/v1/access_token`,
      { grant_type: 'client_credentials' },
      {
        headers: {
          'Authorization': `Bearer ${pat}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.data && response.data.access_token) {
      log.success('PAT验证成功！可以正常获取访问令牌。');
      log.info(`令牌有效期: ${response.data.expires_in}秒`);
      return true;
    } else {
      log.error('响应异常，但未返回错误。');
      log.data(response.data);
      return false;
    }
  } catch (error) {
    log.error(`PAT验证失败: ${error.message}`);
    
    if (error.response) {
      log.error(`状态码: ${error.response.status}`);
      
      if (error.response.data) {
        log.data(error.response.data);
        
        // 针对常见错误提供具体建议
        if (error.response.status === 401 || 
            (error.response.data.code && error.response.data.code === 700012006)) {
          log.info('提示: "Login verification is invalid" 通常表示PAT已过期或格式不正确。');
          log.info('请访问 https://www.coze.cn 并在账户设置中重新生成PAT。');
          log.info('步骤: 登录Coze -> 点击右上角头像 -> 设置 -> API访问 -> 生成新Token');
        }
      }
    } else if (error.code === 'ENOTFOUND') {
      log.info('提示: 无法连接到服务器。请检查您的网络连接。');
    }
    
    return false;
  }
}

// 主函数
async function main() {
  log.info('PAT验证工具启动');
  const isValid = await verifyPAT();
  
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