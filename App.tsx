import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Provider as PaperProvider,
  ActivityIndicator,
  Colors
} from "react-native-paper";
import { VoiceRecorder } from "./src/components";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <VoiceRecorder />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
