import React from "react";
import { TextProperties } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

export function TranslatedText({
  labelFor,
  ...rest
}: {
  labelFor: string;
  rest?: TextProperties;
}) {
  const { t } = useTranslation();
  return <Text {...rest}>{t(labelFor)}</Text>;
}
