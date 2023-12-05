import { authInstance } from "./utils";

// 주문 상태 변경
export const modifyOrderState = async (orderState: string, groupId: string) => {
  const { data } = await authInstance.patch(
    "/delivery/" + groupId + "?status=" + orderState
  );
  return data;
};

// 주문 목록 조회
export const getOrderList = async (
  storeId: number,
  page: number,
  size: number,
  sort: string | undefined
) => {
  const { data } = await authInstance.get(
    "/api/orders/store/" +
      storeId +
      "/delivery?page=" +
      page +
      "&sort=" +
      sort +
      "&size=" +
      size
  );
  return data;
};

// 주문 상세 조회
export const getOrderDetail = async (orderGroupId: string) => {
  const { data } = await authInstance.get(
    "/store/delivery/details/" + orderGroupId
  );
  return data;
};
