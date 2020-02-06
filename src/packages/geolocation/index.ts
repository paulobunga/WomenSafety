import create from "zustand";
import { myUserId } from "../../../config";
import { sendUserLocation } from "../message";
import { firestore } from "config/firebase";

const messageCollection = firestore
  .collection("message_history")
  .where("receiver_id", "==", myUserId);

const [useLocationsStore, api] = create(set => ({
  sender: {},
  coordinates: {}
}));

const setLocationStore = (data: any) => {
  api.setState(data);
};

export async function startSendingLocation(lat: number, long: number) {
  sendUserLocation(myUserId, lat, long);
}

export const subscribeMessagesFromFavorites = () => {
  const unsubscribe = messageCollection.onSnapshot(
    function(snapshot) {
      navigator;
      snapshot.docChanges().forEach(async function(change) {
        if (change.type === "added") {
          const messageRef = change.doc.data().message;
          const message = await messageRef.get();
          const senderId = message.data().sender_id;
          const senderRef = firestore.collection("users").doc(senderId);
          const sender = await senderRef.get();
          console.log("Sender data ", sender.data());
          const messageData = message.data().data;
          const coordinates = {
            latitude: messageData._lat,
            longitude: messageData._long
          };

          setLocationStore({
            coordinates,
            sender: sender.data()
          });
        }
      });
    },
    function(error) {
      console.log("error ", error);
    }
  );

  return unsubscribe;
};

export { useLocationsStore };
