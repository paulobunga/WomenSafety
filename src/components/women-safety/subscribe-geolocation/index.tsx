import React, { useEffect } from "react";
import { useLocationsStore } from "packages";
import { MapViewWithCoordinates } from "../map-view";
import { Text } from "react-native";

export function SubscribeToGeolocation({ setIsMapLoaded }) {
  const locationStore = useLocationsStore();

  const coordinates = locationStore.coordinates;

  console.log("coordinates ", coordinates);
  return (
    <>
      {coordinates.latitude && (
        <MapViewWithCoordinates
          setIsMapLoaded={setIsMapLoaded}
          coordinates={coordinates}
        />
      )}
      {/* <Text>
        Location from your favorites : {locationStore.sender.name} :{" "}
        {JSON.stringify(locationStore.coordinates)}
      </Text> */}
    </>
  );
}
