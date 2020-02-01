import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CreateAlertScreen, ReceivedAlertsScreen } from "screens";

const Tab = createBottomTabNavigator();
export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Received" component={ReceivedAlertsScreen} />
      <Tab.Screen name="Create" component={CreateAlertScreen} />
    </Tab.Navigator>
  );
};
