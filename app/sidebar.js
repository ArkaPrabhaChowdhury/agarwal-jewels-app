// Sidebar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Sidebar = ({ navigation }) => {
  return (
    <View style={styles.sidebar}>
      {['Home', 'Wallet', 'History', 'Notifications', 'Profile'].map((route, index) => (
        <TouchableOpacity key={index} onPress={() => navigation.navigate(route)}>
          <Text style={styles.link}>{route}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 250,
    backgroundColor: '#fff',
    padding: 20,
  },
  link: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default Sidebar;
