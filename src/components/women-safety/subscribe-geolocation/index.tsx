import React, { useEffect } from "react";
import { firestore } from "config/firebase";
import { Text } from "react-native-paper";
import { myUserId } from "config";
import { useLocationsStore } from "../../../packages";
import { MapViewWithCoordinates } from "../map-view";
import { Marker } from "react-native-maps";

const messageCollection = firestore
  .collection("message_history")
  .where("receiver_id", "==", myUserId);

export function SubscribeToGeolocation() {
  const locationStore = useLocationsStore();
  useEffect(() => {
    const unsubscribe = messageCollection.onSnapshot(
      function(snapshot) {
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

            locationStore.setLocationStore({
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
  }, []);

  console.log("location store ", locationStore);

  const coordinates = locationStore.coordinates;

  console.log("coordinates ", coordinates);
  return (
    <>
      {coordinates.latitude && (
        <MapViewWithCoordinates coordinates={coordinates} />
      )}
      {/* <Marker
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.description}
    /> */}
      <Text>
        Location from your favorites : {locationStore.sender.name} :{" "}
        {JSON.stringify(locationStore.coordinates)}
      </Text>
    </>
  );
}
