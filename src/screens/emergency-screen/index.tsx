import React from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { Card, Title } from "react-native-paper";
import {
  useTranslatedText,
  AppBar
} from "components";
import { colors } from "config/colors";

const { height, width } = Dimensions.get("window");

export function EmergencyScreen(navigation) {

  const emergencyContacts = useTranslatedText("emergencyContacts");

  return (
    <SafeAreaView style={styles.container}>
      <AppBar title={emergencyContacts} navigation={navigation} />
      <EmergencyItems />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    paddingBottom: 120,
    backgroundColor: colors["background"]
  },
  label: {
    fontWeight: "bold",
    color: colors["red"]
  },
  cardCoverContainer: {
    marginLeft: 8,
    height: 90,
    width: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function EmergencyItems() {
  return (
    <>
      <Card
        style={{
          backgroundColor: "white",
          margin: 15,
          marginBottom: 5,
          elevation: 10, width: '50%', flexDirection: 'row',
        }}
      >
        <Card.Content
          style={{
            flexDirection: "row"
          }}
        >
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Card.Cover
              source={{ uri: "/asssets/ambulance.png" }}
              style={styles.cardCoverContainer}
            />
            <Title
              style={{
                fontWeight: "bold",
                color: colors["red"],
                alignItems: 'center'
              }}
            >
              {'Ambulance'}
            </Title>
          </View>
        </Card.Content>
      </Card>
    </>
  );
}
