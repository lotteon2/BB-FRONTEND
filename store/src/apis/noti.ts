import { authInstance } from "./utils";

export const getAllNotifications = async () => {
  const { data } = await authInstance.get("/notification/");

  return data;
};

export const getUnreadNotificationsCount = async () => {
  const { data } = await authInstance.get("/notification/unread-notification");

  return data;
};
