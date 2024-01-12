import { modifyCartCountDto } from "../recoil/common/interfaces";
import { authInstance } from "./utils";

// 카트 조회
export const getCartList = async () => {
  const { data } = await authInstance.get("/wishlist/carts");
  return data;
};

// 장바구니 삭제
export const addToCart = async (cartDto: modifyCartCountDto) => {
  const { data } = await authInstance.post("/wishlist/carts", cartDto);
  return data;
};

// 카트 수량 변경
export const modifyCartCount = async (cartDto: modifyCartCountDto) => {
  const { data } = await authInstance.patch(
    "/wishlist/carts/products",
    cartDto
  );
  return data;
};

// 카트 상품 삭제
export const deleteCartProduct = async (deleteDto: string[]) => {
  const { data } = await authInstance.put(
    "/wishlist/carts/products",
    deleteDto
  );
  return data;
};
