import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import { useEffect, useState } from "react";

// Define the background fetch task ID
const BACKGROUND_FETCH_TASK = "BACKGROUND_FETCH_TASK";

// TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
//   const now = Date.now();

//   try {
//     // Request background location permissions
//     const { status } = await Location.requestBackgroundPermissionsAsync();
//     console.log(status, 'im inside taskmanger');


//     // Successful result
//     return BackgroundFetch.BackgroundFetchResult.NewData;
//   } catch (error) {
//     console.error("Error during background fetch task:", error);
//     return BackgroundFetch.BackgroundFetchResult.Failed; // Return Failed on error
//   }
// });

// // Start background fetch
// const startBackgroundFetch = async () => {
//   try {
//     await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
//       minimumInterval: 1, // 15 minutes in seconds
//     });
//     console.log("Background fetch task registered successfully");
//   } catch (error) {
//     console.error("Failed to register background fetch task:", error);
//   }
// };

// Stop background fetch
const stopBackgroundFetch = async () => {
  try {
    await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  } catch (error) {
    console.error("Failed to unregister background fetch task:", error);
  }
};

// Check-in function
const handleCheckin = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.warn("Location permission not granted");
      return;
    }

      const location = await Location.getCurrentPositionAsync({});
      console.log(location.coords)


    // Perform geofencing logic on the server-side
  } catch (error) {
    console.error("Check-in error:", error);
  }
};

const useLocationTracker = () => {
    const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState(null);
    // const checkStatusAsync = async () => {
    //   const status = await BackgroundFetch.getStatusAsync();
    //   const isRegistered = await TaskManager.isTaskRegisteredAsync(
    //     BACKGROUND_FETCH_TASK
    //   );
    //   setStatus(status);
    //   setIsRegistered(isRegistered);
    // };

    // // Example usage
    // // Start background fetch on app startup
    // useEffect(() => {
    //   startBackgroundFetch();
    //     checkStatusAsync();
    // }, []);

    return  { handleCheckin}
}

export default useLocationTracker
