import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HistoryCard = ({ grams, amount, rate, date }) => {
  return (
    
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Grams:</Text>
          <Text style={styles.value}>{grams}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>{amount}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Rate:</Text>
          <Text style={styles.value}>{rate}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{date}</Text>
        </View>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  column: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  value: {
    marginBottom: 2,
  },
});

export default HistoryCard;