import axios from "axios";

export const API_BASE_URL = "https://codeharbour-production.up.railway.app";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//FIX: Use interceptor instead of reading jwt once at startup
// This ensures every request gets the LATEST jwt from localStorage
// Previously jwt was read once — after login it was still null/old
api.interceptors.request.use((config) => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;