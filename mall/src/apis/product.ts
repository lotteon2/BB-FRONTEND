import { questionRegisterDto } from "../recoil/common/interfaces";
import { authInstance, defaultInstance } from "./utils";

// 메인페이지 상품 조회
export const getMainProductList = async (type: string) => {
  const { data } = await defaultInstance.get("/products/main/" + type);
  return data;
};

// 카테고리별 상품 목록 조회
export const getProductListByCategory = async (
  categoryId: number,
  page: number,
  size: number,
  sortOption: string,
  storeId: number | null
) => {
  if (storeId === null) {
    const { data } = await defaultInstance.get(
      "/products/category/" +
        categoryId +
        "?page=" +
        page +
        "&size=" +
        size +
        "&sort-option=" +
        sortOption
    );
    return data;
  } else {
    const { data } = await defaultInstance.get(
      "/products/category/" +
        categoryId +
        "?page=" +
        page +
        "&size=" +
        size +
        "&sort-option=" +
        sortOption +
        "&store-id=" +
        storeId
    );
    return data;
  }
};

// 태그별 상품목록 조회
export const getProductListByTag = async (
  tagId: number,
  categoryId: number | null | undefined,
  page: number,
  size: number,
  sortOption: string
) => {
  const { data } = await defaultInstance.get(
    "/products/tag/" +
      tagId +
      "?category=" +
      categoryId +
      "?page=" +
      page +
      "&size=" +
      size +
      "&sort-option=" +
      sortOption
  );
  return data;
};

// 상품 상세 조회
export const getProductDetail = async (productId: string | undefined) => {
  const { data } = await defaultInstance.get("/products/" + productId);
  return data;
};

// 구독상품 상세 조회
export const getSubscriptionProductDetail = async (
  productId: string | undefined
) => {
  const { data } = await defaultInstance.get(
    "/products/subscription/" + productId
  );
  return data;
};

// 상품 후기
export const getProductReviewList = async (
  productId: string | undefined,
  page: number,
  size: number,
  sortOption: string
) => {
  const { data } = await defaultInstance.get(
    "/products/" +
      productId +
      "/reviews?page=" +
      page +
      "&size=" +
      size +
      "&sort-option=" +
      sortOption
  );
  return data;
};

// 상품 문의
export const getProductQuestionList = async (
  productId: string | undefined,
  page: number,
  size: number,
  replied: boolean | undefined,
  isMine: boolean
) => {
  if (isMine) {
    const { data } = await authInstance.get(
      "/stores/questions/product/" +
        productId +
        "?page=" +
        page +
        "&size=" +
        size +
        "&is-replied=" +
        (!replied ? null : replied)
    );
    return data;
  } else {
    const { data } = await defaultInstance.get(
      "/stores/questions/product/" +
        productId +
        "/my?page=" +
        page +
        "&size=" +
        size +
        "&is-replied=" +
        (!replied ? null : replied)
    );
    return data;
  }
};

// 상품 문의 등록
export const registerQuestion = async (registerDto: questionRegisterDto) => {
  const { data } = await authInstance.post("/stores/questions", registerDto);
  return data;
};
