import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Title } from "react-native-paper";
import { alertMachineService, useAlertMessageStore } from "packages";
import { useService } from "@xstate/react";
import { Audio } from "expo-av";

export function AlertSplashScreen() {
  useEffect(() => {
    // let soundObject = new Audio.Sound();

    async function playAlarmSound() {
      // await soundObject.loadAsync(require("assets/sounds/alarm.mp3"));
      // await soundObject.playAsync();
    }

    async function stopAlarmSound() {
      // await soundObject.stopAsync();
      // await soundObject.unloadAsync();
      // soundObject = null;
    }

    try {
      playAlarmSound();
    } catch (error) {}

    return stopAlarmSound;
  }, []);

  const sender = useAlertMessageStore(state => state.sender);
  const [alertMachineState, send] = useService(alertMachineService);

  return (
    <View>
      <Button>Receiving alert</Button>
      <View style={styles.title}>
        <Title>Requestor - {sender.phone}</Title>
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
