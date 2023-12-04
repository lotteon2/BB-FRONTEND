import { async } from "q";
import { authInstance } from "./utils";
import { storeStatusModifyDto } from "../recoil/common/interfaces";

// 이전달 가게 매출액 top 10
export const getStoreSalesGraph = async () => {
  const { data } = await authInstance.get("/sales");
  return data;
};

// 이전달 정산내역
export const getLastMonthSettlement = async (page: number, size: number) => {
  const { data } = await authInstance.get(
    "/settlement?page=" + page + "&size=" + size
  );
  return data;
};

// 회원가입 요청
export const getRegisterRequestList = async (
  status: string,
  page: number,
  size: number
) => {
  const { data } = await authInstance.get(
    "/store-managers/applications?status=" +
      status +
      "&page=" +
      page +
      "&size=" +
      size
  );
  return data;
};

// 요청 승인/거절
export const modifyStoreStatus = async (modifyDto: storeStatusModifyDto) => {
  const { data } = await authInstance.patch("/admin/store-manager", modifyDto);
  return data;
};
