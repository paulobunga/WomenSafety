import create from "zustand";
import { myUserId } from "../../../config";
import { sendUserLocation } from "../message";
import { firestore } from "config/firebase";

const messageCollection = firestore
  .collection("message_history")
  .where("receiver_id", "==", myUserId);

const [useLocationsStore, locationAPI] = create(() => ({
  sender: {},
  coordinates: {}
}));

const [useAudioStore, audioAPI] = create(() => ({
  sender: null,
  data: null
}));

const setLocationStore = (data: any) => {
  locationAPI.setState(data);
};

const setAudioStore = (data: any) => {
  audioAPI.setState(data);
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
          const messageData = message.data();
          console.log("message dat ", messageData);
          if (messageData.type === "location") {
            const { _lat, _long } = messageData.data;
            const coordinates = {
              latitude: _lat,
              longitude: _long
            };
            setLocationStore({
              coordinates,
              sender: sender.data()
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
