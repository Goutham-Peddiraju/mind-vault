import axios from "axios";

const API = axios.create({ baseURL: "https://mind-vault-ng5c.onrender.com/" });

// Attach token to every request if exists
API.interceptors.request.use((req) => {
  const token = sessionStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
