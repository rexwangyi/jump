# 需求

## 1. 用户需求

### 1.1 整体说明
帮助学生记录立定跳远的成绩的Web应用。

### 1.2 基础技术需求
1. 采用PWA(Progressive Web Apps)技术,这样可以在手机上直接运行。
2. Web页面采用Vue.js 3.0技术。
3. 由于不希望有后台服务器，所以所有的逻辑功能都放在前台Javascript逻辑里面。
4. 使用前端数据库LocalStorage来存储数据。
5. 使用免费的JSON托管服务jsonbin，将本地数据同步到云上，方便多个终端同步数据。
6. 使用免费的Surge作为静态网页托管服务器。

### 1.3 功能需求
1. 按照手机UI，页面下有三个Tab，分别是：
    - Home
    - History
    - Setting
2. Home页面内容
    - 最上方醒目显示当前最好成绩以及目标距离。
    - 中间有一个记录新成绩的输入框，包括米和厘米两个部分。可以直接输入，也可以用右边上下按钮调整。
    - 下方有一个录入按钮，成功录入会有提示。
    - 录入后，会自动跳转到History页面。
    - 录入到数据库的数据，包括时间和成绩。
3. History页面内容
    - 按照日期新旧排序显示近30天最好成绩（每天的所有数据都保存，但是只显示当天最好的）。
    - 根据数据展示线图，横轴是时间，纵轴是成绩（单位CM），目标距离用红色线表示。
    - 线图可以按照日，星期，月的三种单位展示，要求中间空的日期无需展示。
    - 下方显示一个日历，如果当天有记录，则显示一个红色的圆点。
4. Setting页面内容
    - 设置当前人员的ID。ID是事先发行的，所以是下拉框。一旦ID修改，则Home页面和History页面都会显示新的ID的数据。
    - 设置目标距离及希望达成日期。
    - 设置显示历史数据的天数（默认为30天）。
    - 用户ID下拉框，加入两个用户，Rex和William。
    - 目标距离默认 150，单位是CM。
    - 增加一个同步按钮，功能为比较本地和jsonbin服务器上的json的最新更新时间，如果本地新，则覆盖服务器的，否则服务器的覆盖本地的。

### 1.4 其他需求
1. 由于是给学生用的，所以要求界面简洁，操作简单，尽量减少文字。
2. 由于是给学生用的，所以要求反应速度快，以便学生可以连续记录。
3. 由于是给学生用的，所以要求稳定性高，不能随便崩溃。

## 2. 应用发布手顺

### 2.1 安装 Surge CLI
首先，确保您已经安装了 Surge CLI。如果还没有安装，可以使用以下命令进行安装：

```sh
npm install --global surge
```

### 2.2 构建项目
在项目根目录下运行以下命令来构建项目：

```sh
npm run build
```

### 2.3 部署项目
构建完成后，运行以下命令将项目部署到 Surge：

```sh
surge ./dist
```

### 2.4 更新项目
如果需要更新项目，只需重新构建并运行 `surge` 命令：

```sh
npm run build
surge ./dist
```

### 2.5 查看部署状态
您可以通过访问 Surge 提供的 URL 来查看您的项目是否成功部署。

## 3. 维护和支持

### 3.1 数据备份
定期备份本地数据和云端数据，确保数据安全。

### 3.2 问题反馈
如果遇到问题，可以通过以下方式反馈：
- 电子邮件：support@example.com
- GitHub Issues: https://github.com/your-repo/issues

### 3.3 更新日志
每次更新后，请记录更新内容和版本号，方便追踪和回滚。

## 4. 未来计划

### 4.1 新功能
- 增加多用户支持，允许多个学生使用同一设备记录成绩。
- 增加数据导出功能，支持导出为CSV或Excel文件。

### 4.2 性能优化
- 优化前端代码，提高页面加载速度。
- 优化数据库查询，提高数据读取速度。

### 4.3 界面改进
- 根据用户反馈，改进界面设计，提高用户体验。
- 增加更多的主题选项，允许用户自定义界面风