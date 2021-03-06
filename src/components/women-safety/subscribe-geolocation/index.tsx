import React, { useState } from "react";
import { useAlertMessageStore } from "packages";
import { MapViewWithCoordinates } from "../map-view";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "config/colors";

export function SubscribeToGeolocation() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const locationStore = useAlertMessageStore(state => state.location_data);

  const coordinates = locationStore.coordinates;

  return (
    <>
      {coordinates.latitude && (
        <View style={styles.container}>
          {!isMapLoaded && (
            <ActivityIndicator
              animating={true}
              size="large"
              style={styles.container}
              color={colors["indigo-900"]}
            />
          )}
          <MapViewWithCoordinates
            setIsMapLoaded={setIsMapLoaded}
            coordinates={coordinates}
          />
        </View>
      )}
      {/* <Text>
        Location from your favorites : {locationStore.sender.name} :{" "}
        {JSON.stringify(locationStore.coordinates)}
      </Text> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "60%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
