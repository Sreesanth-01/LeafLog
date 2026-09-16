import { apiClient } from "./api";
import axios from "axios";

const api = axios.create({
  baseURL:
    "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
    console.log("JWT being sent:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const addPlant = (data) => {
  return api.post("/plants", data);
};

export const getPlants = () => {
  return api.get("/plants");
};

export default api;