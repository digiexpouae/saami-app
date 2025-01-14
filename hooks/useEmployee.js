import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const useLocationSlice = create((set) => ({
  isInsideOffice: false,
  isCheckedIn: false,
  isLoggedIn: null,
  token: null,
  user: null,
  userId: null,

  initialize: async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      const token = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
      set({ isLoggedIn, token, userId });
    } catch (error) {
      console.error("Error initializing from AsyncStorage:", error);
      set({ isLoggedIn: false, token: null, userId: null });
    }
  },

  setOfficeStatus: (status) => set({ isInsideOffice: status }),
  setCheckIn: (status) => set({ isCheckedIn: status }),
  setIsLoggedIn: async (status) => {
    try {
      await AsyncStorage.setItem("isLoggedIn", status);
      set({ isLoggedIn: status });
    } catch (e) {
      console.log("Error while saving isLoggedIn to async storage", e);
    }
  },
  setToken: async (token) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      set({ token });
    } catch (e) {
      console.log("Error while saving token to async storage", e);
    }
  },
  setUserId: async (userId) => {
    try {
      await AsyncStorage.setItem("userId", userId);
      set({ userId });
    } catch (e) {
      console.log("Error while saving userId to async storage", e);
    }
  },
  setUser: (user) => set({ user }),
}));


useLocationSlice.getState().initialize();

export default useLocationSlice;
