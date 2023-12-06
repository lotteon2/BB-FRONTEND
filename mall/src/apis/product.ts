import { defaultInstance } from "./utils";

// 메인페이지 상품 조회
export const getMainProductList = async (type: string) => {
  const { data } = await defaultInstance.get("/main/" + type);
  return data;
};
