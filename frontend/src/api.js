import axios from "axios";

const API = axios.create({
  baseURL: "https://testseries-1vg0.onrender.com/api", 
});

export default API;
