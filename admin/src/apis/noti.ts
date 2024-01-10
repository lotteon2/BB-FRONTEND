import { authInstance } from "./utils";

export const getAllNotifications = async () => {
  const { data } = await authInstance.get("/notification/admin");

  return data;
};

export const getUnreadNotificationsCount = async () => {
  const { data } = await authInstance.get(
    "/notification/admin/unread-notification"
  );

  return data;
};
