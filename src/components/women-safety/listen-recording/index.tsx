import React, { useEffect, useState } from "react";
import { useAudioStore } from "packages";
import { Audio } from "expo-av";
import { Button } from "react-native-paper";
import { PlaybackStatus } from "expo-av/build/AV";
import { Text, ActivityIndicator } from "react-native";
import { formatTime } from "utils";
let soundObject;

export function ListenRecording() {
  const { sender, data } = useAudioStore();
  const [playbackStatus, setPlaybackStatus] = useState<PlaybackStatus>({});

  const onPlaybackStatusUpdate = (status: PlaybackStatus) => {
    setPlaybackStatus(status);
  };

  const renderPlayButton = () => {
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
      <Text>{sender.name}</Text>
      {playbackStatus.positionMillis ? (
        <Text>{formatTime(playbackStatus.positionMillis / 1000)}</Text>
      ) : null}

      {playbackStatus.durationMillis ? (
        <Text>/{formatTime(playbackStatus.durationMillis / 1000)}</Text>
      ) : null}

      {renderPlayButton()}
    </>
  );
}
