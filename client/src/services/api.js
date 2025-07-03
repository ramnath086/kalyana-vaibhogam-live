import axios from "axios";

export const API = axios.create({
  baseURL: "https://kalyana-vaibhogam.onrender.com/api", // ✅ new working backend URL
});