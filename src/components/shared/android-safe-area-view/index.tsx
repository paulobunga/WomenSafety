import React from "react";
import { StyleSheet, Platform, StatusBar, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";

export const AndroidSafeAreaView = props => {
  if (Platform.OS === "android") {
    return <View style={styles.AndroidSafeArea}>{props.children}</View>;
  }
  return <SafeAreaView style={{ flex: 1 }}>{props.children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  }
});
