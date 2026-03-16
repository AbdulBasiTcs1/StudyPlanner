import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function Student(props) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Name: {props.name}</Text>
      <Text style={styles.text}>ID: {props.id}</Text>
      <Text style={styles.text}>Department: {props.department}</Text>
    </View>
  );
}

export default function App() {

  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Props Example</Text>

      <Student
        name="Abdul Basit"
        id="SP24-BCS-033"
        department="Computer Science"
      />

      <Text style={styles.title}>State Example</Text>

      <Text style={styles.counter}>Counter: {count}</Text>

      <Button
        title="Increase Counter"
        onPress={() => setCount(count + 1)}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20
  },

  counter: {
    fontSize: 20,
    margin: 15,
    color: 'green'
  },

  card: {
    padding: 20,
    backgroundColor: '#dfe6e9',
    borderRadius: 12,
    marginTop: 10,
    width: 250,
    alignItems: 'center'
  },

  text: {
    fontSize: 16
  }

});