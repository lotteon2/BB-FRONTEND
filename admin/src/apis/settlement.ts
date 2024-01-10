import { authInstance } from "./utils";

export const getSettlementList = async (
  year: number | undefined,
  month: number | undefined,
  storeId: number | undefined,
  page: number,
  size: number,
  sido: number | undefined,
  gugun: number | undefined
) => {
  if (!year && !month && !storeId && !sido && !gugun) {
    const { data } = await authInstance.get(
      "/orders/admin/settlement?page=" + page + "&size=" + size
    );
    return data;
  } else if (year && !month && !storeId && !sido && !gugun) {
    const { data } = await authInstance.get(
      "/orders/admin/settlement?page=" +
        page +
        "&size=" +
        size +
        "&year=" +
        year
    );
    return data;
  } else if (!year && month && !storeId && !sido && !gugun) {
    const { data } = await authInstance.get(
      "/orders/admin/settlement?page=" +
        page +
        "&size=" +
        size +
        "&month=" +
        month
    );
    return data;
  } else if (!year && !month && storeId && !sido && !gugun) {
    const { data } = await authInstance.get(
      "/orders/admin/settlement?page=" +
        page +
        "&size=" +
        size +
        "&storeId=" +
        storeId
    );
    return data;
  } else if (!year && !month && !storeId && sido && !gugun) {
    const { data } = await authInstance.get(
      "/orders/admin/settlement?page=" +
        page +
        "&size=" +
        size +
        "&sido=" +
        sido
    );
    return data;
  } else if (year && month && !storeId && !sido && !gugun) {
    const { data } = await authInstance.get(
      "/orders/admin/settlement?page=" +
        page +
        "&size=" +
        size +
        "&year=" +
        year +
        "&month=" +
        month
    );
    return data;
  } else if (year && !month && storeId && !sido && !gugun) {
    const { data } = await authInstance.get(
      "/orders/admin/settlement?page=" +
        page +
        "&size=" +
        size +
        "&year=" +
        year +
        "&storeId=" +
        storeId
    );
    return data;
  } else if (year && !month && !storeId && sido && !gugun) {
    const { data } = await authInstance.get(
      "/orders/admin/settlement?page=" +
        page +
        "&size=" +
        size +
        "&year=" +
        year +
        "&sido=" +
        sido
    );
    return data;
  } else if (!year && month && storeId && !sido && !gugun) {
    const { data } = await authInstance.get(
      "/orders/admin/settlement?page=" +
        page +
        "&size=" +
        size +
        "&month=" +
        month +
        "&storeId=" +
        storeId
    );
    return data;
  } else if (!year && month && !storeId && sido && !gugun) {
    const { data } = await authInstance.get(
      "/orders/admin/settlement?page=" +
        page +
        "&size=" +
        size +
        "&month=" +
        month +
        "&sido=" +
        sido
    );
    return data;
  } else if (!year && !month && storeId && sido && !gugun) {
    const { data } = await authInstance.get(
      "/orders/admin/settlement?page=" +
        page +
        "&size=" +
        size +
        "&storeId=" +
        storeId +
        "&sido=" +
        sido
    );
    return data;
  } else if (!year && !month && !storeId && sido && gugun) {
    const { data } = await authInstance.get(
      "/orders/admin/settlement?page=" +
        page +
        "&size=" +
        size +
        "&sido=" +
        sido +
        "&gugun=" +
        gugun
    );
    return data;
  } else if (year && !month && !storeId && sido && gugun) {
    const { data } = await authInstance.get(
      "/orders/admin/settlement?page=" +
        page +
        "&size=" +
        size +
        "&year=" +
        year +
        "&sido=" +
        sido +
        "&gugun=" +
        gugun
    );
    return data;
  } else if (!year && month && !storeId && sido && gugun) {
    const { data } = await authInstance.get(
      "/orders/admin/settlement?page=" +
        page +
        "&size=" +
        size +
        "&month=" +
        month +
        "&sido=" +
        sido +
        "&gugun=" +
        gugun
    );
    return data;
  } else if (!year && !month && storeId && sido && gugun) {
    const { data } = await authInstance.get(
      "/orders/admin/settlement?page=" +
        page +
        "&size=" +
        size +
        +"&storeId=" +
        storeId +
        "&sido=" +
        sido +
        "&gugun=" +
        gugun
    );
    return data;
  } else if (year && month && storeId && !sido && !gugun) {
    const { data } = await authInstance.get(
      "/orders/admin/settlement?page=" +
        page +
        "&size=" +
        size +
        "&year=" +
        year +
        "&month=" +
        month +
        "&storeId=" +
        storeId
    );
    return data;
  } else if (year && month && storeId && sido && !gugun) {
    const { data } = await authInstance.get(
      "/orders/admin/settlement?page=" +
        page +
        "&size=" +
        size +
        "&year=" +
        year +
        "&month=" +
        month +
        "&storeId=" +
        storeId +
        "&sido=" +
        sido
    );
    return data;
  } else if (year && month && storeId && sido && gugun) {
    const { data } = await authInstance.get(
      "/orders/admin/settlement?page=" +
        page +
        "&size=" +
        size +
        "&year=" +
        year +
        "&month=" +
        month +
        "&storeId=" +
        storeId +
        "&sido=" +
        sido +
        "&gugun=" +
        gugun
    );
    return data;
  }
};
