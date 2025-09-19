import axios from "axios";

const API = axios.create({
  baseURL: "https://testseries-1vg0.onrender.com/api",
});

// Add admin key only for /admin routes
API.interceptors.request.use((config) => {
  const adminKey = sessionStorage.getItem("adminKey");

  if (adminKey && config.url.startsWith("/admin")) {
    config.headers["x-admin-key"] = adminKey;
  }

  return config;
});

export default API;
