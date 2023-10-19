import axios from "axios";

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

function setJwt(jwt: any) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt,
};
