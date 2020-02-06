import React from "react";
import { Appbar } from "react-native-paper";

interface IProps {
  navigation: any;
  children?: any;
  title: string;
  isModal?: boolean;
}

export function AppBar({ navigation, children, title, isModal }: IProps) {
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
      {children}
    </Appbar.Header>
  );
}
