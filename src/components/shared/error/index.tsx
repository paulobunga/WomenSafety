import React from "react";
import { colors } from "config/colors";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export function ErrorText({ message }: { message: string }) {
  return <Text style={styles.textStyle}>{message}</Text>;
}

const styles = StyleSheet.create({
  textStyle: {
    color: colors["red-vivid-800"]
  }
});
