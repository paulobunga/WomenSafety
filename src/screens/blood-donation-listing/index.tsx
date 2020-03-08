import React from "react";
import { AddFloatingButton, useTranslatedText } from "components";
import { Appbar } from "react-native-paper";
import { BloodList } from "./blood-list";

export function BloodDonationListing({ navigation }) {
  const bloodRequests = useTranslatedText("bloodRequests");

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={bloodRequests} />
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
