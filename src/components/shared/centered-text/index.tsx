import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export function CenteredText({ children }) {
  return (
    <View style={styles.container}>
      <Text>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
