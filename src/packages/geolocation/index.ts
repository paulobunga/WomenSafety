import create from "zustand";
import { sendUserLocation } from "../message";
import { firestore } from "config/firebase";
import subSeconds from "date-fns/subSeconds";
import { alertMachineService } from "../alert-machine";
import {
  ISender,
  ICoordinates,
  IAudioMessage,
  ILocationMessage
} from "src/types";

const [useLocationsStore, locationAPI] = create(() => ({
  coordinates: {} as ICoordinates
}));

const [useSenderStore, senderAPI] = create(() => ({
  sender: {} as ISender
}));

const [useAudioStore, audioAPI] = create(() => ({
  data: null
}));

const setLocationStore = (data: any) => {
  locationAPI.setState(data);
};

const setAudioStore = (data: any) => {
  audioAPI.setState(data);
};

export const getSender = () => {
  return senderAPI.getState().sender;
};

export async function startSendingLocation(
  user_id: string,
  lat: number,
  long: number
) {
  sendUserLocation(user_id, lat, long);
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
        }
      });
    },
    function(error) {
      console.log("error ", error);
    }
  );

  return unsubscribe;
};

export const actOnMessageReceived = async (
  messageData: IAudioMessage | ILocationMessage
) => {
  const senderId = messageData.sender_id;
  const sender = {
    phone: senderId,
    name: ""
  };

  if (alertMachineService.state.matches("idle")) {
    senderAPI.setState({ sender });
    alertMachineService.send("alert");
  }

  const currentSender = getSender();

  if (currentSender.phone !== sender.phone) {
    return;
  }

  if (messageData.location) {
    let lat, long;

    if (typeof messageData.location === "string") {
      let { _latitude, _longitude } = JSON.parse(messageData.location);
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
  }

  if (messageData.type === "audio") {
    const data = messageData.audio_uri;

    setAudioStore({
      data,
      sender
    });
  }
};

export { useLocationsStore, useAudioStore, useSenderStore };
