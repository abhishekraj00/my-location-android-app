import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

interface LocationHookProp {
  latitude: number;
  longitude: number;
}

const useGeolocation = () => {
  const [currentLocation, setCurrentLocation] = useState<LocationHookProp | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        const newLocation: LocationHookProp = { latitude, longitude };
        setCurrentLocation(newLocation);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return currentLocation;
};

export default useGeolocation;
