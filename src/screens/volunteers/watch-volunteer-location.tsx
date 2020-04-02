import React from "react";
import { useService } from "@xstate/react";
import {
  volunteerLocationWatchMachineService,
  enableVolunteering,
  disableVolunteering
} from "packages";
import { Switch, Text, Surface } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { colors } from "config/colors";

export function WatchVolunteerLocation() {
  const [volunteerLocationState] = useService(
    volunteerLocationWatchMachineService
  );
  const isEnabled = volunteerLocationState.matches("watching");

  return (
    <Surface style={styles.surface}>
      <Text>Toggle Volunteering status</Text>
      <Switch
        color={colors["cyan-vivid-700"]}
        onValueChange={() => {
          if (isEnabled) {
            disableVolunteering();
          } else {
            enableVolunteering();
          }
        }}
        value={isEnabled}
      ></Switch>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 80,
    backgroundColor: colors["background"],
    alignItems: "center",
    justifyContent: "center"
  }
});
