import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-API-Key": "reelly-682aebad-HMGFdRATSsyggYB7YgAvpwjuec5tGqlz",
  },
  withCredentials: true,
});

export default api;
