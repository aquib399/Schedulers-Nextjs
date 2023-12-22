import { VALIDATE } from "./api";
import axiosInstance from "./axios";
import Cookies from "js-cookie";

export default function setSession(token, isFromLogin) {
  if (!token) token = Cookies.get("authToken");
  if (typeof token === "string" && token.length > 70) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    if (isFromLogin) {
      Cookies.set("authToken", token, { expires: 15 });
      console.log("Token set successfully");
    }
    axiosInstance.post(VALIDATE).then((res) => {
      console.log("Logged = ", res.status);
    });
  } else {
    Cookies.remove("authToken");
    delete axiosInstance.defaults.headers.common.Authorization;
    console.error("Invalid token");
  }
  return "";
}
