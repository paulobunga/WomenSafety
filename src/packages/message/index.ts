import { firestore, default as firebase } from "config/firebase";
import { getPositionAsync } from "utils";
import { IAudioMessage, ILocationMessage } from "src/types";

export async function sendUserLocation(
  senderId: any,
  lat: number,
  long: number
) {
  const geoPoint = new firebase.firestore.GeoPoint(lat, long);
  const message: ILocationMessage = {
    type: "location",
    location: geoPoint,
    sender_id: senderId
  };

  await firestore.collection("messages").add(message);
}

export async function sendAudioMessage(senderId: any, audioURI: string) {
  const currentLocation = await getPositionAsync();

  const message: IAudioMessage = {
    type: "audio",
    audio_uri: audioURI,
    sender_id: senderId
  };

  if (currentLocation.coords) {
    const { latitude, longitude } = currentLocation.coords;
    const geoPoint = new firebase.firestore.GeoPoint(latitude, longitude);
    message.location = geoPoint;
  }

  const messageRef = await firestore.collection("messages").add(message);
}
