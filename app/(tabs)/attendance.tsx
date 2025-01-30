import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getEmployeeAttendanceApi ,getAllAttendanceApi} from '@/services/apiHandlers'; // Adjust this import as per your project structure
import useLocationSlice from "@/hooks/useEmployee";
import { usePathname } from 'expo-router';
const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
    const path = usePathname();
   const { isCheckedIn , userId,user} = useLocationSlice(state => state);


  // Fetch attendance data when the component mounts
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        let response;

        if (path==="/Login") return
          if (user?.role === "admin") {
            // Check user role and call the appropriate API
            response = await getAllAttendanceApi();
          } else {
            response = await getEmployeeAttendanceApi(user?._id);
          }

        if (response?.status === "success") {
          setAttendanceData(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAttendance();
  }, [path]);

  const getStatus = (status) => {
return status === "checked_in" ? "checked In" : "checked out"
  }
  const renderItem = ({ item }) => {
    const time = new Date(item.time).toLocaleString(); // Format time into a readable string
    return (
      <View style={styles.attendanceItem}>
        {user?.role !== "admin" ? (
          <Text style={styles.timeText}>
            You{" "}
            <Text
              style={[
                item.status === "checked_in"
                  ? styles.statusText
                  : styles.checkoutText,
              ]}
            >
              {getStatus(item.status)}{" "}
            </Text>{" "}
            at {time}
          </Text>
        ) : (
          <Text>
            {item?.user?.username}{" "}
            <Text
              style={[
                item.status === "checked_in"
                  ? styles.statusText
                  : styles.checkoutText,
              ]}
            >
              {getStatus(item.status)}{" "}
              </Text>{" "}
              at {time}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Attendance Records </Text>
      <Text style={styles.heading}> Of 30 Days</Text>

      {attendanceData.length > 0 ? (
        <FlatList
          data={attendanceData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Text style={styles.noDataText}>No attendance data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  attendanceItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  timeText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 16,
    color: 'green', // Default color for checked_in
  },
  checkoutText: {
    fontSize: 16,
    color:'red'
  },
   userInfo: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  userInfoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  noDataText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Attendance;
