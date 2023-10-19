import { API_URL } from "@/config";
import http from "./HttpService";
import jwtDecode from "jwt-decode";

interface User {
  login: string;
  password: string;
  login_type: string;
}

const tokenKey: string = "user";
const apiUrl = API_URL + "auth/login";

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export async function login(user: User) {
  const { data } = await http.post(apiUrl, user);
  localStorage.setItem(tokenKey, data?.data?.token);
  http.setJwt(getJwt());
  return data;
}

export function getCurrentUser(): any {
  const token = localStorage.getItem(tokenKey); // Retrieve the JWT from local storage
  if (token) {
    return token;
  }
  return null; // Return null if the JWT is not present or invalid
}

// Example function to decode the JWT
const decodeToken = (token: string) => {
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};

// export function getCurrentUser() {
//   if (localStorage.getItem(tokenKey)) {
//     const jwt: any = localStorage.getItem(tokenKey);
//     return jwtDecode(jwt);
//   }
// }

export function logout() {
  return localStorage.removeItem(tokenKey);
}

export default {
  login,
  getJwt,
  getCurrentUser,
  logout,
};
