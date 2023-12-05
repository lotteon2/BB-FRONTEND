import {
  productModifyInfoDto,
  productRegisterDto,
  stockModifyDto,
} from "../recoil/common/interfaces";
import { authInstance } from "./utils";

// 상품 등록
export const registerProduct = async (
  storeId: number,
  productInfo: productRegisterDto
) => {
  const { data } = await authInstance.post("/store/" + storeId, productInfo);
  return data;
};

// 상품 수정
export const modifyProduct = async (
  productId: number,
  productInfo: productModifyInfoDto
) => {
  const { data } = await authInstance.post("/" + productId, productInfo);
  return data;
};

// 상품 리스트 조회
export const getProductList = async (
  storeId: number,
  category: number | undefined,
  flower: number | undefined,
  status: string | undefined,
  page: number,
  size: number
) => {
  const { data } = await authInstance.get(
    "/store/" +
      storeId +
      "?category=" +
      category +
      "&flower=" +
      flower +
      "&status=" +
      status +
      "&page=" +
      page +
      "&size=" +
      size
  );
  return data;
};

// 상품 상세 조회
export const getProductDetailInfo = async (productId: number) => {
  const { data } = await authInstance.get("/api/products/" + productId);
  return data;
};

// 재고 수정
export const modifyFlowerStocks = async (
  storeId: number,
  stocks: stockModifyDto[]
) => {
  const { data } = await authInstance.put(
    "/api/stores/" + storeId + "/flowers/stocks",
    stocks
  );
  return data;
};
