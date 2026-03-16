import React, { useState, useEffect, useContext, useReducer, createContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const StudentContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function ContextChild() {
  const student = useContext(StudentContext);
  return (
    <Text style={styles.text}>Student: {student}</Text>
  );
}

export default function App() {

  const [count, setCount] = useState(0);

  const [state, dispatch] = useReducer(reducer, { count: 0 });

  useEffect(() => {
    console.log("Component Loaded - Abdul Basit SP24-BCS-033");
  }, []);

  return (

    <StudentContext.Provider value="Abdul Basit">

      <View style={styles.container}>

        <Text style={styles.title}>useState Example</Text>
        <Text style={styles.text}>Count: {count}</Text>
        <Button title="Increase" onPress={() => setCount(count + 1)} />

        <Text style={styles.title}>useContext Example</Text>
        <ContextChild />

        <Text style={styles.title}>useReducer Example</Text>
        <Text style={styles.text}>Reducer Count: {state.count}</Text>

        <Button title="Increment" onPress={() => dispatch({ type: 'increment' })} />
        <Button title="Decrement" onPress={() => dispatch({ type: 'decrement' })} />

      </View>

    </StudentContext.Provider>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f2f6'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20
  },

  text: {
    fontSize: 18,
    margin: 10
  }

});