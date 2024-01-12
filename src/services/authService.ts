import { API_URL } from "@/config";
import http from "./HttpService";
import { userLocalKey } from "./userService";

const apiUrl = API_URL + "auth/login";

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

export async function login(user: User) {
  const { data } = await http.post(apiUrl, user);
  localStorage.setItem(
    userLocalKey,
    JSON.stringify({
      token: data?.data?.token,
      customer: data?.data?.customer,
      farms: data?.data?.farms || [],
    })
  );

  return data;
}

export async function farmUser(user: User) {
  const { data } = await http.post(apiUrl, user);
  localStorage.setItem(
    userLocalKey,
    JSON.stringify({
      token: data?.data?.token,
      customer: data?.data?.customer,
      farms: data?.data?.farms,
    })
  );
  return data;
}

export function getCurrentUser() {
  try {
    const storedDataString = localStorage.getItem(userLocalKey);

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
    localStorage.setItem(userLocalKey, JSON.stringify(data));
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
  return localStorage.removeItem(userLocalKey);
}

export default {
  userLocalKey,
  login,
  setCurrentUser,
  getCurrentUser,
  farmUser,
  logout,
};
