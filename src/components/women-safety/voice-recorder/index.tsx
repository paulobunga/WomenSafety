import React, { useState, useRef, Fragment } from "react";
import { Audio } from "expo-av";
import { View, StyleSheet, Dimensions } from "react-native";
import { colors } from "config/colors";
import { formatTime, startWatchingLocation, API_URL } from "utils";
import { uploadAudio } from "config/storage";
import {
  RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
  RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
  RecordingOptions,
  RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX
} from "expo-av/build/Audio";
import { sendAudioMessage } from "../../../packages/message";
import { Button, Text, Snackbar } from "react-native-paper";
import { useUserStore, getUserPhoneNumber } from "packages";
import { useTranslatedText } from "components";
import axios from "axios";
import theme from "config/theme";

let recording;

const initialState = {
  success: false,
  error: null,
  progress: null
};

let locationSubscriber;

function VoiceRecorder() {
  const lastAudiodownloadURI = useRef(null);

  const senderPhoneNumber = useUserStore(state => state.user.phoneNumber);
  const recordText = useTranslatedText("record");
  const sendText = useTranslatedText("send");
  const cancelText = useTranslatedText("cancel");
  const introductionText = useTranslatedText("introText");
  const howTo = useTranslatedText("howTo");
  const paragraphOne = useTranslatedText("paragraphOne");
  const paragraphTwo = useTranslatedText("paragraphTwo");
  const paragraphThree = useTranslatedText("paragraphThree");
  const paragraphFour = useTranslatedText("paragraphFour");
  const paragraphFive = useTranslatedText("paragraphFive");
  const paragraphSix = useTranslatedText("paragraphSix");
  const errorMsg = useTranslatedText("errorMsg");
  const retryUpload = useTranslatedText("retryUpload");
  const uploadProgress = useTranslatedText("uploadProgress");
  const recordingUpload = useTranslatedText("recordingUpload");

  const [state, setState] = useState(initialState);
  const [isWatchingLocation, setisWatchingLocation] = useState(false);

  const [recordingStatus, setRecordingStatus] = useState<Audio.RecordingStatus>(
    {
      canRecord: false,
      isDoneRecording: false,
      durationMillis: 0,
      isRecording: false
    }
  );

  const onRecordingStatusUpdate = (status: Audio.RecordingStatus) => {
    setRecordingStatus(status);
  };

  const onStartRecording = async () => {
    setState(initialState);

    recording = new Audio.Recording();

    const permissionStatus = await Audio.requestPermissionsAsync();

    if (permissionStatus.granted) {
      try {
        await recording.prepareToRecordAsync(
          RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        await recording.startAsync();
        recording.setOnRecordingStatusUpdate(onRecordingStatusUpdate);
        recording.setProgressUpdateInterval(1000);
      } catch (error) {}
    }
  };

  const uploadFile = (fileUri: string) => {
    try {
      uploadAudio(
        fileUri,
        progress => {
          setState({
            ...state,
            progress
          });
        },
        () => {
          setState({
            ...state,
            error: {errorMsg}
          });
        },
        async downloadUri => {
          lastAudiodownloadURI.current = downloadUri;

          sendAudioMessage(senderPhoneNumber, downloadUri);
          startSendingLocationInfo();

          setState({
            ...state,
            success: true
          });
        }
      );
    } catch (error) {
      setState({
        ...state,
        error: {errorMsg}
      });
    }
  };

  const startSendingLocationInfo = async () => {
    if (locationSubscriber) {
      locationSubscriber.remove();
    }
    setisWatchingLocation(true);
    locationSubscriber = await startWatchingLocation(
      senderPhoneNumber,
      lastAudiodownloadURI.current
    );
  };

  const onUploadRecording = async () => {
    startSendingLocationInfo();
    await recording.stopAndUnloadAsync();
    tryUpload();
  };

  const onCancelWatchingPosition = async () => {
    try {
      await axios.post(API_URL + "/back-to-safety", {
        sender_id: getUserPhoneNumber()
      });
    } catch (error) {
      console.log(
        "Error while calling back to safety notification service ",
        error
      );
    } finally {
      setisWatchingLocation(false);
      if (locationSubscriber) {
        console.log("location subscr", locationSubscriber);
        locationSubscriber.remove();
      }
    }
  };

  const onCancelRecording = async () => {
    await recording.stopAndUnloadAsync();
  };

  const tryUpload = () => {
    const fileURI = recording.getURI();
    uploadFile(fileURI);
  };

  // const onPlayRecordedAudio = async () => {
  //   const soundObject = new Audio.Sound();

  //   await soundObject.loadAsync({ uri: recording.getURI() });
  //   await soundObject.playAsync();
  // };

  return (
    <>
      <View style={styles.buttonContainer}>
        {isWatchingLocation ? (
          <Button onPress={onCancelWatchingPosition}>Back to safety</Button>
        ) : null}
        {recordingStatus.isRecording ? (
          <Button
            mode="text"
            icon="send"
            onPress={onUploadRecording}
            uppercase
            color={colors["yellow-vivid-800"]}
            labelStyle={{
              color: colors["yellow-vivid-050"]
            }}
            contentStyle={{
              backgroundColor: colors["green-vivid-800"],
              paddingHorizontal: 80,
              paddingVertical: 8,
              borderRadius: 35
            }}
          >
            {sendText}
          </Button>
        ) : (
          <Fragment>
            <Button
              mode="text"
              disabled={isWatchingLocation}
              onPress={onStartRecording}
              uppercase={false}
              color={colors["red-vivid-600"]}
              labelStyle={{
                color: colors["primary"],
                fontSize: 24
              }}
              contentStyle={{
                backgroundColor: colors["white"],
                elevation: 10,
                borderRadius: 140,
                height: 240,
                width: 240,
                margin: 30,
                marginTop: 10
              }}
            >
              {recordText}
            </Button>

            <Text style={styles.text}>{introductionText}</Text>
            <View style={{ margin: 10, alignItems: "flex-start" }}>
              <Text style={[styles.text, styles.text2]}>{howTo}</Text>
              <Text style={styles.text2}>
                <Text style={styles.text}>1. </Text> {paragraphOne} </Text>
              <Text style={styles.text2}>
                <Text style={styles.text}>2. </Text> {paragraphTwo} </Text>
              <Text style={styles.text2}>
                  <Text style={styles.text}>3. </Text> {paragraphThree} </Text>
              <Text style={styles.text2}>
                <Text style={styles.text}>4. </Text> {paragraphFour} </Text>
              <Text style={styles.text2}>
                <Text style={styles.text}>-- </Text> {paragraphFive} </Text>
              <Text style={styles.text2}>
                <Text style={styles.text}>-- </Text> {paragraphSix} </Text>
            </View>
          </Fragment>
        )}

        {state.error ? (
          <>
            <Text>{state.error}</Text>
            <Button
              onPress={tryUpload}
              icon="upload"
              labelStyle={{ color: colors["green-vivid-200"] }}
            >
              {retryUpload}
            </Button>
          </>
        ) : null}
        {state.progress ? <Text>{uploadProgress} {state.progress}</Text> : null}
        {recordingStatus.isRecording ? (
          <>
            <Text style={{ marginTop: 10 }}>
              {formatTime(Math.floor(recordingStatus.durationMillis / 1000))}
            </Text>
            <Button onPress={onCancelRecording} icon="cancel">
              {cancelText}
            </Button>
          </>
        ) : null}

        <Snackbar
          visible={state.success}
          onDismiss={() => setState({ ...state, success: false })}
        >
          {recordingUpload}
        </Snackbar>
        <Snackbar
          visible={state.error}
          onDismiss={() => {}}
          action={{
            label: "Retry upload",
            onPress: tryUpload
          }}
        >
          {state.error}
        </Snackbar>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors["background"]
  },
  text: {
    color: theme.colors.primary,
    fontWeight: "bold"
  },
  text2: {
    paddingBottom: 5
  }
});

export { VoiceRecorder };

export const RECORDING_OPTIONS_PRESET_HIGH_QUALITY: RecordingOptions = {
  android: {
    extension: ".m4a",
    outputFormat: RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 64000
  },
  ios: {
    extension: ".m4a",
    audioQuality: RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 64000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false
  }
};
