# 更新Coze PAT指南

## PAT已过期，需要重新生成

根据验证，当前项目配置的PAT已过期，错误信息为"Login verification is invalid"。这是一个常见问题，因为Coze的PAT通常只有7-90天的有效期。

## API域名说明

Coze API使用的正确域名是：
- API请求域名：`https://api.coze.cn`
- 网站访问域名：`https://www.coze.cn`

**注意**：在代码中必须使用`api.coze.cn`作为API请求的基础URL，而不是`www.coze.cn`。

## 更新PAT的步骤

1. **登录Coze平台**
   - 访问 [Coze官网](https://www.coze.cn/)
   - 使用您的账号登录

2. **访问API访问设置**
   - 点击右上角的头像图标
   - 在下拉菜单中选择"设置"
   - 在左侧菜单找到"API访问"或"开发者设置"选项

3. **生成新的PAT**
   - 点击"生成新Token"按钮
   - 为新Token起一个名称（例如"Creative Thought Haven Blog"）
   - 选择合适的有效期（建议90天）
   - 点击"创建"按钮

4. **复制并保存新PAT**
   - 生成后会显示完整的PAT，格式类似于：`pat_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
   - **重要：** 请立即复制此Token，因为它只会显示一次！
   - 建议将Token保存在一个安全的地方，如密码管理器

5. **更新项目配置**
   - 打开项目根目录下的`.env.local`文件
   - 将`VITE_COZE_PAT=`后面的值替换为您刚刚生成的新PAT
   - 保存文件

6. **验证新PAT**
   - 运行以下命令进行验证：
   ```bash
   npm run test:pat
   ```
   - 如果成功，应该看到"PAT验证成功！可以正常获取访问令牌。"消息

## 常见问题

- **没有API访问选项？** 确保您的Coze账号有开发者权限
- **生成PAT失败？** 尝试刷新页面或清除浏览器缓存
- **验证仍然失败？** 确保完整复制了PAT，没有多余的空格
- **域名错误？** 确保在代码中使用`api.coze.cn`作为API请求的基础URL，而不是`www.coze.cn`

---

完成上述步骤后，您的项目应该能够成功调用Coze API获取AI新闻数据。 