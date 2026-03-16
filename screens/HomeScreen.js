// screens/HomeScreen.js
import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Student 👋</Text>
        <Text style={styles.sub}>Welcome to StudyPlanner</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardIcon}>📚</Text>
        <Text style={styles.cardTitle}>Your Dashboard</Text>
        <Text style={styles.cardText}>
          Manage your subjects, tasks, and study sessions all in one place.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => navigation.navigate('Splash')}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    padding: 20,
  },
  header: {
    marginTop: 30,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1a1a2e',
  },
  sub: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#5B4FCF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#5B4FCF',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  cardIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    lineHeight: 20,
  },
  logoutBtn: {
    marginTop: 'auto',
    borderWidth: 1.5,
    borderColor: '#5B4FCF',
    borderRadius: 13,
    paddingVertical: 13,
    alignItems: 'center',
  },
  logoutText: {
    color: '#5B4FCF',
    fontWeight: '800',
    fontSize: 14,
  },
});

export default HomeScreen;
