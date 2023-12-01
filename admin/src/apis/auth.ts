import { signinDto } from "../recoil/common/interfaces";
import { defaultInstance } from "./utils";

// 로그인
export const signin = async (signinDto: signinDto) => {
  const { data } = await defaultInstance.post("/stores/login", signinDto);
  return data;
};
