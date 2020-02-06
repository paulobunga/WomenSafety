import React, { useState, useEffect } from "react";
import { Button, ActivityIndicator } from "react-native-paper";
import {
  VoiceRecorder,
  TranslatedText,
  AppBar,
  SubscribeToGeolocation
} from "components";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { colors } from "config/colors";

export const CreateAlertScreen = ({ navigation }) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { i18n } = useTranslation();
  const changeLanguage = () => {
    i18n.changeLanguage("gu");
  };

  return (
    <>
      <AppBar navigation={navigation} title="Alerts" />
      {!isMapLoaded && (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{
            height: "60%",
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center"
          }}
          color={colors["indigo-900"]}
        />
      )}
      <SubscribeToGeolocation setIsMapLoaded={setIsMapLoaded} />

      {/* <TranslatedText labelFor="title" /> */}
      <VoiceRecorder />
      {/* <Button onPress={changeLanguage}>Change language</Button> */}
    </>
  );
};
