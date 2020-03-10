import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MyMissingChildrenRequests, MissingChildrenList } from "screens";
import { colors } from "config/colors";
import { AddFloatingButton, useTranslatedText } from "components";
const Tab = createMaterialTopTabNavigator();

export function ChildrenTabs({ navigation }) {
  const missingChildren = useTranslatedText("missingChildren");

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
