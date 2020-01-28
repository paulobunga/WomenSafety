import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider, Button } from "react-native-paper";
import {
  VoiceRecorder,
  WatchGeoLocation,
  TranslatedText,
  SubscribeToGeolocation
} from "./src/components";
import "./src/utils/localization";
import { useTranslation } from "react-i18next";
import { setUpBackgroundLocationTask } from "./src/utils";

setUpBackgroundLocationTask();

export default function App() {
  const { i18n } = useTranslation();
  const changeLanguage = () => {
    i18n.changeLanguage("gu");
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TranslatedText labelFor="title" />
        <VoiceRecorder />
        <Button onPress={changeLanguage}>Change language</Button>
        <WatchGeoLocation />
        <SubscribeToGeolocation />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
