// screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ScrollView
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const validEmail = 'sp24-bcs-033@cuiatk.edu.pk';
    const validPass = 'basit2024';
    const ok = (email === validEmail && password === validPass)
      || (email.includes('@') && password.length >= 6);
    if (!ok) {
      setError('Incorrect email or password.');
      return;
    }
    setError('');
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={styles.container}
      contentContainerStyle={styles.inner}>

      <Text style={styles.back}
        onPress={() => navigation.goBack()}>← Back</Text>

      <Text style={styles.heading}>Welcome back </Text>
      <Text style={styles.sub}>Log in to continue</Text>

      {/* <View style={styles.hintBox}>
        <Text style={styles.hintText}>
          💡 Email: sp24-bcs-033@cuiatk.edu.pk{' '}
            and Password: basit2024
        </Text>
      </View> */}

      <Text style={styles.label}>Email address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email or username"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error !== '' && (
        <View style={styles.errBox}>
          <Text style={styles.errText}>{error}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
        <Text style={styles.btnPrimaryText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.switchText}>
        New here?{' '}
        <Text style={styles.link}
          onPress={() => navigation.navigate('SignUp')}>
          Create account
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
  heading: {
    fontSize: 21, fontWeight: '900', color: '#1a1a2e',
  },
  sub: { fontSize: 12, color: '#64748b', marginTop: 2, marginBottom: 14 },
  hintBox: {
    backgroundColor: '#EEF0FF',
    borderRadius: 10, padding: 9,
    marginTop: 4, borderWidth: 1,
    borderColor: 'rgba(91,79,207,0.15)',
  },
  hintText: { fontSize: 11, color: '#5B4FCF', lineHeight: 18 },
  label: {
    fontSize: 11, fontWeight: '700',
    color: '#1a1a2e', marginBottom: 4, marginTop: 10,
  },
  input: {
    borderWidth: 1.5, borderColor: '#e2e8f0',
    borderRadius: 10, padding: 10,
    fontSize: 13, color: '#1a1a2e',
    backgroundColor: '#fff',
  },
  errBox: {
    backgroundColor: '#fef2f2', borderRadius: 8,
    padding: 7, marginTop: 6,
    borderWidth: 1, borderColor: '#fecaca',
  },
  errText: { fontSize: 11, color: '#dc2626' },
  btnPrimary: {
    backgroundColor: '#5B4FCF',
    paddingVertical: 13, borderRadius: 13,
    alignItems: 'center', marginTop: 12,
  },
  btnPrimaryText: {
    color: '#fff', fontWeight: '800', fontSize: 14,
  },
  switchText: {
    textAlign: 'center', fontSize: 12,
    color: '#64748b', marginTop: 12,
  },
  link: { color: '#5B4FCF', fontWeight: '700' },
});

export default LoginScreen;