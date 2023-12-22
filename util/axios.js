import axios from "axios";
import { BASE_URL } from "./api";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("authToken")}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error?.response?.data.message);
    if (error?.response?.status == 403) {
      const pathname = window.location.pathname;
      if (pathname != "/signin" && pathname != "/signup") {
        let message = "Session expired, Please login again";
        if (!Cookies.get("authToken")) message = "Kindly login first";
        toast.error(message);
        setTimeout(() => {
          window.location.replace("/signin");
        }, 2500);
      }
    }
    return error?.response;
  }
);

export default axiosInstance;
