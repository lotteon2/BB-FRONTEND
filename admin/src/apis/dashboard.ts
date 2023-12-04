import { authInstance } from "./utils";

export const getStoreSalesGraph = async () => {
  const { data } = await authInstance.get("/sales");
  return data;
};
