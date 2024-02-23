import axios from "axios";
import { getJwt } from "./userService";

let isAlertShown = false; 

axios.interceptors.response.use(
  null,
  (error: { response: { status: number } }) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      if (!isAlertShown) {
        alert("Something went wrong");
        isAlertShown = true; 
      }
    }
    return Promise.reject(error);
  }
);

export const getDefaultOptions = (jwt?:string) => {
  const token = jwt ?? getJwt();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
};

const instance = axios.create(getDefaultOptions());

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  patch: instance.patch,
  delete: instance.delete,
  getDefaultOptions,
};
