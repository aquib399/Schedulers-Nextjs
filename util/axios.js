import axios from "axios";
import { BASE_URL } from "./api";
import { toast } from "react-toastify";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error?.response?.data?.message);
    console.error(error);
    toast.error(error?.response?.data?.message);
    return error?.response;
  }
);

export default axiosInstance;
