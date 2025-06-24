import axios from "axios";

const adminApi = axios.create({
  baseURL: "/adminApi",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-API-Key": "T3SDUBKCS6tfWhyATbOuiBe5YYqR4sMr",
  },
  withCredentials: true,
});
export default adminApi;
