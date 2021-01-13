// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View,ScrollView, Text, SafeAreaView} from 'react-native';
import SelectInput from 'react-native-select-input-ios';
const AttractionScreen = () => {
  return (
    <ScrollView>
    <SelectInput value={0} options={options} />
   </ScrollView>
  );
};

export default AttractionScreen;