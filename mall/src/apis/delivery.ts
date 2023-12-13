import { authInstance } from "./utils";

export const getRecentDeliveryAddress = async () => {
  const { data } = await authInstance.get("/delivery/delivery-address");
  return data;
};
