import { authInstance } from "./utils";

export const getCartList = async () => {
  const { data } = await authInstance.get("/carts");
  return data;
};
