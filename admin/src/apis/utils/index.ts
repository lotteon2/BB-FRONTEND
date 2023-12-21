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
      if (access_token) {
        config.headers.Authorization = access_token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },

    async (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        if (error.response.data.message === "Expired") {
          const originalRequest = error.response.config;
          const accessToken = localStorage.getItem("accessToken");
          // token refresh 요청
          const data = await axios
            .post(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, {
              role: error.response.data.role,
              id: error.response.data.id,
              expiredAccessToken: accessToken,
            })
            .then((data) => {
              console.log(data);
              // const {
              //   data: {
              //     accessToken: newAccessToken,
              //     refreshToken: newRefreshToken,
              //   },
              // } = data;
              // localStorage.setItem("accessToken", newAccessToken);
              // localStorage.setItem("refreshToken", newRefreshToken);
              // originalRequest.headers.AccessToken = `Bearer ${newAccessToken}`;
            })
            .catch((error) => {
              console.log(error);
              // localStorage.removeItem("accessToken");
              // window.location.href = "/login";
              // if (error.response.data.code === "008") {
              //   localStorage.removeItem("isLogin");
              //   localStorage.removeItem("user");
              //   localStorage.removeItem("refreshToken");
              //   localStorage.removeItem("accessToken");
              //   window.location.href = "/login";
              // }
            });
          // 요청 후 새롭게 받은 access token과 refresh token 을 다시 저장
          // localStorage에도 변경 해야하고 현재 request의 header도 변경

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
