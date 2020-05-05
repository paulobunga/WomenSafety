import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AddMissingChildren } from "screens";
import { ChildrenTabs } from "./children-tabs";
const RootStack = createStackNavigator();

export function ChildStack() {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="ChildListing" component={ChildrenTabs} />
      <RootStack.Screen 
        name="AddMissingChildren"
        component={AddMissingChildren}
      />
    </RootStack.Navigator>
  );
}
