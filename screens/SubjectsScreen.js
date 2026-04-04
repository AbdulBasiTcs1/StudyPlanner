// screens/SubjectsScreen.js
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StatusBar, Modal, TextInput,
} from 'react-native';
import { useApp } from '../AppContext';
import { COLORS, ICONS, PALETTE } from '../theme';

export default function SubjectsScreen() {
  const { user, subjects, addSubject } = useApp();
  const [modalVisible, setModalVisible] = useState(false);
  const [name,         setName]         = useState('');
  const [topics,       setTopics]       = useState('10');
  const [icon,         setIcon]         = useState('💻');
  const [color,        setColor]        = useState(COLORS.primary);
  const [error,        setError]        = useState('');

  function openModal() {
    setName(''); setTopics('10'); setIcon('💻'); setColor(COLORS.primary); setError('');
    setModalVisible(true);
  }

  function saveSubject() {
    if (!name.trim()) { setError('Please enter a subject name.'); return; }
    addSubject({ name: name.trim(), icon, color, topics: parseInt(topics) || 10 });
    setModalVisible(false);
  }

  return (
    <View className="flex-1 bg-bg">
      <StatusBar barStyle="light-content" backgroundColor="#e8365d" />

      {/* ── Header ──────────────────────────────────── */}
      <View
        className="px-5 pt-5 pb-6 rounded-b-[24px]"
        style={{ backgroundColor: '#e8365d' }}
      >
        <Text className="text-xl font-black text-white">My Subjects</Text>
        <Text className="text-xs text-white/65 mt-1">
          {user.sem} · {subjects.length} subjects
        </Text>
      </View>

      {/* ── Subject list ────────────────────────────── */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 14, paddingBottom: 24 }}
      >
        {subjects.map((s, i) => {
          const pct = s.topics > 0 ? Math.round((s.done / s.topics) * 100) : 0;
          return (
            <TouchableOpacity
              key={i}
              className="bg-card rounded-2xl p-3.5 mb-2.5 border border-border"
              activeOpacity={0.85}
            >
              <View className="flex-row items-center gap-3">
                {/* Icon bubble */}
                <View
                  className="w-11 h-11 rounded-2xl items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: s.color + '20' }}
                >
                  <Text className="text-2xl">{s.icon}</Text>
                </View>

                {/* Info */}
                <View className="flex-1 min-w-0">
                  <Text className="text-sm font-extrabold text-text" numberOfLines={1}>
                    {s.name}
                  </Text>
                  <Text className="text-[10px] text-muted mt-0.5">
                    {s.topics} topics · {s.topics - s.done} pending
                  </Text>
                </View>

                {/* Percentage */}
                <Text className="text-sm font-black flex-shrink-0" style={{ color: s.color }}>
                  {pct}%
                </Text>
              </View>

              {/* Progress bar */}
              <View className="w-full h-1.5 bg-border rounded-full mt-3 overflow-hidden">
                <View
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: s.color }}
                />
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Add button */}
        <TouchableOpacity
          className="bg-primaryBg rounded-2xl py-3.5 items-center border-2 border-dashed border-primary/30 mt-1"
          onPress={openModal}
          activeOpacity={0.8}
        >
          <Text className="text-primary font-extrabold text-sm">＋ Add New Subject</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ── Add Subject Modal ────────────────────────── */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 items-center justify-center" style={{ backgroundColor: 'rgba(15,15,30,0.55)' }}>
          <View className="bg-card rounded-3xl p-5 w-[90%] max-h-[88%]" style={{ elevation: 20 }}>

            {/* Modal header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-base font-black text-text">Add Subject</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="text-xl text-muted">✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Name */}
              <Text className="text-xs font-bold text-text mb-1.5">Subject name *</Text>
              <TextInput
                className="border-2 border-border rounded-2xl p-3.5 text-sm text-text bg-bg mb-3"
                value={name}
                onChangeText={setName}
                placeholder="e.g. Machine Learning"
                placeholderTextColor="#b0b7c3"
              />

              {/* Icon picker */}
              <Text className="text-xs font-bold text-text mb-2">Icon</Text>
              <View className="flex-row flex-wrap gap-2 mb-3">
                {ICONS.map((ic) => (
                  <TouchableOpacity
                    key={ic}
                    className={`w-9 h-9 rounded-xl border-2 items-center justify-center ${
                      ic === icon ? 'border-primary bg-primaryBg' : 'border-border bg-bg'
                    }`}
                    onPress={() => setIcon(ic)}
                  >
                    <Text className="text-xl">{ic}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Color picker */}
              <Text className="text-xs font-bold text-text mb-2">Color</Text>
              <View className="flex-row gap-2.5 flex-wrap mb-3">
                {PALETTE.map((c) => (
                  <TouchableOpacity
                    key={c}
                    className={`w-7 h-7 rounded-full ${c === color ? 'border-[3px] border-primary/50' : ''}`}
                    style={{ backgroundColor: c }}
                    onPress={() => setColor(c)}
                  />
                ))}
              </View>

              {/* Topics */}
              <Text className="text-xs font-bold text-text mb-1.5">Total topics</Text>
              <TextInput
                className="border-2 border-border rounded-2xl p-3.5 text-sm text-text bg-bg mb-2"
                value={topics}
                onChangeText={setTopics}
                placeholder="10"
                placeholderTextColor="#b0b7c3"
                keyboardType="numeric"
              />

              {/* Error */}
              {error ? (
                <View className="bg-red/10 rounded-xl p-3 mb-2 border border-red/30">
                  <Text className="text-xs text-red font-semibold">⚠️ {error}</Text>
                </View>
              ) : null}

              {/* Save */}
              <TouchableOpacity
                className="bg-primary rounded-2xl py-4 items-center mt-2"
                onPress={saveSubject}
                activeOpacity={0.85}
              >
                <Text className="text-white font-extrabold text-base">Add Subject</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
