// screens/ProfileScreen.js
import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StatusBar, Alert,
} from 'react-native';
import { useApp } from '../AppContext';
import { COLORS } from '../theme';
import { useNavigation } from '@react-navigation/native';

function getInitials(name) {
  return name.split(' ').map((w) => w[0] || '').join('').toUpperCase().slice(0, 2);
}

const SETTINGS_GROUPS = [
  {
    title: 'Account',
    items: [
      { icon: '✏️', label: 'Edit Profile',     msg: 'Edit profile — coming soon!' },
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
    title: 'Lab #16 (Firebase)',
    items: [
      { icon: '📝', label: 'Insert Record',     route: 'InsertRecord' },
      { icon: '📂', label: 'View Records',      route: 'ViewRecords'   },
    ],
  },
];

export default function ProfileScreen() {
  const { user } = useApp();
  const navigation = useNavigation();

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
        {/* Avatar */}
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
            {/* Group title */}
            <Text className="text-xs font-bold text-muted uppercase tracking-widest mb-1.5 ml-1">
              {group.title}
            </Text>
            {/* Group items */}
            <View className="bg-card rounded-2xl border border-border overflow-hidden">
              {group.items.map((item, ii) => (
                <TouchableOpacity
                  key={ii}
                  className={`flex-row items-center gap-3 px-4 py-3.5 ${
                    ii < group.items.length - 1 ? 'border-b border-border' : ''
                  }`}
                  onPress={() => {
                    if (item.route) {
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

        {/* App version */}
        <Text className="text-center text-[10px] text-muted mt-4">
          StudyPlanner v1.0 · SP24-BCS-033 · CUIATK
        </Text>
      </ScrollView>
    </View>
  );
}
