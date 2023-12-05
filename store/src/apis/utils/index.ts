import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const axiosApi = (baseURL: string | undefined) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });
  return instance;
};

const axiosAuthApi = (baseURL: any) => {
  const instance = axios.create({
    baseURL,
    // withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      config.headers["userId"] = 1;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
