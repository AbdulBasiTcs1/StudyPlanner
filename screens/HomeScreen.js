// screens/HomeScreen.js
import React, { useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  StatusBar, FlatList,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useApp } from '../AppContext';
import { COLORS } from '../theme';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning ☀️';
  if (h < 17) return 'Good afternoon 🌤️';
  return 'Good evening 🌙';
}

function getInitials(name) {
  return name
    .split(' ')
    .map((x) => x[0] || '')
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function HomeScreen({ navigation }) {
  const { user, tasks, subjects, toggleTask } = useApp();
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  useFocusEffect(useCallback(() => {}, []));

  const prioLabel = { h: 'High', m: 'Med', l: 'Low' };
  const prioBgClass = { h: 'bg-red/10', m: 'bg-amber/10', l: 'bg-green/10' };
  const prioColorClass = { h: 'text-red', m: 'text-amber', l: 'text-green' };

  function renderTask({ item, index }) {
    const sj = subjects[item.si] || { name: 'General', color: '#888' };
    return (
      <TouchableOpacity
        className={`bg-card rounded-xl p-2.5 mb-2 border border-border flex-row items-center gap-2.5 ${item.done ? 'opacity-50' : ''}`}
        activeOpacity={0.85}
      >
        <TouchableOpacity
          className={`w-[22px] h-[22px] rounded-full border-2 border-border items-center justify-center ${item.done ? 'bg-green border-green' : ''}`}
          onPress={() => toggleTask(index)}
          activeOpacity={0.7}
        >
          {item.done ? <Text className="text-[10px] text-white">✓</Text> : null}
        </TouchableOpacity>
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: sj.color }} />
        <View className="flex-1 min-w-0">
          <Text 
            className={`text-xs font-bold text-text ${item.done ? 'line-through text-muted' : ''}`} 
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text className="text-[10px] text-muted mt-0.5">
            {sj.name}{item.time ? ' · ' + item.time : ''}{item.dur ? ' · ' + item.dur : ''}
          </Text>
        </View>
        <View className={`px-2 py-1 rounded-md ${prioBgClass[item.p]}`}>
          <Text className={`text-[9px] font-bold ${prioColorClass[item.p]}`}>{prioLabel[item.p]}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View className="flex-1 bg-bg">
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Header */}
      <View className="bg-primary px-4 pt-4 pb-7 rounded-b-[22px]">
        <View className="flex-row justify-between items-start">
          <View>
            <Text className="text-[11px] text-white/60 font-medium">{getGreeting()}</Text>
            <Text className="text-lg font-black text-white mt-0.5">{user.name}</Text>
          </View>
          <View className="w-[38px] h-[38px] rounded-full bg-white/20 border-2 border-white/30 items-center justify-center">
            <Text className="text-xs font-extrabold text-white">{getInitials(user.name)}</Text>
          </View>
        </View>
      </View>

      {/* Stats row */}
      <View className="flex-row gap-2 px-3.5 -mt-4.5 z-10">
        <View className="flex-1 bg-card rounded-xl py-2 px-1.5 items-center border border-border shadow-sm">
          <Text className="text-lg font-black text-primary">{total}</Text>
          <Text className="text-[9px] text-muted font-semibold mt-0.5">Tasks</Text>
        </View>
        <View className="flex-1 bg-card rounded-xl py-2 px-1.5 items-center border border-border shadow-sm">
          <Text className="text-lg font-black text-primary">{pct}%</Text>
          <Text className="text-[9px] text-muted font-semibold mt-0.5">Done</Text>
        </View>
        <View className="flex-1 bg-card rounded-xl py-2 px-1.5 items-center border border-border shadow-sm">
          <Text className="text-lg font-black text-primary">🔥<Text className="text-lg">7</Text></Text>
          <Text className="text-[9px] text-muted font-semibold mt-0.5">Streak</Text>
        </View>
      </View>

      {/* Section header */}
      <View className="flex-row justify-between items-center px-3.5 py-3">
        <Text className="text-sm font-extrabold text-text">Today's Tasks</Text>
        <TouchableOpacity
          className="bg-primaryBg px-2.5 py-1.5 rounded-lg"
          onPress={() => navigation.navigate('AddTask')}
        >
          <Text className="text-[11px] color-primary font-bold">+ Add task</Text>
        </TouchableOpacity>
      </View>

      {/* Task list */}
      {tasks.length === 0 ? (
        <View className="flex-1 items-center justify-center p-8">
          <Text className="text-4xl mb-2.5">📝</Text>
          <Text className="text-sm text-muted text-center leading-5">
            No tasks yet.{'\n'}Tap <Text className="font-bold">+ Add task</Text> above{'\n'}or the <Text className="font-bold">+</Text> button below.
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(_, i) => String(i)}
          renderItem={renderTask}
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 90 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        className="absolute bottom-1 right-3.5 w-[50px] h-[50px] rounded-full bg-primary items-center justify-center shadow-lg"
        style={{ elevation: 6 }}
        onPress={() => navigation.navigate('AddTask')}
        activeOpacity={0.8}
      >
        <Text className="text-white text-3xl leading-8 font-light">+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});

