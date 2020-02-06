import React, { useState, useEffect } from "react";
import { Button, ActivityIndicator } from "react-native-paper";
import {
  VoiceRecorder,
  TranslatedText,
  AppBar,
  SubscribeToGeolocation,
  WatchGeoLocation
} from "components";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { colors } from "config/colors";

export const CreateAlertScreen = ({ navigation }) => {
  const { i18n } = useTranslation();
  const changeLanguage = () => {
    i18n.changeLanguage("gu");
  };

  return (
    <>
      <AppBar navigation={navigation} title="Alerts" />

      {/* <TranslatedText labelFor="title" /> */}
      <VoiceRecorder />
      <WatchGeoLocation />
      {/* <Button onPress={changeLanguage}>Change language</Button> */}
    </>
  );
};
