import { authInstance, defaultInstance } from "./utils";

const isLogin = localStorage.getItem("isLogin");

// 가게 리스트
export const getStoreList = async (page: number, size: number) => {
  const { data } = await defaultInstance.get(
    "/stores/list?page=" + page + "&size=" + size
  );
  return data;
};

// 근처 꽃집 리스트
export const getFlowerShopsNearBy = async (
  lat: number,
  lon: number,
  level: number
) => {
  if (isLogin === "T") {
    const { data } = await authInstance.get(
      "/stores/map/location?lat=" + lat + "&lon=" + lon + "&level=" + level
    );
    return data;
  } else {
    const { data } = await defaultInstance.get(
      "/stores/map/location?lat=" + lat + "&lon=" + lon + "&level=" + level
    );
    return data;
  }
};

// 구/군 조회
export const getGugunList = async (sidoCode: string | null) => {
  if (sidoCode === null) return [];
  const { data } = await defaultInstance.get(
    "/stores/address/gugun?sido=" + sidoCode
  );
  return data;
};

// 지역별 꽃집 조회
export const getFlowerShopsRegion = async (
  sido: string | null,
  gugun: string
) => {
  if (isLogin === "T") {
    if (sido === null && gugun === "") return "ready";
    const { data } = await authInstance.get(
      "/stores/map/region?sido=" + sido + "&gugun=" + gugun
    );
    return data;
  } else {
    if (sido === null && gugun === "") return "ready";
    const { data } = await defaultInstance.get(
      "/stores/map/region?sido=" + sido + "&gugun=" + gugun
    );
    return data;
  }
};

// 가게정보 조회
export const getStoreDetailInfo = async (storeId: number) => {
  if (isLogin === "T") {
    const { data } = await authInstance.get("/stores/" + storeId + "/user");
    return data;
  } else {
    const { data } = await defaultInstance.get("/stores/" + storeId + "/user");
    return data;
  }
};

// 상세페이지 쿠폰 조회
export const getCouponListFromProductDetail = async (
  storeId: number | undefined
) => {
  const { data } = await authInstance.get(
    "/stores/" + storeId + "/coupons/product"
  );
  return data;
};

// 쿠폰 개별 다운로드
export const downloadSingleCoupon = async (couponId: number | undefined) => {
  const { data } = await authInstance.post("/stores/coupons/" + couponId);
  return data;
};

// 쿠폰 전체 다운로드
export const downloadAllCoupons = async (storeId: number | undefined) => {
  const { data } = await authInstance.post(
    "/stores/" + storeId + "/coupons/all"
  );
  return data;
};

// 배송 정책
export const getStoreDeliveryPolicy = async (storeId: number) => {
  const { data } = await defaultInstance.get(
    "/stores/" + storeId + "/delivery-policy"
  );
  return data;
};

// 결제 시 사용할 수 있는 쿠폰 조회
export const getValidCouponListForPayment = async (
  storeId: number,
  totalAmount: number
) => {
  const { data } = await authInstance.post(
    "/stores/" + storeId + "/coupons/payment",
    totalAmount
  );
  return data;
};
