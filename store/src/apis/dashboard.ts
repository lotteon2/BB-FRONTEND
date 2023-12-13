import { authInstance } from "./utils";

/**
 * 주간 매출액 그래프
 */
export const getWeeklySaleGraph = async (storeId: number) => {
  const { data } = await authInstance.get(
    "/orders/store/" + storeId + "/weekly/sale"
  );
  return data;
};

/**
 * 베스트셀러 그래프
 */
export const getBestProductsGraph = async (storeId: number) => {
  const { data } = await authInstance.get(
    "/products/store/" + storeId + "/best-top-ten"
  );
  return data;
};

/**
 * 꽃 재고량 그래프
 */
export const getFlowerStockGraph = async (storeId: number) => {
  const { data } = await authInstance.get(
    "/stores/" + storeId + "/flowers/stocks"
  );
  return data;
};
