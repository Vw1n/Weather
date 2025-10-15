<script setup>
import { onMounted, ref, watch } from 'vue'
import { getTimelineWeather } from './api/TimelineWeather.js'
const address = ref('Shenzhen,China');
watch(address, (newAddress) => {
  console.log(newAddress);
});

const data = ref([]);
const weatherDay = ref(null);
const query = async () => {
  data.value = await getTimelineWeather(address.value);
  weatherDay.value = data.value.days ? data.value.days : null;
  console.log("完整数据：", data.value);
  console.log("weatherDay:", weatherDay.value);
  localStorage.setItem('lastweatherDay', JSON.stringify(weatherDay.value));
};

onMounted(() => {
  const lastData = localStorage.getItem('lastweatherDay');
  if (lastData) {
    weatherDay.value = JSON.parse(lastData);
  } else {
    query();
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
        <div class="date">{{ item.datetime }}</div>
        <div class="main-info">
          <span class="temp">{{ item.temp }}°</span>
          <span class="conditions">{{ item.conditions }}</span>
        </div>
        <div class="details">
          <div class="detail-item">最高: {{ item.tempmax }}°</div>
          <div class="detail-item">最低: {{ item.tempmin }}°</div>
          <div class="detail-item">风速: {{ item.windspeed }}</div>
          <div class="detail-item">降雨概率: {{ item.precipprob }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.search-box {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #888;
}

button {
  padding: 0.75rem 1.5rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #555;
}

.weather-results {
  display: grid;
  gap: 1rem;
}

.weather-card {
  padding: 1.5rem;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  background-color: white;
  transition: box-shadow 0.2s;
}

.weather-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.date {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.75rem;
}

.main-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.temp {
  font-size: 1.8rem;
  font-weight: 500;
  color: #333;
}

.conditions {
  color: #666;
  text-transform: capitalize;
}

.details {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.detail-item {
  flex: 1;
  min-width: 120px;
}

@media (max-width: 600px) {
  .search-box {
    flex-direction: column;
  }

  button {
    width: 100%;
  }

  .details {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
