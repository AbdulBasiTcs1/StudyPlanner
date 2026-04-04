// screens/StatsScreen.js
import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { useApp } from '../AppContext';

const DAYS  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = [3, 2, 4, 1, 3, 5, 2];
const STREAK = [1, 1, 0, 1, 1, 1, 0, 1, 1, 1];

export default function StatsScreen() {
  const { tasks, subjects } = useApp();
  const total = tasks.length;
  const done  = tasks.filter((t) => t.done).length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;
  const maxH  = Math.max(...HOURS);

  return (
    <View className="flex-1 bg-bg">
      <StatusBar barStyle="light-content" backgroundColor="#0d9488" />

      {/* ── Header ───────────────────────────────── */}
      <View
        className="px-5 pt-5 pb-6 rounded-b-[24px]"
        style={{ backgroundColor: '#0d9488' }}
      >
        <Text className="text-xl font-black text-white">My Stats</Text>
        <Text className="text-xs text-white/65 mt-1">Your study overview</Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 14, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Stats grid ───────────────────────── */}
        <View className="flex-row flex-wrap gap-2 mb-3">
          {[
            { val: String(total),          lbl: 'Total Tasks'  },
            { val: String(done),           lbl: 'Completed'    },
            { val: `${pct}%`,             lbl: 'Success Rate' },
            { val: String(subjects.length),lbl: 'Subjects'     },
          ].map((item, i) => (
            <View
              key={i}
              className="flex-1 min-w-[45%] bg-card rounded-2xl p-3.5 border border-border items-center"
            >
              <Text className="text-2xl font-black text-primary">{item.val}</Text>
              <Text className="text-[10px] text-muted font-semibold mt-0.5">{item.lbl}</Text>
            </View>
          ))}
        </View>

        {/* ── Weekly bar chart ─────────────────── */}
        <View className="bg-card rounded-2xl p-4 border border-border mb-3">
          <Text className="text-xs font-extrabold text-text mb-3">
            📅 This week (hours studied)
          </Text>
          <View className="flex-row items-end gap-1.5" style={{ height: 80 }}>
            {DAYS.map((d, i) => {
              const barH = Math.max(4, Math.round((HOURS[i] / maxH) * 68));
              const isFri = i === 4; // Friday highlight
              return (
                <View key={d} className="flex-1 items-center gap-1">
                  <Text className="text-[8px] text-muted font-bold mb-0.5">{HOURS[i]}h</Text>
                  <View
                    className={`w-full rounded-t-lg min-h-[4px]`}
                    style={{
                      height: barH,
                      backgroundColor: isFri ? '#e8365d' : '#5B4FCF',
                    }}
                  />
                  <Text className="text-[8px] text-muted font-semibold">{d}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* ── Study streak ─────────────────────── */}
        <View className="bg-card rounded-2xl p-4 border border-border mb-3">
          <Text className="text-xs font-extrabold text-text mb-3">
            🔥 Study streak — last 10 days
          </Text>
          <View className="flex-row flex-wrap gap-1.5">
            {STREAK.map((v, i) => {
              const isToday = i === STREAK.length - 1;
              const active  = v || isToday;
              return (
                <View
                  key={i}
                  className={`w-8 h-8 rounded-xl items-center justify-center ${
                    isToday
                      ? 'bg-primary'
                      : active
                      ? 'bg-primary/80'
                      : 'bg-bg border border-border'
                  }`}
                  style={isToday ? { elevation: 4 } : {}}
                >
                  <Text className={`text-xs font-bold ${active ? 'text-white' : 'text-muted'}`}>
                    {active ? '✓' : '×'}
                  </Text>
                </View>
              );
            })}
          </View>
          <Text className="text-[10px] text-muted mt-2">
            Current streak: <Text className="font-bold text-primary">7 days 🔥</Text>
          </Text>
        </View>

        {/* ── Subject breakdown ────────────────── */}
        <View className="bg-card rounded-2xl p-4 border border-border">
          <Text className="text-xs font-extrabold text-text mb-3">📚 Subject progress</Text>
          {subjects.map((s, i) => {
            const spct = s.topics > 0 ? Math.round((s.done / s.topics) * 100) : 0;
            return (
              <View key={i} className="mb-3">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-xs font-semibold text-text" numberOfLines={1}>
                    {s.icon} {s.name.split(' ')[0]}
                  </Text>
                  <Text className="text-xs font-bold" style={{ color: s.color }}>{spct}%</Text>
                </View>
                <View className="h-2 bg-bg rounded-full overflow-hidden">
                  <View
                    className="h-full rounded-full"
                    style={{ width: `${spct}%`, backgroundColor: s.color }}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
