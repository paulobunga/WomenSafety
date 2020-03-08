import React from "react";
import {
  VoiceRecorder,
  AppBar,
  WatchGeoLocation,
  useTranslatedText
} from "components";

export const CreateAlertScreen = ({ navigation }) => {
  const alertsLabel = useTranslatedText("alerts");

  return (
    <>
      <AppBar navigation={navigation} title={alertsLabel} />

      {/* <TranslatedText labelFor="title" /> */}
      <VoiceRecorder />
      <WatchGeoLocation />
      {/* <Button onPress={changeLanguage}>Change language</Button> */}
    </>
  );
};
