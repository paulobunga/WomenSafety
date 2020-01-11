import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider, Button } from "react-native-paper";
import { VoiceRecorder, Geolocation } from "./src/components";
import { setUpBackgroundLocationTask } from "./src/utils";
import "./src/utils/localization";
import { useTranslation } from "react-i18next";
setUpBackgroundLocationTask();

export default function App() {
  const changeLanguage = () => {
    i18n.changeLanguage("gu");
  };

  const { t, i18n } = useTranslation();

  useEffect(() => {}, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text>{t("title")}</Text>
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
