import { storeInfoDto } from "../recoil/common/interfaces";
import { authInstance } from "./utils";

// 가게 정보 등록
export const registerStore = async (storeInfo: storeInfoDto) => {
  const { data } = await authInstance.post("/api/stores", storeInfo);
  return data;
};

// 가게 정보 조회
export const getStoreInfo = async (storeId: number) => {
  const { data } = await authInstance.get(
    "/api/stores/" + storeId + "/manager"
  );
  return data;
};
