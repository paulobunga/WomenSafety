import messaging from "@react-native-firebase/messaging";
export async function registerAppWithFCM() {
  const res = await messaging().registerForRemoteNotifications();

  const token = await messaging().getToken();
  messaging().onMessage(message => {
    console.log("message ", message);
  });
  console.log("messaging res ", token);
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("Message handled in the background!", remoteMessage);
});
