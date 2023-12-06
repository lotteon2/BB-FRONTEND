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
