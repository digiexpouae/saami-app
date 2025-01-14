import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const api = axios.create({
  baseURL: "https://saamiapi.saamitradestar.com/api/",
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