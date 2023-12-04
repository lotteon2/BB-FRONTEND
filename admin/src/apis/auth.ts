import { signinDto } from "../recoil/common/interfaces";
import { authInstance, defaultInstance } from "./utils";

// 로그인
export const signin = async (signinDto: signinDto) => {
  const { data } = await defaultInstance.post("/stores/login", signinDto);
  return data;
};

// 로그아웃
export const logout = async () => {
  const { data } = await authInstance.post("/system/admin/logout");
  return data;
};
