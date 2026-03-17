// screens/AddTaskScreen.js
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useApp } from '../AppContext';
import { COLORS } from '../theme';

export default function AddTaskScreen({ navigation }) {
  const { subjects, addTask } = useApp();
  const today = new Date().toISOString().split('T')[0];

  const [title, setTitle] = useState('');
  const [subjIdx, setSubjIdx] = useState(0);
  const [prio, setPrio] = useState('h');
  const [time, setTime] = useState('09:00');
  const [dur, setDur] = useState('');
  const [due, setDue] = useState(today);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  function save() {
    if (!title.trim()) { setError('Please enter a task title.'); return; }
    setError('');
    addTask({ title: title.trim(), time, dur: dur.trim(), due, notes: notes.trim(), p: prio, si: subjIdx });
    setTitle(''); setDur(''); setNotes('');
    navigation.navigate('Home');
  }

  const prioItems = [
    { key: 'h', label: '🔴 High', bg: '#fef2f2', color: COLORS.red, border: COLORS.red },
    { key: 'm', label: '🟡 Med',  bg: '#fffbeb', color: COLORS.amber, border: COLORS.amber },
    { key: 'l', label: '🟢 Low',  bg: '#f0fdf4', color: COLORS.green, border: COLORS.green },
  ];

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.hdr}>
        <View>
          <Text style={styles.hdrT}>Add Task</Text>
          <Text style={styles.hdrS}>Schedule a study session</Text>
        </View>
        <TouchableOpacity style={styles.xBtn} onPress={() => navigation.goBack()}>
          <Text style={{ color: '#fff', fontSize: 14 }}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text style={styles.lbl}>Task title *</Text>
        <TextInput style={styles.inp} value={title} onChangeText={setTitle} placeholder="e.g. ML Assignment #3" placeholderTextColor="#b0b7c3" />

        <Text style={styles.lbl}>Subject</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 4 }}>
          <View style={{ flexDirection: 'row', gap: 6, marginTop: 4 }}>
            {subjects.map((s, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.chip, i === subjIdx && styles.chipSel]}
                onPress={() => setSubjIdx(i)}
                activeOpacity={0.75}
              >
                <Text style={[styles.chipTxt, i === subjIdx && styles.chipTxtSel]}>
                  {s.icon} {s.name.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Text style={styles.lbl}>Priority</Text>
        <View style={styles.prioRow}>
          {prioItems.map((p) => (
            <TouchableOpacity
              key={p.key}
              style={[styles.prioBtn, { backgroundColor: p.bg, borderColor: p.border }, prio !== p.key && styles.prioBtnUnsel]}
              onPress={() => setPrio(p.key)}
              activeOpacity={0.8}
            >
              <Text style={[styles.prioBtnTxt, { color: p.color }, prio !== p.key && { opacity: 0.45 }]}>{p.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.lbl}>Time & duration</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TextInput style={[styles.inp, { flex: 1 }]} value={time} onChangeText={setTime} placeholder="09:00" placeholderTextColor="#b0b7c3" />
          <TextInput style={[styles.inp, { flex: 1 }]} value={dur} onChangeText={setDur} placeholder="e.g. 2h" placeholderTextColor="#b0b7c3" />
        </View>

        <Text style={styles.lbl}>Due date</Text>
        <TextInput style={styles.inp} value={due} onChangeText={setDue} placeholder="YYYY-MM-DD" placeholderTextColor="#b0b7c3" />

        <Text style={styles.lbl}>Notes (optional)</Text>
        <TextInput
          style={[styles.inp, { height: 72, textAlignVertical: 'top' }]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Extra details..."
          placeholderTextColor="#b0b7c3"
          multiline
        />

        {error ? (
          <View style={styles.errBox}><Text style={styles.errTxt}>{error}</Text></View>
        ) : null}

        <TouchableOpacity style={styles.saveBtn} onPress={save} activeOpacity={0.85}>
          <Text style={styles.saveTxt}>✅ Save Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  hdr: { backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 18, borderBottomLeftRadius: 18, borderBottomRightRadius: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hdrT: { fontSize: 17, fontWeight: '900', color: '#fff' },
  hdrS: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  xBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  body: { flex: 1, backgroundColor: COLORS.bg },
  bodyContent: { padding: 14, paddingBottom: 30, gap: 0 },
  lbl: { fontSize: 11, fontWeight: '700', color: COLORS.text, marginTop: 12, marginBottom: 5 },
  inp: { borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 11, padding: 11, fontSize: 13, color: COLORS.text, backgroundColor: COLORS.card },
  chip: { paddingHorizontal: 11, paddingVertical: 6, borderRadius: 9, backgroundColor: '#f1f5f9', borderWidth: 1.5, borderColor: 'transparent' },
  chipSel: { backgroundColor: COLORS.primaryBg, borderColor: COLORS.primaryLight },
  chipTxt: { fontSize: 11, fontWeight: '700', color: COLORS.muted },
  chipTxtSel: { color: COLORS.primary },
  prioRow: { flexDirection: 'row', gap: 6, marginTop: 4 },
  prioBtn: { flex: 1, borderWidth: 1.5, borderRadius: 9, paddingVertical: 8, alignItems: 'center' },
  prioBtnUnsel: { opacity: 0.45 },
  prioBtnTxt: { fontSize: 11, fontWeight: '700' },
  errBox: { backgroundColor: '#fef2f2', borderRadius: 9, padding: 9, marginTop: 8, borderWidth: 1, borderColor: '#fecaca' },
  errTxt: { fontSize: 12, color: COLORS.red },
  saveBtn: { backgroundColor: COLORS.primary, borderRadius: 13, paddingVertical: 13, alignItems: 'center', marginTop: 14 },
  saveTxt: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
