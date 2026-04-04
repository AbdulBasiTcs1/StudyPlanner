// screens/SplashScreen.js
import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, Animated,
} from 'react-native';
import { COLORS } from '../theme';

export default function SplashScreen({ navigation }) {
  const fade = new Animated.Value(0);
  const slide = new Animated.Value(20);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View className="flex-1 bg-primary items-center justify-center">
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <Animated.View 
        className="items-center px-8 w-full" 
        style={{ opacity: fade, transform: [{ translateY: slide }] }}
      >
        <View className="w-20 h-20 rounded-[22px] bg-white/15 border-[1.5px] border-white/20 items-center justify-center mb-5">
          <Text className="text-4xl">📖</Text>
        </View>
        <Text className="text-3xl font-black text-white text-center">StudyPlanner</Text>
        <Text className="text-[13px] text-white/65 text-center mt-1.5 mb-7 leading-5">
          Plan smart. Study better.{'\n'}Built for CUIATK students.
        </Text>

        <View className="flex-row gap-1.5 mb-7">
          <View className="w-[22px] h-2 rounded-full bg-white" />
          <View className="w-2 h-2 rounded-full bg-white/35" />
          <View className="w-2 h-2 rounded-full bg-white/35" />
        </View>

        <TouchableOpacity
          className="w-full bg-white py-4 rounded-[14px] items-center mb-3.5"
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="text-primary font-extrabold text-base">Get Started →</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-white/65 text-[13px] text-center">Already have an account? Log in</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({});