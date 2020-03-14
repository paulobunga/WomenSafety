import create from "zustand";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { firebaseAuth, firestore as db } from "config/firebase";
import { disableVolunteering } from "../volunteer";

const [useUserStore, api] = create(set => ({
  user: {} as FirebaseAuthTypes.User,
  setUser: (user: FirebaseAuthTypes.User) => set({ user })
}));

export const getUserId = () => {
  return api.getState().user.uid;
};
{
}
export const getUserPhoneNumber = () => {
  return api.getState().user.phoneNumber;
};

export const logout = async () => {
  const phoneNumber = getUserPhoneNumber();

  try {
    await db
      .collection("users")
      .doc(phoneNumber)
      .update({ gcm_token: null });
    disableVolunteering();
    firebaseAuth.signOut();
  } catch (e) {
    console.log("error ", e);
  }
};
export { useUserStore };
