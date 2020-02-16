import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView
} from "@react-navigation/drawer";
import { colors } from "config/colors";
import { Drawer, Text } from "react-native-paper";
import { ManageFavorites, CreateAlertScreen } from "screens";
import { Dimensions } from "react-native";
import { useTranslatedText } from "components";
import { useLocationsStore, useAudioStore } from "packages";
import { firebaseAuth } from "config/firebase";

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
          icon="account-heart-outline"
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
  const locationStore = useLocationsStore();
  const audioStore = useAudioStore();
  useEffect(() => {
    console.log("navigating ", locationStore, audioStore);
    if (locationStore.coordinates.latitude || audioStore.data) {
      navigation.navigate("ReceivingScreen");
    }
  }, [locationStore, audioStore]);

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
