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
      <TouchableOpacity key={i} className="bg-card rounded-xl p-3 mb-2 border border-border" activeOpacity={0.85}>
        <View className="flex-row items-center gap-2.5">
          <View 
            className="w-10 h-10 rounded-xl items-center justify-center flex-shrink-0"
            style={{ backgroundColor: s.color + '20' }}
          >
            <Text className="text-xl">{s.icon}</Text>
          </View>
          <View className="flex-1 min-w-0">
            <Text className="text-[13px] font-extrabold text-text" numberOfLines={1}>{s.name}</Text>
            <Text className="text-[10px] text-muted mt-0.5">{s.topics} topics · {s.topics - s.done} pending</Text>
          </View>
          <Text className="text-sm font-black flex-shrink-0" style={{ color: s.color }}>{pct}%</Text>
        </View>
        <View className="w-full h-1 bg-[#f1f5f9] rounded-full mt-2.5 overflow-hidden">
          <View 
            className="h-full rounded-full" 
            style={{ width: pct + '%', backgroundColor: s.color }} 
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View className="flex-1 bg-bg">
      <StatusBar barStyle="light-content" backgroundColor="#e8365d" />
      <View className="bg-[#e8365d] px-4 pt-4 pb-6 rounded-b-[22px]">
        <Text className="text-lg font-black text-white">My Subjects</Text>
        <Text className="text-[11px] text-white/65 mt-1">{user.sem} · {subjects.length} subjects</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 12, paddingBottom: 20 }}>
        {subjects.map((s, i) => renderSubject(s, i))}
        <TouchableOpacity 
          className="bg-primaryBg rounded-xl py-3 items-center border-[1.5px] border-primary/30 border-dashed mt-0.5" 
          onPress={openModal} 
          activeOpacity={0.8}
        >
          <Text className="text-primary font-extrabold text-[13px]">＋ Add New Subject</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Subject Modal */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 bg-[#0f0f1e]/50 items-center justify-center">
          <View className="bg-card rounded-[18px] p-5 w-[88%] max-h-[85%] shadow-xl">
            <View className="flex-row justify-between items-center mb-3.5">
              <Text className="text-base font-black text-text">Add Subject</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="text-xl text-muted">✕</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-[11px] font-bold text-text mb-1.5 mt-2.5">Subject name *</Text>
            <TextInput 
              className="border-[1.5px] border-border rounded-xl p-3 text-[13px] text-text bg-bg mb-2.5" 
              value={name} onChangeText={setName} placeholder="e.g. Machine Learning" placeholderTextColor="#b0b7c3" 
            />

            <Text className="text-[11px] font-bold text-text mb-1.5 mt-2.5">Icon</Text>
            <View className="flex-row flex-wrap gap-1.5 my-1">
              {ICONS.map((ic) => (
                <TouchableOpacity
                  key={ic}
                  className={`w-8 h-8 rounded-lg border-[1.5px] items-center justify-center ${ic === icon ? 'border-primary bg-primaryBg' : 'border-border bg-[#f8fafc]'}`}
                  onPress={() => setIcon(ic)}
                >
                  <Text className="text-base">{ic}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-[11px] font-bold text-text mb-1.5 mt-2.5">Color</Text>
            <View className="flex-row gap-2 flex-wrap my-1">
              {PALETTE.map((c) => (
                <TouchableOpacity
                  key={c}
                  className={`w-[26px] h-[26px] rounded-full ${c === color ? 'border-[3px] border-primary/40' : ''}`}
                  style={{ backgroundColor: c }}
                  onPress={() => setColor(c)}
                />
              ))}
            </View>

            <Text className="text-[11px] font-bold text-text mb-1.5 mt-2.5">Total topics</Text>
            <TextInput 
              className="border-[1.5px] border-border rounded-xl p-3 text-[13px] text-text bg-bg mb-1.5" 
              value={topics} onChangeText={setTopics} placeholder="10" placeholderTextColor="#b0b7c3" keyboardType="numeric" 
            />

            {error ? (
              <View className="bg-red/10 rounded-lg p-2.5 mt-1.5 border border-red/40">
                <Text className="text-xs text-red">{error}</Text>
              </View>
            ) : null}

            <TouchableOpacity className="bg-primary rounded-xl py-3.5 items-center mt-3" onPress={saveSubject} activeOpacity={0.85}>
              <Text className="text-white font-extrabold text-[15px]">Add Subject</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});

