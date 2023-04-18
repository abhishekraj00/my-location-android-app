import { createContext } from "react";

export interface LocationDataProp {
  location_name: string;
  time: string;
  latitude: number;
  longitude: number;
}

interface HomeProp {
  locations: LocationDataProp[] | [];
  setLocations: React.Dispatch<React.SetStateAction<LocationDataProp[] | []>>;
}

export const LocationsContext = createContext<HomeProp>({
  locations: [],
  setLocations: () => null,
});
