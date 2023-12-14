import { API_URL } from "@/config";
import http from "./HttpService";

interface User {
  login: string;
  password: string;
  login_type: string;
}

export interface Token {
  token: string;
  customer: {
    profile_id: string;
    id: string;
    firstname: string;
    email: string;
    phone: string;
  };
  farms: {
    id: string;
    name: string;
  }[];
}

export const tokenKey: string = "user";
const apiUrl = API_URL + "auth/login";

export function getJwt() {
  const storedDataString = localStorage.getItem(tokenKey);

  if (storedDataString !== null) {
    const storedData = JSON.parse(storedDataString);
    if (storedData && storedData.token) {
      return storedData.token;
    }
  }
}

// http.setJwt(getJwt());

export async function login(user: User) {
  const { data } = await http.post(apiUrl, user);
  localStorage.setItem(
    tokenKey,
    JSON.stringify({
      token: data?.data?.token,
      customer: data?.data?.customer,
      farms: data?.data?.farms || [],
    })
  );
  http.setJwt(getJwt());
  return data;
}

export async function farmUser(user: User) {
  const { data } = await http.post(apiUrl, user);
  localStorage.setItem(
    tokenKey,
    JSON.stringify({
      token: data?.data?.token,
      customer: data?.data?.customer,
      farms: data?.data?.farms,
    })
  );
  http.setJwt(getJwt());
  return data;
}

export function getCurrentUser() {
  try {
    const storedDataString = localStorage.getItem(tokenKey);

    if (storedDataString !== null) {
      const storedData = JSON.parse(storedDataString);
      return storedData;
    }
  } catch (error) {
    return null;
  }
}

export function setCurrentUser(data: any) {
  try {
    localStorage.setItem(tokenKey, JSON.stringify(data));
  } catch (error) {
    return null;
  }
}

// Example function to decode the JWT
export const decodeToken = (token: string) => {
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};

export async function getOTP(payload: { contact: string }) {
  const { data } = await http.post(`${API_URL}auth/send_otp`, payload);
  return data;
}

export function logout() {
  return localStorage.removeItem(tokenKey);
}

export default {
  login,
  getJwt,
  setCurrentUser,
  getCurrentUser,
  farmUser,
  logout,
};
