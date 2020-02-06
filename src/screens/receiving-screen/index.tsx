import React from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { SubscribeToGeolocation, AppBar } from "components";
import { useState } from "react";
import { colors } from "config/colors";

export function ReceivingScreen({ navigation }) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <>
      <AppBar navigation={navigation} title="Receiving alerts" isModal />

      {!isMapLoaded && (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{
            height: "60%",
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center"
          }}
          color={colors["indigo-900"]}
        />
      )}
      <SubscribeToGeolocation setIsMapLoaded={setIsMapLoaded} />
    </>
  );
}
