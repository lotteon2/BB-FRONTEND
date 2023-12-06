import { defaultInstance } from "./utils";

// 가게 리스트
export const getStoreList = async (page: number, size: number) => {
  const { data } = await defaultInstance.get(
    "/api/stores/list?page=" + page + "&size=" + size
  );
  return data;
};
