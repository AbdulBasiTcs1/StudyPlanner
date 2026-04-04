// screens/StatsScreen.js
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, StatusBar,
} from 'react-native';
import { useApp } from '../AppContext';
import { COLORS } from '../theme';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = [3, 2, 4, 1, 3, 5, 2];
const STREAK = [1, 1, 0, 1, 1, 1, 0, 1, 1, 1];

export default function StatsScreen() {
  const { tasks, subjects } = useApp();
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const maxH = Math.max(...HOURS);

  return (
    <View className="flex-1 bg-bg">
      <StatusBar barStyle="light-content" backgroundColor="#0d9488" />
      <View className="bg-[#0d9488] px-4 pt-4 pb-5 rounded-b-[20px]">
        <Text className="text-lg font-black text-white">My Stats</Text>
        <Text className="text-[11px] text-white/65 mt-0.5">Your study overview</Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 12, paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {/* Stats grid */}
        <View className="flex-row flex-wrap gap-2 mb-2.5">
          {[
            { val: String(total), lbl: 'Total Tasks' },
            { val: String(done), lbl: 'Completed' },
            { val: pct + '%', lbl: 'Success Rate' },
            { val: String(subjects.length), lbl: 'Subjects' },
          ].map((item, i) => (
            <View key={i} className="flex-1 min-w-[45%] bg-card rounded-xl p-3 border border-border items-center">
              <Text className="text-2xl font-black text-primary">{item.val}</Text>
              <Text className="text-[10px] text-muted font-semibold mt-0.5">{item.lbl}</Text>
            </View>
          ))}
        </View>

        {/* Weekly bar chart */}
        <View className="bg-card rounded-xl p-3 border border-border mb-2.5">
          <Text className="text-[12px] font-extrabold text-text mb-2.5">This week (hours studied)</Text>
          <View className="flex-row items-end gap-1.5 h-[76px]">
            {DAYS.map((d, i) => {
              const h = Math.max(4, Math.round((HOURS[i] / maxH) * 68));
              const isFri = i === 4;
              return (
                <View key={d} className="flex-1 items-center gap-1">
                  <View 
                    className={`w-full rounded-md min-h-[4px] ${isFri ? 'bg-[#e8365d]' : 'bg-primary'}`} 
                    style={{ height: h }} 
                  />
                  <Text className="text-[8px] text-muted font-semibold">{d}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Streak */}
        <View className="bg-card rounded-xl p-3 border border-border mb-2.5">
          <Text className="text-[12px] font-extrabold text-text mb-2.5">Study streak — last 10 days</Text>
          <View className="flex-row gap-1.5 flex-wrap">
            {STREAK.map((v, i) => {
              const isToday = i === 9;
              const cls = isToday ? 'today' : v ? 'yes' : 'no';
              return (
                <View
                  key={i}
                  className={`w-7 h-7 rounded-lg items-center justify-center ${cls === 'yes' ? 'bg-primary' : cls === 'today' ? 'bg-primary shadow-sm shadow-primary/35' : 'bg-[#f1f5f9] border border-border'}`}
                  style={cls === 'today' ? { elevation: 3 } : {}}
                >
                  <Text className={`text-[11px] font-bold ${v || isToday ? 'text-white' : 'text-muted'}`}>
                    {v || isToday ? '✓' : '×'}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});

