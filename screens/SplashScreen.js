// screens/SplashScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Text style={styles.iconText}>📖</Text>
      </View>
      <Text style={styles.title}>StudyPlanner</Text>
      <Text style={styles.subtitle}>
        Plan smart - Study better, {''}
        Built for CUIATK Students.
      </Text>

      <TouchableOpacity
        style={styles.btnWhite}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.btnWhiteText}>Get Started →</Text>
      </TouchableOpacity>

      <Text
        style={styles.linkText}
        onPress={() => navigation.navigate('Login')}>
        Already have an account? Log in
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5B4FCF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  iconBox: {
    width: 72, height: 72,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: 18,
  },
  iconText: { fontSize: 32 },
  title: {
    fontSize: 26, fontWeight: '900',
    color: '#fff', textAlign: 'center',
  },
  subtitle: {
    fontSize: 12, color: 'rgba(255,255,255,0.6)',
    marginTop: 5, textAlign: 'center', marginBottom: 26,
  },
  btnWhite: {
    backgroundColor: '#fff',
    paddingVertical: 13,
    borderRadius: 13,
    width: '100%',
    alignItems: 'center',
  },
  btnWhiteText: {
    color: '#5B4FCF', fontWeight: '800', fontSize: 14,
  },
  linkText: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 12, marginTop: 10, textAlign: 'center',
  },
});

export default SplashScreen;