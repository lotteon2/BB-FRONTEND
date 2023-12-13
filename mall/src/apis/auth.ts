import { authInstance, defaultInstance } from "./utils";

// 인가코드 전달
export const kakaoLogin = async (code: string | null) => {
  const { data } = await defaultInstance.get(
    "/auth/login/oauth2/code/kakao?code=" + code
  );
  return data;
};

// 로그인

// 로그아웃
export const logout = async (type: string) => {
  const { data } = await authInstance.post("/auth/social/" + type + "/logout");
  return data;
};
