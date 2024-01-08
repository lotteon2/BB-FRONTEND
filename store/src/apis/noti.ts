import { authInstance } from "./utils";

export const getAllNotifications = async () => {
  const { data } = await authInstance.get("/notification/manager");

  return data;
};

export const getUnreadNotificationsCount = async () => {
  const { data } = await authInstance.get(
    "/notification/manager/unread-notification"
  );

  return data;
};
