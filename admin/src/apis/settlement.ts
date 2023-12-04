import { authInstance } from "./utils";

export const getSettlementList = async (
  year: number | undefined,
  month: number | undefined,
  storeId: number | undefined,
  page: number,
  size: number
) => {
  const { data } = await authInstance.get(
    "/settlement?year=" +
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
