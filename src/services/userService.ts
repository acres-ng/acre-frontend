import http from "./HttpService";
import { API_URL } from "@/config";

const apiUrl = API_URL + "auth/register";
export const userLocalKey = 'user';


interface Verify {
  contact: string;
  otp: string;
}

export function getJwt() {
  const storedDataString = localStorage.getItem(userLocalKey);

  if (storedDataString !== null) {
    const storedData = JSON.parse(storedDataString);
    if (storedData && storedData.token) {
      return storedData.token;
    }
  }
}

export async function register(user: any) {
  const { data } = await http.post(apiUrl, user);
  localStorage.setItem(
    userLocalKey,
    JSON.stringify({
      token: data?.data?.token,
      customer: data?.data?.customer,
      farms: [],
    })
  );
  return data;
}

export function verifyOtp(data: Verify) {
  return http.post(API_URL + "auth/verify_otp", data);
}

export function sendOtp(data: any) {
  return http.post(API_URL + "auth/send_otp", data);
}

export function getUserLocal() {
  const storedDataString = localStorage.getItem(userLocalKey);
  if (storedDataString !== null) {
    return JSON.parse(storedDataString);
  }
}

export function setUserLocal(user:any) {
  localStorage.setItem(userLocalKey, JSON.stringify(user));
}

export default {
  userLocalKey,
  getJwt,
  register,
};
