import { create } from "zustand";

const useLocationSlice = create((set, get) => ({
  isInsideOffice: false,
  isCheckedIn: false,
  isLoggedIn: false,
  token: null,
  user: null,

  setOfficeStatus: (status) =>
    set(() => ({
      isInsideOffice: status,
    })),
  setCheckIn: (status) =>
    set(() => ({
      isCheckedIn: status,
    })),
  setIsLoggedIn: (status) =>
    set(() => ({
      isLoggedIn: status,
    })),
   setToken: (token) =>
    set(() => ({
      token,
    })),
    setUser: (user) =>
    set(() => ({
      user,
    })),
}));

export default useLocationSlice;
