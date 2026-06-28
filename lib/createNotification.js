import Notification from "@/models/Notification";

export async function createNotification({
  userId,
  title,
  message,
  type,
  relatedId,
}) {
  await Notification.create({
    userId,
    title,
    message,
    type,
    relatedId,
  });
}