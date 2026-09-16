import axios from "axios";

const authApi = axios.create({
  baseURL:
    "http://localhost:8080/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginApi = (data) => {
  return authApi.post("/login", data);
};

export const registerUser = (data) => {
  return authApi.post("/signUp", data);
};