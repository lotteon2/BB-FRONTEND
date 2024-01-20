import {
  questionRegisterDto,
  reviewRegisterDto,
  saleResumeDto,
} from "../recoil/common/interfaces";
import { authInstance, defaultInstance } from "./utils";

// 메인페이지 상품 조회
export const getMainProductList = async (type: string, isLogin: boolean) => {
  if (isLogin) {
    const { data } = await authInstance.get("/products/main/" + type);
    return data;
  } else {
    const { data } = await defaultInstance.get("/products/main/" + type);
    return data;
  }
};

// 카테고리별 상품 목록 조회
export const getProductListByCategory = async (
  categoryId: number,
  page: number,
  size: number,
  sortOption: string,
  storeId: number | null,
  isLogin: boolean
) => {
  if (isLogin) {
    if (storeId === null) {
      const { data } = await authInstance.get(
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
      const { data } = await authInstance.get(
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
  } else {
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
  }
};

// 태그별 상품목록 조회
export const getProductListByTag = async (
  tagId: number,
  categoryId: number | null | undefined,
  page: number,
  size: number,
  sortOption: string,
  isLogin: boolean
) => {
  if (isLogin) {
    if (!categoryId) {
      const { data } = await authInstance.get(
        "/products/tag/" +
          tagId +
          "?page=" +
          page +
          "&size=" +
          size +
          "&sort-option=" +
          sortOption
      );
      return data;
    } else {
      const { data } = await authInstance.get(
        "/products/tag/" +
          tagId +
          "?category=" +
          categoryId +
          "&page=" +
          page +
          "&size=" +
          size +
          "&sort-option=" +
          sortOption
      );
      return data;
    }
  } else {
    if (!categoryId) {
      const { data } = await defaultInstance.get(
        "/products/tag/" +
          tagId +
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
        "/products/tag/" +
          tagId +
          "?category=" +
          categoryId +
          "&page=" +
          page +
          "&size=" +
          size +
          "&sort-option=" +
          sortOption
      );
      return data;
    }
  }
};

// 상품 상세 조회
export const getProductDetail = async (
  productId: string | undefined,
  isLogin: boolean
) => {
  if (isLogin) {
    const { data } = await authInstance.get("/products/" + productId);
    return data;
  } else {
    const { data } = await defaultInstance.get("/products/" + productId);
    return data;
  }
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
  isMine: boolean,
  isLogin: boolean
) => {
  if (isLogin) {
    if (isMine) {
      const { data } = await authInstance.get(
        "/stores/questions/product/" +
          productId +
          "/my?page=" +
          page +
          "&size=" +
          size +
          (replied === undefined ? "" : "&is-replied=" + replied)
      );
      return data;
    } else {
      const { data } = await authInstance.get(
        "/stores/questions/product/" +
          productId +
          "?page=" +
          page +
          "&size=" +
          size +
          (replied === undefined ? "" : "&is-replied=" + replied)
      );
      return data;
    }
  } else {
    const { data } = await defaultInstance.get(
      "/stores/questions/product/" +
        productId +
        "?page=" +
        page +
        "&size=" +
        size +
        (replied === undefined ? "" : "&is-replied=" + replied)
    );
    return data;
  }
};

// 상품 문의 등록
export const registerQuestion = async (registerDto: questionRegisterDto) => {
  const { data } = await authInstance.post("/stores/questions", registerDto);
  return data;
};

// 판매 재개 알림 요청
export const requestSaleResume = async (
  productId: string,
  resumeDto: saleResumeDto
) => {
  const { data } = await authInstance.post(
    "/products/" + productId + "/sale-resume",
    resumeDto
  );
  return data;
};

// 상품 리뷰 등록
export const registerReview = async (
  productId: string,
  registerDto: reviewRegisterDto
) => {
  const { data } = await authInstance.post(
    "/products/" + productId + "/reviews",
    registerDto
  );
  return data;
};

// 상품 검색
export const searchProductList = async (
  word: string,
  page: number,
  size: number
) => {
  const { data } = await defaultInstance.post(
    "/products/search?page=" + page + "&size=" + size,
    word
  );
  return data;
};
