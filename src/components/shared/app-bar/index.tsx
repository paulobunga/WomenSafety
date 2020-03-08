import React from "react";
import { Appbar } from "react-native-paper";
import { colors } from "config/colors";

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
    <Appbar.Header>
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
