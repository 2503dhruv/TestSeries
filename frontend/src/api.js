// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://testseries-1vg0.onrender.com/api",
});

// Add interceptors here later if you add authentication tokens
export default API;
