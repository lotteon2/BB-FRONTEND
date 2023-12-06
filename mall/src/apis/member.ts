import { authInstance } from "./utils";

// 회원 휴대폰 번호 등록
export const registerPhoneNumber = async (phoneNumber: string) => {
  const { data } = await authInstance.put("/phone-number", phoneNumber);
  return data;
};

// 상품 찜
export const modifyWishList = async (list: string[]) => {
  const { data } = await authInstance.post("/likes/product", list);
  return data;
};

// 가게 찜
export const modifyStoreWishList = async (list: number[]) => {
  const { data } = await authInstance.post("/likes/store", list);
  return data;
};
