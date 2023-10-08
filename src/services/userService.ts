import http from "./HttpService";
import { API_URL } from "@/config";

const apiUrl = API_URL + "auth/register";

interface Verify {
  profile_id: string;
  otp: string;
}

export function register(user: any) {
  return http.post(apiUrl, user);
}

export function verifyOtp(data: Verify) {
  return http.post(API_URL + "auth/send_otp", data);
}

export default {
  register,
};
