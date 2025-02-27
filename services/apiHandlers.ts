//checkin
//checkout
// notify-admin
//get employee details
//get attendence details
//get activites details

import axios from "axios";
import api from "./axios";

const CHECK_IN = "attendance/check-in";
const CHECK_OUT = "attendance/check-out";
const POST_NOTIFY_ADMIN = "notify/log";
const GET_NOTIFY_ADMIN = "notify/";
const EMPLOYEE_DETAIL = "";
const ACTIVITY_DETAIL = "";
const EMPLOYEE_ACTIVITY = "notify/my-activity";
const TOGGLE_API = "attendance/toggle-attendance";

const EMPLOYEE_ATTENDANCE = "attendance/get-summary";
const GET_ALL_ATTENDANCE = "attendance/getAllEmployeeAttendances";
const GET_WAREHOUSE_EMPLOYEE_STATUS = "attendance/get-status";
const GET_ALL_WAREHOUSES = "warehouses";

export const checkinApi = async () => {
  try {
    const res = await api.post(CHECK_IN).then((res) => res.data?.data);
    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Error In Checkin");
  }
};

export const checkoutApi = async () => {
  try {
    const res = await api.post(CHECK_OUT).then((res) => res.data.data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const toggleCheckinCheckout = async (data) => {
  try {
    const res = await api.post(TOGGLE_API, data);
    return res.data.data;
  } catch (error) {
    return error;
  }
};

export const notifyApi = async (data: { eventName: string }) => {
  try {
    return await api.post(POST_NOTIFY_ADMIN, data).then((res) => res.data);
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeeDetailsApi = async () => {
  try {
    return await api.post(EMPLOYEE_DETAIL).then((res) => res.data);
  } catch (error) {}
};

export const getActivityDetailsApi = async () => {
  try {
    return await api.post(ACTIVITY_DETAIL).then((res) => res.data);
  } catch (error) {}
};
export const getEmployeeActivityApi = async () => {
  try {
    return await api.get(EMPLOYEE_ACTIVITY).then((res) => res.data);
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeeAttendanceApi = async (id = "1") => {
  try {
    return await api
      .post(`${EMPLOYEE_ATTENDANCE}/${id}`)
      .then((res) => res.data);
  } catch (error) {}
};

export const getUserByToken = async () => {
  try {
    const data = await api.post(`/users/token`);
    return data.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const calculateDistanceApi = async (data) => {
  try {
    const res = await api.post("/users/distance", data);
    return res.data.data;
  } catch (error) {}
};
export const getCheckinStatus = async () => {
  try {
    const res = await api.post(`attendance/getCheckinStatus`);
    const status = await res.data.data;
    return status;
  } catch (error) {}
};

export const sendTokenToServer = async (payload) => {
  try {
    await api.post("users/register-token", payload);
    console.log("Token sent to server");
  } catch (error) {
    console.error("Error sending token to server:", error);
  }
};

export const getAllAttendanceApi = async () => {
  try {
    const { data } = await api.post(GET_ALL_ATTENDANCE);

    return data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllWarehouses = async () => {
  try {
    const res = await api.get(GET_ALL_WAREHOUSES).then((res) => res.data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getWarehouseEmployeeStatus = async (warehouseId: any) => {
  try {
    return await api
      .post(GET_WAREHOUSE_EMPLOYEE_STATUS, { warehouseId })
      .then((res) => res.data);
  } catch (error) {
    console.error(error);
  }
};
