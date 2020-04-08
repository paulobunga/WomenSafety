import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { EmergencyScreen } from "screens";

const AddedEmergencyStack = createStackNavigator();

export function EmergencyStack() {
  return (
    <AddedEmergencyStack.Navigator headerMode="none">
      <AddedEmergencyStack.Screen
        name="Main"
        component={EmergencyScreen}
      />
    </AddedEmergencyStack.Navigator>
  );
}
