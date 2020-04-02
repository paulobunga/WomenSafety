import React from "react";
import { Appbar } from "react-native-paper";
import theme from "config/theme";

interface IProps {
  children?: any;
  title: string;
}

export function HeaderBar({
  children,
  title,
}: IProps) {
  return (
    <Appbar.Header dark={false} style={{ backgroundColor: 'transparent', elevation: 0, paddingLeft: 100 }}>
      <Appbar.Content title={title} titleStyle={{ color: theme.colors.primary, fontFamily: theme.fonts.medium.fontFamily }} />
      {children}
    </Appbar.Header>
  );
}
