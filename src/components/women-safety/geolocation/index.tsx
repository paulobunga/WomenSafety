import React, { useEffect } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Button } from "react-native-paper";
import {
  BACKGROUND_LOCATION_TASK,
  backgroundLocationOptions
} from "../../../utils";

function Geolocation() {
  const onStopWatchingLocation = () => {
    Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
  };

  const onStartWatchingLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      await Location.startLocationUpdatesAsync(
        BACKGROUND_LOCATION_TASK,
        backgroundLocationOptions
      );
    }
  };

  return (
    <Button
      onPress={onStartWatchingLocation}
      mode="contained"
      icon="navigation"
    >
      Watch position
    </Button>
  );
}

export { Geolocation };
