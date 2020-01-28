import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider, Button } from "react-native-paper";
import { VoiceRecorder, Geolocation, TranslatedText } from "./src/components";
// import { setUpBackgroundLocationTask } from "./src/utils";
import "./src/utils/localization";
import { useTranslation } from "react-i18next";
import { firestore } from "./config/firebase";
import { SubscribeToGeolocation } from "./src/containers/geolocation";

// setUpBackgroundLocationTask();

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
        <Geolocation />
        <Button onPress={changeLanguage}>Change language</Button>
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
