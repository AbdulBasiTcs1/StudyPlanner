// screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import { COLORS } from '../theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('sp24-bcs-033@cuiatk.edu.pk');
  const [password, setPassword] = useState('basit2024');
  const [error, setError] = useState('');

  function doLogin() {
    const valid =
      (email === 'sp24-bcs-033@cuiatk.edu.pk' && password === 'basit2024') ||
      (email.includes('@') && password.length >= 6);
    if (!valid) {
      setError('Incorrect email or password.');
      return;
    }
    setError('');
    navigation.replace('Main');
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>Welcome back 👋</Text>
        <Text style={styles.sub}>Log in to continue</Text>

        <View style={styles.hint}>
          <Text style={styles.hintTxt}>
            💡 <Text style={{ fontWeight: '700' }}>Email:</Text> sp24-bcs-033@cuiatk.edu.pk{'\n'}
            <Text style={{ fontWeight: '700' }}>Password:</Text> basit2024
          </Text>
        </View>

        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="your@cuiatk.edu.pk"
          placeholderTextColor="#b0b7c3"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          placeholderTextColor="#b0b7c3"
          secureTextEntry
        />

        {error ? (
          <View style={styles.errBox}>
            <Text style={styles.errTxt}>{error}</Text>
          </View>
        ) : null}

        <TouchableOpacity style={styles.btn} activeOpacity={0.85} onPress={doLogin}>
          <Text style={styles.btnTxt}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.switchTxt}>
          New here?{' '}
          <Text style={styles.switchLink} onPress={() => navigation.navigate('SignUp')}>
            Create account
          </Text>
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
  sub: { fontSize: 13, color: COLORS.muted, marginTop: 3, marginBottom: 16 },
  hint: {
    backgroundColor: COLORS.primaryBg,
    borderRadius: 11,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(91,79,207,0.15)',
    marginBottom: 4,
  },
  hintTxt: { fontSize: 12, color: COLORS.primary, lineHeight: 20 },
  label: { fontSize: 11, fontWeight: '700', color: COLORS.text, marginTop: 12, marginBottom: 5 },
  input: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 11,
    padding: 11,
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: COLORS.card,
  },
  errBox: {
    backgroundColor: '#fef2f2',
    borderRadius: 9,
    padding: 9,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errTxt: { fontSize: 12, color: COLORS.red },
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 14,
  },
  btnTxt: { color: '#fff', fontWeight: '800', fontSize: 15 },
  switchTxt: { textAlign: 'center', fontSize: 13, color: COLORS.muted, marginTop: 14 },
  switchLink: { color: COLORS.primary, fontWeight: '700' },
});