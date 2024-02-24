import axios from "axios";
import { getJwt } from "./userService";

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
instance.interceptors.response.use(
  null,
  (error: { response: { status: number } }) => {
    if(error.response.status === 401){
      window.location.href = "/login"
    }
    return Promise.reject(error);
  }
);

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  patch: instance.patch,
  delete: instance.delete,
  getDefaultOptions,
};
