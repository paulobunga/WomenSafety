import React, { useState, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import "./src/utils/localization";
import DefaulTheme from "./config/theme";
import { useTranslation } from "react-i18next";
import { setUpBackgroundLocationTask } from "./src/utils";
import { BottomTabNavigator, RootStackScreen } from "navigation";
import { subscribeMessagesFromFavorites } from "packages";
import { Text } from "react-native";

// setUpBackgroundLocationTask();

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
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    fetchFonts().then(() => {
      setFontsLoaded(true);
    });
    // Subscribe to messages on App start

    subscribeMessagesFromFavorites();
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <PaperProvider theme={DefaulTheme}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </PaperProvider>
  );
}
