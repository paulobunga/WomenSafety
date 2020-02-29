import React, { useEffect } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Button } from "react-native-paper";
import { BACKGROUND_LOCATION_TASK, startWatchingLocation } from "utils";

function WatchGeoLocation() {
  const onStopWatchingLocation = () => {
    Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
  };

  const onStartWatchingLocation = async () => {
    startWatchingLocation();
  };

  return null;
  // <Button
  //   onPress={onStartWatchingLocation}
  //   mode="contained"
  //   icon="navigation"
  // >
  //   Watch position
  // </Button>
}

export { WatchGeoLocation };
