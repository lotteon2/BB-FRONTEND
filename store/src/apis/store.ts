import {
  couponRegisterDto,
  storeInfoDto,
  subscriptionRegisterDto,
} from "../recoil/common/interfaces";
import { authInstance } from "./utils";

// 가게 정보 등록
export const registerStore = async (storeInfo: storeInfoDto) => {
  const { data } = await authInstance.post("/api/stores", storeInfo);
  return data;
};

// 가게 정보 조회
export const getStoreInfo = async (storeId: number) => {
  const { data } = await authInstance.get(
    "/api/stores/" + storeId + "/manager"
  );
  return data;
};

// 가게정보 상세 조회
export const getStoreDetail = async (storeId: number) => {
  const { data } = await authInstance.get("/api/stores/" + storeId);
  return data;
};

// 가게정보 수정
export const modifyStore = async (storeId: number, storeInfo: storeInfoDto) => {
  const { data } = await authInstance.put("/api/stores/" + storeId, storeInfo);
  return data;
};

// 구독상품 조회
export const getSubscriptionInfo = async (storeId: number) => {
  const { data } = await authInstance.get(
    "/store/" + storeId + "/subscribe-product"
  );
  return data;
};

// 구독상품 등록
export const registerSubscriptionInfo = async (
  storeId: number,
  subscriptionInfo: subscriptionRegisterDto
) => {
  const { data } = await authInstance.post(
    "/store/" + storeId + "/subscribe-product",
    subscriptionInfo
  );
  return data;
};

// 구독상품 수정
export const modifySubscriptionInfo = async (
  productId: number,
  subscriptionInfo: subscriptionRegisterDto
) => {
  const { data } = await authInstance.put(
    "/" + productId + "/subscribe-product",
    subscriptionInfo
  );
  return data;
};

// 쿠폰 조회
export const getCouponList = async (storeId: number) => {
  const { data } = await authInstance.get(
    "/api/stores/" + storeId + "/coupons"
  );
  return data;
};

// 쿠폰 등록
export const registerCoupon = async (
  storeId: number,
  couponInfo: couponRegisterDto
) => {
  const { data } = await authInstance.post(
    "/api/stores/" + storeId + "/coupons",
    couponInfo
  );
  return data;
};

// 쿠폰 삭제
export const deleteCoupon = async (storeId: number, couponId: number) => {
  const { data } = await authInstance.delete(
    "/api/stores/" + storeId + "/coupons/" + couponId
  );
  return data;
};
