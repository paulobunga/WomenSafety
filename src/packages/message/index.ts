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
  const favorites = await getUserFavorites(senderId);
  console.log("favorites", favorites);
  const geoPoint = new firebase.firestore.GeoPoint(lat, long);
  const message = {
    type: "location",
    data: geoPoint,
    sender_id: senderId
  };

  const messageRef = await firestore.collection("messages").add(message);

  favorites.forEach(user_id => {
    firestore.collection("message_history").add({
      message: messageRef,
      receiver_id: user_id,
      created_at: firebase.firestore.Timestamp.now()
    });
  });
}

export async function sendAudioMessage(senderId: any, audioURI: string) {
  const favorites = await getUserFavorites(senderId);
  const message = {
    type: "audio",
    data: audioURI,
    sender_id: senderId
  };

  const messageRef = await firestore.collection("messages").add(message);

  favorites.forEach(user_id => {
    firestore.collection("message_history").add({
      message: messageRef,
      receiver_id: user_id,
      created_at: firebase.firestore.Timestamp.now()
    });
  });
}
