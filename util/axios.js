import axios from "axios";
import { BASE_URL } from "./api";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error?.status === 401) {
      // toast.error("Session expired please login again");
    } else {
      // toast.error('Please Signin again, something went wrong');
    }
  }
);

export default axiosInstance;
