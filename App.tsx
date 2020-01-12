import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider, Button } from "react-native-paper";
import { VoiceRecorder, Geolocation, TranslatedText } from "./src/components";
import { setUpBackgroundLocationTask } from "./src/utils";
import "./src/utils/localization";
import { useTranslation } from "react-i18next";
setUpBackgroundLocationTask();

export default function App() {
  const { i18n } = useTranslation();
  const changeLanguage = () => {
    i18n.changeLanguage("gu");
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TranslatedText text="title" />
        <VoiceRecorder />
        <Geolocation />
        <Button onPress={changeLanguage}>Change language</Button>
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
