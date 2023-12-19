import { signinDto } from "../recoil/common/interfaces";
import { authInstance, defaultInstance } from "./utils";

// 로그인
export const signin = async (signinDto: signinDto) => {
  return await defaultInstance.post("/auth/system/admin/login", signinDto);
};

// 로그아웃
export const logout = async () => {
  const { data } = await authInstance.post("/auth/system/admin/logout");
  return data;
};
