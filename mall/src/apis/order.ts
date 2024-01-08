import { orderDto } from "../recoil/common/interfaces";
import { authInstance } from "./utils";

// 배송 주문 상세 조회
export const getDeliveryDetail = async (orderGroupId: string) => {
  const { data } = await authInstance.get(
    "/orders/delivery/details/" + orderGroupId
  );
  return data;
};

// 픽업 주문 상세 조회
export const getPickupDetail = async (reservationId: string) => {
  const { data } = await authInstance.get(
    "/stores/reservations/" + reservationId
  );
  return data;
};

// 구독 주문 상세 조회
export const getSubscriptionDetail = async (subscriptionId: string) => {
  const { data } = await authInstance.get(
    "/stores/store-subscriptions/" + subscriptionId
  );
  return data;
};

// 단건결제
export const paymentDeliverySingleProduct = async (orderDto: orderDto) => {
  const { data } = await authInstance.post("/orders/delivery", orderDto);
  return data;
};
