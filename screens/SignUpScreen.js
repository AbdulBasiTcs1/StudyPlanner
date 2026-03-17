// screens/SignUpScreen.js
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useApp } from '../AppContext';
import { COLORS } from '../theme';

const SEMESTERS = ['Semester 1','Semester 2','Semester 3','Semester 4','Semester 5','Semester 6','Semester 7','Semester 8'];

export default function SignUpScreen({ navigation }) {
  const { setUser } = useApp();
  const [name, setName] = useState('Abdul Basit');
  const [reg, setReg] = useState('SP24-BCS-033');
  const [email, setEmail] = useState('sp24-bcs-033@cuiatk.edu.pk');
  const [password, setPassword] = useState('');
  const [semIdx, setSemIdx] = useState(4); // Semester 5
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function doSignup() {
    if (!name || !reg || !email || !password) {
      setError('Please fill in all fields.');
      setSuccess('');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setSuccess('');
      return;
    }
    setError('');
    setUser({ name, reg, email, sem: SEMESTERS[semIdx] });
    setSuccess('Account created! Taking you in...');
    setTimeout(() => {
      navigation.replace('Main');
    }, 900);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back to login</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>Create account 🚀</Text>
        <Text style={styles.sub}>Join and start planning today</Text>

        <Text style={styles.label}>Full name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Abdul Basit" placeholderTextColor="#b0b7c3" />

        <Text style={styles.label}>Registration number</Text>
        <TextInput style={styles.input} value={reg} onChangeText={setReg} placeholder="SP24-BCS-033" placeholderTextColor="#b0b7c3" autoCapitalize="characters" />

        <Text style={styles.label}>University email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="sp24-bcs-033@cuiatk.edu.pk" placeholderTextColor="#b0b7c3" keyboardType="email-address" autoCapitalize="none" />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Min. 6 characters" placeholderTextColor="#b0b7c3" secureTextEntry />

        <Text style={styles.label}>Current semester</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 6, marginBottom: 4 }}>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {SEMESTERS.map((s, i) => (
              <TouchableOpacity
                key={s}
                style={[styles.semBtn, i === semIdx && styles.semBtnSel]}
                onPress={() => setSemIdx(i)}
                activeOpacity={0.75}
              >
                <Text style={[styles.semTxt, i === semIdx && styles.semTxtSel]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {error ? (
          <View style={styles.errBox}><Text style={styles.errTxt}>{error}</Text></View>
        ) : null}
        {success ? (
          <View style={styles.okBox}><Text style={styles.okTxt}>{success}</Text></View>
        ) : null}

        <TouchableOpacity style={styles.btn} activeOpacity={0.85} onPress={doSignup}>
          <Text style={styles.btnTxt}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.switchTxt}>
          Have an account?{' '}
          <Text style={styles.switchLink} onPress={() => navigation.navigate('Login')}>Log in</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 20, paddingBottom: 30 },
  back: { color: COLORS.primary, fontWeight: '700', fontSize: 13, marginBottom: 16 },
  heading: { fontSize: 23, fontWeight: '900', color: COLORS.text },
  sub: { fontSize: 13, color: COLORS.muted, marginTop: 3, marginBottom: 6 },
  label: { fontSize: 11, fontWeight: '700', color: COLORS.text, marginTop: 12, marginBottom: 5 },
  input: { borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 11, padding: 11, fontSize: 14, color: COLORS.text, backgroundColor: COLORS.card },
  semBtn: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 9, backgroundColor: '#f1f5f9', borderWidth: 1.5, borderColor: 'transparent' },
  semBtnSel: { backgroundColor: COLORS.primaryBg, borderColor: COLORS.primaryLight },
  semTxt: { fontSize: 12, fontWeight: '700', color: COLORS.muted },
  semTxtSel: { color: COLORS.primary },
  errBox: { backgroundColor: '#fef2f2', borderRadius: 9, padding: 9, marginTop: 8, borderWidth: 1, borderColor: '#fecaca' },
  errTxt: { fontSize: 12, color: COLORS.red },
  okBox: { backgroundColor: '#f0fdf4', borderRadius: 9, padding: 9, marginTop: 8, borderWidth: 1, borderColor: '#bbf7d0' },
  okTxt: { fontSize: 12, color: COLORS.green },
  btn: { backgroundColor: COLORS.primary, borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginTop: 14 },
  btnTxt: { color: '#fff', fontWeight: '800', fontSize: 15 },
  switchTxt: { textAlign: 'center', fontSize: 13, color: COLORS.muted, marginTop: 14 },
  switchLink: { color: COLORS.primary, fontWeight: '700' },
});