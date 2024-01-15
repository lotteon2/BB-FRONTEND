import { authInstance } from "./utils";

// 주문 상태 변경
export const modifyOrderState = async (orderState: string, groupId: string) => {
  const { data } = await authInstance.patch(
    "/delivery/" + groupId + "/" + orderState
  );
  return data;
};

// 주문 목록 조회
export const getOrderList = async (
  storeId: number,
  page: number,
  size: number,
  sort: string
) => {
  const { data } = await authInstance.get(
    "/orders/store/delivery?page=" +
      page +
      "&size=" +
      size +
      "&status=" +
      sort +
      "&storeId=" +
      storeId
  );
  return data;
};

// 주문 상세 조회
export const getOrderDetail = async (orderGroupId: string) => {
  const { data } = await authInstance.get(
    "/orders/store/delivery/details/" + orderGroupId
  );
  return data;
};

// 구독/픽업 전체
export const getScheduleInfo = async (storeId: number) => {
  const { data } = await authInstance.get(
    "/orderquery/" + storeId + "/reservations/subscriptions"
  );
  return data;
};

// 구독 상세
export const getSubscriptionsInfo = async (storeId: number, date: string) => {
  const { data } = await authInstance.get(
    "/orderquery/" +
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
    "/orderquery/" +
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

// 배송 주문 취소
export const cancelDeliveryOrder = async (orderDeliveryId: string) => {
  const { data } = await authInstance.delete(
    "/orders/delivery/" + orderDeliveryId
  );
  return data;
};

// 픽업 주문 취소
export const cancelPickupOrder = async (orderPickupId: string) => {
  const { data } = await authInstance.delete("/orders/pickup/" + orderPickupId);
  return data;
};
