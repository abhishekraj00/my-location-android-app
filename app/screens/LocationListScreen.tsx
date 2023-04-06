import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import useGeolocation from "../hooks/useGeolocation";
import { LocationsContext } from "../utils/userLocationContext";
import LocationList from "../components/LocationList";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export interface LocationData {
  location_name: string;
  time: string;
  latitude: number;
  longitude: number;
}

const LocationListScreen = () => {
  const location = useGeolocation();
  const { locations, setLocations } = useContext(LocationsContext);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(
    null
  );
  const navigation: NavigationProp<any, any> = useNavigation();

  const MAX_LOCATIONS = 30;

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${location?.latitude}+${location?.longitude}&key=813b9891c2474af5ac83956ff1f14fca`
        );
        const data = await response.json();
        const newLocation = {
          location_name: data.results[0].formatted,
          time: new Date().toLocaleString(),
          latitude: 3,
          longitude: 4,
        };
        setCurrentLocation(newLocation);
      } catch (error) {
        console.error(error);
      }
    };

    if (location?.longitude && locations.length < MAX_LOCATIONS) {
      fetchLocationData();
    }
  }, [location, locations]);

  useEffect(() => {
    const INTERVAL_DURATION = 60 * 1000;

    if (currentLocation) {
      const intervalId = setInterval(async () => {
        setLocations((prevLocations) => {
          if (!prevLocations) {
            return [currentLocation];
          } else if (prevLocations.length < MAX_LOCATIONS) {
            return [...prevLocations, currentLocation];
          } else {
            return prevLocations;
          }
        });

        await fetch("https://httpstat.us/200", {
          method: "POST",
          body: JSON.stringify(currentLocation),
        });
      }, INTERVAL_DURATION);

      return () => clearInterval(intervalId);
    }
  }, [currentLocation, setLocations]);

  if (!currentLocation) {
    return <Text style={styles.loadingCom}>Loading...</Text>;
  }
  const { location_name, time } = currentLocation;

  return (
    <View>
      <Text style={styles.header} testID="list-current-item">
        Welcome to the Location Tracker!
      </Text>
      <Text style={styles.label} testID="list-current-label"></Text>
      <Text style={styles.currentLocation} testID="list-current-name">
        Your current location is:{" "}
        <Text style={styles.locationName}>{location_name}</Text>
      </Text>
      <Text style={styles.currentTime} testID="list-current-time">
        As of: {time}
      </Text>
      <LocationList />
    </View>
  );
};

export default LocationListScreen;

const styles = StyleSheet.create({
  loadingCom: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  currentLocation: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  locationName: {
    fontWeight: "normal",
  },
  currentTime: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
