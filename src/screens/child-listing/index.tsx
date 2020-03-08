import React from "react";
import { AddFloatingButton } from "components";
import { Appbar } from "react-native-paper";
import { MissingChildrenList } from "../missing-children-list";

export function ChildListing({ navigation }) {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={"Missing Children"} />
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
