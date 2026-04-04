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
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <ScrollView className="flex-1 bg-bg" contentContainerStyle={{ padding: 20, paddingBottom: 30 }} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-primary font-bold text-[13px] mb-4">← Back</Text>
        </TouchableOpacity>

        <Text className="text-[23px] font-black text-text">Welcome back 👋</Text>
        <Text className="text-[13px] text-muted mt-1 mb-4">Log in to continue</Text>

        <View className="bg-primaryBg rounded-xl p-2.5 border border-primary/10 mb-1">
          <Text className="text-xs text-primary leading-5">
            💡 <Text className="font-bold">Email:</Text> sp24-bcs-033@cuiatk.edu.pk{'\n'}
            <Text className="font-bold">Password:</Text> basit2024
          </Text>
        </View>

        <Text className="text-[11px] font-bold text-text mt-3 mb-1.5">Email address</Text>
        <TextInput
          className="border-2 border-border rounded-xl p-3 text-sm text-text bg-card"
          value={email}
          onChangeText={setEmail}
          placeholder="your@cuiatk.edu.pk"
          placeholderTextColor="#b0b7c3"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text className="text-[11px] font-bold text-text mt-3 mb-1.5">Password</Text>
        <TextInput
          className="border-2 border-border rounded-xl p-3 text-sm text-text bg-card"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          placeholderTextColor="#b0b7c3"
          secureTextEntry
        />

        {error ? (
          <View className="bg-red/10 rounded-lg p-2.5 mt-2 border border-red/40">
            <Text className="text-xs text-red">{error}</Text>
          </View>
        ) : null}

        <TouchableOpacity className="bg-primary rounded-2xl py-3.5 items-center mt-3.5 shadow-sm" activeOpacity={0.85} onPress={doLogin}>
          <Text className="text-white font-extrabold text-[15px]">Log In</Text>
        </TouchableOpacity>

        <Text className="text-center text-[13px] text-muted mt-3.5">
          New here?{' '}
          <Text className="text-primary font-bold" onPress={() => navigation.navigate('SignUp')}>
            Create account
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});