import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import {
  LocationDataProp,
  LocationsContext,
} from "./app/utils/userLocationContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import LocationListScreen from "./app/screens/LocationListScreen";
import LocationMapScreen from "./app/screens/LocationMapScreen";

type BottomTabScreenOptions = {
  route: RouteProp<Record<string, object | undefined>, string>;
  focused: boolean;
  color: string;
  size: number;
};

export default function App() {
  const [locations, setLocations] = useState<LocationDataProp[]>([]);
  const Tab = createBottomTabNavigator();

  const tabBarOptions = {
    tabBarActiveTintColor: "#fff",
    tabBarInactiveTintColor: "#ccc",
    tabBarStyle: [
      {
        display: "flex",
      },
      null,
    ],
  };

  const screenOptions = ({
    route,
    focused,
  }: BottomTabScreenOptions): BottomTabNavigationOptions => ({
    tabBarIcon: () => {
      let iconName = focused ? "ios-" : "ios-";
      switch (route.name) {
        case "Home":
          iconName += "home";
          break;
        case "Map":
          iconName += "map";
          break;
        default:
          iconName = "ios-help-circle";
      }
      return <Ionicons name={iconName} size={40} color={"black"} />;
    },
  });

  return (
    <LocationsContext.Provider value={{ locations, setLocations }}>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={tabBarOptions}
          screenOptions={screenOptions}
        >
          <Tab.Screen name="Home" component={LocationListScreen} />
          <Tab.Screen name="Map" component={LocationMapScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </LocationsContext.Provider>
  );
}
