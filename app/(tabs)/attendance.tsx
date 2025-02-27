import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
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
        if (path === "/Login" || path ==="login" || path ==="Login") return;


        response = await getAllAttendanceApi();
        setAttendanceData(response);


      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAttendance();
  }, [path]);

  const getStatus = (status) => {
return status === "checked_in" ? "checked In" : "checked out"
  }

  const returnISTtime = (oldTime:Date) => {

    const time = new Date(oldTime).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    return time
}


  const renderItem = ({ item }) => {

    const { user, date} = item

    const time = returnISTtime(date)

    return (
      <View style={styles.attendanceItem}>
        <View style={styles.flexbox}>

        <Text>{ user.username.toUpperCase()} </Text>
          <Text style={styles.timeText}>{time.substring(0,9)}</Text>
        </View>
        {
          Array.isArray(item.sessions) && item.sessions.length &&


          <FlatList
            data={item.sessions}
            keyExtractor={(item) => item._id}
          renderItem={({ item }) => {

              const { checkInTime, checkOutTime } = item;
            return (
              <View>
                <View style={styles.flexbox}>
                  <Text>Checkin At:</Text>
                  <Text>{returnISTtime(checkInTime)}</Text>
                </View>
                <View style={styles.flexbox}>
                  <Text>CheckOut At:</Text>
                  <Text>{checkOutTime &&   returnISTtime(checkOutTime)}</Text>
                </View>
              </View>
            );
          }} />
        }
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Button
        title='Refresh'
        color={"#18364a"}
        onPress={() => {
          getAllAttendanceApi();
        }}
      ></Button>
      <Text style={styles.heading}>Attendance Records </Text>
      <Text style={styles.heading}> Of All Employees</Text>

      {Array.isArray(attendanceData) && attendanceData?.length > 0 ? (
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
    color: 'green',
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
    display: 'flex',
    justifyContent:'space-between',
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  flexbox: {
    flexDirection:'row',
    display: 'flex',
    justifyContent: 'space-between',
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
