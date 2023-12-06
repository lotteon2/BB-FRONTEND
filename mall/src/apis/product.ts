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
