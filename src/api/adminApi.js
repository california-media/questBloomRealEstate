import axios from "axios";

const adminBaseUrl = "https://admin.questrealestate.ae";

const adminApi = axios.create({
  baseURL: adminBaseUrl + "/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-API-Key": "T3SDUBKCS6tfWhyATbOuiBe5YYqR4sMr",
  },
  withCredentials: true,
});
export { adminBaseUrl };
export default adminApi;
