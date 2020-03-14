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
  location: FirebaseFirestoreTypes.GeoPoint;
  audio_uri: string;
}
