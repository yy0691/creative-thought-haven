// 测试 Coze API 连接
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
// const pat = process.env.VITE_COZE_PAT;
// const botId = process.env.VITE_COZE_BOT_ID || '7433632883987939380';
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

// 获取访问令牌
async function getAccessToken() {
  log.info('正在获取访问令牌...');
  
  if (!pat) {
    log.error('环境变量 VITE_COZE_PAT 未设置。请在 .env.local 文件中设置。');
    log.info('请确保 .env.local 文件存在并包含 VITE_COZE_PAT=your_token_here');
    process.exit(1);
  }
  
  try {
    log.debug(`使用PAT: ${maskPAT(pat)}`);
    log.debug(`请求URL: ${baseUrl}/api/auth/v1/access_token`);
    
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
    
    log.debug(`响应状态码: ${response.status}`);
    log.debug(`响应标头: ${JSON.stringify(response.headers)}`);
    
    if (response.data && response.data.access_token) {
      log.success('成功获取访问令牌');
      return response.data.access_token;
    } else {
      log.error('访问令牌返回格式异常');
      log.data(response.data);
      return null;
    }
  } catch (error) {
    log.error(`获取访问令牌失败: ${error.message}`);
    if (error.response) {
      log.error(`状态码: ${error.response.status}`);
      log.data(error.response.data);
      
      // 针对常见错误提供具体建议
      if (error.response.status === 401) {
        log.info('提示: 您的PAT可能已过期或无效。请在Coze平台重新生成PAT。');
      } else if (error.response.data && error.response.data.code === 700012006) {
        log.info('提示: "Login verification is invalid" 通常表示PAT已过期或格式不正确。');
        log.info('请访问 https://www.coze.cn 并在账户设置中重新生成PAT。');
      }
    } else if (error.code === 'ENOTFOUND') {
      log.info('提示: 无法连接到服务器。请检查您的网络连接。');
    }
    return null;
  }
}

// 调用Coze API
async function callCozeAPI(accessToken) {
  log.info(`正在调用智能体 (ID: ${botId})...`);
  
  if (!botId) {
    log.error('缺少智能体ID。请在环境变量中设置 VITE_COZE_BOT_ID。');
    return false;
  }
  
  try {
    log.debug(`请求URL: ${baseUrl}/api/bot/v1/chat/completions`);
    log.debug(`使用bot_id: ${botId}`);
    
    const response = await axios.post(
      `${baseUrl}/api/bot/v1/chat/completions`,
      {
        bot_id: botId,
        messages: [
          {
            role: 'user',
            content: '请提供最新的AI新闻资讯'
          }
        ],
        stream: false
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    log.success('成功调用API');
    log.debug(`响应状态码: ${response.status}`);
    
    if (response.data) {
      if (response.data.output && response.data.output.newslist) {
        const newsCount = response.data.output.newslist.length;
        log.success(`成功获取 ${newsCount} 条新闻`);
        
        // 显示第一条新闻作为示例
        if (newsCount > 0) {
          const firstNews = response.data.output.newslist[0];
          log.info('第一条新闻:');
          log.data({
            title: firstNews.title,
            description: firstNews.description,
            source: firstNews.source,
            date: firstNews.ctime,
            url: firstNews.url
          });
        }
        
        return true;
      } else {
        log.error('API响应中没有包含预期的新闻列表');
        log.data(response.data);
        return false;
      }
    } else {
      log.error('API响应为空');
      return false;
    }
  } catch (error) {
    log.error(`调用API失败: ${error.message}`);
    if (error.response) {
      log.error(`状态码: ${error.response.status}`);
      log.data(error.response.data);
      
      if (error.response.status === 401) {
        log.info('提示: 访问令牌可能已过期。');
      } else if (error.response.status === 404) {
        log.info('提示: 智能体ID可能不正确。请检查VITE_COZE_BOT_ID环境变量。');
      }
    }
    return false;
  }
}

// 检查环境文件
async function checkEnvironmentFiles() {
  const fs = await import('fs');
  const envLocalPath = resolve(__dirname, '.env.local');
  const envExamplePath = resolve(__dirname, '.env.example');
  
  log.info('检查环境文件...');
  
  try {
    if (fs.existsSync(envLocalPath)) {
      log.success('.env.local 文件存在');
      
      // 读取文件内容
      const envContent = fs.readFileSync(envLocalPath, 'utf8');
      
      // 检查是否包含PAT
      if (envContent.includes('VITE_COZE_PAT=') && !envContent.includes('VITE_COZE_PAT=your_')) {
        log.success('.env.local 文件包含PAT设置');
      } else {
        log.error('.env.local 文件缺少有效的PAT设置');
      }
      
      // 检查是否包含BOT_ID
      if (envContent.includes('VITE_COZE_BOT_ID=') && !envContent.includes('VITE_COZE_BOT_ID=your_')) {
        log.success('.env.local 文件包含BOT_ID设置');
      } else {
        log.info('.env.local 文件缺少BOT_ID设置，将使用默认值');
      }
    } else {
      log.error('.env.local 文件不存在');
      
      if (fs.existsSync(envExamplePath)) {
        log.info('发现 .env.example 文件。您可以复制它并重命名为 .env.local，然后添加您的PAT。');
      } else {
        log.info('请创建 .env.local 文件并添加以下内容:');
        log.info('VITE_COZE_PAT=your_personal_access_token_here');
        log.info('VITE_COZE_BOT_ID=your_bot_id_here');
      }
    }
  } catch (error) {
    log.error(`检查环境文件时出错: ${error.message}`);
  }
}

// 主测试函数
async function testCozeAPI() {
  console.log(chalk.bgBlue.white(' Coze API 测试工具 '));
  console.log('');
  
  log.info(`基础URL: ${baseUrl}`);
  log.info(`智能体ID: ${botId || '未设置'}`);
  log.info(`PAT: ${pat ? maskPAT(pat) : '未设置'}`);
  console.log('');
  
  // 检查环境文件
  await checkEnvironmentFiles();
  console.log('');
  
  // 测试访问令牌获取
  const accessToken = await getAccessToken();
  if (!accessToken) {
    log.error('无法继续测试，因为无法获取访问令牌');
    process.exit(1);
  }
  
  console.log('');
  
  // 测试API调用
  const apiCallSuccess = await callCozeAPI(accessToken);
  
  console.log('');
  if (apiCallSuccess) {
    log.success('API测试成功完成！您的Coze API配置正常工作。');
  } else {
    log.error('API测试失败！请检查您的配置和日志。');
  }
}

// 执行测试
testCozeAPI().catch(error => {
  log.error(`发生未捕获的错误: ${error.message}`);
  process.exit(1);
});

// 初始化
async function init() {
  log.info('Coze API测试工具启动');
  
  // API测试已禁用
  log.info('Coze API测试功能已禁用。');
  process.exit(0);
  
  /*
  if (!pat) {
    log.error('环境变量 VITE_COZE_PAT 未设置。请在 .env.local 文件中设置。');
    log.info('请确保 .env.local 文件存在并包含 VITE_COZE_PAT=your_token_here');
    process.exit(1);
  }
  */
  
  // ... 继续注释掉其他相关代码 ...
}

// 主函数
async function main() {
  await init();
  // 以下代码不会执行，因为init函数会终止程序
  /*
  // 环境检查
  await checkEnvironment();
  
  // 获取访问令牌
  const accessToken = await getAccessToken();
  if (!accessToken) {
    log.error('无法获取访问令牌，终止测试。');
    process.exit(1);
  }
  
  // 测试聊天API
  await testChatAPI(accessToken);
  */
}