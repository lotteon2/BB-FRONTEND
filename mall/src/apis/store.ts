import { defaultInstance } from "./utils";

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
