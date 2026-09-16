import axios from "axios";

const authApi = axios.create({
  baseURL:
    "http://8080-cdcaaaabedafdacceedbadfcfbabfcdecfafccfe.premiumproject.examly.io",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginApi = (data) => {
  return authApi.post("/api/auth/login", data);
};

export const registerUser = (data) => {
  return authApi.post("/api/auth/register", data);
};