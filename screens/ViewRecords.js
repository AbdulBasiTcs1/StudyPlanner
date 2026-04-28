// screens/ViewRecords.js
import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, ActivityIndicator,
  StatusBar, TouchableOpacity
} from 'react-native';
import { ref, onValue } from "firebase/database";
import { db } from "../firebaseConfig";
import { COLORS } from '../theme';

export default function ViewRecords({ navigation }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const recordsRef = ref(db, 'tasks');
    
    // Using onValue() for real-time updates as per Lab requirement
    const unsubscribe = onValue(recordsRef, (snapshot) => {
      try {
        setLoading(true);
        const data = snapshot.val();
        console.log("Data from Firebase tasks node:", data);
        
        if (data) {
          // Convert object to array
          const list = Object.keys(data).map(key => ({
            ...(typeof data[key] === 'object' ? data[key] : { title: data[key] }),
            firebaseKey: key
          }));
          setRecords(list);
        } else {
          console.log("No data found at 'tasks' node.");
          setRecords([]);
        }
        setError(null);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to fetch records.");
      } finally {
        setLoading(false);
      }
    }, (err) => {
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View className="bg-card p-4 mb-3 rounded-xl border border-border shadow-sm">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-[14px] font-black text-text flex-1" numberOfLines={1}>
          {item.title}
        </Text>
        <View className={`px-2 py-1 rounded-md ${
          item.priority === 'High' ? 'bg-red/10' : 
          item.priority === 'Medium' ? 'bg-amber/10' : 'bg-green/10'
        }`}>
          <Text className={`text-[10px] font-bold ${
            item.priority === 'High' ? 'text-red' : 
            item.priority === 'Medium' ? 'text-amber' : 'text-green'
          }`}>
            {item.priority}
          </Text>
        </View>
      </View>
      
      <Text className="text-[12px] text-muted mb-2 leading-4">
        {item.description}
      </Text>
      
      <Text className="text-[10px] text-primary/60 font-mono">
        ID: {item.id}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 bg-bg items-center justify-center">
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text className="mt-4 text-muted font-bold">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-bg px-4 pt-4">
      <StatusBar barStyle="dark-content" />
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-black text-text">Database Records</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('InsertRecord')}
          className="bg-primary px-3 py-1.5 rounded-lg"
        >
          <Text className="text-white text-[12px] font-bold">+ New</Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View className="bg-red/10 p-4 rounded-xl mb-4 border border-red/20">
          <Text className="text-red font-bold text-center">{error}</Text>
        </View>
      )}

      {records.length === 0 ? (
        <View className="flex-1 items-center justify-center opacity-60">
          <Text className="text-4xl mb-2">📂</Text>
          <Text className="text-[14px] font-bold text-text">No records found</Text>
          <Text className="text-[11px] text-muted">The database is currently empty.</Text>
        </View>
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => item.firebaseKey}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
