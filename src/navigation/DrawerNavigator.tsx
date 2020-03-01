import React, { useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView
} from "@react-navigation/drawer";
import { colors } from "config/colors";
import { Drawer, Text } from "react-native-paper";
import { ManageFavorites, CreateAlertScreen } from "screens";
import { Dimensions } from "react-native";
import { useTranslatedText } from "components";
import {
  useLocationsStore,
  useAudioStore,
  useReceiveStore,
  setEnableReception,
  alertMachine,
  useAlertMachineStore,
  alertMachineService
} from "packages";
import { firebaseAuth } from "config/firebase";
import { useService } from "@xstate/react";
let showingAlert = false;

const DrawerNav = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const currentActiveIndex = props.state.index;
  const translatedAlerts = useTranslatedText("alerts");
  const translatedFavorites = useTranslatedText("favorites");

  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section title="Women Safety" style={styles.appTitle}>
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
            props.navigation.navigate("manageFavorites");
          }}
        />
        <Drawer.Item
          icon="account-arrow-right-outline"
          label={"logout"}
          active={currentActiveIndex === 100}
          onPress={() => {
            firebaseAuth.signOut();
          }}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

export function DrawerNavigator({ navigation }) {
  const [alertMachineState] = useService(alertMachineService);

  // console.log("current state machine state ", alertMachineState);
  useEffect(() => {
    if (alertMachineState.matches("alert")) {
      navigation.navigate("AlertSplashScreen");
    }
    if (alertMachineState.matches("received")) {
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
      <DrawerNav.Screen name="alerts" component={CreateAlertScreen} />
      <DrawerNav.Screen name="manageFavorites" component={ManageFavorites} />
    </DrawerNav.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: colors["cool-grey-050"],
    width: Dimensions.get("window").width / 1.5
  },
  appTitle: {
    marginVertical: 10,
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
