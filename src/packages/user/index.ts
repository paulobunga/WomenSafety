import create from "zustand";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { firebaseAuth, firestore as db } from "config/firebase";

const [useUserStore, api] = create(set => ({
  user: {} as FirebaseAuthTypes.User,
  setUser: (user: FirebaseAuthTypes.User) => set({ user })
}));

export const logout = async () => {
  const uid = api.getState().user.uid;

  try {
    await db
      .collection("users")
      .doc(uid)
      .update({ gcm_token: null });
    firebaseAuth.signOut();
  } catch (e) {
    console.log("error ", e);
  }
};
export { useUserStore };
