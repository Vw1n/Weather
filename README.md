# 天气应用 / Weather App

## 项目简介 / Project Introduction

这是一个基于Vue 3和Vite开发的现代化天气应用，提供实时天气查询和多日天气预报功能。应用采用响应式设计，在不同设备上都能提供良好的用户体验。

This is a modern weather application developed with Vue 3 and Vite, providing real-time weather query and multi-day weather forecast features. The application uses responsive design to provide a good user experience on different devices.

## 功能特点 / Features

- 🔍 通过地址搜索天气信息
- 📍 根据地理位置自动获取天气
- 📅 显示多日天气预报
- 🌡️ 温度转换（华氏度转摄氏度）
- 😊 使用emoji直观展示天气状况
- 💾 本地缓存天气数据，提高访问速度
- 📱 完全响应式设计，适配各种设备

- 🔍 Search weather information by address
- 📍 Automatically get weather based on geographic location
- 📅 Display multi-day weather forecast
- 🌡️ Temperature conversion (Fahrenheit to Celsius)
- 😊 Intuitive display of weather conditions using emoji
- 💾 Local caching of weather data to improve access speed
- 📱 Fully responsive design, adapting to various devices

## 技术栈 / Technology Stack

- **前端框架**: Vue 3
- **构建工具**: Vite
- **HTTP客户端**: Axios
- **API**: Visual Crossing Weather API
- **存储**: localStorage

## 安装与运行 / Installation and Running

### 前置要求 / Prerequisites

- Node.js >= 20.19.0 或 >= 22.12.0
- npm 或 yarn

### 安装步骤 / Installation Steps

1. 克隆项目到本地
   ```bash
   git clone https://github.com/your-username/Weather.git
   cd Weather
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 运行开发服务器
   ```bash
   npm run dev
   ```

4. 构建生产版本
   ```bash
   npm run build
   ```

5. 预览生产构建
   ```bash
   npm run preview
   ```

## API配置 / API Configuration

本项目使用Visual Crossing Weather API获取天气数据。在`src/api/TimelineWeather.js`文件中配置了API密钥。建议在生产环境中，将API密钥存储在环境变量中：

This project uses the Visual Crossing Weather API to fetch weather data. The API key is configured in the `src/api/TimelineWeather.js` file. In a production environment, it's recommended to store the API key in environment variables:

1. 创建`.env`文件
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

2. 修改`TimelineWeather.js`中的API密钥获取方式
   ```javascript
   const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
   ```

## 项目结构 / Project Structure

```
Weather/
├── public/            # 静态资源
├── src/               # 源代码
│   ├── api/           # API请求相关文件
│   │   └── TimelineWeather.js  # 天气API调用
│   ├── assets/        # 项目资源
│   ├── components/    # Vue组件
│   ├── App.vue        # 根组件
│   └── main.js        # 入口文件
├── index.html         # HTML模板
├── vite.config.js     # Vite配置
└── package.json       # 项目依赖配置
```

## 使用说明 / Usage

1. **地址搜索**: 在搜索框中输入城市名称或地址，点击查询按钮获取该地区的天气信息
2. **自动定位**: 应用启动时会尝试获取您的地理位置，并自动加载当地天气
3. **温度显示**: 温度以摄氏度显示，并显示最高和最低温度范围
4. **天气详情**: 每张天气卡片显示日期、天气状况、当前温度、温度范围、风速和降水概率

1. **Address Search**: Enter a city name or address in the search box, click the query button to get weather information for that area
2. **Auto-location**: When the application starts, it will try to get your geographic location and automatically load the local weather
3. **Temperature Display**: Temperature is displayed in Celsius, along with the highest and lowest temperature ranges
4. **Weather Details**: Each weather card displays date, weather conditions, current temperature, temperature range, wind speed, and precipitation probability

## 开发工具推荐 / Recommended Development Tools

### IDE推荐 / Recommended IDE

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（请禁用Vetur）

### 浏览器工具 / Browser Tools

- 基于Chromium的浏览器（Chrome、Edge、Brave等）：
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - 在Chrome DevTools中启用自定义对象格式化程序
- Firefox：
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - 在Firefox DevTools中启用自定义对象格式化程序

## 许可证 / License

本项目采用MIT许可证。

This project is licensed under the MIT License.

## 贡献 / Contributions

欢迎提交Issues和Pull Requests！

Contributions are welcome! Please submit Issues and Pull Requests.
