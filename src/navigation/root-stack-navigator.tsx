import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerNavigator } from "./DrawerNavigator";
import { ReceivingScreen } from "screens";
const RootStack = createStackNavigator();

export function RootStackScreen() {
  return (
    <RootStack.Navigator mode="modal" headerMode="none">
      <RootStack.Screen name="Main" component={DrawerNavigator} />
      <RootStack.Screen name="ReceivingScreen" component={ReceivingScreen} />
    </RootStack.Navigator>
  );
}