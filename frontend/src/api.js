// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5100/api",
});

// Add interceptors here later if you add authentication tokens
export default API;
