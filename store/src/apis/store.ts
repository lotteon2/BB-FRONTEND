import {
  couponRegisterDto,
  storeInfoDto,
  subscriptionRegisterDto,
} from "../recoil/common/interfaces";
import { authInstance } from "./utils";

// 가게 정보 등록
export const registerStore = async (storeInfo: storeInfoDto) => {
  const { data } = await authInstance.post("/stores/", storeInfo);
  return data;
};

// 가게 정보 조회
export const getStoreInfo = async (storeId: number) => {
  const { data } = await authInstance.get("/stores/" + storeId + "/manager");
  return data;
};

// 가게정보 상세 조회
export const getStoreDetail = async (storeId: number) => {
  const { data } = await authInstance.get("/stores/" + storeId);
  return data;
};

// 가게정보 수정
export const modifyStore = async (storeId: number, storeInfo: storeInfoDto) => {
  const { data } = await authInstance.put("/stores/" + storeId, storeInfo);
  return data;
};

// 구독상품 조회
export const getSubscriptionInfo = async (storeId: number) => {
  const { data } = await authInstance.get(
    "/products/store/" + storeId + "/subscribe-product"
  );
  return data;
};

// 구독상품 등록
export const registerSubscriptionInfo = async (
  storeId: number,
  subscriptionInfo: subscriptionRegisterDto
) => {
  const { data } = await authInstance.post(
    "/products/store/" + storeId + "/subscribe-product",
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
    "/products/" + productId + "/subscribe-product",
    subscriptionInfo
  );
  return data;
};

// 쿠폰 조회
export const getCouponList = async (storeId: number) => {
  const { data } = await authInstance.get("/stores/" + storeId + "/coupons");
  return data;
};

// 쿠폰 등록
export const registerCoupon = async (
  storeId: number,
  couponInfo: couponRegisterDto
) => {
  const { data } = await authInstance.post(
    "/stores/" + storeId + "/coupons",
    couponInfo
  );
  return data;
};

// 쿠폰 수정
export const modifyCoupon = async (
  storeId: number,
  couponId: number,
  couponInfo: couponRegisterDto
) => {
  const { data } = await authInstance.put(
    "/stores/" + storeId + "/coupons/" + couponId,
    couponInfo
  );
  return data;
};

// 쿠폰 삭제
export const deleteCoupon = async (storeId: number, couponId: number) => {
  const { data } = await authInstance.delete(
    "/stores/" + storeId + "/coupons/" + couponId
  );
  return data;
};

// 정산 내역
export const getSettlementList = async (
  year: number | undefined,
  month: number | undefined,
  storeId: number | undefined,
  page: number,
  size: number
) => {
  const { data } = await authInstance.get(
    "/admin/settlement?year=" +
      year +
      "&month=" +
      month +
      "&storeId=" +
      storeId +
      "&page=" +
      page +
      "&size=" +
      size
  );
  return data;
};
