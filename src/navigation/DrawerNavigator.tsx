import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AddFavorites } from "screens";

const Drawer = createDrawerNavigator();

export function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="favorites" component={AddFavorites} />
    </Drawer.Navigator>
  );
}
