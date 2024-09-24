# Jump Record

Jump Record 是一个帮助学生记录立定跳远成绩的 Web 应用。

## 功能

- 记录和显示立定跳远成绩
- 显示目标距离
- 按日期显示历史成绩
- 同步数据到云端

## 技术栈

- Vue.js 3.0
- PWA (Progressive Web Apps)
- LocalStorage
- JSON 托管服务
- Surge 静态网页托管

## 安装

1. 克隆仓库：
   ```bash
   git clone https://github.com/your-repo/jump-record.git
   cd jump-record
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 运行开发服务器：
   ```bash
   npm run serve
   ```

## 构建和发布

1. 构建项目：
   ```bash
   npm run build
   ```

2. 发布到 Surge：
   ```bash
   surge dist
   ```

Surge 会提示您输入电子邮件和密码进行登录。如果您还没有 Surge 账户，可以在提示时创建一个新账户。

## 访问您的网站

发布成功后，Surge 会为您提供一个 URL，您可以使用该 URL 访问您的网站。

## 许可证

MIT
