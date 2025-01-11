import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const api = axios.create({
  baseURL: "http://192.168.1.7:5000/api",
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