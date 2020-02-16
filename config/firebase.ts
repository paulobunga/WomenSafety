import firebase from "@react-native-firebase/app";
import { default as storageImpl } from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import { default as firestoreImpl } from "@react-native-firebase/firestore";

const storage = storageImpl();
const firestore = firestoreImpl();
const firebaseAuth = auth();

export { firestore, storage, firebaseAuth };

export default firebase;
