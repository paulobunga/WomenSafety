import React from "react";
import { AddFloatingButton } from "components";
import { Appbar } from "react-native-paper";

export function ChildListing({ navigation }) {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={"Missing Children"} />
      </Appbar.Header>
      <AddFloatingButton onPress={() => {}}></AddFloatingButton>
    </>
  );
}
