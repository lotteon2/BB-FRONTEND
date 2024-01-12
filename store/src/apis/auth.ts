import {
  reRegisterBusinessNumberImageDto,
  signinDto,
  signupDto,
} from "../recoil/common/interfaces";
import { authInstance, defaultInstance } from "./utils";

// 로그인
export const signin = async (signinDto: signinDto) => {
  return await defaultInstance.post("/auth/stores/login", signinDto);
};

// 회원가입
export const signup = async (signupDto: signupDto) => {
  const { data } = await defaultInstance.post("/auth/stores/signup", signupDto);
  return data;
};

// 이메일 중복확인
export const checkEmail = async (email: string) => {
  const { data } = await defaultInstance.post("/auth/stores/emails/" + email);
  return data;
};

// 인증코드 발송
export const sendEmailCode = async (email: string) => {
  const { data } = await defaultInstance.post("/auth/emails/" + email);
  return data;
};

// 이메일 인증코드 확인
export const verifyEmailCode = async (email: string, code: string) => {
  const { data } = await defaultInstance.patch("/auth/emails/" + email, code);
  return data;
};

// 로그아웃
export const logout = async () => {
  const { data } = await authInstance.post("/auth/stores/logout");
  return data;
};

// 사업자등록번호 재등록
export const reRegisterBusinessNumberImage = async (
  reRegisterDto: reRegisterBusinessNumberImageDto
) => {
  const { data } = await authInstance.patch("/users/stores", reRegisterDto);
  return data;
};
