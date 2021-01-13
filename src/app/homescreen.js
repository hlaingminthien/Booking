// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import booking from './booking';
import tour from './stayFirst';
import staySecond from './staySecond';
import attractionFirst from './attractionFirst';
import attractionSecond from './attractionSecond';
import stayThird from './stayThird';
import stayFourth from './stayFourth';

import Ionic from 'react-native-vector-icons/Ionicons'

const Stay = () => {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Stays" component={tour} />
        <Stack.Screen name="staysecond" component={staySecond} />
        <Stack.Screen name="staythird" component={stayThird} />
        <Stack.Screen name="stayfourth" component={stayFourth} />
      </Stack.Navigator>
    );
  }

  const Attraction = () => {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Attraction" component={attractionFirst} />
        <Stack.Screen name="Attractionsecond" component={attractionSecond} />

      </Stack.Navigator>
    );
  }

const HomeScreen = () => {
  const Tab = createBottomTabNavigator();
  return (
             <Tab.Navigator tabBarOptions={
              {
                  style: {
                      height: 60,
                      paddingBottom: 15
                  },
                  activeTintColor: '#2196F3',
              }
          }>
            <Tab.Screen name="Stays"
                component={Stay}
                options={{
                    tabBarLabel: 'Stays',
                    tabBarIcon: ({color}) => (
                        <Ionic size={20} color={color} name="flower-outline"></Ionic>
                    ),
                }} />
            <Tab.Screen name="Attraction"
                component={Attraction}
                options={{
                    tabBarLabel: 'Attractions',
                    tabBarIcon: ({color}) => (
                      <Ionic size={20} color={color} name="flame-outline"></Ionic>
                    ),
                }} />
            <Tab.Screen name="My Booking"
                component={booking}
                options={{
                    tabBarLabel: 'My Bookings',
                    tabBarIcon: ({color}) => (
                      <Ionic size={20} color={color} name="book-outline"></Ionic>
                    ),
                }}
            />
            </Tab.Navigator>
  );
};

export default HomeScreen;