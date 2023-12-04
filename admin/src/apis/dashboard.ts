import { authInstance } from "./utils";

// 이전달 가게 매출액 top 10
export const getStoreSalesGraph = async () => {
  const { data } = await authInstance.get("/sales");
  return data;
};

// 이전달 정산내역
export const getLastMonthSettlement = async (page: number, size: number) => {
  const { data } = await authInstance.get(
    "/settlement?page=" + page + "&size=" + size
  );
  return data;
};
