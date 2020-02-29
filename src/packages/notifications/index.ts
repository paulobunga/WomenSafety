import messaging from "@react-native-firebase/messaging";
import firebase, { firestore } from "config/firebase";
export async function registerAppWithFCM() {
  await messaging().registerForRemoteNotifications();
  const token = await messaging().getToken();

  addGCMToken(token);

  messaging().onMessage(message => {
    console.log("message ", message);
  });
  console.log("messaging res ", token);
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("Message handled in the background!", remoteMessage);
});

const addGCMToken = (token: string) => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    firestore
      .collection("users")
      .doc(currentUser.uid)
      .set(
        {
          gcm_token: token
        },
        { merge: true }
      );
  }
};
