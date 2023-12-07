import { authInstance, defaultInstance } from "./utils";

// 가게 리스트
export const getStoreList = async (page: number, size: number) => {
  const { data } = await defaultInstance.get(
    "/api/stores/list?page=" + page + "&size=" + size
  );
  return data;
};

// 근처 꽃집 리스트
export const getFlowerShopsNearBy = async (
  lat: number,
  lon: number,
  level: number
) => {
  const { data } = await defaultInstance.get(
    "/api/stores/map/location?lat=" + lat + "&lon=" + lon + "&level=" + level
  );
  return data;
};

// 구/군 조회
export const getGugunList = async (sidoCode: string | null) => {
  if (sidoCode === null) return [];
  const { data } = await defaultInstance.get(
    "/api/stores/address/gugun?sido=" + sidoCode
  );
  return data;
};

// 지역별 꽃집 조회
export const getFlowerShopsRegion = async (
  sido: string | null,
  gugun: string
) => {
  if (sido === null && gugun === "") return "ready";
  const { data } = await defaultInstance.get(
    "/api/stores/map/region?sido=" + sido + "&gugun=" + gugun
  );
  return data;
};

// 가게정보 조회
export const getStoreDetailInfo = async (storeId: number) => {
  const { data } = await defaultInstance.get(
    "/api/stores/" + storeId + "/user"
  );
  return data;
};

// 상세페이지 쿠폰 조회
export const getCouponListFromProductDetail = async (
  storeId: number | undefined
) => {
  const { data } = await authInstance.get(
    "/api/stores/" + storeId + "/coupons/product"
  );
  return data;
};

// 쿠폰 개별 다운로드
export const downloadSingleCoupon = async (couponId: number | undefined) => {
  const { data } = await authInstance.post("/api/stores/coupons/" + couponId);
  return data;
};

// 쿠폰 전체 다운로드
export const downloadAllCoupons = async (storeId: number | undefined) => {
  const { data } = await authInstance.post(
    "/api/stores/" + storeId + "/coupons/all"
  );
  return data;
};

// 배송 정책
export const getStoreDeliveryPolicy = async (storeId: number) => {
  const { data } = await defaultInstance.get(
    "/" + storeId + "/api/stores/delivery-policy"
  );
  return data;
};

// 결제 시 사용할 수 있는 쿠폰 조회
export const getValidCouponListForPayment = async (
  storeId: number,
  totalAmount: number
) => {
  const { data } = await authInstance.get(
    "/" + storeId + "/coupons/payment?totalAmount=" + totalAmount
  );
  return data;
};
