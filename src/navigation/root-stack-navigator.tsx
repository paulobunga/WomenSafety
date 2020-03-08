import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerNavigator } from "./DrawerNavigator";
import { ReceivingScreen, AlertSplashScreen, ManageFavorites } from "screens";
const RootStack = createStackNavigator();

export function RootStackScreen() {
  return (
    <RootStack.Navigator mode="modal" headerMode="none">
      <RootStack.Screen name="Main" component={DrawerNavigator} />
      <RootStack.Screen
        name="AlertSplashScreen"
        component={AlertSplashScreen}
      />
      <RootStack.Screen name="ManageFavorites" component={ManageFavorites} />
      <RootStack.Screen name="ReceivingScreen" component={ReceivingScreen} />
    </RootStack.Navigator>
  );
}
