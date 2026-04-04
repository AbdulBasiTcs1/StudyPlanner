// screens/HomeScreen.js
import React, { useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
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
  const { user, tasks, subjects, toggleTask } = useApp();
  const total = tasks.length;
  const done  = tasks.filter((t) => t.done).length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  useFocusEffect(useCallback(() => {}, []));

  function renderTask({ item, index }) {
    const sj    = subjects[item.si] || { name: 'General', color: '#888' };
    const prio  = PRIO[item.p] || PRIO.l;
    return (
      <TouchableOpacity
        className={`bg-card rounded-2xl p-3 mb-2 border border-border flex-row items-center gap-2.5 ${item.done ? 'opacity-50' : ''}`}
        activeOpacity={0.85}
      >
        {/* Checkbox */}
        <TouchableOpacity
          className={`w-6 h-6 rounded-full border-2 items-center justify-center flex-shrink-0 ${
            item.done ? 'bg-green border-green' : 'border-border'
          }`}
          onPress={() => toggleTask(index)}
          activeOpacity={0.7}
        >
          {item.done ? <Text className="text-[10px] text-white font-bold">✓</Text> : null}
        </TouchableOpacity>

        {/* Subject colour dot */}
        <View
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: sj.color }}
        />

        {/* Title + meta */}
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

        {/* Priority badge */}
        <View className={`px-2 py-0.5 rounded-lg flex-shrink-0 ${prio.bg}`}>
          <Text className={`text-[9px] font-bold ${prio.text}`}>{prio.label}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View className="flex-1 bg-bg">
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* ── Header ────────────────────────────────────────────── */}
      <View className="bg-primary px-5 pt-5 pb-8 rounded-b-[26px]">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-xs text-white/60 font-medium">{getGreeting()}</Text>
            <Text className="text-xl font-black text-white mt-0.5">{user.name}</Text>
          </View>
          {/* Avatar */}
          <View className="w-10 h-10 rounded-full bg-white/25 border-2 border-white/40 items-center justify-center">
            <Text className="text-sm font-extrabold text-white">{getInitials(user.name)}</Text>
          </View>
        </View>

        {/* Progress bar */}
        <View className="mt-4">
          <View className="flex-row justify-between mb-1">
            <Text className="text-xs text-white/70">Daily progress</Text>
            <Text className="text-xs text-white font-bold">{pct}%</Text>
          </View>
          <View className="h-2 bg-white/20 rounded-full overflow-hidden">
            <View
              className="h-full bg-white rounded-full"
              style={{ width: `${pct}%` }}
            />
          </View>
        </View>
      </View>

      {/* ── Stats cards (overlapping header) ─────────────────── */}
      <View className="flex-row gap-2 px-4 -mt-5 z-10">
        {[
          { val: String(total), lbl: 'Tasks'  },
          { val: `${done}`,     lbl: 'Done'   },
          { val: '🔥 7',        lbl: 'Streak' },
        ].map((card) => (
          <View
            key={card.lbl}
            className="flex-1 bg-card rounded-2xl py-2.5 px-1 items-center border border-border"
            style={{ elevation: 3 }}
          >
            <Text className="text-lg font-black text-primary">{card.val}</Text>
            <Text className="text-[9px] text-muted font-semibold mt-0.5">{card.lbl}</Text>
          </View>
        ))}
      </View>

      {/* ── Section header ────────────────────────────────────── */}
      <View className="flex-row justify-between items-center px-4 py-3 mt-2">
        <Text className="text-sm font-extrabold text-text">Today's Tasks</Text>
        <TouchableOpacity
          className="bg-primaryBg px-3 py-1.5 rounded-xl"
          onPress={() => navigation.navigate('AddTask')}
        >
          <Text className="text-xs text-primary font-bold">＋ Add task</Text>
        </TouchableOpacity>
      </View>

      {/* ── Task list ─────────────────────────────────────────── */}
      {tasks.length === 0 ? (
        <View className="flex-1 items-center justify-center p-8">
          <Text className="text-5xl mb-3">📝</Text>
          <Text className="text-sm font-bold text-text mb-1">No tasks yet</Text>
          <Text className="text-xs text-muted text-center leading-5">
            Tap <Text className="font-bold text-primary">＋ Add task</Text> above{'\n'}or the{' '}
            <Text className="font-bold text-primary">➕</Text> button below.
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(_, i) => String(i)}
          renderItem={renderTask}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* ── FAB ───────────────────────────────────────────────── */}
      <TouchableOpacity
        className="absolute bottom-3 right-4 w-14 h-14 rounded-full bg-primary items-center justify-center"
        style={{ elevation: 6 }}
        onPress={() => navigation.navigate('AddTask')}
        activeOpacity={0.8}
      >
        <Text className="text-white text-3xl font-light leading-none">+</Text>
      </TouchableOpacity>
    </View>
  );
}
