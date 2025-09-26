// import axios from "axios";

// const API = axios.create({
//   // baseURL: "https://testseries-1vg0.onrender.com/api",
//   baseURL: "http://localhost:5100/api",
// });

// API.interceptors.request.use((config) => {
//   const adminKey = sessionStorage.getItem("adminKey");

//   if (config.url.startsWith("/admin")) {
//     if (!adminKey) {
//       console.warn("Admin key missing! This request will fail.");
//     } else {
//       config.headers["x-admin-key"] = adminKey.trim(); 
//     }
//   }

//   return config;
// });

// export default API;
// api.js
// api.js
import axios from "axios";

// Environment-based baseURL
const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://testseries-1vg0.onrender.com/api"
      : "http://localhost:5100/api",
});

// Interceptor to attach admin key for /admin routes
API.interceptors.request.use(
  (config) => {
    const adminKey = sessionStorage.getItem("adminKey");

    if (config.url.startsWith("/admin")) {
      if (!adminKey) {
        console.warn(
          "Admin key missing! This /admin request will likely fail with 403."
        );
      } else {
        config.headers["x-admin-key"] = adminKey.trim();
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: global response interceptor to handle 403 automatically
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.warn(
        "Received 403 from server. Admin key may be missing or invalid."
      );
      sessionStorage.removeItem("adminKey"); 
    }
    return Promise.reject(error);
  }
);

export default API;

