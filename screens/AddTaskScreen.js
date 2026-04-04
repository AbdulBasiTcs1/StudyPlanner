// screens/AddTaskScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useApp } from '../AppContext';
import { COLORS } from '../theme';

const PRIORITY_ITEMS = [
  { key: 'h', label: '🔴 High', bg: 'bg-red/10',   text: 'text-red',   border: 'border-red'   },
  { key: 'm', label: '🟡 Med',  bg: 'bg-amber/10', text: 'text-amber', border: 'border-amber' },
  { key: 'l', label: '🟢 Low',  bg: 'bg-green/10', text: 'text-green', border: 'border-green' },
];

export default function AddTaskScreen({ navigation }) {
  const { subjects, addTask } = useApp();
  const today = new Date().toISOString().split('T')[0];

  const [title,    setTitle]    = useState('');
  const [subjIdx,  setSubjIdx]  = useState(0);
  const [prio,     setPrio]     = useState('h');
  const [time,     setTime]     = useState('09:00');
  const [dur,      setDur]      = useState('');
  const [due,      setDue]      = useState(today);
  const [notes,    setNotes]    = useState('');
  const [error,    setError]    = useState('');

  function save() {
    if (!title.trim()) {
      setError('Please enter a task title.');
      return;
    }
    setError('');
    addTask({
      title: title.trim(),
      time,
      dur:   dur.trim(),
      due,
      notes: notes.trim(),
      p:     prio,
      si:    subjIdx,
    });
    setTitle('');
    setDur('');
    setNotes('');
    navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* ── Header ──────────────────────────────────────── */}
      <View className="bg-primary px-[15px] pt-3.5 pb-4 rounded-b-[18px] flex-row justify-between items-center">
        <View>
          <Text className="text-[16px] font-black text-white">Add Task</Text>
          <Text className="text-[11px] text-white/60 mt-0.5">Schedule a study session</Text>
        </View>
        <TouchableOpacity
          className="w-[27px] h-[27px] rounded-full bg-white/18 items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white text-[13px] font-bold">✕</Text>
        </TouchableOpacity>
      </View>

      {/* ── Form ────────────────────────────────────────── */}
      <ScrollView
        className="flex-1 bg-bg"
        contentContainerStyle={{ paddingHorizontal: 13, paddingTop: 12, paddingBottom: 30 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Task title */}
        <Text className="text-[11px] font-bold text-text mt-2.5 mb-1">Task title *</Text>
        <TextInput
          className="border-[1.5px] border-border rounded-xl p-2.5 px-3 text-[13px] text-text bg-card"
          value={title}
          onChangeText={setTitle}
          placeholder="e.g. ML Assignment #3"
          placeholderTextColor="#b0b7c3"
        />

        {/* Subject */}
        <Text className="text-[11px] font-bold text-text mt-2.5 mb-1">Subject</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-1.5 mt-1">
            {subjects.map((s, i) => (
              <TouchableOpacity
                key={i}
                className={`px-[9px] py-1.5 rounded-lg border-2 ${
                  i === subjIdx
                    ? 'bg-primaryBg border-primary/20'
                    : 'bg-[#f1f5f9] border-transparent'
                }`}
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

        {/* Priority */}
        <Text className="text-[11px] font-bold text-text mt-2.5 mb-1">Priority</Text>
        <View className="flex-row gap-1.5 mt-1">
          {PRIORITY_ITEMS.map((p) => (
            <TouchableOpacity
              key={p.key}
              className={`flex-1 border-2 rounded-lg py-2 items-center ${p.bg} ${
                prio === p.key ? p.border : 'border-transparent opacity-40'
              }`}
              onPress={() => setPrio(p.key)}
              activeOpacity={0.8}
            >
              <Text className={`text-[10px] font-bold ${p.text}`}>{p.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Time & Duration */}
        <Text className="text-[11px] font-bold text-text mt-2.5 mb-1">Time & duration</Text>
        <View className="flex-row gap-1.5">
          <TextInput
            className="flex-1 border-[1.5px] border-border rounded-xl p-2.5 px-3 text-[13px] text-text bg-card"
            value={time}
            onChangeText={setTime}
            placeholder="09:00"
            placeholderTextColor="#b0b7c3"
          />
          <TextInput
            className="flex-1 border-[1.5px] border-border rounded-xl p-2.5 px-3 text-[13px] text-text bg-card"
            value={dur}
            onChangeText={setDur}
            placeholder="e.g. 2h"
            placeholderTextColor="#b0b7c3"
          />
        </View>

        {/* Due date */}
        <Text className="text-[11px] font-bold text-text mt-2.5 mb-1">Due date</Text>
        <TextInput
          className="border-[1.5px] border-border rounded-xl p-2.5 px-3 text-[13px] text-text bg-card"
          value={due}
          onChangeText={setDue}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#b0b7c3"
        />

        {/* Notes */}
        <Text className="text-[11px] font-bold text-text mt-2.5 mb-1">Notes (optional)</Text>
        <TextInput
          className="border-[1.5px] border-border rounded-xl p-2.5 px-3 text-[13px] text-text bg-card"
          style={{ height: 60, textAlignVertical: 'top' }}
          value={notes}
          onChangeText={setNotes}
          placeholder="Extra details..."
          placeholderTextColor="#b0b7c3"
          multiline
        />

        {/* Error */}
        {error ? (
          <View className="bg-red/10 rounded-xl p-3 mt-3 border border-red/30">
            <Text className="text-xs text-red font-semibold">⚠️ {error}</Text>
          </View>
        ) : null}

        {/* Save button */}
        <TouchableOpacity
          className="bg-primary rounded-2xl py-4 items-center mt-5"
          onPress={save}
          activeOpacity={0.85}
        >
          <Text className="text-white font-extrabold text-base">✅ Save Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
