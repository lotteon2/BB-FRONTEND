import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const axiosApi = (baseURL: string | undefined) => {
  const instance = axios.create({
    baseURL,
    // withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      config.headers["Content-Type"] = "application/json";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return instance;
};

const axiosAuthApi = (baseURL: string | undefined) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
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

          await axios
            .post(`${BASE_URL}/auth/refresh-token`)
            .then((data) => {
              console.log(data);
              const newToken = data.headers["authorization"];
              localStorage.setItem("accessToken", newToken);
              originalRequest.headers.Authorization = newToken;
            })
            .catch((error) => {
              console.log(error);
              localStorage.clear();
              // eslint-disable-next-line no-restricted-globals
              location.replace("https://blooming.blooms.store.stockey.kr/");
            });
          return axios(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
