import { authInstance } from "./utils";

// 구군 리스트
export const getGugunList = async (sidoCode: number | undefined) => {
  if (!sidoCode) return [];
  else {
    const { data } = await authInstance.get("/address/gugun?sido=" + sidoCode);
    return data;
  }
};

// 가게 정보 조회
export const getStoreList = async (
  page: number,
  size: number,
  sido: number | undefined,
  gugun: number | undefined,
  sort: string
) => {
  const { data } = await authInstance.get(
    "/stores?page=" +
      page +
      "&size=" +
      size +
      "&sido=" +
      sido +
      "&gugun=" +
      gugun +
      "&sort=" +
      sort
  );
  return data;
};
