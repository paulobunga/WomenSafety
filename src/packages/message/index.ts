import { firestore, default as firebase } from "config/firebase";
import { getPositionAsync } from "utils";
import { IAlertMessage } from "src/types";

export async function sendAudioMessage(senderId: any, audioURI: string) {
  const currentLocation = await getPositionAsync();
  if (currentLocation.coords) {
    const { latitude, longitude } = currentLocation.coords;

    const geoPoint = new firebase.firestore.GeoPoint(latitude, longitude);

    const message: IAlertMessage = {
      type: "alert",
      location_data: {
        coordinates: geoPoint
      },
      audio_data: {
        audio_uri: audioURI
      },
      sender_id: senderId
    };

    const messageRef = await firestore.collection("messages").add(message);
  }
}
