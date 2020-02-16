import create from "zustand";
import { myUserId } from "../../../config";
import { sendUserLocation } from "../message";
import { firestore } from "config/firebase";

const [useLocationsStore, locationAPI] = create(() => ({
  sender: {},
  coordinates: {}
}));

const [useAudioStore, audioAPI] = create(() => ({
  sender: null,
  data: null
}));

const setLocationStore = (data: any) => {
  console.log("setting location store ", data);
  locationAPI.setState(data);
};

const setAudioStore = (data: any) => {
  audioAPI.setState(data);
};

export async function startSendingLocation(lat: number, long: number) {
  sendUserLocation(myUserId, lat, long);
}

export const subscribeMessagesFromFavorites = (myNumber: string) => {
  const messageCollection = firestore
    .collection("message_history")
    .where("receiver_id", "==", myNumber);

  const unsubscribe = messageCollection.onSnapshot(
    function(snapshot) {
      navigator;
      snapshot.docChanges().forEach(async function(change) {
        if (change.type === "added") {
          const messageRef = change.doc.data().message;
          const message = await messageRef.get();
          const senderId = message.data().sender_id;
          const senderRef = firestore.collection("users").doc(senderId);
          const senderSnapshot = await senderRef.get();
          const sender = senderSnapshot._data;
          console.log("sender ", sender, senderId);
          const messageData = message.data();
          console.log("message dat ", messageData);
          if (messageData.type === "location") {
            const { _latitude, _longitude } = messageData.data;
            const coordinates = {
              latitude: _latitude,
              longitude: _longitude
            };
            setLocationStore({
              coordinates,
              sender
            });
          } else if (messageData.type === "audio") {
            const data = messageData.data;
            setAudioStore({
              data,
              sender
            });
          }
        }
      });
    },
    function(error) {
      console.log("error ", error);
    }
  );

  return unsubscribe;
};

export { useLocationsStore, useAudioStore };
