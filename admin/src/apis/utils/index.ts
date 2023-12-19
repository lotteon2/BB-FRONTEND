import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const axiosApi = (baseURL: string | undefined) => {
  const instance = axios.create({
    baseURL,
  });
  return instance;
};

const axiosAuthApi = (baseURL: string | undefined) => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use(
    (config) => {
      const access_token = localStorage.getItem("accessToken");
      console.log(access_token);
      if (access_token) {
        config.headers.Authorization = access_token;
      }
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
