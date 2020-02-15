import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "screens";
const LoginStackNavigator = createStackNavigator();

export function LoginStack() {
  return (
    <LoginStackNavigator.Navigator>
      <LoginStackNavigator.Screen name="Login" component={LoginScreen} />
    </LoginStackNavigator.Navigator>
  );
}
