import create from "zustand";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

const [useUserStore] = create(set => ({
  user: {} as FirebaseAuthTypes.User,
  setUser: (user: FirebaseAuthTypes.User) => set({ user })
}));

export { useUserStore };
