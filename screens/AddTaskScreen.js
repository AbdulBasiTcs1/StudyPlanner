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
      <View className="bg-primary px-5 pt-5 pb-5 rounded-b-[20px] flex-row justify-between items-center">
        <View>
          <Text className="text-lg font-black text-white">Add Task</Text>
          <Text className="text-xs text-white/60 mt-0.5">Schedule a study session</Text>
        </View>
        <TouchableOpacity
          className="w-8 h-8 rounded-full bg-white/20 items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white text-sm font-bold">✕</Text>
        </TouchableOpacity>
      </View>

      {/* ── Form ────────────────────────────────────────── */}
      <ScrollView
        className="flex-1 bg-bg"
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Task title */}
        <Text className="text-xs font-bold text-text mt-3 mb-1.5">Task title *</Text>
        <TextInput
          className="border-2 border-border rounded-2xl p-3.5 text-sm text-text bg-card"
          value={title}
          onChangeText={setTitle}
          placeholder="e.g. ML Assignment #3"
          placeholderTextColor="#b0b7c3"
        />

        {/* Subject */}
        <Text className="text-xs font-bold text-text mt-4 mb-1.5">Subject</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {subjects.map((s, i) => (
              <TouchableOpacity
                key={i}
                className={`px-3.5 py-2 rounded-xl border-2 ${
                  i === subjIdx
                    ? 'bg-primaryBg border-primary/30'
                    : 'bg-card border-border'
                }`}
                onPress={() => setSubjIdx(i)}
                activeOpacity={0.75}
              >
                <Text className={`text-xs font-bold ${i === subjIdx ? 'text-primary' : 'text-muted'}`}>
                  {s.icon} {s.name.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Priority */}
        <Text className="text-xs font-bold text-text mt-4 mb-1.5">Priority</Text>
        <View className="flex-row gap-2">
          {PRIORITY_ITEMS.map((p) => (
            <TouchableOpacity
              key={p.key}
              className={`flex-1 border-2 rounded-xl py-2 items-center ${p.bg} ${
                prio === p.key ? p.border : 'border-transparent opacity-40'
              }`}
              onPress={() => setPrio(p.key)}
              activeOpacity={0.8}
            >
              <Text className={`text-xs font-bold ${p.text}`}>{p.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Time & Duration */}
        <Text className="text-xs font-bold text-text mt-4 mb-1.5">Time & duration</Text>
        <View className="flex-row gap-2">
          <TextInput
            className="flex-1 border-2 border-border rounded-2xl p-3.5 text-sm text-text bg-card"
            value={time}
            onChangeText={setTime}
            placeholder="09:00"
            placeholderTextColor="#b0b7c3"
          />
          <TextInput
            className="flex-1 border-2 border-border rounded-2xl p-3.5 text-sm text-text bg-card"
            value={dur}
            onChangeText={setDur}
            placeholder="e.g. 2h"
            placeholderTextColor="#b0b7c3"
          />
        </View>

        {/* Due date */}
        <Text className="text-xs font-bold text-text mt-4 mb-1.5">Due date</Text>
        <TextInput
          className="border-2 border-border rounded-2xl p-3.5 text-sm text-text bg-card"
          value={due}
          onChangeText={setDue}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#b0b7c3"
        />

        {/* Notes */}
        <Text className="text-xs font-bold text-text mt-4 mb-1.5">Notes (optional)</Text>
        <TextInput
          className="border-2 border-border rounded-2xl p-3.5 text-sm text-text bg-card"
          style={{ height: 80, textAlignVertical: 'top' }}
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
