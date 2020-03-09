import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MyBloodRequests, BloodList } from "screens";
import { colors } from "config/colors";
import { AddFloatingButton } from "components";
const Tab = createMaterialTopTabNavigator();

export function BloodDonationTabs({ navigation }) {
  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: colors["cyan-vivid-900"]
          },
          activeTintColor: "white",
          upperCaseLabel: false,
          activeColor: "white",
          indicatorStyle: {
            backgroundColor: "white"
          }
        }}
      >
        <Tab.Screen name="Blood Requests" component={BloodList} />
        <Tab.Screen name="Your Blood Requests" component={MyBloodRequests} />
      </Tab.Navigator>
      <AddFloatingButton
        onPress={() => {
          navigation.navigate("AddBloodRequest");
        }}
      ></AddFloatingButton>
    </>
  );
}
