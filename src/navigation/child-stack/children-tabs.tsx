import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MyMissingChildrenRequests, MissingChildrenList } from "screens";
import { colors } from "config/colors";
import { AddFloatingButton, useTranslatedText,AppBar } from "components";
const Tab = createMaterialTopTabNavigator();

export function ChildrenTabs({ navigation }) {
  const missingChildren = useTranslatedText("missingChildren");

  return (
    <>
    <AppBar title={missingChildren} navigation={navigation} />
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: colors["background"],
          },
          activeTintColor: colors["red"],
          upperCaseLabel: false,
          activeColor: "white",
          indicatorStyle: {
            backgroundColor: "white",
            fontWeight: "bold"
          },
          labelStyle: {
            fontWeight: 'bold',
            fontSize: 13
          }
        }}
        style={{ fontWeight: "bold" }}
      >
        <Tab.Screen name={missingChildren} component={MissingChildrenList} />
        <Tab.Screen
          name="Your Requests"
          component={MyMissingChildrenRequests}
        />
      </Tab.Navigator>
      <AddFloatingButton
        onPress={() => {
          navigation.navigate("AddMissingChildren");
        }}
      ></AddFloatingButton>
    </>
  );
}
