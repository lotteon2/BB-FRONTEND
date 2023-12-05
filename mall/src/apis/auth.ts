import { authInstance, defaultInstance } from "./utils";

// 로그인
export const kakaoLogin = async (code: string | null) => {
  const { data } = await defaultInstance.get("/kakao/token?code=" + code);
  return data;
};

// 로그아웃
export const logout = async (type: string) => {
  const { data } = await authInstance.post("/social/" + type + "/logout");
  return data;
};
