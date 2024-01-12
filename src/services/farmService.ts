import http from "./HttpService";
import { API_URL } from "@/config";
import { getUserLocal, setUserLocal } from "./userService";

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


export async function addFarm(formData: any) {
  return http.post(apiUrl, formData);
 
}

export function verifyOtp(data: Verify) {
  return http.post(API_URL + "auth/verify_otp", data);
}

export function sendOtp(data: any) {
  return http.post(API_URL + "auth/send_otp", data);
}

export function getFarmById(id: number) {
  return http.get(API_URL + "farms/" + id);
}

export function getActiveFarm(){
  return getUserLocal().farms[0];
}
