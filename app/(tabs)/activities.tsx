import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Card } from 'react-native';
import  {getEmployeeActivityApi}  from '../../services/apiHandlers' // Assuming this is your API handler

const Activities = () => {
  const [activityData, setActivityData] = useState(null);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const response = await getEmployeeActivityApi(); 
      
        if (response.success) {
          setActivityData(response.data); 
        } else {
          console.error('Failed to fetch activity data');
        }
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    };

    fetchActivityData();
  }, []);

  const renderCard = (data) => (
    <View style={styles.card} key={data._id}>
      <Text style={styles.cardTitle}>Activity on {data._id}</Text>
      <Text>Inside Time: {data.insideTime.toFixed(2)} minutes</Text>
      <Text>Outside Time: {data.outsideTime.toFixed(2)} minutes</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {activityData ? (
        activityData.map((data) => renderCard(data)) // Loop through the data array and render each card
      ) : (
        <Text>Loading...</Text> // Show loading if data is not yet fetched
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default Activities;
