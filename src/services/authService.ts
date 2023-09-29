import { API_URL } from "@/config";
import http from "./HttpService";
import jwtDecode from "jwt-decode";

interface User {
  _id: string;
  name: string;
  email: string;
}

const tokenKey: string = "token";
const apiUrl = API_URL + "auth/login";

http.setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export async function login(user: any) {
  // await http.post(apiUrl, user);
  const { data: jwt } = await http.post(apiUrl, user);
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser(): User | null {
  const token = localStorage.getItem(tokenKey); // Retrieve the JWT from local storage
  if (token) {
    const decodedToken = decodeToken(token); // Decode the JWT
    if (decodedToken) {
      const { _id, name, email } = decodedToken; // Extract the user information from the decoded token
      const user: User = {
        _id,
        name,
        email,
      };
      return decodedToken;
    }
  }
  return null; // Return null if the JWT is not present or invalid
}

// Example function to decode the JWT
const decodeToken = (token: string) => {
  // Implement the decoding logic for your specific JWT library or algorithm
  // This is just a placeholder implementation
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
