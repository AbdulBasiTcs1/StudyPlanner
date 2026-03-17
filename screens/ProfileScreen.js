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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.hdr}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTxt}>{getInitials(user.name)}</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeTxt}>{user.reg} · {user.sem}</Text>
        </View>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={{ padding: 12, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        {settings.map((group, gi) => (
          <View key={gi} style={styles.section}>
            {group.section.map((item, ii) => (
              <TouchableOpacity
                key={ii}
                style={[styles.row, ii < group.section.length - 1 && styles.rowBorder]}
                onPress={item.onPress}
                activeOpacity={0.75}
              >
                <Text style={styles.rowIcon}>{item.icon}</Text>
                <Text style={styles.rowLabel}>{item.label}</Text>
                <Text style={styles.rowArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.logoutBtn} onPress={doLogout} activeOpacity={0.85}>
          <Text style={styles.logoutTxt}>🚪 Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  hdr: { backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingTop: 20, paddingBottom: 28, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, alignItems: 'center', gap: 5 },
  avatar: { width: 62, height: 62, borderRadius: 31, backgroundColor: 'rgba(255,255,255,0.18)', borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { fontSize: 22, fontWeight: '900', color: '#fff' },
  name: { fontSize: 17, fontWeight: '900', color: '#fff' },
  email: { fontSize: 11, color: 'rgba(255,255,255,0.65)' },
  badge: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 13, paddingHorizontal: 12, paddingVertical: 4, marginTop: 2 },
  badgeTxt: { color: '#fff', fontSize: 11, fontWeight: '700' },
  body: { flex: 1 },
  section: { backgroundColor: COLORS.card, borderRadius: 13, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 13 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  rowIcon: { fontSize: 16, width: 20, textAlign: 'center' },
  rowLabel: { flex: 1, fontSize: 13, fontWeight: '600', color: COLORS.text },
  rowArrow: { fontSize: 14, color: COLORS.muted },
  logoutBtn: { backgroundColor: '#fef2f2', borderRadius: 13, paddingVertical: 13, alignItems: 'center', borderWidth: 1.5, borderColor: '#fecaca' },
  logoutTxt: { color: COLORS.red, fontWeight: '800', fontSize: 14 },
});
