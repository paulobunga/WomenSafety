import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";

export function SomethingWentWrong({ onRetry }: { onRetry: any }) {
  return (
    <View style={styles.container}>
      <Text>Something went wrong</Text>
      <Button onPress={onRetry}>Retry</Button>
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
