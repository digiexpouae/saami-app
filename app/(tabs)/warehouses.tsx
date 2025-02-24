import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
  getAllWarehouses,
  getWarehouseEmployeeStatus,
} from "../../services/apiHandlers";
import { MaterialIcons } from "react-native-vector-icons";

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
        placeholder='Select Warehouse'
        containerStyle={styles.dropdownContainer}
        style={styles.dropdownStyle}
        dropDownContainerStyle={styles.dropdownList}
        setOpen={setOpen}
        setValue={setValue}
        zIndex={3000}
        zIndexInverse={1000}
      />

      {statusLoading ? (
        <ActivityIndicator
          size='large'
          color='#007bff'
          style={styles.statusLoader}
        />
      ) : (
        <FlatList
          data={employeeStatus}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.statusCard}>
              <View style={styles.statusHeader}>
                <MaterialIcons name='person' size={24} color='#007bff' />
                <Text style={styles.username}>{item.username}</Text>
              </View>

              {/* Status section */}
              <View style={styles.statusSection}>
                <Text style={styles.statusLabel}>Status:</Text>
                <Text style={styles.status}>
                  {item.isCheckedIn ? "Clocked In" : "Clocked Out"}
                </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No employees found for this warehouse.
              </Text>
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
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  dropdownContainer: {
    width: "100%", // Ensure it spans full width
    marginBottom: 20,
    zIndex: 3000, // Ensures it appears above other UI elements
  },
  dropdownStyle: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
  },
  dropDownContainerStyle: {
    borderColor: "#ddd",
    borderRadius: 8,
    zIndex: 2000, // Ensure dropdown is above other elements
  },
  statusLoader: {
    marginTop: 30,
  },
  statusCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 18,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    flexDirection: "column", // Ensures elements are stacked properly
  },
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
    marginLeft: 12,
  },
  statusSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Ensure text aligns properly
    marginTop: 10,
  },
  statusLabel: {
    fontSize: 16,
    color: "#555",
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    padding: 10, // Ensure no text overlap
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
    textAlign: "center", // Centers the text properly
  },
});

export default Warehouses;
