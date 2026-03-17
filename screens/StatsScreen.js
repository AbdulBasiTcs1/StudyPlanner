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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d9488" />
      <View style={styles.hdr}>
        <Text style={styles.hdrTitle}>My Stats</Text>
        <Text style={styles.hdrSub}>Your study overview</Text>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} showsVerticalScrollIndicator={false}>
        {/* Stats grid */}
        <View style={styles.grid}>
          {[
            { val: String(total), lbl: 'Total Tasks' },
            { val: String(done), lbl: 'Completed' },
            { val: pct + '%', lbl: 'Success Rate' },
            { val: String(subjects.length), lbl: 'Subjects' },
          ].map((item, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statVal}>{item.val}</Text>
              <Text style={styles.statLbl}>{item.lbl}</Text>
            </View>
          ))}
        </View>

        {/* Weekly bar chart */}
        <View style={styles.box}>
          <Text style={styles.boxTitle}>This week (hours studied)</Text>
          <View style={styles.bars}>
            {DAYS.map((d, i) => {
              const h = Math.max(4, Math.round((HOURS[i] / maxH) * 68));
              const isFri = i === 4;
              return (
                <View key={d} style={styles.barCol}>
                  <View style={[styles.bar, { height: h, backgroundColor: isFri ? '#e8365d' : COLORS.primary }]} />
                  <Text style={styles.barDay}>{d}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Streak */}
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Study streak — last 10 days</Text>
          <View style={styles.streakRow}>
            {STREAK.map((v, i) => {
              const isToday = i === 9;
              const cls = isToday ? 'today' : v ? 'yes' : 'no';
              return (
                <View
                  key={i}
                  style={[
                    styles.sk,
                    cls === 'today' && styles.skToday,
                    cls === 'yes' && styles.skYes,
                    cls === 'no' && styles.skNo,
                  ]}
                >
                  <Text style={[styles.skTxt, cls === 'no' && { color: COLORS.muted }]}>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  hdr: { backgroundColor: '#0d9488', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 19, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  hdrTitle: { fontSize: 18, fontWeight: '900', color: '#fff' },
  hdrSub: { fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 2 },
  body: { flex: 1 },
  bodyContent: { padding: 12, paddingBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  statCard: { flex: 1, minWidth: '45%', backgroundColor: COLORS.card, borderRadius: 13, padding: 12, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  statVal: { fontSize: 24, fontWeight: '900', color: COLORS.primary },
  statLbl: { fontSize: 10, color: COLORS.muted, fontWeight: '600', marginTop: 2 },
  box: { backgroundColor: COLORS.card, borderRadius: 13, padding: 12, borderWidth: 1, borderColor: COLORS.border, marginBottom: 10 },
  boxTitle: { fontSize: 12, fontWeight: '800', color: COLORS.text, marginBottom: 10 },
  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: 5, height: 76 },
  barCol: { flex: 1, alignItems: 'center', gap: 4 },
  bar: { width: '100%', borderRadius: 4, minHeight: 4 },
  barDay: { fontSize: 8, color: COLORS.muted, fontWeight: '600' },
  streakRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  sk: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  skYes: { backgroundColor: COLORS.primary },
  skToday: { backgroundColor: COLORS.primary, shadowColor: COLORS.primary, shadowOpacity: 0.35, shadowRadius: 6, elevation: 3 },
  skNo: { backgroundColor: '#f1f5f9', borderWidth: 1, borderColor: COLORS.border },
  skTxt: { fontSize: 11, fontWeight: '700', color: '#fff' },
});
