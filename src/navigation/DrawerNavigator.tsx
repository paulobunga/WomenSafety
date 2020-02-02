import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView
} from "@react-navigation/drawer";
import { colors } from "config/colors";
import { Drawer } from "react-native-paper";
import { ManageFavorites, CreateAlertScreen } from "screens";

const DrawerNav = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const currentActiveIndex = props.state.index;
  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Item
        label="Alerts"
        active={currentActiveIndex === 0}
        onPress={() => {
          props.navigation.navigate("alerts");
        }}
      />
      <Drawer.Item
        label="Manage Favorites"
        active={currentActiveIndex === 1}
        onPress={() => {
          props.navigation.navigate("manageFavorites");
        }}
      />
    </DrawerContentScrollView>
  );
}

export function DrawerNavigator() {
  return (
    <DrawerNav.Navigator
      drawerPosition="left"
      drawerStyle={drawerStyle}
      initialRouteName="alerts"
      drawerContent={CustomDrawerContent}
    >
      <DrawerNav.Screen name="alerts" component={CreateAlertScreen} />
      <DrawerNav.Screen name="manageFavorites" component={ManageFavorites} />
    </DrawerNav.Navigator>
  );
}

const drawerStyle = {
  backgroundColor: colors["cool-grey-050"],
  width: 200
};
