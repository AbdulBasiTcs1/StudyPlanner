// screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import { COLORS } from '../theme';

export default function LoginScreen({ navigation }) {
  const [email,    setEmail]    = useState('sp24-bcs-033@cuiatk.edu.pk');
  const [password, setPassword] = useState('basit2024');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  function doLogin() {
    const valid =
      (email === 'sp24-bcs-033@cuiatk.edu.pk' && password === 'basit2024') ||
      (email.includes('@') && password.length >= 6);

    if (!valid) {
      setError('Incorrect email or password.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Main');
    }, 500);
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <ScrollView
        className="flex-1 bg-bg"
        contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 20, paddingBottom: 30 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back button */}
        <TouchableOpacity onPress={() => navigation.goBack()} className="mb-3.5">
          <Text className="text-primary font-bold text-[12px]">← Back</Text>
        </TouchableOpacity>

        {/* Header */}
        <Text className="text-[21px] font-black text-text">Welcome back 👋</Text>
        <Text className="text-[12px] text-muted mt-0.5 mb-3.5">Log in to continue</Text>

        {/* Demo credentials hint */}
        <View className="bg-primaryBg rounded-xl p-[11px] border border-primary/15 mb-1 mt-1">
          <Text className="text-[11px] text-primary leading-5">
            💡 <Text className="font-bold">Email:</Text> sp24-bcs-033@cuiatk.edu.pk{'\n'}
            <Text className="font-bold">Password:</Text> basit2024
          </Text>
        </View>

        {/* Email field */}
        <Text className="text-[11px] font-bold text-text mt-2.5 mb-1">Email address</Text>
        <TextInput
          className="border-[1.5px] border-border rounded-xl p-2.5 px-3 text-[13px] text-text bg-card mb-0.5"
          value={email}
          onChangeText={setEmail}
          placeholder="your@cuiatk.edu.pk"
          placeholderTextColor="#b0b7c3"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password field */}
        <Text className="text-[11px] font-bold text-text mt-2.5 mb-1">Password</Text>
        <TextInput
          className="border-[1.5px] border-border rounded-xl p-2.5 px-3 text-[13px] text-text bg-card mb-0.5"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          placeholderTextColor="#b0b7c3"
          secureTextEntry
        />

        {/* Error message */}
        {error ? (
          <View className="bg-red/10 rounded-xl p-3 mt-2 border border-red/30">
            <Text className="text-xs text-red font-semibold">⚠️ {error}</Text>
          </View>
        ) : null}

        {/* Submit */}
        <TouchableOpacity
          className="bg-primary rounded-xl py-3 items-center mt-3"
          activeOpacity={0.88}
          onPress={doLogin}
          disabled={loading}
        >
          <Text className="text-white font-extrabold text-[14px]">
            {loading ? 'Logging in...' : 'Log In'}
          </Text>
        </TouchableOpacity>

        {/* Sign up link */}
        <Text className="text-center text-[12px] text-muted mt-3">
          New here?{' '}
          <Text
            className="text-primary font-bold"
            onPress={() => navigation.navigate('SignUp')}
          >
            Create account
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}