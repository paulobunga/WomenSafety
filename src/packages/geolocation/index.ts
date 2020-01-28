import { firestore, default as firebase } from "../../../config/firebase";
import create from "zustand";
import { myUserId } from "../../../config";

const usersRef = firestore.collection("users");

const [useLocationsStore] = create(set => ({
  locations: {},
  updateLocation: (
    userId: string,
    coordinates: { lat: number; long: number }
  ) => set(state => ({ ...state, [userId]: coordinates }))
}));

export async function startSendingLocation(lat: number, long: number) {
  const documentSnapshot = await usersRef.doc(myUserId).get();
  const favorites = documentSnapshot.data().favorites;
  const geopoint = new firebase.firestore.GeoPoint(lat, long);

  favorites.forEach(user_id => {
    console.log("user id ", user_id);
    firestore.collection("chat_history").add({
      location: geopoint,
      message_type: "Location",
      receiver_id: user_id,
      sender_id: myUserId
    });
  });
}

// startSendingLocation(25, 78);
