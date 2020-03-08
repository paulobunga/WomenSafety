import React from "react";
import { BloodDonationStack } from "./blood-donation-stack";
import { ChildStack } from "./child-stack";
import { ProfileStack } from "./profile-stack";
import { WomenStack } from "./women-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { colors } from "config/colors";

const Tab = createMaterialBottomTabNavigator();
export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Women"
      activeColor="white"
      barStyle={{ backgroundColor: colors["cyan-vivid-800"] }}
      labeled={false}
    >
      <Tab.Screen
        name="Women"
        component={WomenStack}
        options={{
          tabBarLabel: "Women",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="human-female"
              color={color}
              size={25}
            />
          )
        }}
      />
      <Tab.Screen
        name="Blood"
        component={BloodDonationStack}
        options={{
          tabBarLabel: "Blood",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="water" color={color} size={25} />
          )
        }}
      />
      <Tab.Screen
        name="Child"
        component={ChildStack}
        options={{
          tabBarLabel: "Child",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-child"
              color={color}
              size={25}
            />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={25} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
