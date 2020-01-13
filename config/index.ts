import * as firebase from "firebase";
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

console.log("firebase ", firebaseConfig);

if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}

export default {
  firebaseConfig
};
