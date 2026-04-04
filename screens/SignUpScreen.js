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
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <ScrollView className="flex-1 bg-bg" contentContainerStyle={{ padding: 20, paddingBottom: 30 }} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-primary font-bold text-[13px] mb-4">← Back to login</Text>
        </TouchableOpacity>

        <Text className="text-[23px] font-black text-text">Create account 🚀</Text>
        <Text className="text-sm text-muted mt-1 mb-1.5">Join and start planning today</Text>

        <Text className="text-[11px] font-bold text-text mt-3 mb-1.5">Full name</Text>
        <TextInput className="border-2 border-border rounded-xl p-3 text-sm text-text bg-card" value={name} onChangeText={setName} placeholder="Abdul Basit" placeholderTextColor="#b0b7c3" />

        <Text className="text-[11px] font-bold text-text mt-3 mb-1.5">Registration number</Text>
        <TextInput className="border-2 border-border rounded-xl p-3 text-sm text-text bg-card" value={reg} onChangeText={setReg} placeholder="SP24-BCS-033" placeholderTextColor="#b0b7c3" autoCapitalize="characters" />

        <Text className="text-[11px] font-bold text-text mt-3 mb-1.5">University email</Text>
        <TextInput className="border-2 border-border rounded-xl p-3 text-sm text-text bg-card" value={email} onChangeText={setEmail} placeholder="sp24-bcs-033@cuiatk.edu.pk" placeholderTextColor="#b0b7c3" keyboardType="email-address" autoCapitalize="none" />

        <Text className="text-[11px] font-bold text-text mt-3 mb-1.5">Password</Text>
        <TextInput className="border-2 border-border rounded-xl p-3 text-sm text-text bg-card" value={password} onChangeText={setPassword} placeholder="Min. 6 characters" placeholderTextColor="#b0b7c3" secureTextEntry />

        <Text className="text-[11px] font-bold text-text mt-3 mb-1.5">Current semester</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-1.5 mb-1">
          <View className="flex-row gap-1.5">
            {SEMESTERS.map((s, i) => (
              <TouchableOpacity
                key={s}
                className={`px-3 py-1.5 rounded-lg border-2 ${i === semIdx ? 'bg-primaryBg border-primary/20' : 'bg-[#f1f5f9] border-transparent'}`}
                onPress={() => setSemIdx(i)}
                activeOpacity={0.75}
              >
                <Text className={`text-xs font-bold ${i === semIdx ? 'text-primary' : 'text-muted'}`}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {error ? (
          <View className="bg-red/10 rounded-lg p-2.5 mt-2 border border-red/40"><Text className="text-xs text-red">{error}</Text></View>
        ) : null}
        {success ? (
          <View className="bg-green/10 rounded-lg p-2.5 mt-2 border border-green/40"><Text className="text-xs text-green">{success}</Text></View>
        ) : null}

        <TouchableOpacity className="bg-primary rounded-2xl py-3.5 items-center mt-3.5 shadow-sm" activeOpacity={0.85} onPress={doSignup}>
          <Text className="text-white font-extrabold text-[15px]">Create Account</Text>
        </TouchableOpacity>

        <Text className="text-center text-sm text-muted mt-3.5">
          Have an account?{' '}
          <Text className="text-primary font-bold" onPress={() => navigation.navigate('Login')}>Log in</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});