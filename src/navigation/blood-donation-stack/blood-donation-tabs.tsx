import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MyBloodRequests, BloodList } from "screens";
import { colors } from "config/colors";
import { AddFloatingButton, AppBar, useTranslatedText } from "components";
const Tab = createMaterialTopTabNavigator();

export function BloodDonationTabs({ navigation }) {
  const BloodDonation = useTranslatedText("bloodDonation");

  return (
    <>
    <AppBar title={BloodDonation} navigation={navigation} />
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: colors["background"],
            fontWeight: 'bold'
          },
          activeTintColor: colors["red"],
          upperCaseLabel: false,
          activeColor: "white",
          indicatorStyle: {
            backgroundColor: "white"
          },
          labelStyle: {
            fontWeight: 'bold',
            fontSize: 13
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
