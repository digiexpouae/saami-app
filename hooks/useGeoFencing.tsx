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
      console.log("Geofencing started.");
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
          console.log("User entered region:", region.identifier);
          //trigger api to create log event with enter
            setRegionName(`Entered ${region.identifier}`)
          alert("Entered " + region.identifier);
          setOfficeStatus(true);
          try {
          await notifyApi({
            employeeId: user.id,  
            eventName: "enter",  
          });
          console.log("Notified admin for entering:", region.identifier);
        } catch (err) {
          console.error("Error notifying admin for entering:", err);
        }
        } else if (eventType === Location.GeofencingEventType.Exit) {

          console.log("User exited region:", region.identifier);
          setRegionName(`Exitted ${region.identifier}`);

          alert("Exited " + region.identifier);
          setOfficeStatus(false);
          try {
          await notifyApi({
            employeeId: user.id,  
            eventName: "exit",  
          });
          console.log("Notified admin for exiting:", region.identifier);
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
        latitude: 128.653779,
        longitude: 277.223430,
        radius: 500,
      },
    ];
    startGeofencing(regions);
    return async () => {
      await Location.stopGeofencingAsync("GEOFENCING_TASK");
    };
  }, []);

  return {regionName};
}


