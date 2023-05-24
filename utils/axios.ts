import { axiosInstance } from "@refinedev/simple-rest";
import { AxiosError } from "axios";

axiosInstance.interceptors.request.use(
  async (config) => {
    const unParsedToken = localStorage.getItem("accessToken");
    if (unParsedToken) {
      const token = JSON.parse(unParsedToken);

      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      // remove token and redirect
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    Promise.reject(error);
  }
);

export default axiosInstance;
