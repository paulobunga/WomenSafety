import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

export const BACKGROUND_LOCATION_TASK = "background-location-task";

export const setUpBackgroundLocationTask = () => {
  TaskManager.defineTask(BACKGROUND_LOCATION_TASK, (data: any) => {
    console.log("data from background location task ", data);
  });
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
