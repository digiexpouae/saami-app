import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { getUserByToken, notifyApi } from "../services/apiHandlers";
import useLocationSlice from "./useEmployee";
import { Platform } from "react-native";

type Regions = {
  identifier: string;
  latitude: number;
  longitude: number;
  radius: number;
};
type Status = "inside" | "outside";
const LOCATION_TASK_NAME = "GEOFENCING_TASK";

let status = "inside";

const requestPermissions = async () => {
  try {
    const foregroundPermission =
      await Location.requestForegroundPermissionsAsync();

    if (foregroundPermission.status !== "granted") {
      console.error("Foreground location permission not granted.");
      return false;
    }

    if (Platform.OS === "ios") {
      const { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Background location permission not granted");
        return false;
      }
    } else {
      const backgroundPermission =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundPermission.status !== "granted") {
        console.error("Background location permission not granted.");
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Error requesting permissions:", error);
    return false;
  }
};

const startGeofencing = async (regions: Regions[]) => {
  if (!(await requestPermissions())) {
    console.log("Permissions not granted. Geofencing cannot start.");
    return;
  }
  try {
    await Location.startGeofencingAsync(LOCATION_TASK_NAME, regions);
    console.log("Geofencing started successfully.");
  } catch (error) {
    console.error("Error starting geofencing:", error);
  }
};

const stopGeofencing = async () => {
  try {
    await Location.stopGeofencingAsync(LOCATION_TASK_NAME);
    console.log("Geofencing stopped successfully.");
  } catch (error) {
    console.error("Error stopping geofencing:", error);
  }
};


export default function useGeoFencing() {
  const user = useLocationSlice((state) => state.user);
  const [isUserInside, setIsUserInside] = useState("outside");
  const [isGeofencingActive, setIsGeofencingActive] = useState(false);
  const state = useLocationSlice((state) => state);

  useEffect(() => {
    TaskManager.defineTask(
      LOCATION_TASK_NAME,
      async ({ data: { eventType, region }, error }) => {
        if (error) {
          console.error("Geofencing task error:", error);
          return;
        }

        console.log("Event type ", eventType);

        try {
          if (eventType === Location.GeofencingEventType.Enter) {
            setIsUserInside("inside");
            console.log("User entered region:", region.identifier);
            await notifyApi({ eventName: "enter" });
          } else if (eventType === Location.GeofencingEventType.Exit) {
            setIsUserInside("outside");
            console.log("User exited region:", region.identifier);
            await notifyApi({ eventName: "exit" });
          }
        } catch (apiError) {
          console.error("Error notifying API:", apiError);
        }
      }
    );
    let isMounted = true;

    const setupGeofencing = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }

        if (!user?.assignedWarehouse?.location) {
          const userResponse = await getUserByToken();
          if (userResponse?.data) {
            const userObj = { _id: userResponse.id, ...userResponse };
            state.setUser(userObj);
          }
          const regions: Regions[] = [
            {
              identifier: "warehouseRegion",
              latitude: userResponse?.assignedWarehouse.location.latitude,
              longitude: userResponse?.assignedWarehouse.location.longitude,
              radius: 100,
            },
          ];

          await startGeofencing(regions);
          return;
        }

        if (isMounted) {
          setIsGeofencingActive(true);
        }
      } catch (error) {
        console.error("Error in setup:", error);
      }
    };

    setupGeofencing();

    return () => {
      isMounted = false;
      if (isGeofencingActive) {
        // stopGeofencing();
        setIsGeofencingActive(false);
      }
    };
  }, [user,isUserInside]);



  return { isUserInside };
}



/*


const LOCATION_TASK = "location_task";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [error, setError] = useState<string>();
  const registerExecutor = useCallback(() => {
    TaskManager.defineTask(
      LOCATION_TASK,
      async ({
        data: { locations },
        error,
      }: TaskManager.TaskManagerTaskBody<any>) => {
        console.log("task update", locations);
        const [location] = locations;
        console.log("location", location);
      }
    );
  }, []);

  const handleStartLocationUpdate = useCallback(async () => {
    const response = await Location.requestPermissionsAsync();
    if (!response.granted) {
      return setError("Permission not granted");
    }
    setError("Permission Granted");
    registerExecutor();
    Location.startLocationUpdatesAsync(LOCATION_TASK, {
      foregroundService: {
        notificationBody: "Location Service",
        notificationTitle: "Driver App",
        notificationColor: "blue",
      },
      activityType: ActivityType.AutomotiveNavigation,
      distanceInterval: 1,
      deferredUpdatesInterval: 1000, // 1s
      pausesUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: true,
    });

    Location.hasStartedLocationUpdatesAsync(LOCATION_TASK).then((value) => {
      console.log("hasStartedLocationUpdatesAsync", value);
    });
  }, []);

  const handleStopLocationUpdate = useCallback(() => {
    Location.stopLocationUpdatesAsync(LOCATION_TASK);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location</Text>
      <Text>Error: {error}</Text>
      <Button
        onPress={handleStartLocationUpdate}
        title="Start Location Update"
      />
      <Button onPress={handleStopLocationUpdate} title="Stop Location Update" />
    </View>
  );
}
*/