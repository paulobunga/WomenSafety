import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AddedFavoritesScreen, ManageFavorites } from "screens";

const AddedFavoritesStack = createStackNavigator();

export function FavoritesStack() {
  return (
    <AddedFavoritesStack.Navigator headerMode="none">
      <AddedFavoritesStack.Screen
        name="Main"
        component={AddedFavoritesScreen}
      />
      <AddedFavoritesStack.Screen
        name="ManageFavorites"
        component={ManageFavorites}
      />
    </AddedFavoritesStack.Navigator>
  );
}
