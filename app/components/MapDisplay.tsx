import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView from "react-native-maps";

const Map = () => {
  return (
    <View style={styles.containre}>
      <MapView />
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  containre: {
    flex: 1,
    width: 100,
    height: 100,
  },
});
