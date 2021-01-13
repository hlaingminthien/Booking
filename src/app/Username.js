// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import { View, Text, Alert, StyleSheet, Image } from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

export default UserName = () => {

  const [name, setName] = useState('');

  useEffect(()=>{
    AsyncStorage.getItem('user_name').then((value) => {
        console.log('vale is=>', value);
        if(value) setName(value);
      });
  },[]);
  

  return (
    <View style={stylesSidebar.profileHeader}>
    <View style={stylesSidebar.profileHeaderPicCircle}>
      <Text style={{ fontSize: 25, color: '#307ecc' }}>
        {name.charAt(0)}
      </Text>
    </View>
    <Text style={stylesSidebar.profileHeaderText}>
      {name}
    </Text>
  </View>
  );
};

const stylesSidebar = StyleSheet.create({
    sideMenuContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: '#307ecc',
      paddingTop: 40,
      color: 'white',
    },
    profileHeader: {
      flexDirection: 'row',
      backgroundColor: '#307ecc',
      padding: 15,
      textAlign: 'center',
    },
    profileHeaderPicCircle: {
      width: 60,
      height: 60,
      borderRadius: 60 / 2,
      color: 'white',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileHeaderText: {
      color: 'white',
      alignSelf: 'center',
      paddingHorizontal: 10,
      fontWeight: 'bold',
    },
    profileHeaderLine: {
      height: 1,
      marginHorizontal: 20,
      backgroundColor: '#e2e2e2',
      marginTop: 15,
    },
  });