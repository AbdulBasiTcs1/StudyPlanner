// screens/SignUpScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView
} from 'react-native';

const SEMESTERS = [
  'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4',
  'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8',
];

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [semester, setSem] = useState('Semester 5');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = () => {
    if (!name || !regNo || !email || !password) {
      setError('Please fill in all fields.');
      setSuccess(''); return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setSuccess(''); return;
    }
    setError('');
    setSuccess('Account created! Taking you in...');
    setTimeout(() => navigation.navigate('Home'), 900);
  };

  return (
    <ScrollView style={styles.container}
      contentContainerStyle={styles.inner}>

      <Text style={styles.back}
        onPress={() => navigation.goBack()}>← Back to login</Text>

      <Text style={styles.heading}>Create account </Text>
      <Text style={styles.sub}>Join and start planning today</Text>

      <Text style={styles.label}>Full name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Registration number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter registration number"
        autoCapitalize="characters"
        value={regNo}
        onChangeText={setRegNo}
      />

      <Text style={styles.label}>University email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPass}
      />

      <Text style={styles.label}>Current semester</Text>
      <View style={styles.semRow}>
        {SEMESTERS.map(s => (
          <TouchableOpacity
            key={s}
            style={[styles.semChip,
            semester === s && styles.semChipSel]}
            onPress={() => setSem(s)}>
            <Text style={[styles.semText,
            semester === s && styles.semTextSel]}>
              {s.replace('Semester ', 'S')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {error !== '' && (
        <View style={styles.errBox}>
          <Text style={styles.errText}>{error}</Text>
        </View>
      )}
      {success !== '' && (
        <View style={styles.okBox}>
          <Text style={styles.okText}>{success}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.btnPrimary} onPress={handleSignup}>
        <Text style={styles.btnPrimaryText}>Create Account</Text>
      </TouchableOpacity>

      <Text style={styles.switchText}>
        Have an account?{' '}
        <Text style={styles.link}
          onPress={() => navigation.navigate('Login')}>
          Log in
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  inner: { padding: 20 },
  back: {
    color: '#5B4FCF', fontWeight: '700',
    fontSize: 12, marginBottom: 14,
  },
  heading: { fontSize: 21, fontWeight: '900', color: '#1a1a2e' },
  sub: { fontSize: 12, color: '#64748b', marginTop: 2, marginBottom: 14 },
  label: {
    fontSize: 11, fontWeight: '700',
    color: '#1a1a2e', marginBottom: 4, marginTop: 10,
  },
  input: {
    borderWidth: 1.5, borderColor: '#e2e8f0',
    borderRadius: 10, padding: 10,
    fontSize: 13, color: '#1a1a2e', backgroundColor: '#fff',
  },
  semRow: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4,
  },
  semChip: {
    paddingVertical: 6, paddingHorizontal: 10,
    borderRadius: 8, backgroundColor: '#f1f5f9',
    borderWidth: 1.5, borderColor: 'transparent',
  },
  semChipSel: {
    backgroundColor: '#EEF0FF',
    borderColor: '#7B6FEF',
  },
  semText: { fontSize: 11, fontWeight: '700', color: '#64748b' },
  semTextSel: { color: '#5B4FCF' },
  errBox: {
    backgroundColor: '#fef2f2', borderRadius: 8,
    padding: 7, marginTop: 6,
    borderWidth: 1, borderColor: '#fecaca',
  },
  errText: { fontSize: 11, color: '#dc2626' },
  okBox: {
    backgroundColor: '#f0fdf4', borderRadius: 8,
    padding: 7, marginTop: 6,
    borderWidth: 1, borderColor: '#bbf7d0',
  },
  okText: { fontSize: 11, color: '#16a34a' },
  btnPrimary: {
    backgroundColor: '#5B4FCF',
    paddingVertical: 13,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 12,
  },
  btnPrimaryText: { color: '#fff', fontWeight: '800', fontSize: 14 },
  switchText: {
    textAlign: 'center', fontSize: 12, color: '#64748b', marginTop: 12,
  },
  link: { color: '#5B4FCF', fontWeight: '700' },
});

export default SignUpScreen;