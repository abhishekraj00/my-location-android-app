import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LocationsContext } from "./app/utils/userLocationContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useContext, useState } from "react";
import LocationListScreen from "./app/screens/LocationListScreen";
import LocationMapScreen from "./app/screens/LocationMapScreen";

export default function App() {
  const { locations: initialLocations } = useContext(LocationsContext);
  const [locations, setLocations] = useState(initialLocations);
  const Tab = createBottomTabNavigator();

  return (
    <LocationsContext.Provider value={{ locations, setLocations }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Map") {
                iconName = "map";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home" component={LocationListScreen} />
          <Tab.Screen name="Map" component={LocationMapScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </LocationsContext.Provider>
  );
}
