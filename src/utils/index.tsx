// import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { format } from "date-fns";
import { Platform, Linking, Alert, Share } from "react-native";
import { IAlertMessage } from "src/types";
import { firebase } from "@react-native-firebase/storage";
import { firestore } from "config/firebase";
export const BACKGROUND_LOCATION_TASK = "background-location-task";

export const setUpBackgroundLocationTask = () => {
  // TaskManager.defineTask(
  //   BACKGROUND_LOCATION_TASK,
  //   ({ data: { locations }, error }: any) => {
  //     console.log(";ofu");
  //     if (error) {
  //       console.log("error ", error);
  //       return;
  //     }
  //     console.log("my location", locations[0]);
  // );
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

export const startWatchingLocation = async (
  user_id: string,
  audioURI: string
) => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    return null;
  }

  const subscriptionPromise = await Location.watchPositionAsync(
    backgroundLocationOptions,
    async data => {
      console.log("watching position for emergency ", data);
      const geoPoint = new firebase.firestore.GeoPoint(
        data.coords.latitude,
        data.coords.longitude
      );

      const message: IAlertMessage = {
        type: "alert",
        location_data: {
          coordinates: geoPoint
        },
        audio_data: {
          audio_uri: audioURI
        },
        sender_id: user_id
      };
      await firestore.collection("messages").add(message);
    }
  );
  return subscriptionPromise;
  //   Location.startLocationUpdatesAsync(
  //     BACKGROUND_LOCATION_TASK,
  //     backgroundLocationOptions
  //   );
  // });
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
      accuracy: Location.Accuracy.BestForNavigation
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

const appendZero = value => {
  if (value < 10) {
    return "0" + value;
  }
  return value;
};

export function formatTime(time) {
  const hour = Math.floor(time / 3600);
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  if (hour > 0) {
    return appendZero(hour) + ":" + appendZero(min) + ":" + appendZero(sec);
  } else {
    return appendZero(min) + ":" + appendZero(sec);
  }
}

export const formatSecondsToDate = (dateSeconds: number) => {
  if (dateSeconds) {
    return format(new Date(dateSeconds * 1000), "do MMM yyyy KK:mm aaaa");
  }
};

export const callNumber = phone => {
  let phoneNumber = phone;
  if (Platform.OS !== "android") {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert("Phone number is not available");
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.log(err));
};

export const shareInformation = () => {
  const shareOptions = {
    title: "Title",
    message: "Message to share", // Note that according to the documentation at least one of "message" or "url" fields is required
    url: "www.example.com",
    subject: "Subject"
  };

  Share.share(shareOptions);
};

export const API_URL =
  "https://us-central1-women-safety-c13ba.cloudfunctions.net/api";
