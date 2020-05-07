import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MyBloodRequests, BloodList } from "screens";
import { colors } from "config/colors";
import { AddFloatingButton, AppBar, useTranslatedText } from "components";
const Tab = createMaterialTopTabNavigator();

export function BloodDonationTabs({ navigation }) {
  const bloodDonation = useTranslatedText("bloodDonation");
  const yourRequests = useTranslatedText("yourRequests");
  const bloodRequests = useTranslatedText("bloodRequests");

  return (
    <>
    <AppBar title={bloodDonation} navigation={navigation} />
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
        <Tab.Screen name={bloodRequests} component={BloodList} />
        <Tab.Screen name={yourRequests} component={MyBloodRequests} />
      </Tab.Navigator>
      <AddFloatingButton
        onPress={() => {
          navigation.navigate("AddBloodRequest");
        }}
      ></AddFloatingButton>
    </>
  );
}
