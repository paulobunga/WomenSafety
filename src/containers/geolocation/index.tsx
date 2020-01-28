import React, { Component, useEffect, useState } from "react";
import { firestore } from "config/firebase";
import { Text } from "react-native-paper";
import { myUserId } from "../../../config";

const usersRef = firestore.collection("users").doc(myUserId);
const messageCollection = usersRef.collection("message_history");

export function SubscribeToGeolocation() {
  const [data, setData] = useState({});
  useEffect(() => {
    const unsubscribe = messageCollection.onSnapshot(
      function(snapshot) {
        snapshot.docChanges().forEach(async function(change) {
          if (change.type === "added") {
            console.log("Snapshot: ", change.doc.id);
            const data = change.doc.data();
            const message = await data.message.get();
            console.log("message ", message.data());
            //   setData(data);
          }
        });
      },
      function(error) {
        console.log("error ", error);
      }
    );

    return unsubscribe;
  }, []);

  //   useEffect(() => {
  //     async function getData() {
  //       const documentSnapshot = await messageCollection.get();
  //       //   console.log("document ref ", documentSnapshot.forEach);
  //       documentSnapshot.forEach(async doc => {
  //         const id = doc.id;
  //         const data = doc.data();
  //         const message = await data.message.get();
  //         console.log("data ", id, message.data());
  //       });
  //     }

  //     getData();
  //   }, []);

  return <Text>Location from your favorites : </Text>;
}
