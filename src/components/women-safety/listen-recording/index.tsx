import React, { useState } from "react";
import { useAudioStore } from "packages";
import { Audio } from "expo-av";
import { Button } from "react-native-paper";
import { PlaybackStatus } from "expo-av/build/AV";
import { Text, ActivityIndicator, StyleSheet, View } from "react-native";
import { formatTime } from "utils";
let soundObject;

export function ListenRecording() {
  const { sender, data } = useAudioStore();
  console.log("inside audio store ", data);
  const [playbackStatus, setPlaybackStatus] = useState<PlaybackStatus>({});

  const onPlaybackStatusUpdate = (status: PlaybackStatus) => {
    setPlaybackStatus(status);
  };

  const renderPlayButton = () => {
    if (!data) {
      return null;
    }

    if (playbackStatus.isPlaying) {
      return (
        <Button icon="pause" onPress={pauseSound}>
          Pause
        </Button>
      );
    } else if (playbackStatus.isBuffering) {
      return <ActivityIndicator size="small" />;
    }

    return (
      <Button icon="play" onPress={loadAndPlaySound}>
        Play
      </Button>
    );
  };

  async function loadAndPlaySound() {
    soundObject = new Audio.Sound();

    await soundObject.loadAsync({ uri: data }, {}, false);
    await soundObject.playAsync();

    soundObject.setProgressUpdateIntervalAsync(1000);
    soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
  }

  async function pauseSound() {
    await soundObject.pauseAsync();
  }

  return (
    <>
      {/* <Text>{sender.name}</Text> */}
      <View style={styles.container}>
        {playbackStatus.positionMillis ? (
          <Text>{formatTime(playbackStatus.positionMillis / 1000)}</Text>
        ) : null}

        {playbackStatus.durationMillis ? (
          <Text>/{formatTime(playbackStatus.durationMillis / 1000)}</Text>
        ) : null}
      </View>
      {renderPlayButton()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20
  }
});
