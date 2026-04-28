// screens/InsertRecord.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StatusBar, Alert
} from 'react-native';
import { ref, push, set } from "firebase/database";
import { db } from "../firebaseConfig";
import { COLORS } from '../theme';

export default function InsertRecord({ navigation }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInsert = async () => {
    if (!title || !priority || !description) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      // Reference to 'tasks' node
      const tasksRef = ref(db, 'tasks');
      const newTaskRef = push(tasksRef);

      console.log("Attempting to insert into 'tasks' node...");
      await set(newTaskRef, {
        id: newTaskRef.key, 
        title: title,
        priority: priority,
        description: description,
        createdAt: new Date().toISOString()
      });

      console.log("SUCCESS: Data inserted with key:", newTaskRef.key);
      Alert.alert("Success", "Record inserted successfully!");
      setTitle('');
      setDescription('');
      navigation.navigate('ViewRecords');
    } catch (error) {
      console.error("Insertion Error:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-bg p-4">
      <StatusBar barStyle="dark-content" />
      <Text className="text-2xl font-black text-text mb-6">Insert New Record</Text>

      <Text className="text-[12px] font-bold text-text mb-1">Task Title</Text>
      <TextInput
        className="border-[1.5px] border-border rounded-xl p-3 text-[14px] text-text bg-card mb-4"
        placeholder="e.g. Math Assignment"
        value={title}
        onChangeText={setTitle}
      />

      <Text className="text-[12px] font-bold text-text mb-1">Priority</Text>
      <View className="flex-row gap-2 mb-4">
        {['Low', 'Medium', 'High'].map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => setPriority(p)}
            className={`px-4 py-2 rounded-lg border ${priority === p ? 'bg-primary border-primary' : 'bg-card border-border'}`}
          >
            <Text className={`text-[12px] font-bold ${priority === p ? 'text-white' : 'text-text'}`}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-[12px] font-bold text-text mb-1">Description</Text>
      <TextInput
        className="border-[1.5px] border-border rounded-xl p-3 text-[14px] text-text bg-card mb-6 h-24"
        placeholder="Enter details..."
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity
        onPress={handleInsert}
        disabled={loading}
        className="bg-primary rounded-xl py-4 items-center"
      >
        <Text className="text-white font-extrabold text-[16px]">
          {loading ? 'Inserting...' : 'Insert Record'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
