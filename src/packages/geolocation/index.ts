import create from "zustand";
import { alertMachineService } from "../alert-machine";
import { ISender, ICoordinates, IAlertMessage } from "src/types";

const initialAlertMessageState = {
  location_data: {
    coordinates: {} as ICoordinates
  },
  sender: {} as ISender,
  audio_data: {
    audio_uri: null
  }
};
const [useAlertMessageStore, alertMessageAPI] = create(
  () => initialAlertMessageState
);

const setSender = (sender: ISender) => {
  alertMessageAPI.setState(() => ({
    ...initialAlertMessageState,
    sender
  }));
};

export const getSender = () => {
  return alertMessageAPI.getState().sender;
};

export const actOnMessageReceived = async (messageData: IAlertMessage) => {
  const senderId = messageData.sender_id;
  const sender = {
    phone: senderId,
    name: ""
  };

  if (alertMachineService.state.matches("idle")) {
    setSender(sender);
    alertMachineService.send("alert");
  }

  const currentSender = getSender();

  if (currentSender.phone !== sender.phone) {
    return;
  }

  console.log("received message data ", messageData);
  //@ts-ignore
  let location_data = JSON.parse(messageData.location_data);
  location_data.coordinates.latitude = location_data.coordinates._latitude;
  location_data.coordinates.longitude = location_data.coordinates._longitude;

  //@ts-ignore
  const audio_data = JSON.parse(messageData.audio_data);

  alertMessageAPI.setState(state => {
    return {
      ...state,
      location_data,
      audio_data
    };
  });
};

export { useAlertMessageStore };

// export const subscribeMessagesFromFavorites = (myNumber: string) => {
//   const past5Mins = subSeconds(new Date(), 1);
//   const messageCollection = firestore
//     .collection("message_history")
//     .where("receiver_id", "==", myNumber)
//     .where("created_at", ">", past5Mins)
//     .orderBy("created_at", "desc")
//     .limit(1);

//   const unsubscribe = messageCollection.onSnapshot(
//     function(snapshot) {
//       navigator;

//       snapshot.docChanges().forEach(async function(change) {
//         if (change.type === "added") {
//           const messageRef = change.doc.data().message;
//           const message = await messageRef.get();
//           const messageData = message.data();
//         }
//       });
//     },
//     function(error) {
//       console.log("error ", error);
//     }
//   );

//   return unsubscribe;
// };
