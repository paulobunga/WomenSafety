import React from "react";
import { Appbar } from "react-native-paper";
import { colors } from "config/colors";
import { StyleSheet } from "react-native";

interface IProps {
  navigation: any;
  children?: any;
  title: string;
  isModal?: boolean;
  isSelectingContacts?: boolean;
  onSelectingContacts?: () => void;
}

export function AppBar({
  navigation,
  children,
  title,
  isModal,
  isSelectingContacts,
  onSelectingContacts
}: IProps) {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <Appbar.Header style={styles.container}>
      {isModal ? (
        <Appbar.Action onPress={navigation.goBack} icon="arrow-left" />
      ) : (
        <Appbar.Action onPress={openDrawer} icon="menu" />
      )}
      <Appbar.Content title={title} />
      {isSelectingContacts && (
        <Appbar.Action icon="check" onPress={onSelectingContacts} />
      )}
      {children}
    </Appbar.Header>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors["background"],
    color: colors["red"]
  },
  title: {
    color: colors["red"]
  }
});
