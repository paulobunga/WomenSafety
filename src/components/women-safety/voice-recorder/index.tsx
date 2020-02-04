import React, { useState, useRef } from "react";
import { Audio } from "expo-av";
import { Feather } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { colors } from "config/colors";
let recording;

function VoiceRecorder() {
    const [recordingStatus, setRecordingStatus] = useState<
        Audio.RecordingStatus
    >({
        canRecord: false,
        isDoneRecording: false,
        durationMillis: 0,
        isRecording: false
    });

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
            {/* {recordingStatus.isRecording ? (
                <Button icon="stop" mode="contained" onPress={onStopRecording}>
                    Stop
                </Button>
            ) : (
                <Button
                    icon="microphone-outline"
                    mode="contained"
                    onPress={onStartRecording}
                >
                    Start
                </Button>
            )} */}
            <View style={styles.buttonContainer}>
                <Button
                    mode="text"
                    icon="alert"
                    onPress={onStartRecording}
                    uppercase
                    color={colors["red-vivid-600"]}
                    labelStyle={{
                        color: colors["cyan-vivid-100"]
                    }}
                    contentStyle={{
                        paddingHorizontal: 70,
                        paddingVertical: 4,
                        borderRadius: 35
                    }}
                >
                    Help
                </Button>
            </View>
            <Text>
                Recording audio{" "}
                {Math.floor(recordingStatus.durationMillis / 1000)}
            </Text>
            {recordingStatus.isDoneRecording && (
                <Button onPress={onPlayRecordedAudio} icon="play">
                    Play Recording{" "}
                </Button>
            )}
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
