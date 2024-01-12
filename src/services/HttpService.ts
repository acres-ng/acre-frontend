import axios from "axios";
import { getJwt } from "./userService";

let isAlertShown = false; // Add a flag to track if the alert has been shown

axios.interceptors.response.use(
  null,
  (error: { response: { status: number } }) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      if (!isAlertShown) {
        console.log("Logging the error", error);
        alert("Something went wrong");
        isAlertShown = true; // Set the flag to true after showing the alert
      }
    }
    return Promise.reject(error);
  }
);

const instance = axios.create({
  headers:{
    Authorization: `Bearer ${getJwt()}`,
  }
});

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  patch: instance.patch,
  delete: instance.delete,
  
};
