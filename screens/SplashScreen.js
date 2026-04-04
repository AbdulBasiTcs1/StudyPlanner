// screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { COLORS } from '../theme';

export default function SplashScreen({ navigation }) {
  const fade  = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade,  { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View className="flex-1 bg-primary items-center justify-center">
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <Animated.View
        className="items-center px-8 w-full"
        style={{ opacity: fade, transform: [{ translateY: slide }] }}
      >
        {/* App icon */}
        <View className="w-24 h-24 rounded-[26px] bg-white/20 border-2 border-white/30 items-center justify-center mb-6">
          <Text className="text-5xl">📖</Text>
        </View>

        {/* Title */}
        <Text className="text-4xl font-black text-white text-center">StudyPlanner</Text>
        <Text className="text-sm text-white/70 text-center mt-2 mb-3 leading-5">
          Plan smart. Study better.{'\n'}Built for CUIATK students.
        </Text>

        {/* Feature pills */}
        <View className="flex-row gap-2 mb-8 flex-wrap justify-center">
          {['📅 Schedule', '📊 Track', '🎯 Achieve'].map((pill) => (
            <View key={pill} className="bg-white/15 rounded-full px-3 py-1">
              <Text className="text-white/90 text-xs font-semibold">{pill}</Text>
            </View>
          ))}
        </View>

        {/* Page dots */}
        <View className="flex-row gap-1.5 mb-8">
          <View className="w-6 h-2 rounded-full bg-white" />
          <View className="w-2 h-2 rounded-full bg-white/35" />
          <View className="w-2 h-2 rounded-full bg-white/35" />
        </View>

        {/* CTA button */}
        <TouchableOpacity
          className="w-full bg-white py-4 rounded-2xl items-center mb-4"
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="text-primary font-extrabold text-base">Get Started →</Text>
        </TouchableOpacity>

        {/* Already have account */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-white/65 text-sm text-center">
            Already have an account?{' '}
            <Text className="text-white font-bold underline">Log in</Text>
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}