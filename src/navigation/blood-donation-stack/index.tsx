import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BloodDonationListing, AddBloodRequest } from "screens";
const RootStack = createStackNavigator();

export function BloodDonationStack() {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen
        name="BloodDonationListing"
        component={BloodDonationListing}
      />
      <RootStack.Screen name="AddBloodRequest" component={AddBloodRequest} />
    </RootStack.Navigator>
  );
}
