import { authInstance } from "./utils";

// 구군 리스트
export const getGugunList = async (sidoCode: number | undefined) => {
  if (sidoCode) {
    const { data } = await authInstance.get(
      "/stores/address/gugun?sido=" + sidoCode
    );
    return data;
  } else return [];
};

// 가게 정보 조회
export const getStoreList = async (
  page: number,
  size: number,
  sido: number,
  gugun: number | undefined,
  sort: string
) => {
  if (!gugun) {
    const { data } = await authInstance.get(
      "/stores/admin?page=" +
        page +
        "&size=" +
        size +
        "&sido=" +
        sido +
        "&sort=" +
        sort
    );
    return data;
  } else {
    const { data } = await authInstance.get(
      "/stores/admin?page=" +
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
  }
};
