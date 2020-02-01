import React, { useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationNativeContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import "./src/utils/localization";
import DefaulTheme from "./config/theme";
import { useTranslation } from "react-i18next";
import { setUpBackgroundLocationTask } from "./src/utils";
import { BottomTabNavigator, DrawerNavigator } from "navigation";

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
  const { i18n } = useTranslation();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    );
  }
  return (
    <PaperProvider theme={DefaulTheme}>
      <NavigationNativeContainer>
        <BottomTabNavigator />
      </NavigationNativeContainer>

      {/* <NavigationNativeContainer>
        <DrawerNavigator />
      </NavigationNativeContainer> */}
    </PaperProvider>
  );
}
