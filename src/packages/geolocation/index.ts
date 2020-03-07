import create from "zustand";
import { sendUserLocation } from "../message";
import { firestore } from "config/firebase";

import subSeconds from "date-fns/subSeconds";
import { alertMachineService } from "../alert-machine";
import { ISender, ICoordinates } from "src/types";

const [useLocationsStore, locationAPI] = create(() => ({
  sender: {} as ISender,
  coordinates: {} as ICoordinates
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

export async function startSendingLocation(
  userId: string,
  lat: number,
  long: number
) {
  sendUserLocation(userId, lat, long);
}

export const subscribeMessagesFromFavorites = (myNumber: string) => {
  const past5Mins = subSeconds(new Date(), 1);
  const messageCollection = firestore
    .collection("message_history")
    .where("receiver_id", "==", myNumber)
    .where("created_at", ">", past5Mins)
    .orderBy("created_at", "desc")
    .limit(1);

  const unsubscribe = messageCollection.onSnapshot(
    function(snapshot) {
      navigator;

      snapshot.docChanges().forEach(async function(change) {
        if (change.type === "added") {
          const messageRef = change.doc.data().message;
          const message = await messageRef.get();
          const messageData = message.data();

          actOnMessageReceived(messageData);
        }
      });
    },
    function(error) {
      console.log("error ", error);
    }
  );

  return unsubscribe;
};

export const actOnMessageReceived = async (messageData: any) => {
  const senderId = messageData.sender_id;
  const senderRef = firestore.collection("users").doc(senderId);
  const senderSnapshot = await senderRef.get();
  const sender = senderSnapshot._data;
  console.log("message received ", messageData);

  if (messageData.type === "location") {
    let lat, long;

    if (typeof messageData.data === "string") {
      let { _latitude, _longitude } = JSON.parse(messageData.data);
      lat = _latitude;
      long = _longitude;
    } else {
      let { _latitude, _longitude } = messageData.data;
      lat = _latitude;
      long = _longitude;
    }

    const coordinates = {
      latitude: lat,
      longitude: long
    };
    setLocationStore({
      coordinates,
      sender
    });

    alertMachineService.send("alert");
  } else if (messageData.type === "audio") {
    const data = messageData.data;
    setAudioStore({
      data,
      sender
    });

    alertMachineService.send("alert");
  }
};

export { useLocationsStore, useAudioStore };
