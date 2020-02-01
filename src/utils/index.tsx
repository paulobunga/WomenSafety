import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { startSendingLocation } from "packages";
import * as Permissions from "expo-permissions";
export const BACKGROUND_LOCATION_TASK = "background-location-task";

export const setUpBackgroundLocationTask = () => {
  TaskManager.defineTask(
    BACKGROUND_LOCATION_TASK,
    ({ data: { locations }, error }: any) => {
      if (error) {
        return;
      }

      console.log("my location", locations[0]);

      startSendingLocation(
        locations[0].coords.latitude,
        locations[0].coords.longitude
      );
    }
  );
};

export const backgroundLocationOptions: any = {
  accuracy: Location.Accuracy.BestForNavigation,
  timeInterval: 5000,
  showsBackgroundLocationIndicator: true,
  foregroundService: {
    notificationTitle: "Fetching location",
    notificationBody: "Tracking location",
    notificationColor: "#fff"
  }
};

export const startWatchingLocation = () => {
  locationPermissionMiddleWare(() => {
    Location.startLocationUpdatesAsync(
      BACKGROUND_LOCATION_TASK,
      backgroundLocationOptions
    );
  });
};

const locationPermissionMiddleWare = async next => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    return null;
  }
  return next();
};

export const getPositionAsync = (): any => {
  return locationPermissionMiddleWare(async () => {
    const location = await Location.getCurrentPositionAsync({
      timeInterval: 2000,
      accuracy: Location.Accuracy.BestForNavigation,
      enableHighAccuracy: true
    });
    return location;
  });
};

export const watchPositionAsync = async callback => {
  locationPermissionMiddleWare(() => {
    Location.watchPositionAsync(
      {
        timeInterval: 2000,
        accuracy: Location.Accuracy.BestForNavigation,
        enableHighAccuracy: true
      },
      callback
    );
  });
};
