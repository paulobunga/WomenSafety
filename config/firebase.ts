import firebase from "firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
} from "react-native-dotenv";
import "../src/utils/firebaseTimeout";

const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
};

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();

export default firebase;
