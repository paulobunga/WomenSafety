import React from "react";
import { useService } from "@xstate/react";
import {
  volunteerLocationWatchMachineService,
  enableVolunteering,
  disableVolunteering
} from "packages";
import { Switch, Text } from "react-native-paper";
import { View } from "react-native";

export function WatchVolunteerLocation() {
  const [volunteerLocationState] = useService(
    volunteerLocationWatchMachineService
  );
  const isEnabled = volunteerLocationState.matches("watching");

  return (
    <>
      <View>
        <Text>Start volunteering </Text>
        <Switch
          onValueChange={() => {
            if (isEnabled) {
              disableVolunteering();
            } else {
              enableVolunteering();
            }
          }}
          value={isEnabled}
        ></Switch>
      </View>
    </>
  );
}
