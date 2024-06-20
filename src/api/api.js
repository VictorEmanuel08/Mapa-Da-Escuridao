import axios from "axios";

export const app = axios.create({
  baseURL: " http://192.168.100.51:3000/api",
});
