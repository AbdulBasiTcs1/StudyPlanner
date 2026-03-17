// screens/SubjectsScreen.js
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  StatusBar, Modal, TextInput, FlatList,
} from 'react-native';
import { useApp } from '../AppContext';
import { COLORS, ICONS, PALETTE } from '../theme';

export default function SubjectsScreen() {
  const { user, subjects, addSubject } = useApp();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [topics, setTopics] = useState('10');
  const [icon, setIcon] = useState('💻');
  const [color, setColor] = useState(COLORS.primary);
  const [error, setError] = useState('');

  function openModal() {
    setName(''); setTopics('10'); setIcon('💻'); setColor(COLORS.primary); setError('');
    setModalVisible(true);
  }

  function saveSubject() {
    if (!name.trim()) { setError('Please enter a subject name.'); return; }
    addSubject({ name: name.trim(), icon, color, topics: parseInt(topics) || 10 });
    setModalVisible(false);
  }

  function renderSubject(s, i) {
    const pct = s.topics > 0 ? Math.round((s.done / s.topics) * 100) : 0;
    return (
      <TouchableOpacity key={i} style={styles.card} activeOpacity={0.85}>
        <View style={styles.cardRow}>
          <View style={[styles.ico, { backgroundColor: s.color + '20' }]}>
            <Text style={{ fontSize: 19 }}>{s.icon}</Text>
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={styles.cardName} numberOfLines={1}>{s.name}</Text>
            <Text style={styles.cardSub}>{s.topics} topics · {s.topics - s.done} pending</Text>
          </View>
          <Text style={[styles.pct, { color: s.color }]}>{pct}%</Text>
        </View>
        <View style={styles.track}>
          <View style={[styles.fill, { width: pct + '%', backgroundColor: s.color }]} />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#e8365d" />
      <View style={styles.hdr}>
        <Text style={styles.hdrTitle}>My Subjects</Text>
        <Text style={styles.hdrSub}>{user.sem} · {subjects.length} subjects</Text>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 12, paddingBottom: 20 }}>
        {subjects.map((s, i) => renderSubject(s, i))}
        <TouchableOpacity style={styles.addBtn} onPress={openModal} activeOpacity={0.8}>
          <Text style={styles.addBtnTxt}>＋ Add New Subject</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Subject Modal */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <Text style={styles.modalTitle}>Add Subject</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ fontSize: 20, color: COLORS.muted }}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.lbl}>Subject name *</Text>
            <TextInput style={[styles.inp, { marginBottom: 10 }]} value={name} onChangeText={setName} placeholder="e.g. Machine Learning" placeholderTextColor="#b0b7c3" />

            <Text style={styles.lbl}>Icon</Text>
            <View style={styles.iconRow}>
              {ICONS.map((ic) => (
                <TouchableOpacity
                  key={ic}
                  style={[styles.iconBtn, ic === icon && styles.iconBtnSel]}
                  onPress={() => setIcon(ic)}
                >
                  <Text style={{ fontSize: 16 }}>{ic}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.lbl}>Color</Text>
            <View style={styles.colorRow}>
              {PALETTE.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[styles.colorDot, { backgroundColor: c }, c === color && styles.colorDotSel]}
                  onPress={() => setColor(c)}
                />
              ))}
            </View>

            <Text style={styles.lbl}>Total topics</Text>
            <TextInput style={[styles.inp, { marginBottom: 6 }]} value={topics} onChangeText={setTopics} placeholder="10" placeholderTextColor="#b0b7c3" keyboardType="numeric" />

            {error ? <View style={styles.errBox}><Text style={styles.errTxt}>{error}</Text></View> : null}

            <TouchableOpacity style={styles.saveBtn} onPress={saveSubject} activeOpacity={0.85}>
              <Text style={styles.saveTxt}>Add Subject</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  hdr: { backgroundColor: '#e8365d', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24, borderBottomLeftRadius: 22, borderBottomRightRadius: 22 },
  hdrTitle: { fontSize: 18, fontWeight: '900', color: '#fff' },
  hdrSub: { fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 3 },
  list: { flex: 1 },
  card: { backgroundColor: COLORS.card, borderRadius: 13, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  ico: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  cardName: { fontSize: 13, fontWeight: '800', color: COLORS.text },
  cardSub: { fontSize: 10, color: COLORS.muted, marginTop: 2 },
  pct: { fontSize: 14, fontWeight: '900', flexShrink: 0 },
  track: { width: '100%', height: 4, backgroundColor: '#f1f5f9', borderRadius: 2, marginTop: 9, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 2 },
  addBtn: { backgroundColor: COLORS.primaryBg, borderRadius: 13, paddingVertical: 12, alignItems: 'center', borderWidth: 1.5, borderColor: COLORS.primaryLight, borderStyle: 'dashed', marginTop: 2 },
  addBtnTxt: { color: COLORS.primary, fontWeight: '800', fontSize: 13 },
  // Modal
  overlay: { flex: 1, backgroundColor: 'rgba(15,15,30,0.5)', alignItems: 'center', justifyContent: 'center' },
  modal: { backgroundColor: COLORS.card, borderRadius: 18, padding: 20, width: '88%', maxHeight: '85%' },
  modalTitle: { fontSize: 15, fontWeight: '900', color: COLORS.text },
  lbl: { fontSize: 11, fontWeight: '700', color: COLORS.text, marginBottom: 5, marginTop: 10 },
  inp: { borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 11, padding: 11, fontSize: 13, color: COLORS.text, backgroundColor: COLORS.bg },
  iconRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginVertical: 5 },
  iconBtn: { width: 32, height: 32, borderRadius: 9, borderWidth: 1.5, borderColor: COLORS.border, backgroundColor: '#f8fafc', alignItems: 'center', justifyContent: 'center' },
  iconBtnSel: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryBg },
  colorRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginVertical: 5 },
  colorDot: { width: 26, height: 26, borderRadius: 13 },
  colorDotSel: { borderWidth: 3, borderColor: COLORS.primary },
  errBox: { backgroundColor: '#fef2f2', borderRadius: 9, padding: 9, marginTop: 6, borderWidth: 1, borderColor: '#fecaca' },
  errTxt: { fontSize: 12, color: COLORS.red },
  saveBtn: { backgroundColor: COLORS.primary, borderRadius: 13, paddingVertical: 13, alignItems: 'center', marginTop: 12 },
  saveTxt: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
