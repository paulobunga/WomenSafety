import React, { useState, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import "./src/utils/localization";
import DefaulTheme from "./config/theme";
import { RootStackScreen, LoginStack } from "navigation";
import {
  subscribeMessagesFromFavorites,
  useUserStore,
  registerAppWithFCM,
  actOnMessageReceived
} from "packages";
import { firebaseAuth, firestore } from "config/firebase";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { setUpBackgroundLocationTask } from "utils";

setUpBackgroundLocationTask();

const fetchFonts = () => {
  return Font.loadAsync({
    "poppins-regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    "poppins-medium": require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
    "poppins-bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    "poppins-light": require("./assets/fonts/Poppins/Poppins-Light.ttf"),
    "roboto-regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "roboto-medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "roboto-light": require("./assets/fonts/Roboto/Roboto-Light.ttf")
  });
};
export default function App(props: any) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  function onAuthStateChanged(user) {
    if (user) {
      const _user: FirebaseAuthTypes.User = user._user;
      console.log("user ", _user);
      try {
        setUser(_user);

        // put only once, when user is new
        // firestore
        //   .collection("users")
        //   .doc(_user.uid)
        //   .set(
        //     {
        //       favorites: [],
        //       phone: _user.phoneNumber,
        //       name: _user.displayName
        //     },
        //     { merge: true }
        //   );
      } catch (e) {}
    } else {
      //@ts-ignore
      setUser({});
    }

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    registerAppWithFCM();
    const subscriber = firebaseAuth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (props.message) {
      const parsedMessage = JSON.parse(props.message);
      actOnMessageReceived(parsedMessage);
    }
  }, [props.message]);

  useEffect(() => {
    let unsubscribe = () => {};
    if (user.phoneNumber) {
      unsubscribe = subscribeMessagesFromFavorites(user.phoneNumber);
    }
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    fetchFonts().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  if (initializing) return null;

  if (!fontsLoaded) {
    return null;
  }

  console.log("user astate ", user);
  return (
    <PaperProvider theme={DefaulTheme}>
      {user.providerData ? (
        <NavigationContainer>
          <RootStackScreen />
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <LoginStack />
        </NavigationContainer>
      )}
    </PaperProvider>
  );
}
