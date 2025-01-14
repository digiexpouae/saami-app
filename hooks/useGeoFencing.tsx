import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { notifyApi } from "../services/apiHandlers";
import useLocationSlice from "./useEmployee";
type Regions = {
  identifier: string;
  latitude: number;
  longitude: number;
  radius: number;
}

  const requestPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Location permission not granted.");
      return false;
    }

    const backgroundStatus = await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus.status !== "granted") {
      console.error("Background location permission not granted.");
      return false;
    }
    return true;
  };

  const startGeofencing = async (regions:[Regions]) => {
    if (!(await requestPermissions())) return;
    try {
      await Location.startGeofencingAsync("GEOFENCING_TASK", regions);
    } catch (error) {
      console.error("Error starting geofencing:", error);
      throw new Error("Error starting geofencing", error);
    }
  };

export default function useGeoFencing() {
    const [regionName, setRegionName] = useState("")
     const user = useLocationSlice((state) => state.user);
     const setOfficeStatus = useLocationSlice((state) => state.setOfficeStatus);
    TaskManager.defineTask(
      "GEOFENCING_TASK",
      async ({ data: { eventType, region }, error }) => {
        if (error) {
          console.error("Geofencing task error:", error);
          return;
        }

        if (eventType === Location.GeofencingEventType.Enter) {
          //trigger api to create log event with enter
            setRegionName(`Entered ${region.identifier}`)
          alert("Entered " + region.identifier);
          setOfficeStatus(true);
          try {
          await notifyApi({
            eventName: "enter",
          });
        } catch (err) {
          console.error("Error notifying admin for entering:", err);
        }
        } else if (eventType === Location.GeofencingEventType.Exit) {

          setRegionName(`Exitted ${region.identifier}`);

          alert("Exited " + region.identifier);
          setOfficeStatus(false);
          try {
          await notifyApi({
            eventName: "exit",
          });
        } catch (err) {
          console.error("Error notifying admin for exiting:", err);
        }
        }
      }
    );


  useEffect(() => {
    const regions = [
      {
        identifier: "region1",
        latitude: 28.653779,
        longitude: 77.223430,
        radius: 50,
      },
    ];
    startGeofencing(regions);
    return async () => {
      await Location.stopGeofencingAsync("GEOFENCING_TASK");
    };
  }, []);

  return {regionName};
}


