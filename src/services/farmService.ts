import http from "./HttpService";
import { API_URL } from "@/config";
import { getUserLocal } from "./userService";

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
  geocode:string
};


export async function addFarm(formData: any) {
  return http.post(apiUrl, formData, http.getDefaultOptions());
 
}

export function verifyOtp(data: Verify) {
  return http.post(API_URL + "auth/verify_otp", data);
}

export function sendOtp(data: any) {
  return http.post(API_URL + "auth/send_otp", data);
}

export async function getFarmById(id: number) {
  return http.get(API_URL + "farms/" + id, http.getDefaultOptions());
}

export function getActiveFarm(){
  return getUserLocal().farms[0];
}
