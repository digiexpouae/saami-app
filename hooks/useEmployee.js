import { create } from "zustand";

const useLocationSlice = create((set, get) => ({
  isInsideOffice: false,
  isCheckedIn: false,
  isLoggedIn: false,

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
}));

export default useLocationSlice;
