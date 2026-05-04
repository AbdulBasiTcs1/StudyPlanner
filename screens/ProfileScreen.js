// screens/ProfileScreen.js
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StatusBar, Alert, Modal, TextInput
} from 'react-native';
import { useApp } from '../AppContext';
import { COLORS } from '../theme';
import { useNavigation } from '@react-navigation/native';

function getInitials(name) {
  return name.split(' ').map((w) => w[0] || '').join('').toUpperCase().slice(0, 2);
}

export default function ProfileScreen() {
  const { user, updateUserProfile } = useApp();
  const navigation = useNavigation();

  // Edit Profile State
  const [modalVisible, setModalVisible] = useState(false);
  const [editName, setEditName] = useState('');
  const [editReg, setEditReg] = useState('');
  const [editSem, setEditSem] = useState('');

  const SETTINGS_GROUPS = [
    {
      title: 'Account',
      items: [
        { icon: '✏️', label: 'Edit Profile',     action: openEditModal },
        { icon: '🔔', label: 'Notifications',    msg: 'Notifications toggled!'       },
        { icon: '⏰', label: 'Study Reminders',  msg: 'Set your daily reminder!'     },
      ],
    },
    {
      title: 'App',
      items: [
        { icon: '🍅', label: 'Pomodoro Timer',   msg: 'Pomodoro timer coming soon!'                          },
        { icon: '🌙', label: 'Dark Mode',         msg: 'Dark mode toggled!'                                   },
        { icon: 'ℹ️', label: 'About App',         msg: 'StudyPlanner v1.0 · React Native · SP24-BCS-033'    },
      ],
    },
    {
      title: 'Lab Assignment #3',
      items: [
        { icon: '🤖', label: 'AI Study Assistant', route: 'AiAssistant' },
      ],
    },
  ];

  function openEditModal() {
    setEditName(user.name);
    setEditReg(user.reg);
    setEditSem(user.sem);
    setModalVisible(true);
  }

  function saveProfile() {
    updateUserProfile({
      name: editName,
      reg: editReg,
      sem: editSem
    });
    setModalVisible(false);
  }

  function doLogout() {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('Login') },
    ]);
  }

  const initials = getInitials(user.name);

  return (
    <View className="flex-1 bg-bg">
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* ── Profile header ────────────────────────── */}
      <View className="bg-primary px-5 pt-6 pb-8 rounded-b-[28px] items-center gap-2">
        <View className="w-16 h-16 rounded-full bg-white/25 border-[3px] border-white/35 items-center justify-center mb-1">
          <Text className="text-2xl font-black text-white">{initials}</Text>
        </View>
        <Text className="text-lg font-black text-white">{user.name}</Text>
        <Text className="text-xs text-white/65">{user.email}</Text>
        <View className="bg-white/20 rounded-full px-4 py-1 mt-0.5">
          <Text className="text-white text-xs font-bold">{user.reg} · {user.sem}</Text>
        </View>
      </View>

      {/* ── Settings ──────────────────────────────── */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 14, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {SETTINGS_GROUPS.map((group, gi) => (
          <View key={gi} className="mb-3">
            <Text className="text-xs font-bold text-muted uppercase tracking-widest mb-1.5 ml-1">
              {group.title}
            </Text>
            <View className="bg-card rounded-2xl border border-border overflow-hidden">
              {group.items.map((item, ii) => (
                <TouchableOpacity
                  key={ii}
                  className={`flex-row items-center gap-3 px-4 py-3.5 ${
                    ii < group.items.length - 1 ? 'border-b border-border' : ''
                  }`}
                  onPress={() => {
                    if (item.action) {
                      item.action();
                    } else if (item.route) {
                      navigation.navigate(item.route);
                    } else {
                      Alert.alert('', item.msg);
                    }
                  }}
                  activeOpacity={0.75}
                >
                  <Text className="text-base w-5 text-center">{item.icon}</Text>
                  <Text className="flex-1 text-sm font-semibold text-text">{item.label}</Text>
                  <Text className="text-base text-muted">›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* ── Logout ─────────────────────────────── */}
        <TouchableOpacity
          className="bg-red/10 rounded-2xl py-4 items-center border-2 border-red/30 mt-2"
          onPress={doLogout}
          activeOpacity={0.85}
        >
          <Text className="text-red font-extrabold text-sm">🚪  Logout</Text>
        </TouchableOpacity>

        <Text className="text-center text-[10px] text-muted mt-4">
          StudyPlanner v1.0 · SP24-BCS-033 · CUIATK
        </Text>
      </ScrollView>

      {/* ── Edit Profile Modal ────────────────────────── */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 items-center justify-center" style={{ backgroundColor: 'rgba(15,15,30,0.55)' }}>
          <View className="bg-card rounded-3xl p-5 w-[85%]" style={{ elevation: 20 }}>
            <Text className="text-base font-black text-text mb-4">Edit Profile</Text>

            <Text className="text-xs font-bold text-text mb-1">Name</Text>
            <TextInput
              className="border border-border rounded-xl p-3 text-sm text-text bg-bg mb-3"
              value={editName}
              onChangeText={setEditName}
            />

            <Text className="text-xs font-bold text-text mb-1">Reg Number</Text>
            <TextInput
              className="border border-border rounded-xl p-3 text-sm text-text bg-bg mb-3"
              value={editReg}
              onChangeText={setEditReg}
            />

            <Text className="text-xs font-bold text-text mb-1">Semester</Text>
            <TextInput
              className="border border-border rounded-xl p-3 text-sm text-text bg-bg mb-5"
              value={editSem}
              onChangeText={setEditSem}
            />

            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 bg-bg border border-border rounded-xl py-3 items-center"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-text font-bold text-sm">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-primary rounded-xl py-3 items-center"
                onPress={saveProfile}
              >
                <Text className="text-white font-bold text-sm">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
