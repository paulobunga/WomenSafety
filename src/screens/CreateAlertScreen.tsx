import React from "react";
import { Button } from "react-native";
import {
    VoiceRecorder,
    WatchGeoLocation,
    TranslatedText,
    SubscribeToGeolocation
} from "../components";

const CreateAlertScreen = () => {
    return (
        <>
            <TranslatedText labelFor="title" />
            <VoiceRecorder />
            <Button onPress={changeLanguage}>Change language</Button>
            <WatchGeoLocation />
            <SubscribeToGeolocation />
        </>
    );
};

export default CreateAlertScreen;
