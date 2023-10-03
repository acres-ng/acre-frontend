import http from "./HttpService";
import { API_URL } from "@/config";

const apiUrl = API_URL + "auth/register";

interface Verify {
  code: string;
  phone: string;
}

export function register(user: any) {
  return http.post(apiUrl, user);
}

export function verifyOtp(data: Verify) {
  return http.post(apiUrl + "/verify", data);
}

export default {
  register,
};
