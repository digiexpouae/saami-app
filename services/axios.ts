import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const api = axios.create({
  // baseURL: "https://saamiapi.saamitradestar.com/api/",
  // baseURL: "http://192.168.0.107:5000/api/",
  baseURL: "http://192.168.1.4:5000/api/",
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers.authToken = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api