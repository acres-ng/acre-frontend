import http from "./HttpService";
import { API_URL } from "@/config";
import { getJwt, tokenKey } from "./authService";

const apiUrl = API_URL + "auth/register";

interface Verify {
  contact: string;
  otp: string;
}

export async function register(user: any) {
  const { data } = await http.post(apiUrl, user);
  localStorage.setItem(
    tokenKey,
    JSON.stringify({
      token: data?.data?.token,
      customer: data?.data?.customer,
      farms: [],
    })
  );
  http.setJwt(getJwt());
  return data;
}

export function verifyOtp(data: Verify) {
  return http.post(API_URL + "auth/verify_otp", data);
}

export function sendOtp(data: any) {
  return http.post(API_URL + "auth/send_otp", data);
}

export default {
  register,
};
