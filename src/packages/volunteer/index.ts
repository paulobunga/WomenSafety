import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";
import { getUserId, getUserPhoneNumber } from "../user";
import { Alert } from "react-native";
import { Machine, interpret } from "xstate";
import { firestore } from "config/firebase";
const API_URL =
  "https://us-central1-women-safety-c13ba.cloudfunctions.net/api/geolocation";

const volunteerLocationWatchMachine = Machine({
  id: "volunteerLocationUpdate",
  initial: "idle",
  states: {
    idle: {
      on: {
        WATCH: {
          target: "watching",
          actions: (context, event) => {
            BackgroundGeolocation.start();
          }
        }
      }
    },
    watching: {
      on: {
        STOP_WATCHING: {
          target: "idle",
          actions: (context, event) => {
            BackgroundGeolocation.stop();
          }
        }
      }
    }
  }
});

export const enableVolunteering = async () => {
  try {
    volunteerLocationWatchMachineService.send("WATCH");
    const phone = getUserPhoneNumber();

    await firestore
      .collection("volunteers")
      .doc(phone)
      .set({
        d: {
          isVolunteering: true
        }
      });
  } catch (e) {
    volunteerLocationWatchMachineService.send("STOP_WATCHING");
    Alert.alert(
      "Something went wrong",
      "please check your internet connection or try again!"
    );
  }
};

export const disableVolunteering = async () => {
  try {
    volunteerLocationWatchMachineService.send("STOP_WATCHING");
    const phone = getUserPhoneNumber();
    await firestore
      .collection("volunteers")
      .doc(phone)
      .set({
        d: {
          isVolunteering: false
        }
      });
  } catch (e) {
    volunteerLocationWatchMachineService.send("WATCH");
    Alert.alert(
      "Something went wrong",
      "please check your internet connection or try again!"
    );
  }
};

export let volunteerLocationWatchMachineService = interpret(
  volunteerLocationWatchMachine
);

volunteerLocationWatchMachineService.start();

export const registerVolunteerBackgroundService = () => {
  const phone = getUserPhoneNumber();

  BackgroundGeolocation.configure({
    desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    notificationTitle: "Volunteering",
    notificationText: "Enabled",
    debug: true,
    startOnBoot: true,
    stopOnTerminate: true,
    locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
    interval: 60 * 1000,
    fastestInterval: 60 * 1000,
    activitiesInterval: 10 * 1000,
    stopOnStillActivity: false,
    url: API_URL,
    httpHeaders: {},
    // customize post properties
    postTemplate: {
      latitude: "@latitude",
      longitude: "@longitude",
      phone
    }
  });

  BackgroundGeolocation.on("error", error => {
    console.log("[ERROR] BackgroundGeolocation error:", error);
  });

  BackgroundGeolocation.on("start", () => {
    console.log("[INFO] BackgroundGeolocation service has been started");
  });

  BackgroundGeolocation.on("stop", () => {
    volunteerLocationWatchMachineService.send("STOP_WATCHING");
    console.log("[INFO] BackgroundGeolocation service has been stopped");
  });

  BackgroundGeolocation.on("authorization", status => {
    console.log("[INFO] BackgroundGeolocation authorization status: " + status);
    if (status !== BackgroundGeolocation.AUTHORIZED) {
      // we need to set delay or otherwise alert may not be shown
      setTimeout(
        () =>
          Alert.alert(
            "App requires location tracking permission",
            "Would you like to open app settings?",
            [
              {
                text: "Yes",
                onPress: () => BackgroundGeolocation.showAppSettings()
              },
              {
                text: "No",
                onPress: () => console.log("No Pressed"),
                style: "cancel"
              }
            ]
          ),
        1000
      );
    }
  });

  BackgroundGeolocation.on("background", () => {
    console.log("[INFO] App is in background");
  });

  BackgroundGeolocation.on("foreground", () => {
    console.log("[INFO] App is in foreground");
  });

  BackgroundGeolocation.on("abort_requested", () => {
    console.log("[INFO] Server responded with 285 Updates Not Required");

    // Here we can decide whether we want stop the updates or not.
    // If you've configured the server to return 285, then it means the server does not require further update.
    // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
    // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
  });

  BackgroundGeolocation.on("http_authorization", () => {
    console.log("[INFO] App needs to authorize the http requests");
  });

  BackgroundGeolocation.checkStatus(status => {
    console.log(
      "[INFO] BackgroundGeolocation service is running",
      status.isRunning
    );
    console.log(
      "[INFO] BackgroundGeolocation services enabled",
      status.locationServicesEnabled
    );
    console.log(
      "[INFO] BackgroundGeolocation auth status: " + status.authorization
    );

    if (status.isRunning) {
      volunteerLocationWatchMachineService.send("WATCH");
    } else {
      volunteerLocationWatchMachineService.send("STOP_WATCHING");
    }
    // you don't need to check status before start (this is just the example)
  });

  //   BackgroundGeolocation.start(); //triggers start on start event
};
