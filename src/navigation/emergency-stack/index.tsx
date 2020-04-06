import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { EmergencyScreen, ManageFavorites } from "screens";

const AddedFavoritesStack = createStackNavigator();

export function EmergencyStack() {
  return (
    <AddedFavoritesStack.Navigator headerMode="none">
      <AddedFavoritesStack.Screen
        name="Main"
        component={EmergencyScreen}
      />
    </AddedFavoritesStack.Navigator>
  );
}
