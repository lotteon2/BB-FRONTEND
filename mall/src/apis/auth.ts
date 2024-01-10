import { loginDto } from "../recoil/common/interfaces";
import { authInstance, defaultInstance } from "./utils";

// 인가코드 전달
export const kakaoLogin = async (code: string | null) => {
  const { data } = await defaultInstance.get(
    "/auth/login/oauth2/kakao?code=" + code
  );
  return data;
};

// 로그인
export const login = async (loginDto: loginDto) => {
  return await defaultInstance.post("/auth/social/login", loginDto);
};
// 로그아웃
export const logout = async (type: string) => {
  const { data } = await authInstance.post("/auth/social/" + type + "/logout");
  return data;
};
