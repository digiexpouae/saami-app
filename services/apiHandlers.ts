//checkin
//checkout
// notify-admin
//get employee details
//get attendence details
//get activites details

import api from "./axios";

const CHECK_IN = "attendance/check-in";
const CHECK_OUT = "attendance/check-out";
const POST_NOTIFY_ADMIN = "notify/log";
const GET_NOTIFY_ADMIN = "notify/"
const EMPLOYEE_DETAIL = "";
const ACTIVITY_DETAIL = "";
const EMPLOYEE_ACTIVITY = "notify/my-activity";


const EMPLOYEE_ATTENDANCE = "attendance/get-summary";
const GET_ALL_ATTENDANCE = "attendance/get-all";

export const checkinApi = async () => {
  try {
    const res = await api.post(CHECK_IN).then((res) => res.data?.data);
    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Error In Checkin")
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
  } catch (error) { }
};

export const getActivityDetailsApi = async () => {
  try {
    return await api.post(ACTIVITY_DETAIL).then((res => res.data))
  } catch (error) {

  }
}
export const getEmployeeActivityApi = async () => {
  try {
    return await api.get(EMPLOYEE_ACTIVITY).then((res) => res.data);
  }
  catch (error) {
    console.log(error);
  }
}

export const getEmployeeAttendanceApi = async (id = "1") => {
  try {
    return await api.post(`${EMPLOYEE_ATTENDANCE}/${id}`).then((res) => res.data);
  } catch (error) {

  }
}

export const getUserByToken = async () => {
  try {

    const data = await api.post(`/users/token`)
    return data.data.data
  } catch (error) {
    console.log(error);

  }
}

export const calculateDistanceApi = async (data) => {
  try {
    const res = await api.post("/users/distance", data);
    return res.data.data

} catch (error) {

}
};
export const getCheckinStatus = async () => {
  try {
    const res = await api.post(`/users/getCheckinStatus`);
    const status = await res.data.data
    return status;

  } catch (error) {

  }
}

export const getAllAttendanceApi = async () => {
  try {
    return await api.get(GET_ALL_ATTENDANCE).then((res) => res.data);
  } catch (error) {

  }
}