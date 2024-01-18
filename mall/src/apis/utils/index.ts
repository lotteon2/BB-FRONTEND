import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const axiosApi = (baseURL: string | undefined) => {
  const instance = axios.create({
    baseURL,
    withCredentials: false,
  });
  return instance;
};

const axiosAuthApi = (baseURL: string | undefined) => {
  const instance = axios.create({
    baseURL,
    withCredentials: false,
  });

  instance.interceptors.request.use(
    (config) => {
      const access_token = localStorage.getItem("accessToken");
      if (access_token) {
        config.headers.Authorization = access_token;
        config.headers["Content-Type"] = "application/json";
      }
      return config;
    },
    async (error) => {
      if (error.response.status === 401) {
        if (error.response.data.message === "Expired") {
          const originalRequest = error.config;

          const data = {
            role: error.response.data.role,
            id: error.response.data.id,
            expiredAccessToken: localStorage.getItem("accessToken"),
          };

          await axios
            .post(`${BASE_URL}/auth/refresh-token`, data)
            .then((data) => {
              const newToken = data.headers["authorization"];
              localStorage.setItem("accessToken", newToken);
              originalRequest.headers.Authorization = newToken;
            })
            .catch(() => {
              localStorage.clear();
              // eslint-disable-next-line no-restricted-globals
              window.location.href = "/login";
            });
          return axios(originalRequest);
        } else if (error.response.data.message === "Refresh-Expired") {
          localStorage.clear();
          // eslint-disable-next-line no-restricted-globals
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
