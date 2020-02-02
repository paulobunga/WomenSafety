import React from "react";
import { Appbar } from "react-native-paper";

interface IProps {
  navigation: any;
  children?: any;
  title: string;
}

export function AppBar({ navigation, children, title }: IProps) {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <Appbar.Header>
      <Appbar.Action onPress={openDrawer} icon="menu" />
      <Appbar.Content title={title} />
      {children}
    </Appbar.Header>
  );
}
