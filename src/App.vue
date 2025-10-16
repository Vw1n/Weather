<script setup>
import { onMounted, ref, watch } from 'vue'
import { getTimelineWeather, getTimelineWeatherLocation } from './api/TimelineWeather.js'
const address = ref('');
watch(address, (newAddress) => {
  console.log(newAddress);
});

const data = ref([]);
const weatherDay = ref(null);
const query = async () => {
  data.value = await getTimelineWeather(address.value);
  weatherDay.value = data.value.days ? formatData(data.value.days) : null;
  console.log("完整数据：", data.value);
  console.log("weatherDay:", weatherDay.value);
  localStorage.setItem('lastweatherDay', JSON.stringify(weatherDay.value));
};

const getLocation = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(queryPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
const queryPosition = async function (position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  data.value = await getTimelineWeatherLocation(lat, long);
  weatherDay.value = data.value.days ? formatData(data.value.days) : null;
  console.log("完整数据：", data.value);
  console.log("weatherDay:", weatherDay.value);
  localStorage.setItem('lastweatherDay', JSON.stringify(weatherDay.value));
}

const formatData = (data) => {
  return data.map(item => ({
    ...item,
    datetime: item.datetime.slice(5),
    temp: convertFahrenheitToCelsius(item.temp).toFixed(1),
    tempmax: convertFahrenheitToCelsius(item.tempmax).toFixed(1),
    tempmin: convertFahrenheitToCelsius(item.tempmin).toFixed(1),
  }));
}
function convertFahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

const getWeatherEmoji = (conditions) => {
  const condition = conditions.toLowerCase();
  if (condition.includes('晴朗')) {
    return '☀️';
  } else if (condition === '部分多云') {
    return '⛅';
  } else if (condition.includes('雨')) {
    return '🌧️';
  } else if (condition.includes('阴云密布')) {
    return '☁️';
  } else {
    return '🌤️';
  }
}

onMounted(() => {
  const lastData = localStorage.getItem('lastweatherDay');
  if (lastData) {
    console.log("使用缓存数据");
    weatherDay.value = JSON.parse(lastData);
  } else {
    console.log("没有缓存数据，获取当前位置天气");
    getLocation();
  }
})
</script>

<template>
  <div class="weather-container">
    <div class="search-box">
      <input v-model="address" type="text" placeholder="输入地址查询天气" />
      <button @click="query">查询</button>
    </div>

    <div class="weather-results">
      <div v-for="(item, index) in weatherDay" :key="index" class="weather-card">
        <div class="weather-icon">
          <!-- 这里可以根据天气状况显示不同的图标 -->
          <span class="weather-emoji">{{ getWeatherEmoji(item.conditions) }}</span>
        </div>
        <div class="main-info">
          <div class="info-top">
            <span class="date">{{ item.datetime }}</span>
            <span class="conditions">{{ item.conditions }}</span>
          </div>
          <div class="info-bottom">
            <span class="temp">{{ item.temp }}°</span>
            <span class="temp-range">{{ item.tempmax }}°-{{ item.tempmin }}°</span>
          </div>
        </div>
        <div class="details">
          <div class="detail-item">风速: {{ item.windspeed }}</div>
          <div class="detail-item">降雨概率: {{ item.precipprob }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* 重置样式 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 主体背景 - 使用简单纯色背景提高可读性 */
body {
  background-color: #2c3e50;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #333;
}

/* 容器样式 */
.weather-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
}

/* 搜索框样式 - 高对比度 */
.search-box {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

input {
  flex: 1;
  padding: 1rem 1.25rem;
  border: 2px solid #3498db;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  background-color: #ffffff;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #2980b9;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

input::placeholder {
  color: #666;
  font-weight: 500;
}

button {
  padding: 1rem 1.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 700;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

/* 天气结果网格 */
.weather-results {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  justify-items: center;
}

/* 天气卡片 - 简单纯色背景，高对比度 */
.weather-card {
  width: 100%;
  max-width: 320px;
  min-height: 220px;
  border-radius: 16px;
  background-color: #ffffff;
  border: 2px solid #ecf0f1;
  padding: 1.5rem;
  color: #2c3e50;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.weather-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  border-color: #3498db;
}

/* 天气图标 */
.weather-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2.5rem;
}

/* 主要信息区域 */
.main-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info-top {
  margin-bottom: 1.5rem;
}

/* 日期文字 - 更大、更清晰 */
.date {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

/* 天气状况文字 - 更大、更醒目 */
.conditions {
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
  color: #34495e;
}

.info-bottom {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

/* 温度文字 - 非常大、粗体、高对比度 */
.temp {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1;
  color: #e74c3c;
}

/* 温度范围 - 大字体、高对比度 */
.temp-range {
  font-size: 1.3rem;
  font-weight: 700;
  color: #34495e;
}

/* 详细信息区域 */
.details {
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 2px solid #ecf0f1;
}

/* 详细信息项 - 大字体、粗体 */
.detail-item {
  font-size: 1.1rem;
  font-weight: 700;
  color: #34495e;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .weather-container {
    padding: 1rem;
  }

  .search-box {
    flex-direction: column;
  }

  .weather-results {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .weather-card {
    max-width: 100%;
  }

  .temp {
    font-size: 3rem;
  }

  .date {
    font-size: 1.3rem;
  }

  .conditions {
    font-size: 1rem;
  }

  .temp-range {
    font-size: 1.1rem;
  }

  .detail-item {
    font-size: 1rem;
  }
}
</style>
