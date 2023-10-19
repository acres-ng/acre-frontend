import http from "./HttpService";
import { API_URL } from "@/config";

const apiUrl = API_URL + "farms";

interface Verify {
  contact: string;
  otp: string;
}

type Farm = {
  farm_name: string;
  country: string;
  line_address1: string;
  line_address2: string;
  state: string;
};

export function addFarm(data: any) {
  return http.post(apiUrl, data);
}

export function verifyOtp(data: Verify) {
  return http.post(API_URL + "auth/verify_otp", data);
}

export function sendOtp(data: any) {
  return http.post(API_URL + "auth/send_otp", data);
}
