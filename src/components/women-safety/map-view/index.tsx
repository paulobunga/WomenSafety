import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Dimensions, View, Linking, Platform } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { watchPositionAsync, getPositionAsync } from "utils";

interface IProps {
  coordinates: { latitude: number; longitude: number };
}

const openMaps = (lat: number, long: number) => {
  const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  const latLng = `${lat},${long}`;
  const label = "Custom Label";
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`
  });

  Linking.openURL(url);
};

export function MapViewWithCoordinates({ coordinates }: IProps) {
  const mapRegion = {
    ...coordinates,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05
  };

  const openMapsMemoized = useCallback(() => {
    openMaps(coordinates.latitude, coordinates.longitude);
  }, [coordinates]);

  return (
    <View style={styles.container}>
      <MapView
        region={mapRegion}
        toolbarEnabled
        showsUserLocation
        style={styles.mapStyle}
      >
        <Marker
          onPress={openMapsMemoized}
          coordinate={coordinates}
          title="emergency contact"
          description="hello world"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: 200
  }
});
