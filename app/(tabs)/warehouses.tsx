import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet,FlatList } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { getAllWarehouses, getWarehouseEmployeeStatus } from '../../services/apiHandlers'; 
import { MaterialIcons } from 'react-native-vector-icons';

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null); 
  const [employeeStatus, setEmployeeStatus] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [statusLoading, setStatusLoading] = useState(false); 
  const [open, setOpen] = useState(false); 
  const [value, setValue] = useState(null);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await getAllWarehouses();
        setWarehouses(response.data); 
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    fetchWarehouses();
  }, []);

  useEffect(() => {
    if (value) { 
      setStatusLoading(true); 

      const fetchEmployeeStatus = async () => {
        try {
          const statusResponse = await getWarehouseEmployeeStatus(value);
          setEmployeeStatus(statusResponse.data);
        } catch (error) {
          console.error("Error fetching employee status:", error);
        } finally {
          setStatusLoading(false);
        }
      };

      fetchEmployeeStatus(); 
    }
  }, [value]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Warehouse</Text>

      <DropDownPicker
        open={open}
        value={value} 
        items={warehouses.map((warehouse) => ({
          label: warehouse.name,
          value: warehouse._id,
        }))}
        placeholder="Select Warehouse"
        containerStyle={styles.dropdownContainer}
        style={styles.dropdownStyle}
        dropDownStyle={styles.dropdownList}
        setOpen={setOpen} 
        setValue={setValue} 
      />

      {statusLoading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.statusLoader} />
      ) : (
          <FlatList
          data={employeeStatus}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.statusCard}>
              <View style={styles.statusHeader}>
                <MaterialIcons name="person" size={24} color="#007bff" />
                <Text style={styles.username}>{item.username}</Text>
              </View>
              
              {/* Status section */}
              <View style={styles.statusSection}>
                <Text style={styles.statusLabel}>Status:</Text>
                <Text style={styles.status}>{item.status}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No employees found for this warehouse.</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  dropdownContainer: {
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  dropdownStyle: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 8,
  },
  statusLoader: {
    marginTop: 30,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginLeft: 12,
  },
  statusSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  statusLabel: {
    fontSize: 16,
    color: '#555',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
  },
});



export default Warehouses;
