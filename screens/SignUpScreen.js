// screens/SignUpScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useApp } from '../AppContext';
import { COLORS } from '../theme';

const SEMESTERS = [
  'Semester 1','Semester 2','Semester 3','Semester 4',
  'Semester 5','Semester 6','Semester 7','Semester 8',
];

export default function SignUpScreen({ navigation }) {
  const { setUser } = useApp();
  const [name,     setName]     = useState('Abdul Basit');
  const [reg,      setReg]      = useState('SP24-BCS-033');
  const [email,    setEmail]    = useState('sp24-bcs-033@cuiatk.edu.pk');
  const [password, setPassword] = useState('');
  const [semIdx,   setSemIdx]   = useState(4); // Semester 5
  const [error,    setError]    = useState('');
  const [success,  setSuccess]  = useState('');

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
    setSuccess('✅ Account created! Taking you in...');
    setTimeout(() => navigation.replace('Main'), 900);
  }

  const InputField = ({ label, ...props }) => (
    <>
      <Text className="text-xs font-bold text-text mt-4 mb-1.5">{label}</Text>
      <TextInput
        className="border-2 border-border rounded-2xl p-3.5 text-sm text-text bg-card"
        placeholderTextColor="#b0b7c3"
        {...props}
      />
    </>
  );

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <ScrollView
        className="flex-1 bg-bg"
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back */}
        <TouchableOpacity onPress={() => navigation.goBack()} className="mb-6">
          <Text className="text-primary font-bold text-sm">← Back to login</Text>
        </TouchableOpacity>

        {/* Header */}
        <Text className="text-[26px] font-black text-text">Create account 🚀</Text>
        <Text className="text-sm text-muted mt-1 mb-2">Join and start planning today</Text>

        {/* Fields */}
        <InputField label="Full name"          value={name}     onChangeText={setName}     placeholder="Abdul Basit" />
        <InputField label="Registration number" value={reg}      onChangeText={setReg}      placeholder="SP24-BCS-033" autoCapitalize="characters" />
        <InputField label="University email"    value={email}    onChangeText={setEmail}    placeholder="sp24-bcs-033@cuiatk.edu.pk" keyboardType="email-address" autoCapitalize="none" />
        <InputField label="Password"            value={password} onChangeText={setPassword} placeholder="Min. 6 characters" secureTextEntry />

        {/* Semester picker */}
        <Text className="text-xs font-bold text-text mt-4 mb-2">Current semester</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {SEMESTERS.map((s, i) => (
              <TouchableOpacity
                key={s}
                className={`px-3.5 py-2 rounded-xl border-2 ${
                  i === semIdx
                    ? 'bg-primaryBg border-primary/30'
                    : 'bg-card border-border'
                }`}
                onPress={() => setSemIdx(i)}
                activeOpacity={0.75}
              >
                <Text className={`text-xs font-bold ${i === semIdx ? 'text-primary' : 'text-muted'}`}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Feedback banners */}
        {error ? (
          <View className="bg-red/10 rounded-xl p-3 mt-4 border border-red/30">
            <Text className="text-xs text-red font-semibold">⚠️ {error}</Text>
          </View>
        ) : null}
        {success ? (
          <View className="bg-green/10 rounded-xl p-3 mt-4 border border-green/30">
            <Text className="text-xs text-green font-semibold">{success}</Text>
          </View>
        ) : null}

        {/* Submit */}
        <TouchableOpacity
          className="bg-primary rounded-2xl py-4 items-center mt-5"
          activeOpacity={0.85}
          onPress={doSignup}
        >
          <Text className="text-white font-extrabold text-base">Create Account</Text>
        </TouchableOpacity>

        <Text className="text-center text-sm text-muted mt-5">
          Have an account?{' '}
          <Text className="text-primary font-bold" onPress={() => navigation.navigate('Login')}>
            Log in
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}