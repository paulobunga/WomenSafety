import React, { useState, useRef } from "react";
import { Audio } from "expo-av";
import { Button } from "react-native-paper";
import { Text, View, StyleSheet, Dimensions } from "react-native";
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
import { Snackbar } from "react-native-paper";
import { useUserStore, getUserPhoneNumber } from "packages";
import { useTranslatedText } from "components";
import axios from "axios";

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
            error: "File upload failed"
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
        error: "File upload failed"
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
          <Button
            mode="text"
            icon="phone"
            disabled={isWatchingLocation}
            onPress={onStartRecording}
            uppercase
            color={colors["red-vivid-600"]}
            labelStyle={{
              color: colors["cyan-vivid-100"]
            }}
            contentStyle={{
              backgroundColor: colors["red-vivid-800"],
              paddingHorizontal: 80,
              paddingVertical: 8,
              borderRadius: 35
            }}
          >
            {recordText}
          </Button>
        )}

        {state.error ? (
          <>
            <Text>{state.error}</Text>
            <Button
              onPress={tryUpload}
              icon="upload"
              labelStyle={{ color: colors["green-vivid-200"] }}
            >
              Retry Upload
            </Button>
          </>
        ) : null}
        {state.progress ? <Text>Upload progress: {state.progress}</Text> : null}
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
          Recording uploaded successfully. Now sending to your favorites
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
    justifyContent: "center"
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
