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

  // Force re-render when screen is focused
  useFocusEffect(useCallback(() => {}, []));

  const prioLabel = { h: 'High', m: 'Med', l: 'Low' };
  const prioBg = { h: '#fef2f2', m: '#fffbeb', l: '#f0fdf4' };
  const prioColor = { h: COLORS.red, m: COLORS.amber, l: COLORS.green };

  function renderTask({ item, index }) {
    const sj = subjects[item.si] || { name: 'General', color: '#888' };
    return (
      <TouchableOpacity
        style={[styles.taskCard, item.done && styles.taskDone]}
        activeOpacity={0.85}
      >
        <TouchableOpacity
          style={[styles.cb, item.done && styles.cbDone]}
          onPress={() => toggleTask(index)}
          activeOpacity={0.7}
        >
          {item.done ? <Text style={{ fontSize: 10, color: '#fff' }}>✓</Text> : null}
        </TouchableOpacity>
        <View style={[styles.dot, { backgroundColor: sj.color }]} />
        <View style={styles.taskBody}>
          <Text style={[styles.taskTitle, item.done && styles.taskTitleDone]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.taskMeta}>
            {sj.name}{item.time ? ' · ' + item.time : ''}{item.dur ? ' · ' + item.dur : ''}
          </Text>
        </View>
        <View style={[styles.badge, { backgroundColor: prioBg[item.p] }]}>
          <Text style={[styles.badgeTxt, { color: prioColor[item.p] }]}>{prioLabel[item.p]}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greet}>{getGreeting()}</Text>
            <Text style={styles.name}>{user.name}</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarTxt}>{getInitials(user.name)}</Text>
          </View>
        </View>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statVal}>{total}</Text>
          <Text style={styles.statLbl}>Tasks</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statVal}>{pct}%</Text>
          <Text style={styles.statLbl}>Done</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statVal}>🔥<Text>7</Text></Text>
          <Text style={styles.statLbl}>Streak</Text>
        </View>
      </View>

      {/* Section header */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddTask')}
        >
          <Text style={styles.addBtnTxt}>+ Add task</Text>
        </TouchableOpacity>
      </View>

      {/* Task list */}
      {tasks.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIc}>📝</Text>
          <Text style={styles.emptyTxt}>No tasks yet.{'\n'}Tap <Text style={{ fontWeight: '700' }}>+ Add task</Text> above{'\n'}or the <Text style={{ fontWeight: '700' }}>+</Text> button below.</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(_, i) => String(i)}
          renderItem={renderTask}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask')}
        activeOpacity={0.8}
      >
        <Text style={styles.fabTxt}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 28, borderBottomLeftRadius: 22, borderBottomRightRadius: 22 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  greet: { fontSize: 11, color: 'rgba(255,255,255,0.65)', fontWeight: '500' },
  name: { fontSize: 18, fontWeight: '900', color: '#fff', marginTop: 2 },
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.18)', borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { fontSize: 13, fontWeight: '800', color: '#fff' },
  statsRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 13, marginTop: -18, zIndex: 2 },
  statCard: { flex: 1, backgroundColor: COLORS.card, borderRadius: 13, paddingVertical: 9, paddingHorizontal: 6, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  statVal: { fontSize: 18, fontWeight: '900', color: COLORS.primary },
  statLbl: { fontSize: 9, color: COLORS.muted, fontWeight: '600', marginTop: 2 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text },
  addBtn: { backgroundColor: COLORS.primaryBg, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 9 },
  addBtnTxt: { fontSize: 11, color: COLORS.primary, fontWeight: '700' },
  list: { paddingHorizontal: 12, paddingBottom: 90 },
  taskCard: { backgroundColor: COLORS.card, borderRadius: 12, padding: 10, marginBottom: 7, borderWidth: 1, borderColor: COLORS.border, flexDirection: 'row', alignItems: 'center', gap: 9 },
  taskDone: { opacity: 0.5 },
  cb: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  cbDone: { backgroundColor: COLORS.green, borderColor: COLORS.green },
  dot: { width: 8, height: 8, borderRadius: 4, flexShrink: 0 },
  taskBody: { flex: 1, minWidth: 0 },
  taskTitle: { fontSize: 12, fontWeight: '700', color: COLORS.text },
  taskTitleDone: { textDecorationLine: 'line-through', color: COLORS.muted },
  taskMeta: { fontSize: 10, color: COLORS.muted, marginTop: 1 },
  badge: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6 },
  badgeTxt: { fontSize: 9, fontWeight: '700' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyIc: { fontSize: 36, marginBottom: 10 },
  emptyTxt: { fontSize: 13, color: COLORS.muted, textAlign: 'center', lineHeight: 21 },
  fab: { position: 'absolute', bottom: 70, right: 14, width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', shadowColor: COLORS.primary, shadowOpacity: 0.45, shadowRadius: 14, elevation: 6 },
  fabTxt: { color: '#fff', fontSize: 26, lineHeight: 30, fontWeight: '400' },
});
