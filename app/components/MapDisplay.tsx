import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  LocationDataProp,
  LocationsContext,
} from "../utils/userLocationContext";

const Map = () => {
  const { locations } = useContext(LocationsContext);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 28.7041,
          longitude: 77.1025,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {locations.map((location: LocationDataProp, index: number) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.location_name}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
    position: "absolute",
    top: 20,
    right: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Map;
