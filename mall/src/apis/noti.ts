import { authInstance } from "./utils";

export const getAllNotifications = async () => {
  const { data } = await authInstance.get("/notification/customer");

  return data;
};

export const getUnreadNotificationsCount = async () => {
  const { data } = await authInstance.get(
    "/notification/customer/unread-notification"
  );

  return data;
};
