import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import useLocationSlice from "./useEmployee.js";
import * as TaskManager from "expo-task-manager";
import { GeofencingEventType } from "expo-location";
import * as Location from "expo-location";
import { router } from "expo-router";
type Coordinates = {
  latitude: number;
  longitude: number;
};

   TaskManager.defineTask(
     "YOUR_TASK_NAME",
     ({ data: { eventType, region }, error }) => {
       if (error) {
         // check `error.message` for more details.
         return;
       }
       if (eventType === GeofencingEventType.Enter) {
         return 1;
         console.log("You've entered region:", region);
       } else if (eventType === GeofencingEventType.Exit) {
         console.log("You've left region:", region);
         return 2;
       }
       return 3;
     }
   );
const useDistance = () => {
  const [currentCoords, setCurrentCoords] = useState<Coordinates>({latitude:0, longitude:0});
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const employeeState = useLocationSlice((state) => state);
  const { setOfficeStatus, isInsideOffice, isCheckedIn, isLoggedIn } =
    employeeState;

  const { handleCheckInOut, handleLogout } = employeeUtil();

  const isSafeRegion = (
    targetCoords: Coordinates,
    userCoords: Coordinates,
    radius = 300
  ) => {
    const toRadians = (degree: number) => (degree * Math.PI) / 180;

    const earthRadius = 6371e3;
    const lat1 = toRadians(targetCoords.latitude);
    const lat2 = toRadians(userCoords.latitude);
    const deltaLat = toRadians(userCoords.latitude - targetCoords.latitude);
    const deltaLon = toRadians(userCoords.longitude - targetCoords.longitude);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    const result = distance <= radius;

    setOfficeStatus(result);

    return result;
  };

  const checkIfLocationEnabled = async () => {
    const enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert("Location Not Enabled", "Please enable your location", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Open Settings",
          onPress: () => Location.openSettings(),
        },
      ]);
    }
    setLocationServicesEnabled(enabled);
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Allow the app to use location services.",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Open Settings",
              onPress: () => Location.openSettings(),
            },
          ]
        );
        setIsLoading(false);
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      if (coords) {
        setCurrentCoords(coords);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to fetch location. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  const executeCheck = () => {
    console.log(currentCoords);
    if (currentCoords) {
      const res = isSafeRegion(currentCoords, currentCoords);
      console.log("Is in safe region:", res);
    } else {
      console.log("Current coordinates not available yet.");
    }
  };

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();

    const intervalId = setInterval(async () => {
      const dummyCoords = {
        latitude: 28.646349,
        longitude: 77.229981,
      };
      getCurrentLocation();
      const isSafe = isSafeRegion(dummyCoords, currentCoords);
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return {
    isCheckedIn,
    currentCoords,
    isInsideOffice,
    isLoading,
    handleCheckInOut,
    handleLogout,
  };
};

const employeeUtil = () => {
  const employeeState = useLocationSlice((state) => state);
  const { isCheckedIn, setCheckIn, isLoggedIn, setIsLoggedIn } = employeeState;

  const isAuth = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken", () => {
      router.push("/Login");
    });
  };

  const handleCheckInOut = async () => {
    if (isCheckedIn) {
      await AsyncStorage.setItem("isCheckedIn", "false");
      setCheckIn(false);
    } else {
      await AsyncStorage.setItem("isCheckedIn", "true");
      setCheckIn(true);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return {
    handleLogout,
    handleCheckInOut,
  };
};
export default useDistance;
