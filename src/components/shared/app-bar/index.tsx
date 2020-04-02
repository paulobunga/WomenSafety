import React from "react";
import { Appbar } from "react-native-paper";
import theme from "config/theme";

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
    <Appbar.Header dark={false} style={{ backgroundColor: 'transparent', elevation: 0 }}>
      {
        isModal
          ? (<Appbar.Action onPress={navigation.goBack} icon="arrow-left" color={theme.colors.primary} size={32} />)
          : (<Appbar.Action onPress={openDrawer} icon="menu" color={theme.colors.primary} size={32} />)
      }
      <Appbar.Content title={title} titleStyle={{ color: theme.colors.primary, fontFamily: theme.fonts.medium.fontFamily }} />
      {
        isSelectingContacts && (<Appbar.Action icon="check" onPress={onSelectingContacts} color={theme.colors.primary} size={32} />)
      }
      {children}
    </Appbar.Header>
  );
}
