import webPush from 'web-push';

const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY!;
const webPushContact = process.env.WEB_PUSH_CONTACT!;

webPush.setVapidDetails(
  `mailto:${webPushContact}`,
  publicVapidKey,
  privateVapidKey
);

export async function sendPushNotification(
  subscription: webPush.PushSubscription,
  payload: string
) {
  try {
    await webPush.sendNotification(subscription, payload);
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
} 