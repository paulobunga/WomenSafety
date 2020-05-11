import React, { useState, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import "./src/utils/localization";
import DefaulTheme from "./config/theme";
import { LoginStack, BottomTabNavigator } from "navigation";
// import { WomenDrawerNavigator } from "./src/navigation/women-stack/women-drawer-navigator";
import {
  useUserStore,
  registerAppWithFCM,
  actOnMessageReceived,
  registerVolunteerBackgroundService
} from "packages";
import { firebaseAuth, firestore } from "config/firebase";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { setUpBackgroundLocationTask } from "utils";
import { AsyncStorage, StatusBar } from "react-native";
import { useTranslation } from "react-i18next";
import { colors } from "config/colors";

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
<<<<<<< HEAD
  console.disableYellowBox = true;
=======
  console.disableYellowBox = true; 
>>>>>>> ui-develop
  const { i18n } = useTranslation();

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [defaultLangLoaded, setDefaultLangLoaded] = useState(false);

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

    AsyncStorage.getItem("defaultLang")
      .then(res => {
        if (res) {
          i18n.changeLanguage(res);
        }
        setDefaultLangLoaded(true);
      })
      .catch(e => {
        setDefaultLangLoaded(true);
      });

    return subscriber;
  }, []);

  useEffect(() => {
    // Handle initial state when app comes from background or killed
    if (props.message) {
      console.log("initial props ", props);
      const parsedMessage = JSON.parse(props.message);
      actOnMessageReceived(parsedMessage);
    }
  }, [props.message]);

  useEffect(() => {
    // Subscribe to user's favorites if the user is registered
    if (user.phoneNumber) {
      registerVolunteerBackgroundService();
    }
  }, [user]);

  if (!fontsLoaded || !defaultLangLoaded) {
    return null;
  }

  console.log("user astate ", user);
  return (
    <PaperProvider theme={DefaulTheme}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={colors["primary"]}
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
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

const createUserIfNotExists = (_user: FirebaseAuthTypes.User) => {
  firestore
    .collection("users")
    .doc(_user.phoneNumber)
    .get()
    .then(docSnapshot => {
      if (docSnapshot.exists === false) {
        firestore
          .collection("users")
          .doc(_user.phoneNumber)
          .set(
            {
              favorites: [],
              phone: _user.phoneNumber,
              name: _user.displayName,
              uid: _user.uid
            },
            { merge: true }
          );
        // do something
      }
    });
};
