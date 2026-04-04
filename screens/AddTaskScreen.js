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
    { key: 'h', label: '🔴 High', bg: 'bg-red/10', color: 'text-red', border: 'border-red' },
    { key: 'm', label: '🟡 Med',  bg: 'bg-amber/10', color: 'text-amber', border: 'border-amber' },
    { key: 'l', label: '🟢 Low',  bg: 'bg-green/10', color: 'text-green', border: 'border-green' },
  ];

  return (
    <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View className="bg-primary px-4 pt-4 pb-4.5 rounded-b-[18px] flex-row justify-between items-center">
        <View>
          <Text className="text-[17px] font-black text-white">Add Task</Text>
          <Text className="text-[11px] text-white/60 mt-0.5">Schedule a study session</Text>
        </View>
        <TouchableOpacity className="w-[30px] h-[30px] rounded-full bg-white/20 items-center justify-center" onPress={() => navigation.goBack()}>
          <Text className="text-white text-sm">✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-bg" contentContainerStyle={{ padding: 14, paddingBottom: 30 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text className="text-[11px] font-bold text-text mt-3 mb-1.5">Task title *</Text>
        <TextInput className="border-2 border-border rounded-xl p-3 text-[13px] text-text bg-card" value={title} onChangeText={setTitle} placeholder="e.g. ML Assignment #3" placeholderTextColor="#b0b7c3" />

        <Text className="text-[11px] font-bold text-text mt-3 mb-1.5">Subject</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-1">
          <View className="flex-row gap-1.5 mt-1">
            {subjects.map((s, i) => (
              <TouchableOpacity
                key={i}
                className={`px-3 py-1.5 rounded-lg border-2 ${i === subjIdx ? 'bg-primaryBg border-primary/20' : 'bg-[#f1f5f9] border-transparent'}`}
                onPress={() => setSubjIdx(i)}
                activeOpacity={0.75}
              >
                <Text className={`text-[11px] font-bold ${i === subjIdx ? 'text-primary' : 'text-muted'}`}>
                  {s.icon} {s.name.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Text className="text-[11px] font-bold text-text mt-3 mb-1.5">Priority</Text>
        <View className="flex-row gap-1.5 mt-1">
          {prioItems.map((p) => (
            <TouchableOpacity
              key={p.key}
              className={`flex-1 border-2 rounded-lg py-2 items-center ${p.bg} ${p.border} ${prio !== p.key ? 'opacity-40 border-transparent' : ''}`}
              onPress={() => setPrio(p.key)}
              activeOpacity={0.8}
            >
              <Text className={`text-[11px] font-bold ${p.color}`}>{p.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-[11px] font-bold text-text mt-3 mb-1.5">Time & duration</Text>
        <View className="flex-row gap-2">
          <TextInput className="flex-1 border-2 border-border rounded-xl p-3 text-[13px] text-text bg-card" value={time} onChangeText={setTime} placeholder="09:00" placeholderTextColor="#b0b7c3" />
          <TextInput className="flex-1 border-2 border-border rounded-xl p-3 text-[13px] text-text bg-card" value={dur} onChangeText={setDur} placeholder="e.g. 2h" placeholderTextColor="#b0b7c3" />
        </View>

        <Text className="text-[11px] font-bold text-text mt-3 mb-1.5">Due date</Text>
        <TextInput className="border-2 border-border rounded-xl p-3 text-[13px] text-text bg-card" value={due} onChangeText={setDue} placeholder="YYYY-MM-DD" placeholderTextColor="#b0b7c3" />

        <Text className="text-[11px] font-bold text-text mt-3 mb-1.5">Notes (optional)</Text>
        <TextInput
          className="border-2 border-border rounded-xl p-3 text-[13px] text-text bg-card h-[72px]"
          style={{ textAlignVertical: 'top' }}
          value={notes}
          onChangeText={setNotes}
          placeholder="Extra details..."
          placeholderTextColor="#b0b7c3"
          multiline
        />

        {error ? (
          <View className="bg-red/10 rounded-lg p-2.5 mt-2 border border-red/40"><Text className="text-xs text-red">{error}</Text></View>
        ) : null}

        <TouchableOpacity className="bg-primary rounded-xl py-3.5 items-center mt-3.5" onPress={save} activeOpacity={0.85}>
          <Text className="text-white font-extrabold text-[15px]">✅ Save Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});

