import React, { useState, useRef } from "react";
import { Audio } from "expo-av";
import { Feather } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { colors } from "config/colors";
import { formatTime } from "utils";
let recording;

function VoiceRecorder() {
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
    recording = new Audio.Recording();

    const permissionStatus = await Audio.requestPermissionsAsync();

    if (permissionStatus.granted) {
      try {
        await recording.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY
        );
        await recording.startAsync();
        recording.setOnRecordingStatusUpdate(onRecordingStatusUpdate);
        recording.setProgressUpdateInterval(1000);
      } catch (error) {}
    }
  };

  const onStopRecording = async () => {
    await recording.stopAndUnloadAsync();
    const fileURI = recording.getURI();
    console.log("file uri ", fileURI);
  };

  const onPlayRecordedAudio = async () => {
    const soundObject = new Audio.Sound();

    await soundObject.loadAsync({ uri: recording.getURI() });
    await soundObject.playAsync();
  };

  return (
    <>
      <View style={styles.buttonContainer}>
        {recordingStatus.isRecording ? (
          <Button
            mode="text"
            icon="send"
            onPress={onStopRecording}
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
            Send
          </Button>
        ) : (
          <Button
            mode="text"
            icon="phone"
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
            Record
          </Button>
        )}

        {recordingStatus.isRecording ? (
          <>
            <Text style={{ marginTop: 10 }}>
              {formatTime(Math.floor(recordingStatus.durationMillis / 1000))}
            </Text>
            <Button onPress={onStopRecording} icon="cancel">
              Cancel
            </Button>
          </>
        ) : null}
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
