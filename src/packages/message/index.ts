import { firestore, default as firebase } from "config/firebase";
const usersRef = firestore.collection("users");

async function getUserFavorites(userId: any) {
  const documentSnapshot = await usersRef.doc(userId).get();
  const favorites = documentSnapshot.data().favorites;
  return favorites;
}

export async function sendUserLocation(
  senderId: any,
  lat: number,
  long: number
) {
  const geoPoint = new firebase.firestore.GeoPoint(lat, long);
  const message = {
    type: "location",
    data: geoPoint,
    sender_id: senderId
  };

  await firestore.collection("messages").add(message);
}

export async function sendAudioMessage(senderId: any, audioURI: string) {
  const message = {
    type: "audio",
    data: audioURI,
    sender_id: senderId
  };

  const messageRef = await firestore.collection("messages").add(message);
}
