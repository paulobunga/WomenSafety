import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Title } from "react-native-paper";
import { useLocationsStore, alertMachineService } from "packages";
import { useService } from "@xstate/react";

export function AlertSplashScreen() {
  const locationStoreState = useLocationsStore();
  const [alertMachineState, send] = useService(alertMachineService);

  console.log("location store state ", locationStoreState);
  return (
    <View>
      <Button>Receiving alert</Button>
      <View style={styles.title}>
        <Title>Requestor - {locationStoreState.sender.phone}</Title>
      </View>
      <Button
        onPress={() => {
          send("receive");
        }}
      >
        Accept
      </Button>
      <Button
        onPress={() => {
          send("reject");
        }}
      >
        Reject
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});
