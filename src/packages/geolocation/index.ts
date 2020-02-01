import { firestore, default as firebase } from "../../../config/firebase";
import create from "zustand";
import { myUserId } from "../../../config";

const usersRef = firestore.collection("users");

const [useLocationsStore] = create(set => ({
  sender: {},
  coordinates: {},
  setLocationStore: (data: any) => set(() => data)
}));

export async function startSendingLocation(lat: number, long: number) {
  const documentSnapshot = await usersRef.doc(myUserId).get();
  const favorites = documentSnapshot.data().favorites;
  const geoPoint = new firebase.firestore.GeoPoint(lat, long);
  const message = {
    type: "location",
    data: geoPoint,
    sender_id: myUserId
  };

  const messageRef = await firestore.collection("messages").add(message);

  favorites.forEach(user_id => {
    firestore.collection("message_history").add({
      message: messageRef,
      receiver_id: user_id
    });
  });
}

export { useLocationsStore };
