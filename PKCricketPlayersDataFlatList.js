import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function App() {

  const players = [
    { id: '1', name: 'Babar Azam', role: 'Batsman' },
    { id: '2', name: 'Shaheen Afridi', role: 'Fast Bowler' },
    { id: '3', name: 'Mohammad Rizwan', role: 'Wicket Keeper' },
    { id: '4', name: 'Shadab Khan', role: 'All Rounder' },
    { id: '5', name: 'Fakhar Zaman', role: 'Opening Batsman' },
    { id: '6', name: 'Haris Rauf', role: 'Fast Bowler' },
    { id: '7', name: 'Imam Ul Haq', role: 'Batsman' },
    { id: '8', name: 'Naseem Shah', role: 'Fast Bowler' },
    { id: '9', name: 'Iftikhar Ahmed', role: 'All Rounder' },
    { id: '10', name: 'Abdullah Shafique', role: 'Batsman' }
  ];

  return (

    <View style={styles.container}>

      <Text style={styles.title}>Pakistan Cricket Team Players</Text>

      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.role}>{item.role}</Text>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#ecf0f1'
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },

  card: {
    backgroundColor: '#dff9fb',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  role: {
    fontSize: 14,
    color: 'gray'
  }

});