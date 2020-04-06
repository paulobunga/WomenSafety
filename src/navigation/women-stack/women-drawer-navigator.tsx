import React, { useEffect } from "react";
import { StyleSheet, Alert, AsyncStorage, View, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView
} from "@react-navigation/drawer";
import { colors } from "config/colors";
import { Drawer, Text, BottomNavigation } from "react-native-paper";
import { CreateAlertScreen, WatchVolunteerLocation } from "screens";
import { Dimensions } from "react-native";
import { useTranslatedText } from "components";
import { alertMachineService, logout } from "packages";
import { useService } from "@xstate/react";
import { FavoritesStack } from "./favorites-stack";
import { useTranslation } from "react-i18next";
import theme from 'config/theme';
import styled from 'styled-components';
import { LoginStack, BottomTabNavigator } from "navigation";
import { EmergencyStack } from "../emergency-stack";

const DrawerNav = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const currentActiveIndex = props.state.index;
  const translatedAlerts = useTranslatedText("alerts");
  const translatedFavorites = useTranslatedText("favorites");
  const translatedEmergency = useTranslatedText("emergency");
  const logoutText = useTranslatedText("logout");

  const { i18n } = useTranslation();

  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section>
        <View style={{ height: 140, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.lightPrimary }}>
          <Image source={require('../../screens/login-screen/assets/logo.png')} width={200} style={{ width: 160, height: 80 }} />
        </View>
        <Drawer.Item
          label={translatedAlerts}
          icon="alarm-light-outline"
          active={currentActiveIndex === 0}
          onPress={() => {
            props.navigation.navigate("alerts");
          }}
        />
        <Drawer.Item
          icon="account-heart-outline"
          label={translatedFavorites}
          active={currentActiveIndex === 1}
          onPress={() => {
            props.navigation.navigate("favorites");
          }}
        />
        <Drawer.Item
          icon="account-arrow-right-outline"
          label={logoutText}
          active={currentActiveIndex === 100}
          onPress={logout}
        />
        <Drawer.Item
          icon="account-arrow-right-outline"
          label={translatedEmergency}
          active={currentActiveIndex === 2}
          onPress={() => {
            props.navigation.navigate("emergency");
          }}
        />

        <LanguagesDivider>
          <LanguagesDividerText>Languages</LanguagesDividerText>
        </LanguagesDivider>

        <Drawer.Item
          label={"English"}
          active={i18n.language === "en"}
          onPress={() => {
            i18n.changeLanguage("en");
            AsyncStorage.setItem("defaultLang", "en");
            props.navigation.closeDrawer();
          }}
        />
        <Drawer.Item
          label={"ગુજરાતી"}
          active={i18n.language === "gu"}
          onPress={() => {
            i18n.changeLanguage("gu");
            AsyncStorage.setItem("defaultLang", "gu");
            props.navigation.closeDrawer();
          }}
        />
        <WatchVolunteerLocation />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

export function WomenDrawerNavigator({ navigation }) {
  const [alertMachineState] = useService(alertMachineService);

  useEffect(() => {
    if (alertMachineState.matches("alert")) {
      navigation.navigate("AlertSplashScreen");
    }
    if (alertMachineState.matches("received")) {
      navigation.pop();
      navigation.navigate("ReceivingScreen");
    }
    if (alertMachineState.matches("idle")) {
      navigation.navigate("Main");
    }
  }, [alertMachineState]);

  return (
    <DrawerNav.Navigator
      drawerPosition="left"
      drawerStyle={styles.drawerStyle}
      initialRouteName="alerts"
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      {/* <DrawerNav.Screen name="home" component={BottomTabNavigator} /> */}
      <DrawerNav.Screen name="alerts" component={CreateAlertScreen} />
      <DrawerNav.Screen name="favorites" component={FavoritesStack} />
      <DrawerNav.Screen name="emergency" component={EmergencyStack} />
    </DrawerNav.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: colors["background"],
    width: Dimensions.get("window").width / 1.5
  },
  appTitle: {
    fontFamily: "roboto-bold"
  }
});

const showReceiveAlert = () => {
  return new Promise((resolve: any, reject: any) => {
    Alert.alert(
      "Receiving an Alert",
      "A User is sending an emergency message.\nTap Receive to start receiving",
      [
        {
          text: "Cancel",
          onPress: reject,
          style: "cancel"
        },
        { text: "Receive", onPress: resolve }
      ],
      { cancelable: false }
    );
  });
};

const LanguagesDivider = styled.View`
  border-top-width: 1;
  border-color: ${colors["cool-grey-200"]};
  margin: 20px 10px;
  padding-top: 10px;
`

const LanguagesDividerText = styled.Text`
  color: ${colors["cool-grey-300"]};
  font-size: 14px;
`
