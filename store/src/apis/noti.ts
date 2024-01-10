import { authInstance } from "./utils";

export const getAllNotifications = async (storeId: number) => {
  const { data } = await authInstance.get("/notification/manager/" + storeId);

  return data;
};

export const getUnreadNotificationsCount = async (storeId: number) => {
  const { data } = await authInstance.get(
    "/notification/manager/" + storeId + "/unread-notification/"
  );

  return data;
};
