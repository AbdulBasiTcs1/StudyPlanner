// App.js — NavigationContainer with Stack (Auth) + Bottom Tabs (Main)
import React from 'react';
import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AppProvider } from './AppContext';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import SubjectsScreen from './screens/SubjectsScreen';
import StatsScreen from './screens/StatsScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// ─── Custom Bottom Tab Bar (NativeWind styled) ────────────────────────────────
function MyTabBar({ state, descriptors, navigation }) {
  const tabs = [
    { name: 'Home',     icon: '🏠', label: 'Home'     },
    { name: 'Subjects', icon: '📚', label: 'Subjects' },
    { name: 'AddTask',  icon: '➕', label: 'Add'      },
    { name: 'Stats',    icon: '📊', label: 'Stats'    },
    { name: 'Profile',  icon: '👤', label: 'Profile'  },
  ];

  return (
    <View className="flex-row bg-card border-t border-border pt-2 pb-2" style={{ elevation: 8 }}>
      {state.routes.map((route, index) => {
        const tab = tabs[index];
        const focused = state.index === index;
        return (
          <TouchableOpacity
            key={route.key}
            className="flex-1 items-center justify-center"
            activeOpacity={0.75}
            onPress={() => navigation.navigate(route.name)}
          >
            {/* Active indicator dot */}
            {focused && (
              <View className="absolute top-0 w-6 h-0.5 bg-primary rounded-full" />
            )}
            <Text className="text-[18px] leading-6">{tab.icon}</Text>
            <Text
              className={`text-[9px] font-bold mt-0.5 ${focused ? 'text-primary' : 'text-muted'}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ─── Main Tabs (authenticated) ────────────────────────────────────────────────
function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home"     component={HomeScreen}     />
      <Tab.Screen name="Subjects" component={SubjectsScreen} />
      <Tab.Screen name="AddTask"  component={AddTaskScreen}  />
      <Tab.Screen name="Stats"    component={StatsScreen}    />
      <Tab.Screen name="Profile"  component={ProfileScreen}  />
    </Tab.Navigator>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <AppProvider>
        <NavigationContainer>
          {/*
            Stack Navigator:
              Splash → Login → SignUp   (auth flow)
              Main  → (Bottom Tabs)     (app flow)
          */}
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false, animation: 'fade' }}
          >
            <Stack.Screen name="Splash"  component={SplashScreen} />
            <Stack.Screen name="Login"   component={LoginScreen}  />
            <Stack.Screen name="SignUp"  component={SignUpScreen} />
            <Stack.Screen name="Main"    component={MainTabs}     />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </GestureHandlerRootView>
  );
}