import React from "react";
import { AddFloatingButton } from "components";
import { Appbar } from "react-native-paper";
import { BloodList } from "./blood-list";

export function BloodDonationListing({ navigation }) {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={"Blood requests"} />
      </Appbar.Header>
      <BloodList />
      <AddFloatingButton
        onPress={() => {
          navigation.navigate("AddBloodRequest");
        }}
      ></AddFloatingButton>
    </>
  );
}
