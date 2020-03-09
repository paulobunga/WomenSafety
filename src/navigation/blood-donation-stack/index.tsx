import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AddBloodRequest } from "screens";
import { BloodDonationTabs } from "./blood-donation-tabs";
const RootStack = createStackNavigator();

export function BloodDonationStack() {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen
        name="BloodDonationListing"
        component={BloodDonationTabs}
      />
      <RootStack.Screen name="AddBloodRequest" component={AddBloodRequest} />
    </RootStack.Navigator>
  );
}
