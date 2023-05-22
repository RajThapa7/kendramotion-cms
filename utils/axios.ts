import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFqIHRoYXBhIiwiZW1haWwiOiJyYWpAdGhhcGEuY29tIiwiaWF0IjoxNjg0Njc5NjIxLCJleHAiOjE2ODQ3NjYwMjF9.FdioDdaBDAvm1BVU-KBIZvShCE_UohQ3jKyk7DJw9Uo";

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "patch" ||
      config.method === "delete"
    ) {
      config.url = config.url + "/";
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
