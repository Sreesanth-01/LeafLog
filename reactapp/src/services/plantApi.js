import { apiClient } from "./api";
import axios from "axios";

const api = axios.create({
  baseURL:
    "http://8080-cdcaaaabedafdacceedbadfcfbabfcdecfafccfe.premiumproject.examly.io",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const addPlant = (data) => {
  return api.post("/api/plants", data);
};

export const getPlants = () => {
  return api.get("/api/plants");
};

export default api;