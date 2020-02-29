import React from "react";
import { SubscribeToGeolocation, AppBar, ListenRecording } from "components";

export function ReceivingScreen({ navigation }) {
  return (
    <>
      <AppBar navigation={navigation} title="Receiving alerts" isModal />
      <SubscribeToGeolocation />
      <ListenRecording />
    </>
  );
}
