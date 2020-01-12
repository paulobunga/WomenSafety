import React from "react";
import { Text, TextProperties } from "react-native";
import { useTranslation } from "react-i18next";

export function TranslatedText({
  text,
  ...rest
}: {
  text: string;
  rest?: TextProperties;
}) {
  const { t } = useTranslation();
  return <Text {...rest}>{t(text)}</Text>;
}
