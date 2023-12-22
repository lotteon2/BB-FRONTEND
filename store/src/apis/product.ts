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
  const { data } = await authInstance.post(
    "/products/store/" + storeId,
    productInfo
  );
  return data;
};

// 상품 수정
export const modifyProduct = async (
  productId: string | undefined,
  productInfo: productModifyInfoDto
) => {
  const { data } = await authInstance.post(
    "/products/" + productId,
    productInfo
  );
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
  if (category && flower && status) {
    const { data } = await authInstance.get(
      "/products/store/" +
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
  } else if (category && flower) {
    const { data } = await authInstance.get(
      "/products/store/" +
        storeId +
        "?category=" +
        category +
        "&flower=" +
        flower +
        "&page=" +
        page +
        "&size=" +
        size
    );
    return data;
  } else if (category && status) {
    const { data } = await authInstance.get(
      "/products/store/" +
        storeId +
        "?category=" +
        category +
        "&status=" +
        status +
        "&page=" +
        page +
        "&size=" +
        size
    );
    return data;
  } else if (flower && status) {
    const { data } = await authInstance.get(
      "/products/store/" +
        storeId +
        "?flower=" +
        flower +
        "&status=" +
        status +
        "&page=" +
        page +
        "&size=" +
        size
    );
    return data;
  } else if (category) {
    const { data } = await authInstance.get(
      "/products/store/" +
        storeId +
        "?category=" +
        category +
        "&page=" +
        page +
        "&size=" +
        size
    );
    return data;
  } else if (flower) {
    const { data } = await authInstance.get(
      "/products/store/" +
        storeId +
        "?flower=" +
        flower +
        "&page=" +
        page +
        "&size=" +
        size
    );
    return data;
  } else if (status) {
    const { data } = await authInstance.get(
      "/products/store/" +
        storeId +
        "?status=" +
        status +
        "&page=" +
        page +
        "&size=" +
        size
    );
    return data;
  } else {
    const { data } = await authInstance.get(
      "/products/store/" + storeId + "?page=" + page + "&size=" + size
    );
    return data;
  }
};

// 상품 상세 조회
export const getProductDetailInfo = async (
  productId: string | undefined,
  storeId: number
) => {
  if (productId) {
    const { data } = await authInstance.get(
      "/products/" + productId + "/store/" + storeId
    );
    return data;
  } else {
    return undefined;
  }
};

// 재고 수정
export const modifyFlowerStocks = async (
  storeId: number,
  stocks: stockModifyDto[]
) => {
  const { data } = await authInstance.put(
    "/stores/" + storeId + "/flowers/stocks",
    stocks
  );
  return data;
};
