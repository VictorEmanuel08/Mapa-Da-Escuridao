import axios from "axios";

export const app = axios.create({
  baseURL: "http://192.168.6.146/api",
});
