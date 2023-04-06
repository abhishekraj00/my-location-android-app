import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Map from "../components/MapDisplay";

const LocationMapScreen = () => {
  return (
    <View>
      <Text>Hello map Page</Text>
      <Map />
    </View>
  );
};

export default LocationMapScreen;

const styles = StyleSheet.create({});
