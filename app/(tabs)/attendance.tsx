import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getEmployeeAttendanceApi } from '@/services/apiHandlers'; // Adjust this import as per your project structure
import useLocationSlice from "@/hooks/useEmployee";
const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
   const { isCheckedIn } = useLocationSlice(state => state);
  // Fetch attendance data when the component mounts
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await getEmployeeAttendanceApi();
        if (response.status === 'success') {
          setAttendanceData(response.data); // Set the retrieved data
        } else {
          console.error('Error fetching data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAttendance();
  }, [isCheckedIn]);

  const renderItem = ({ item }) => {
    const time = new Date(item.time).toLocaleString(); // Format time into a readable string

    return (
      <View style={styles.attendanceItem}>
        <Text style={styles.timeText}>Time: {time}</Text>
        <Text style={styles.statusText}>
          Status: {item.status === 'checked_in' ? 'Checked In' : 'Checked Out'}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Attendance Records</Text>

      {attendanceData.length > 0 ? (
        <FlatList
          data={attendanceData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id} // Ensure each item has a unique key
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
  noDataText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Attendance;
