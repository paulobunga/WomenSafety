import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { startSendingLocation } from "packages";
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
