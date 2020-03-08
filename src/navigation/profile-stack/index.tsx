import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ChildListing } from "screens";
const RootStack = createStackNavigator();

export function ProfileStack() {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen
        name="Profile"
        component={() => {
          return null;
        }}
      />
    </RootStack.Navigator>
  );
}
