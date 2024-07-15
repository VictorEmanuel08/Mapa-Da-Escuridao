import axios from "axios";

export const app = axios.create({
  baseURL: "http://192.168.6.181:3004/api",
});
