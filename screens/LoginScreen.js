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
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back button */}
        <TouchableOpacity onPress={() => navigation.goBack()} className="mb-6">
          <Text className="text-primary font-bold text-sm">← Back</Text>
        </TouchableOpacity>

        {/* Header */}
        <Text className="text-[26px] font-black text-text">Welcome back 👋</Text>
        <Text className="text-sm text-muted mt-1 mb-5">Log in to continue planning</Text>

        {/* Demo credentials hint */}
        <View className="bg-primaryBg rounded-2xl p-3.5 border border-primary/20 mb-6">
          <Text className="text-xs text-primary leading-5">
            💡 <Text className="font-bold">Demo Email:</Text> sp24-bcs-033@cuiatk.edu.pk{'\n'}
            <Text className="font-bold">Password:</Text> basit2024
          </Text>
        </View>

        {/* Email field */}
        <Text className="text-xs font-bold text-text mb-1.5">Email address</Text>
        <TextInput
          className="border-2 border-border rounded-2xl p-3.5 text-sm text-text bg-card mb-4"
          value={email}
          onChangeText={setEmail}
          placeholder="your@cuiatk.edu.pk"
          placeholderTextColor="#b0b7c3"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password field */}
        <Text className="text-xs font-bold text-text mb-1.5">Password</Text>
        <TextInput
          className="border-2 border-border rounded-2xl p-3.5 text-sm text-text bg-card mb-2"
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

        {/* Login button */}
        <TouchableOpacity
          className={`rounded-2xl py-4 items-center mt-5 ${loading ? 'bg-primary/60' : 'bg-primary'}`}
          activeOpacity={0.85}
          onPress={doLogin}
          disabled={loading}
        >
          <Text className="text-white font-extrabold text-base">
            {loading ? 'Logging in...' : 'Log In'}
          </Text>
        </TouchableOpacity>

        {/* Sign up link */}
        <Text className="text-center text-sm text-muted mt-5">
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