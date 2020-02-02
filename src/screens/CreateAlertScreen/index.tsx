import React from "react";
import { Button } from "react-native-paper";
import {
  VoiceRecorder,
  TranslatedText,
  AppBar,
  SubscribeToGeolocation
} from "components";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

export const CreateAlertScreen = ({ navigation }) => {
  const { i18n } = useTranslation();
  const changeLanguage = () => {
    i18n.changeLanguage("gu");
  };

  return (
    <>
      <AppBar navigation={navigation} title="Alerts" />
      <SubscribeToGeolocation />
      <TranslatedText labelFor="title" />
      <VoiceRecorder />
      <Button onPress={changeLanguage}>Change language</Button>
    </>
  );
};
