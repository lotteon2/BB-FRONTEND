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

// 구독/픽업 전체
export const getScheduleInfo = async (storeId: number) => {
  const { data } = await authInstance.get(
    "/api/stores/" + storeId + "/reservations/subscriptions"
  );
  return data;
};

// 구독 상세
export const getSubscriptionsInfo = async (storeId: number, date: string) => {
  console.log(date.split("-")[2]);
  const { data } = await authInstance.get(
    "/api/stores/" +
      storeId +
      "/store-subscriptions?year=" +
      date.split("-")[0] +
      "&month=" +
      date.split("-")[1] +
      "&day=" +
      date.split("-")[2].split(" ")[0]
  );
  return data;
};

// 픽업 상세
export const getReservationsInfo = async (storeId: number, date: string) => {
  const { data } = await authInstance.get(
    "/api/stores/" +
      storeId +
      "/reservations?year=" +
      date.split("-")[0] +
      "&month=" +
      date.split("-")[1] +
      "&day=" +
      date.split("-")[2].split(" ")[0]
  );
  return data;
};
