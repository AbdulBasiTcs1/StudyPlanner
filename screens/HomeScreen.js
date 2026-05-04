// screens/HomeScreen.js
import React, { useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StatusBar, FlatList, Alert
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
    .map((w) => w[0] || '')
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Priority configuration
const PRIO = {
  h: { label: 'High', bg: 'bg-red/10',   text: 'text-red'   },
  m: { label: 'Med',  bg: 'bg-amber/10', text: 'text-amber' },
  l: { label: 'Low',  bg: 'bg-green/10', text: 'text-green' },
};

export default function HomeScreen({ navigation }) {
  const { user, tasks, subjects, toggleTask, deleteTask } = useApp();
  const total = tasks.length;
  const done  = tasks.filter((t) => t.done).length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  useFocusEffect(useCallback(() => {}, []));

  function renderTask({ item, index }) {
    const sj    = subjects[item.si] || { name: 'General', color: '#888' };
    const prio  = PRIO[item.p] || PRIO.l;
    return (
      <TouchableOpacity
        className={`bg-card rounded-[11px] p-[9px] mb-1.5 border border-border flex-row items-center gap-2 ${item.done ? 'opacity-50' : ''}`}
        activeOpacity={0.85}
        onLongPress={() => {
          Alert.alert("Delete Task", `Delete ${item.title}?`, [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => deleteTask(item.id) }
          ]);
        }}
      >
        {/* Checkbox */}
        <TouchableOpacity
          className={`w-[21px] h-[21px] rounded-full border-2 items-center justify-center flex-shrink-0 ${
            item.done ? 'bg-green border-green' : 'border-border'
          }`}
          onPress={() => toggleTask(item)}
          activeOpacity={0.7}
        >
          {item.done ? <Text className="text-[10px] text-white font-bold">✓</Text> : null}
        </TouchableOpacity>

        {/* Subject colour dot */}
        <View
          className="w-2 h-2 rounded-full flex-shrink-0 mx-0.5"
          style={{ backgroundColor: sj.color }}
        />

        {/* Title + meta */}
        <View className="flex-1 min-w-0">
          <Text
            className={`text-[12px] font-bold text-text ${item.done ? 'line-through text-muted' : ''}`}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text className="text-[10px] text-muted mt-0.5">
            {sj.name}{item.time ? ' · ' + item.time : ''}{item.dur ? ' · ' + item.dur : ''}
          </Text>
        </View>

        {/* Priority badge */}
        <View className={`px-1.5 py-0.5 rounded-md flex-shrink-0 ${prio.bg}`}>
          <Text className={`text-[9px] font-bold ${prio.text}`}>{prio.label}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View className="flex-1 bg-bg">
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* ── Header ────────────────────────────────────────────── */}
      <View className="bg-primary px-[15px] pt-4 pb-[26px] rounded-b-[22px]">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-[11px] text-white/60 font-medium">{getGreeting()}</Text>
            <Text className="text-[17px] font-black text-white mt-0.5">{user.name}</Text>
          </View>
          {/* Avatar */}
          <View className="w-9 h-9 rounded-full bg-white/25 border-2 border-white/35 items-center justify-center">
            <Text className="text-xs font-extrabold text-white">{getInitials(user.name)}</Text>
          </View>
        </View>

        {/* Progress bar */}
        <View className="mt-4">
          <View className="flex-row justify-between mb-1">
            <Text className="text-[10px] text-white/70">Daily progress</Text>
            <Text className="text-[10px] text-white font-bold">{pct}%</Text>
          </View>
          <View className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <View
              className="h-full bg-white rounded-full"
              style={{ width: `${pct}%` }}
            />
          </View>
        </View>
      </View>

      {/* ── Stats cards (overlapping header) ─────────────────── */}
      <View className="flex-row gap-1.5 px-[12px] -mt-4 z-10">
        {[
          { val: String(total), lbl: 'Tasks'  },
          { val: `${done}`,     lbl: 'Done'   },
          { val: '🔥 7',        lbl: 'Streak' },
        ].map((card) => (
          <View
            key={card.lbl}
            className="flex-1 bg-card rounded-xl py-2.5 px-1 items-center border border-border"
            style={{ elevation: 3 }}
          >
            <Text className="text-[17px] font-black text-primary">{card.val}</Text>
            <Text className="text-[9px] text-muted font-semibold mt-0.5">{card.lbl}</Text>
          </View>
        ))}
      </View>

      {/* ── Section header ────────────────────────────────────── */}
      <View className="flex-row justify-between items-center px-[13px] py-2.5 mt-1">
        <Text className="text-[13px] font-extrabold text-text">Today's Tasks</Text>
        <TouchableOpacity
          className="bg-primaryBg px-[9px] py-1 rounded-lg"
          onPress={() => navigation.navigate('AddTask')}
        >
          <Text className="text-[11px] text-primary font-bold">＋ Add task</Text>
        </TouchableOpacity>
      </View>

      {/* ── Task list ─────────────────────────────────────────── */}
      {tasks.length === 0 ? (
        <View className="flex-1 items-center justify-center p-8">
          <Text className="text-4xl mb-2.5">📝</Text>
          <Text className="text-sm font-bold text-text mb-1">No tasks yet</Text>
          <Text className="text-[11px] text-muted text-center leading-4">
            Tap <Text className="font-bold text-primary">＋ Add task</Text> above{'\n'}or the{' '}
            <Text className="font-bold text-primary">➕</Text> button below.
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item, i) => item.id || String(i)}
          renderItem={renderTask}
          contentContainerStyle={{ paddingHorizontal: 11, paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* ── FAB ───────────────────────────────────────────────── */}
      <TouchableOpacity
        className="absolute bottom-1.5 right-3 w-[46px] h-[46px] rounded-full bg-primary items-center justify-center"
        style={{ elevation: 6 }}
        onPress={() => navigation.navigate('AddTask')}
        activeOpacity={0.8}
      >
        <Text className="text-white text-2xl font-light leading-none">+</Text>
      </TouchableOpacity>
    </View>
  );
}
