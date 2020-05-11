import React from "react";
import { Appbar } from "react-native-paper";
import theme from "config/theme";
import { colors } from "config/colors";
import {Text} from 'react-native';
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
    <Appbar.Header dark={false} style={{ backgroundColor: colors["background"], elevation: 0 }}>
      {
        isModal
          ? (<Appbar.Action onPress={navigation.goBack} icon="arrow-left" color={theme.colors.primary} size={32} />)
          : (<Appbar.Action onPress={openDrawer} icon="menu" color={theme.colors.primary} size={32} />)
      }
      <Appbar.Content title={<Text> {title} </Text>} titleStyle={{ color: theme.colors.primary, fontFamily: theme.fonts.medium.fontFamily }} style={{ alignItems: 'center' }} />
      {
        isSelectingContacts && (<Appbar.Action icon="check" onPress={onSelectingContacts} color={theme.colors.primary} size={32} />)
      }
      {children}
    </Appbar.Header>
  );
}
