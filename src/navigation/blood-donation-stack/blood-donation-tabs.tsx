import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MyBloodRequests, BloodList } from "screens";
import { colors } from "config/colors";
import { AddFloatingButton, HeaderBar } from "components";
const Tab = createMaterialTopTabNavigator();

export function BloodDonationTabs({ navigation }) {
  return (
    <>
    <HeaderBar title={'Blood Donation'} />
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: colors["background"]
          },
          activeTintColor: colors["red"],
          upperCaseLabel: false,
          activeColor: "white",
          indicatorStyle: {
            backgroundColor: "white"
          }
        }}
      >
        <Tab.Screen name="Blood Requests" component={BloodList} />
        <Tab.Screen name="Your Requests" component={MyBloodRequests} />
      </Tab.Navigator>
      <AddFloatingButton
        onPress={() => {
          navigation.navigate("AddBloodRequest");
        }}
      ></AddFloatingButton>
    </>
  );
}
