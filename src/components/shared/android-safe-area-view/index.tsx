import React from "react";
import {
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  View
} from "react-native";

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
