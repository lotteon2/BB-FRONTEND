import { defaultInstance } from "./utils";

export const kakaoLogin = async (code: string | null) => {
  const { data } = await defaultInstance.get("/kakao/token?code=" + code);
  return data;
};
