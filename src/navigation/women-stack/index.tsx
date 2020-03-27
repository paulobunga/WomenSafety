import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WomenDrawerNavigator } from "./women-drawer-navigator";
import { ReceivingScreen, AlertSplashScreen, ManageFavorites } from "screens";
const RootStack = createStackNavigator();

export function WomenStack() {
  return (
    <RootStack.Navigator mode="modal" headerMode="none">
      <RootStack.Screen name="Main" component={WomenDrawerNavigator} options={{headerShown: false}}/>
      <RootStack.Screen
        name="AlertSplashScreen"
        component={AlertSplashScreen}
      />
      <RootStack.Screen name="ReceivingScreen" component={ReceivingScreen} />
    </RootStack.Navigator>
  );
}
