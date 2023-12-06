import { defaultInstance } from "./utils";

// 메인페이지 상품 조회
export const getMainProductList = async (type: string) => {
  const { data } = await defaultInstance.get("/main/" + type);
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
  const { data } = await defaultInstance.get(
    "/category/" +
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
    "/api/products/tag/" +
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
