import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ChildListing } from "screens";
const RootStack = createStackNavigator();

export function ChildStack() {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="ChildListing" component={ChildListing} />
    </RootStack.Navigator>
  );
}
