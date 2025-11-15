
// src/api.js
import axios from "axios";

// Use VITE_API_URL if it exists, otherwise fall back to localhost:4000
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// Create API instance
export const api = axios.create({
  // Final base URL will be e.g. http://localhost:4000/api
  baseURL: `${BASE_URL}/api`,
  withCredentials: true, // OK to leave true, even if you don't use cookies yet
});

// Attach token to headers automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

