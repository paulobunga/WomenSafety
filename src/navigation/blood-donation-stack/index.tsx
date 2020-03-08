import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BloodDonationListing } from "screens";
const RootStack = createStackNavigator();

export function BloodDonationStack() {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen
        name="BloodDonationListing"
        component={BloodDonationListing}
      />
    </RootStack.Navigator>
  );
}
