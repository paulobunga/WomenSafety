import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface ISender {
  name: string;
  phone: string;
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface IChild {
  name: string;
  address: string;
  contact: string;
  image: string;
  created_at: any;
  age: number;
}

export interface IAudioMessage {
  type: "audio";
  location?: FirebaseFirestoreTypes.GeoPoint;
  audio_uri: string;
  sender_id: string;
}

export interface ILocationMessage {
  type: "location";
  location: FirebaseFirestoreTypes.GeoPoint;
  sender_id: string;
}

export interface IBackToSafetyMessage {
  type: "backToSafety";
  message: string;
}

export interface IAlertMessage {
  type: "alert";
  location_data: {
    coordinates: FirebaseFirestoreTypes.GeoPoint;
  };
  audio_data: {
    audio_uri: string;
  };
  sender_id: string;
}
