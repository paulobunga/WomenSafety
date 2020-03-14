import React, { useCallback } from "react";
import { StyleSheet, Dimensions, Linking, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useAlertMessageStore } from "packages";

interface IProps {
  coordinates: { latitude: number; longitude: number };
  setIsMapLoaded: (status: boolean) => {};
}

const openMaps = (lat: number, long: number) => {
  const scheme = Platform.select({
    ios: "maps:0,0?q=",
    android: "geo:0,0?q="
  });
  const latLng = `${lat},${long}`;
  const label = "Custom Label";
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`
  });

  Linking.openURL(url);
};

export function MapViewWithCoordinates({
  coordinates,
  setIsMapLoaded
}: IProps) {
  const sender = useAlertMessageStore(state => state.sender);

  const mapRegion = {
    ...coordinates,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05
  };

  const openMapsMemoized = useCallback(() => {
    openMaps(coordinates.latitude, coordinates.longitude);
  }, [coordinates]);

  return (
    <MapView
      region={mapRegion}
      onMapReady={() => setIsMapLoaded(true)}
      toolbarEnabled
      showsUserLocation
      style={styles.mapStyle}
      onPress={openMapsMemoized}
    >
      <Marker
        onPress={openMapsMemoized}
        coordinate={coordinates}
        title={`${sender.phone}`}
        description={`Help! ${sender.phone} is in trouble`}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: "100%"
  }
});
