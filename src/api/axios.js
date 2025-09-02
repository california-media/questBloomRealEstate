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

// Interceptor to add default `country` for GET requests to `/properties` or `/areas`
api.interceptors.request.use((config) => {
  const url = config.url || "";

  if (
    config.method === "get" &&
    (url.startsWith("/properties") || url.startsWith("/areas"))
  ) {
    config.params = config.params || {};
    if (!config.params.country) {
      config.params.country = "United Arab Emirates";
    }
  }

  return config;
});

export default api;
