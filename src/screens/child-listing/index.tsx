import React from "react";
import { AddFloatingButton, useTranslatedText } from "components";
import { Appbar } from "react-native-paper";
import { MissingChildrenList } from "../missing-children-list";

export function ChildListing({ navigation }) {
  const missingChildren = useTranslatedText("missingChildren");

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={missingChildren} />
      </Appbar.Header>
      <MissingChildrenList />
      <AddFloatingButton
        onPress={() => {
          navigation.navigate("AddMissingChildren");
        }}
      ></AddFloatingButton>
    </>
  );
}
