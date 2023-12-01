import { async } from "q";
import { signinDto, signupDto } from "../recoil/common/interfaces";
import { defaultInstance } from "./utils";

// 로그인
export const signin = async (signinDto: signinDto) => {
  const { data } = await defaultInstance.post("/stores/login", signinDto);
  return data;
};

// 회원가입
export const signup = async (signupDto: signupDto) => {
  const { data } = await defaultInstance.post("/stores", signupDto);
  return data;
};

// 이메일 중복확인
export const checkEmail = async (email: string) => {
  const { data } = await defaultInstance.post("/stores/emails/" + email);
  return data;
};

// 인증코드 발송
export const sendEmailCode = async (email: string) => {
  const { data } = await defaultInstance.post("/emails/" + email);
  return data;
};

// 이메일 인증코드 확인
export const verifyEmailCode = async (email: string) => {
  const { data } = await defaultInstance.patch("/emails/" + email);
  return data;
};
