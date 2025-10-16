import axios from "axios";
// const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_KEY = 'K789K2FE8VUQT6ZD34LWTSFS8';
const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

/**
 * 获取指定地址的天气时间线数据
 * @param {string} address - 要查询天气的地址（如城市名、地区等）
 * @returns {Promise<Object>} 天气数据对象（包含时间线天气信息）
 * @throws {Error} 当请求失败时抛出错误，供调用者处理
 */
export async function getTimelineWeather(address) {
  try {
    const response = await axios.get(
      `${BASE_URL}/${address}?key=${API_KEY}&lang=zh`
    );
    console.log('response=',response);
    return response.data;
  } catch (error) {
    console.error("Error fetching timeline weather data:", error);
    throw error;
  }
}

export async function getTimelineWeatherLocation(latitude, longitude) {
  try {
    const response = await axios.get(
      `${BASE_URL}/${latitude},${longitude}?key=${API_KEY}&lang=zh`
    );
    console.log('response=',response);
    return response.data;
  } catch (error) {
    console.error("Error fetching timeline weather data:", error);
    throw error;
  }
}