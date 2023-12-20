import axiosInstance from "./axios";
const setSession = (token) => {
  if (typeof token === "string" && token.length > 70) {
    localStorage.setItem("authToken", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("Token set successfully");
  } else {
    localStorage.removeItem("authToken");
    delete axiosInstance.defaults.headers.common.Authorization;
    console.error("Invalid token");
  }
};
module.exports = { setSession };
