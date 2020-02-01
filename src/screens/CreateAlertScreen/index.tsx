import React from "react";
import { Button } from "react-native-paper";
import { VoiceRecorder, TranslatedText } from "components";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";

export const CreateAlertScreen = () => {
  const { i18n } = useTranslation();
  const changeLanguage = () => {
    i18n.changeLanguage("gu");
  };

  return (
    <View style={styles.container}>
      <TranslatedText labelFor="title" />
      <VoiceRecorder />
      <Button onPress={changeLanguage}>Change language</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
