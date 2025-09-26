import axios from "axios";

const API = axios.create({
  baseURL: "https://testseries-1vg0.onrender.com/api",
  // baseURL: "http://localhost:5100/api",
});

API.interceptors.request.use((config) => {
  const adminKey = sessionStorage.getItem("adminKey");

  if (config.url.startsWith("/admin")) {
    if (!adminKey) {
      console.warn("Admin key missing! This request will fail.");
    } else {
      config.headers["x-admin-key"] = adminKey.trim(); 
    }
  }

  return config;
});

export default API;
