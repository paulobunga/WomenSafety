import React from "react";
import { SubscribeToGeolocation, ListenRecording } from "components";
import { alertMachineService } from "packages";
import { useService } from "@xstate/react";
import { Button } from "react-native-paper";

export function ReceivingScreen({ navigation }) {
  const [alertMachineState, send] = useService(alertMachineService);

  return (
    <>
      <SubscribeToGeolocation />
      <ListenRecording />
      <Button onPress={() => send("hangup")}>Hangup</Button>
    </>
  );
}
