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
  const translatedText = useTranslatedText(labelFor);
  return <Text {...rest}>{translatedText}</Text>;
}

export function useTranslatedText(text: string) {
  const { t } = useTranslation();
  return t(text);
}
