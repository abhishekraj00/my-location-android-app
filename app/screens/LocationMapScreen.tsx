import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Map from "../components/MapDisplay";

const LocationMapScreen = () => {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
};

export default LocationMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
