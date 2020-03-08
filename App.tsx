import React, { useState, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import "./src/utils/localization";
import DefaulTheme from "./config/theme";
import { RootStackScreen, LoginStack, BottomTabNavigator } from "navigation";
import {
  subscribeMessagesFromFavorites,
  useUserStore,
  registerAppWithFCM,
  actOnMessageReceived,
  alertMachineService
} from "packages";
import { firebaseAuth, firestore } from "config/firebase";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { setUpBackgroundLocationTask } from "utils";
import { useService } from "@xstate/react";

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
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  function onAuthStateChanged(user) {
    if (user) {
      const _user: FirebaseAuthTypes.User = user._user;
      // console.log("user ", _user);
      try {
        createUserIfNotExists(_user);
        setUser(_user);
        registerAppWithFCM();
      } catch (e) {}
    } else {
      //@ts-ignore
      setUser({});
    }
  }

  useEffect(() => {
    const subscriber = firebaseAuth.onAuthStateChanged(onAuthStateChanged);
    fetchFonts().then(() => {
      setFontsLoaded(true);
    });
    return subscriber;
  }, []);

  useEffect(() => {
    // Handle initial state when app comes from background or killed
    if (props.message) {
      const parsedMessage = JSON.parse(props.message);
      actOnMessageReceived(parsedMessage);
    }
  }, [props.message]);

  useEffect(() => {
    // Subscribe to user's favorites if the user is registered
    let unsubscribe = () => {};
    if (user.phoneNumber) {
      unsubscribe = subscribeMessagesFromFavorites(user.phoneNumber);
    }
    return unsubscribe;
  }, [user]);

  if (!fontsLoaded) {
    return null;
  }

  console.log("user astate ", user);
  return (
    <PaperProvider theme={DefaulTheme}>
      {user.providerData ? (
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <LoginStack />
        </NavigationContainer>
      )}
    </PaperProvider>
  );
}

const createUserIfNotExists = (_user: any) => {
  firestore
    .collection("users")
    .doc(_user.uid)
    .get()
    .then(docSnapshot => {
      if (docSnapshot.exists === false) {
        firestore
          .collection("users")
          .doc(_user.uid)
          .set(
            {
              favorites: [],
              phone: _user.phoneNumber,
              name: _user.displayName
            },
            { merge: true }
          );
        // do something
      }
    });
};
