import React, { useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LocationsContext } from "../utils/userLocationContext";

const LocationList = () => {
  const { locations, setLocations } = useContext(LocationsContext);

  const handleDelete = (index: number): void => {
    if (locations) {
      const updatedLocations = locations.filter((_, i) => i !== index);
      setLocations(updatedLocations);
    }
  };

  const deleteAllLocations = () => {
    setLocations([]);
  };

  return (
    <>
      <Text style={styles.heading}>Prev Location</Text>
      <TouchableOpacity
        style={styles.clearButton}
        onPress={deleteAllLocations}
        testID={`list-clear-all-button`}
      >
        <Text style={styles.clearButtonText}>Clear Previous Location</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <ScrollView>
          {locations &&
            locations.map(({ location_name, time }, i) => {
              return (
                <View
                  style={styles.listItem}
                  key={`${location_name}-${time + Math.random() * 1000}`}
                >
                  <Text style={styles.itemNumber}>{i + 1}</Text>
                  <View style={styles.locationBox}>
                    <Text
                      testID={`List-previous-name-${i}`}
                      style={styles.locationName}
                    >
                      {location_name}
                    </Text>
                    <Text
                      testID={`list-previous-time-${i}`}
                      style={styles.locationTime}
                    >
                      {time}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleDelete(i)}
                    testID={`list-previous-remove-${i}`}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    height: "50%",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 32,
    marginLeft: 16,
    color: "#333",
  },
  clearButton: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  itemNumber: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 16,
    color: "#333",
  },
  locationBox: {
    flex: 1,
    marginLeft: 16,
  },
  locationName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  locationTime: {
    fontSize: 14,
    color: "#666",
  },
  removeButton: {
    backgroundColor: "black",
    padding: 8,
    borderRadius: 4,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LocationList;
