import { storeInfoDto } from "../recoil/common/interfaces";
import { authInstance } from "./utils";

// 가게 정보 등록
export const registerStore = async (storeInfo: storeInfoDto) => {
  const { data } = await authInstance.post("/api/stores", storeInfo);
  return data;
};
