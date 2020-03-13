import React from "react";
import {
  VoiceRecorder,
  AppBar,
  WatchGeoLocation,
  useTranslatedText
} from "components";
import { WatchVolunteerLocation } from "../volunteers";

export const CreateAlertScreen = ({ navigation }) => {
  const alertsLabel = useTranslatedText("alerts");

  return (
    <>
      <AppBar navigation={navigation} title={alertsLabel} />
      <WatchVolunteerLocation />

      {/* <TranslatedText labelFor="title" /> */}
      <VoiceRecorder />
      <WatchGeoLocation />
      {/* <Button onPress={changeLanguage}>Change language</Button> */}
    </>
  );
};
