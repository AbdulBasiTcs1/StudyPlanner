// screens/ProfileScreen.js
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  StatusBar, Alert,
} from 'react-native';
import { useApp } from '../AppContext';
import { COLORS } from '../theme';
import { useNavigation } from '@react-navigation/native';

function getInitials(name) {
  return name.split(' ').map((x) => x[0] || '').join('').toUpperCase().slice(0, 2);
}

export default function ProfileScreen() {
  const { user } = useApp();
  const navigation = useNavigation();

  function doLogout() {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => navigation.replace('Login'),
      },
    ]);
  }

  function showToast(msg) {
    Alert.alert('', msg);
  }

  const settings = [
    {
      section: [
        { icon: '✏️', label: 'Edit Profile', onPress: () => showToast('Edit profile — coming soon!') },
        { icon: '🔔', label: 'Notifications', onPress: () => showToast('Notifications toggled!') },
        { icon: '⏰', label: 'Study Reminders', onPress: () => showToast('Set your daily reminder!') },
      ],
    },
    {
      section: [
        { icon: '🍅', label: 'Pomodoro Timer', onPress: () => showToast('Pomodoro timer coming soon!') },
        { icon: '🌙', label: 'Dark Mode', onPress: () => showToast('Dark mode toggled!') },
        { icon: 'ℹ️', label: 'About App', onPress: () => showToast('StudyPlanner v1.0 · React Native · SP24-BCS-033') },
      ],
    },
  ];

  return (
    <View className="flex-1 bg-bg">
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View className="bg-primary px-4 pt-5 pb-7 rounded-b-3xl items-center gap-1.5">
        <View className="w-[62px] h-[62px] rounded-full bg-white/20 border-[3px] border-white/30 items-center justify-center">
          <Text className="text-[22px] font-black text-white">{getInitials(user.name)}</Text>
        </View>
        <Text className="text-[17px] font-black text-white">{user.name}</Text>
        <Text className="text-[11px] text-white/65">{user.email}</Text>
        <View className="bg-white/15 rounded-full px-3 py-1 mt-0.5">
          <Text className="text-white text-[11px] font-bold">{user.reg} · {user.sem}</Text>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 12, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        {settings.map((group, gi) => (
          <View key={gi} className="bg-card rounded-xl border border-border overflow-hidden mb-2.5">
            {group.section.map((item, ii) => (
              <TouchableOpacity
                key={ii}
                className={`flex-row items-center gap-3 p-3.5 ${ii < group.section.length - 1 ? 'border-b border-border' : ''}`}
                onPress={item.onPress}
                activeOpacity={0.75}
              >
                <Text className="text-base w-5 text-center">{item.icon}</Text>
                <Text className="flex-1 text-[13px] font-semibold text-text">{item.label}</Text>
                <Text className="text-sm text-muted">›</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <TouchableOpacity className="bg-red/10 rounded-xl py-3.5 items-center border-[1.5px] border-red/40" onPress={doLogout} activeOpacity={0.85}>
          <Text className="text-red font-extrabold text-sm">🚪 Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});

